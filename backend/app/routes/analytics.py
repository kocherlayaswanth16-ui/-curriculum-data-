from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from sqlalchemy import func, desc
from ..models import db, User, Subject, Syllabus, Analytics, Department, Skill, UserSkill
from datetime import datetime, timedelta

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard_data():
    """Get dashboard analytics data based on user role"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        claims = get_jwt()

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        role = claims.get('role')
        data = {}

        if role == 'admin':
            data = _get_admin_dashboard()
        elif role == 'hod':
            data = _get_hod_dashboard(user.department_id)
        elif role == 'faculty':
            data = _get_faculty_dashboard(user.id)
        elif role == 'student':
            data = _get_student_dashboard(user.id)

        return jsonify(data), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get dashboard data', 'details': str(e)}), 500

def _get_admin_dashboard():
    """Get admin-level analytics"""
    # User statistics
    user_stats = db.session.query(
        User.role,
        func.count(User.id).label('count')
    ).filter(User.is_active == True).group_by(User.role).all()

    # Department statistics
    dept_stats = db.session.query(
        Department.name,
        func.count(Subject.id).label('subjects_count'),
        func.count(Syllabus.id).label('syllabi_count')
    ).join(Subject, Department.id == Subject.department_id, isouter=True)\
     .join(Syllabus, Department.id == Syllabus.department_id, isouter=True)\
     .group_by(Department.id, Department.name).all()

    # Overall syllabus analysis stats
    syllabus_stats = db.session.query(
        func.avg(Syllabus.relevance_score).label('avg_relevance'),
        func.count(Syllabus.id).label('total_syllabi'),
        func.sum(func.json_length(Syllabus.outdated_topics)).label('total_outdated_topics')
    ).filter(Syllabus.analysis_status == 'completed').first()

    # Recent uploads
    recent_uploads = Syllabus.query.join(User)\
        .add_columns(User.name, Syllabus.original_filename, Syllabus.uploaded_at)\
        .order_by(desc(Syllabus.uploaded_at)).limit(5).all()

    return {
        'user_stats': {stat.role: stat.count for stat in user_stats},
        'department_stats': [{
            'department': stat.name,
            'subjects': stat.subjects_count,
            'syllabi': stat.syllabi_count
        } for stat in dept_stats],
        'syllabus_stats': {
            'average_relevance': float(syllabus_stats.avg_relevance or 0),
            'total_syllabi': syllabus_stats.total_syllabi or 0,
            'total_outdated_topics': syllabus_stats.total_outdated_topics or 0
        },
        'recent_uploads': [{
            'filename': upload.original_filename,
            'uploaded_by': upload.name,
            'uploaded_at': upload.uploaded_at.isoformat()
        } for upload in recent_uploads]
    }

def _get_hod_dashboard(department_id):
    """Get HOD-level analytics for their department"""
    # Department subjects
    subjects = Subject.query.filter_by(department_id=department_id).all()

    # Syllabus analysis for department
    dept_syllabi = Syllabus.query.filter_by(department_id=department_id).all()

    # Faculty performance
    faculty_stats = db.session.query(
        User.name,
        func.count(Subject.id).label('subjects_count'),
        func.count(Syllabus.id).label('syllabi_count')
    ).filter(User.department_id == department_id, User.role == 'faculty')\
     .join(Subject, User.id == Subject.faculty_id, isouter=True)\
     .join(Syllabus, User.id == Syllabus.uploaded_by, isouter=True)\
     .group_by(User.id, User.name).all()

    # Relevance scores by year/semester
    relevance_by_year = db.session.query(
        Subject.year,
        Subject.semester,
        func.avg(Syllabus.relevance_score).label('avg_relevance')
    ).join(Syllabus, Subject.id == Syllabus.subject_id)\
     .filter(Subject.department_id == department_id)\
     .group_by(Subject.year, Subject.semester)\
     .order_by(Subject.year, Subject.semester).all()

    return {
        'subjects_count': len(subjects),
        'syllabi_count': len(dept_syllabi),
        'faculty_stats': [{
            'name': stat.name,
            'subjects': stat.subjects_count,
            'syllabi': stat.syllabi_count
        } for stat in faculty_stats],
        'relevance_by_year': [{
            'year': rel.year,
            'semester': rel.semester,
            'relevance': float(rel.avg_relevance or 0)
        } for rel in relevance_by_year]
    }

def _get_faculty_dashboard(faculty_id):
    """Get faculty-level analytics"""
    # Faculty's subjects
    subjects = Subject.query.filter_by(faculty_id=faculty_id).all()

    # Syllabus uploads by faculty
    syllabi = Syllabus.query.filter_by(uploaded_by=faculty_id).all()

    # Analysis statistics
    analysis_stats = db.session.query(
        func.avg(Syllabus.relevance_score).label('avg_relevance'),
        func.sum(func.json_length(Syllabus.outdated_topics)).label('outdated_count'),
        func.sum(func.json_length(Syllabus.missing_skills)).label('missing_count')
    ).filter(Syllabus.uploaded_by == faculty_id, Syllabus.analysis_status == 'completed').first()

    return {
        'subjects_count': len(subjects),
        'syllabi_count': len(syllabi),
        'analysis_stats': {
            'average_relevance': float(analysis_stats.avg_relevance or 0),
            'total_outdated_topics': analysis_stats.outdated_count or 0,
            'total_missing_skills': analysis_stats.missing_count or 0
        },
        'subjects': [{
            'id': subject.id,
            'name': subject.name,
            'code': subject.code,
            'year': subject.year,
            'semester': subject.semester,
            'relevance_score': subject.relevance_score
        } for subject in subjects]
    }

def _get_student_dashboard(student_id):
    """Get student-level analytics"""
    user = User.query.get(student_id)

    # Get subjects for student's year/semester
    subjects = Subject.query.filter_by(
        department_id=user.department_id,
        year=user.year,
        semester=user.semester
    ).all()

    # Get syllabus analysis for these subjects
    subject_ids = [s.id for s in subjects]
    syllabi = Syllabus.query.filter(Syllabus.subject_id.in_(subject_ids)).all()

    # Student skill analysis
    user_skills = UserSkill.query.filter_by(user_id=student_id).all()

    # Calculate skill gap
    skill_gaps = []
    for skill in user_skills:
        gap = skill.target_level - skill.proficiency_level
        skill_gaps.append({
            'skill': skill.skill.name,
            'current_level': skill.proficiency_level,
            'target_level': skill.target_level,
            'gap': gap,
            'priority': skill.priority
        })

    return {
        'subjects_count': len(subjects),
        'syllabi_count': len(syllabi),
        'skill_gaps': skill_gaps,
        'subjects': [{
            'id': subject.id,
            'name': subject.name,
            'code': subject.code,
            'relevance_score': subject.relevance_score,
            'outdated_topics_count': subject.outdated_topics_count
        } for subject in subjects]
    }

@analytics_bp.route('/reports/syllabus-analysis', methods=['GET'])
@jwt_required()
def get_syllabus_analysis_report():
    """Get detailed syllabus analysis report"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        claims = get_jwt()

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        # Get filters
        department_id = request.args.get('department_id', type=int)
        subject_id = request.args.get('subject_id', type=int)
        year = request.args.get('year', type=int)
        semester = request.args.get('semester', type=int)

        # Build query
        query = Syllabus.query.filter(Syllabus.analysis_status == 'completed')

        if department_id:
            query = query.filter_by(department_id=department_id)
        if subject_id:
            query = query.filter_by(subject_id=subject_id)

        syllabi = query.all()

        # Generate report
        report = {
            'total_syllabi': len(syllabi),
            'average_relevance': 0.0,
            'total_outdated_topics': 0,
            'total_missing_skills': 0,
            'recommendations': [],
            'syllabus_details': []
        }

        if syllabi:
            total_relevance = sum(s.relevance_score for s in syllabi)
            report['average_relevance'] = total_relevance / len(syllabi)

            for syllabus in syllabi:
                report['total_outdated_topics'] += len(syllabus.outdated_topics or [])
                report['total_missing_skills'] += len(syllabus.missing_skills or [])
                report['recommendations'].extend(syllabus.recommendations or [])

                report['syllabus_details'].append({
                    'id': syllabus.id,
                    'filename': syllabus.original_filename,
                    'subject': syllabus.subject.name if syllabus.subject else None,
                    'relevance_score': syllabus.relevance_score,
                    'outdated_topics': syllabus.outdated_topics,
                    'missing_skills': syllabus.missing_skills
                })

        return jsonify({'report': report}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to generate report', 'details': str(e)}), 500

@analytics_bp.route('/skills/gap-analysis', methods=['GET'])
@jwt_required()
def get_skill_gap_analysis():
    """Get skill gap analysis for user or department"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        # Get user's skills
        user_skills = UserSkill.query.filter_by(user_id=current_user_id)\
            .join(Skill).add_columns(
                Skill.name, Skill.category, Skill.industry_demand,
                UserSkill.proficiency_level, UserSkill.target_level,
                UserSkill.priority
            ).all()

        skill_analysis = []
        for skill_data in user_skills:
            gap = skill_data.target_level - skill_data.proficiency_level
            skill_analysis.append({
                'skill': skill_data.name,
                'category': skill_data.category,
                'industry_demand': skill_data.industry_demand,
                'current_level': skill_data.proficiency_level,
                'target_level': skill_data.target_level,
                'gap': gap,
                'priority': skill_data.priority,
                'status': 'deficit' if gap > 0 else 'adequate'
            })

        # Sort by priority and gap
        priority_order = {'high': 3, 'medium': 2, 'low': 1}
        skill_analysis.sort(key=lambda x: (priority_order.get(x['priority'], 0), x['gap']), reverse=True)

        return jsonify({'skill_analysis': skill_analysis}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to get skill analysis', 'details': str(e)}), 500