from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
from ..models import db, Syllabus, User, Subject
from ..services.file_handler import FileHandler
from ..services.syllabus_analyzer import SyllabusAnalyzer

syllabus_bp = Blueprint('syllabus', __name__)

@syllabus_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_syllabus():
    """Upload and analyze syllabus file"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Get additional data
        subject_id = request.form.get('subject_id')
        department_id = request.form.get('department_id')

        # Validate file type
        allowed_extensions = {'pdf', 'docx', 'doc'}
        if not FileHandler.allowed_file(file.filename, allowed_extensions):
            return jsonify({'error': 'Invalid file type. Only PDF, DOCX, and DOC files are allowed'}), 400

        # Save file
        filename = secure_filename(file.filename)
        file_path = FileHandler.save_file(file, filename)

        # Create syllabus record
        syllabus = Syllabus(
            filename=filename,
            original_filename=file.filename,
            file_path=file_path,
            file_size=os.path.getsize(file_path),
            uploaded_by=current_user_id,
            department_id=department_id,
            subject_id=subject_id,
            analysis_status='pending'
        )

        db.session.add(syllabus)
        db.session.commit()

        # Start analysis asynchronously (in a real app, use Celery)
        try:
            analyzer = SyllabusAnalyzer()
            analysis_result = analyzer.analyze_syllabus(file_path)

            syllabus.analysis_status = 'completed'
            syllabus.relevance_score = analysis_result.get('relevance_score', 0.0)
            syllabus.outdated_topics = analysis_result.get('outdated_topics', [])
            syllabus.missing_skills = analysis_result.get('missing_skills', [])
            syllabus.recommendations = analysis_result.get('recommendations', [])
            syllabus.analyzed_at = db.func.now()

            db.session.commit()

        except Exception as e:
            syllabus.analysis_status = 'failed'
            db.session.commit()
            return jsonify({
                'error': 'File uploaded but analysis failed',
                'syllabus_id': syllabus.id,
                'details': str(e)
            }), 500

        return jsonify({
            'message': 'Syllabus uploaded and analyzed successfully',
            'syllabus': {
                'id': syllabus.id,
                'filename': syllabus.original_filename,
                'analysis_status': syllabus.analysis_status,
                'relevance_score': syllabus.relevance_score,
                'outdated_topics': syllabus.outdated_topics,
                'missing_skills': syllabus.missing_skills,
                'recommendations': syllabus.recommendations
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Upload failed', 'details': str(e)}), 500

@syllabus_bp.route('/list', methods=['GET'])
@jwt_required()
def list_syllabi():
    """Get list of syllabi with optional filtering"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        # Get query parameters
        department_id = request.args.get('department_id', type=int)
        subject_id = request.args.get('subject_id', type=int)
        status = request.args.get('status')  # pending, processing, completed, failed

        # Build query
        query = Syllabus.query

        if department_id:
            query = query.filter_by(department_id=department_id)
        if subject_id:
            query = query.filter_by(subject_id=subject_id)
        if status:
            query = query.filter_by(analysis_status=status)

        # Role-based filtering
        if user.role == 'student':
            # Students can only see syllabi from their department and year/semester
            query = query.filter_by(department_id=user.department_id)
            # Additional filtering based on student's year/semester would go here
        elif user.role == 'faculty':
            # Faculty can see syllabi from their department
            query = query.filter_by(department_id=user.department_id)

        syllabi = query.order_by(Syllabus.uploaded_at.desc()).all()

        result = []
        for syllabus in syllabi:
            result.append({
                'id': syllabus.id,
                'filename': syllabus.original_filename,
                'file_size': syllabus.file_size,
                'uploaded_by': syllabus.uploaded_by_user.name,
                'department': syllabus.department.name if syllabus.department else None,
                'subject': syllabus.subject.name if syllabus.subject else None,
                'analysis_status': syllabus.analysis_status,
                'relevance_score': syllabus.relevance_score,
                'uploaded_at': syllabus.uploaded_at.isoformat(),
                'analyzed_at': syllabus.analyzed_at.isoformat() if syllabus.analyzed_at else None
            })

        return jsonify({'syllabi': result}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to retrieve syllabi', 'details': str(e)}), 500

@syllabus_bp.route('/<int:syllabus_id>', methods=['GET'])
@jwt_required()
def get_syllabus(syllabus_id):
    """Get detailed syllabus information"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        syllabus = Syllabus.query.get(syllabus_id)
        if not syllabus:
            return jsonify({'error': 'Syllabus not found'}), 404

        # Check permissions
        if user.role == 'student' and syllabus.department_id != user.department_id:
            return jsonify({'error': 'Access denied'}), 403
        elif user.role == 'faculty' and syllabus.department_id != user.department_id:
            return jsonify({'error': 'Access denied'}), 403

        result = {
            'id': syllabus.id,
            'filename': syllabus.original_filename,
            'file_size': syllabus.file_size,
            'uploaded_by': syllabus.uploaded_by_user.name,
            'department': syllabus.department.name if syllabus.department else None,
            'subject': syllabus.subject.name if syllabus.subject else None,
            'analysis_status': syllabus.analysis_status,
            'relevance_score': syllabus.relevance_score,
            'outdated_topics': syllabus.outdated_topics,
            'missing_skills': syllabus.missing_skills,
            'recommendations': syllabus.recommendations,
            'uploaded_at': syllabus.uploaded_at.isoformat(),
            'analyzed_at': syllabus.analyzed_at.isoformat() if syllabus.analyzed_at else None
        }

        return jsonify({'syllabus': result}), 200

    except Exception as e:
        return jsonify({'error': 'Failed to retrieve syllabus', 'details': str(e)}), 500

@syllabus_bp.route('/<int:syllabus_id>/download', methods=['GET'])
@jwt_required()
def download_syllabus(syllabus_id):
    """Download syllabus file"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401

        syllabus = Syllabus.query.get(syllabus_id)
        if not syllabus:
            return jsonify({'error': 'Syllabus not found'}), 404

        # Check permissions
        if user.role == 'student' and syllabus.department_id != user.department_id:
            return jsonify({'error': 'Access denied'}), 403
        elif user.role == 'faculty' and syllabus.department_id != user.department_id:
            return jsonify({'error': 'Access denied'}), 403

        if not os.path.exists(syllabus.file_path):
            return jsonify({'error': 'File not found on server'}), 404

        from flask import send_file
        return send_file(syllabus.file_path, as_attachment=True, download_name=syllabus.original_filename)

    except Exception as e:
        return jsonify({'error': 'Download failed', 'details': str(e)}), 500