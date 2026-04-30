from flask import Blueprint, jsonify, request
import os

recommend_bp = Blueprint('recommend', __name__)

@recommend_bp.route('/', methods=['POST', 'GET'])
def generate_roadmap():
    """
    AI Roadmap Generator.
    Returns structured JSON learning paths.
    """
    return jsonify({
        'status': 'success',
        'roadmap': [
            {'step': 1, 'title': 'Master Fundamentals', 'duration': '4 weeks', 'topics': ['JS Basics', 'DOM Manipulation']},
            {'step': 2, 'title': 'Frontend Frameworks', 'duration': '6 weeks', 'topics': ['React', 'State Management']},
            {'step': 3, 'title': 'Backend Basics', 'duration': '5 weeks', 'topics': ['Node.js', 'Express', 'APIs']},
            {'step': 4, 'title': 'Database Integration', 'duration': '3 weeks', 'topics': ['MongoDB', 'Mongoose']}
        ]
    })
