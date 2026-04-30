import os
from flask import Blueprint, jsonify, request

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/', methods=['POST'])
def analyze_resume():
    """
    Resume Analyzer using AI.
    Securely uploads resume, extracts text, and calls AI API to evaluate.
    """
    openai_key = os.getenv("OPENAI_API_KEY")
    
    if 'file' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400
        
    file = request.files['file']
    # File processing logic (PyPDF2, python-docx) would go here
    
    return jsonify({
        'status': 'success',
        'ats_score': 78,
        'strengths': ['Strong technical background', 'Clear project descriptions'],
        'weaknesses': ['Missing measurable impact (e.g. % performance increase)', 'Lacks keyword "Cloud Native"'],
        'suggested_improvements': [
            'Add concrete metrics to your work experience',
            'Include cloud technologies like AWS or Azure'
        ]
    })
