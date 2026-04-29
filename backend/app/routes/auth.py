from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import check_password_hash
from ..models import db, User
from ..utils.helpers import validate_email, validate_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return JWT tokens"""
    try:
        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400

        email = data['email'].strip().lower()
        password = data['password']

        # Validate input
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400

        # Find user
        user = User.query.filter_by(email=email, is_active=True).first()
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid email or password'}), 401

        # Create tokens
        access_token = create_access_token(identity=user.id, additional_claims={'role': user.role})
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify({
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': 'Login failed', 'details': str(e)}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """Refresh access token using refresh token"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        access_token = create_access_token(identity=user.id, additional_claims={'role': user.role})

        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'error': 'Token refresh failed', 'details': str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user (client should discard tokens)"""
    try:
        # In a production app, you might want to blacklist the token
        # For now, we just return success and let the client handle token removal
        return jsonify({'message': 'Logged out successfully'}), 200

    except Exception as e:
        return jsonify({'error': 'Logout failed', 'details': str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        return jsonify({'user': user.to_dict()}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get user info', 'details': str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
@jwt_required()
def register_user():
    """Register a new user (admin/HOD only)"""
    try:
        claims = get_jwt()
        if claims.get('role') not in ['admin', 'hod']:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()

        required_fields = ['email', 'password', 'name', 'role']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        email = data['email'].strip().lower()
        password = data['password']
        name = data['name'].strip()
        role = data['role']

        # Validate input
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400

        if not validate_password(password):
            return jsonify({'error': 'Password must be at least 8 characters long'}), 400

        if role not in ['student', 'faculty', 'hod', 'admin']:
            return jsonify({'error': 'Invalid role'}), 400

        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'User with this email already exists'}), 409

        # Create user
        user = User(
            email=email,
            name=name,
            role=role,
            department=data.get('department'),
            year=data.get('year'),
            semester=data.get('semester')
        )
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'User registration failed', 'details': str(e)}), 500