from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..models import db, User, Department, Subject, UserSkill, Skill
from ..utils.helpers import validate_email

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        return jsonify({'user': user.to_dict()}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get profile', 'details': str(e)}), 500

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        data = request.get_json()

        # Update allowed fields
        allowed_fields = ['name', 'department', 'year', 'semester']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])

        db.session.commit()

        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update profile', 'details': str(e)}), 500

@users_bp.route('/list', methods=['GET'])
@jwt_required()
def list_users():
    """List users with optional filtering (admin/HOD only)"""
    try:
        claims = get_jwt()
        if claims.get('role') not in ['admin', 'hod']:
            return jsonify({'error': 'Unauthorized'}), 403

        # Get query parameters
        role = request.args.get('role')
        department = request.args.get('department')
        active_only = request.args.get('active_only', 'true').lower() == 'true'

        query = User.query

        if role:
            query = query.filter_by(role=role)
        if department:
            query = query.filter_by(department=department)
        if active_only:
            query = query.filter_by(is_active=True)

        # HOD can only see users from their department
        if claims.get('role') == 'hod':
            current_user_id = get_jwt_identity()
            hod = User.query.get(current_user_id)
            query = query.filter_by(department=hod.department)

        users = query.order_by(User.name).all()

        result = [user.to_dict() for user in users]
        return jsonify({'users': result}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to list users', 'details': str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    """Get specific user details"""
    try:
        claims = get_jwt()
        current_user_id = get_jwt_identity()

        # Users can view their own profile, admins/HODs can view others
        if user_id != current_user_id and claims.get('role') not in ['admin', 'hod']:
            return jsonify({'error': 'Unauthorized'}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # HOD can only view users from their department
        if claims.get('role') == 'hod' and user_id != current_user_id:
            hod = User.query.get(current_user_id)
            if user.department != hod.department:
                return jsonify({'error': 'Unauthorized'}), 403

        return jsonify({'user': user.to_dict()}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get user', 'details': str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    """Update user (admin/HOD only)"""
    try:
        claims = get_jwt()
        if claims.get('role') not in ['admin', 'hod']:
            return jsonify({'error': 'Unauthorized'}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # HOD can only update users from their department
        if claims.get('role') == 'hod':
            current_user_id = get_jwt_identity()
            hod = User.query.get(current_user_id)
            if user.department != hod.department:
                return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()

        # Update fields
        allowed_fields = ['name', 'department', 'year', 'semester', 'is_active']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])

        # Only admin can change role
        if claims.get('role') == 'admin' and 'role' in data:
            if data['role'] in ['student', 'faculty', 'hod', 'admin']:
                user.role = data['role']

        db.session.commit()

        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update user', 'details': str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Deactivate user (admin only)"""
    try:
        claims = get_jwt()
        if claims.get('role') != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        user.is_active = False
        db.session.commit()

        return jsonify({'message': 'User deactivated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to deactivate user', 'details': str(e)}), 500

@users_bp.route('/skills', methods=['GET'])
@jwt_required()
def get_user_skills():
    """Get current user's skills"""
    try:
        current_user_id = get_jwt_identity()

        user_skills = UserSkill.query.filter_by(user_id=current_user_id)\
            .join(Skill).add_columns(
                Skill.id, Skill.name, Skill.category, Skill.industry_demand,
                Skill.growth_rate, Skill.description,
                UserSkill.proficiency_level, UserSkill.target_level,
                UserSkill.priority
            ).all()

        skills = []
        for skill_data in user_skills:
            skills.append({
                'id': skill_data.id,
                'name': skill_data.name,
                'category': skill_data.category,
                'industry_demand': skill_data.industry_demand,
                'growth_rate': skill_data.growth_rate,
                'description': skill_data.description,
                'proficiency_level': skill_data.proficiency_level,
                'target_level': skill_data.target_level,
                'priority': skill_data.priority
            })

        return jsonify({'skills': skills}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get skills', 'details': str(e)}), 500

@users_bp.route('/skills', methods=['POST'])
@jwt_required()
def add_user_skill():
    """Add a skill to current user"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()

        required_fields = ['skill_id', 'proficiency_level', 'target_level']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        skill_id = data['skill_id']
        proficiency_level = data['proficiency_level']
        target_level = data['target_level']
        priority = data.get('priority', 'medium')

        # Check if skill exists
        skill = Skill.query.get(skill_id)
        if not skill:
            return jsonify({'error': 'Skill not found'}), 404

        # Check if user already has this skill
        existing = UserSkill.query.filter_by(user_id=current_user_id, skill_id=skill_id).first()
        if existing:
            return jsonify({'error': 'User already has this skill'}), 409

        # Create user skill
        user_skill = UserSkill(
            user_id=current_user_id,
            skill_id=skill_id,
            proficiency_level=proficiency_level,
            target_level=target_level,
            priority=priority
        )

        db.session.add(user_skill)
        db.session.commit()

        return jsonify({
            'message': 'Skill added successfully',
            'skill': {
                'id': skill.id,
                'name': skill.name,
                'proficiency_level': proficiency_level,
                'target_level': target_level,
                'priority': priority
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add skill', 'details': str(e)}), 500

@users_bp.route('/skills/<int:skill_id>', methods=['PUT'])
@jwt_required()
def update_user_skill(skill_id):
    """Update user's skill proficiency"""
    try:
        current_user_id = get_jwt_identity()

        user_skill = UserSkill.query.filter_by(user_id=current_user_id, skill_id=skill_id).first()
        if not user_skill:
            return jsonify({'error': 'Skill not found for user'}), 404

        data = request.get_json()

        if 'proficiency_level' in data:
            user_skill.proficiency_level = data['proficiency_level']
        if 'target_level' in data:
            user_skill.target_level = data['target_level']
        if 'priority' in data:
            user_skill.priority = data['priority']

        db.session.commit()

        return jsonify({'message': 'Skill updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update skill', 'details': str(e)}), 500

@users_bp.route('/skills/<int:skill_id>', methods=['DELETE'])
@jwt_required()
def remove_user_skill(skill_id):
    """Remove skill from current user"""
    try:
        current_user_id = get_jwt_identity()

        user_skill = UserSkill.query.filter_by(user_id=current_user_id, skill_id=skill_id).first()
        if not user_skill:
            return jsonify({'error': 'Skill not found for user'}), 404

        db.session.delete(user_skill)
        db.session.commit()

        return jsonify({'message': 'Skill removed successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to remove skill', 'details': str(e)}), 500