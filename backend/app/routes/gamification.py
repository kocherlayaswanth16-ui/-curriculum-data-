from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import UserStats
from ..services.gamification_service import GamificationService

gamification_bp = Blueprint('gamification', __name__)

@gamification_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    user_id = get_jwt_identity()
    stats = UserStats.query.filter_by(user_id=user_id).first()
    
    if not stats:
        # Initialize stats if not present
        stats = GamificationService.award_points(user_id, 'daily_login')
    
    # Update streak
    GamificationService.update_streak(user_id)
    
    # Check for new badges
    new_badges = GamificationService.check_badges(user_id)
    
    return jsonify({
        'points': stats.points,
        'level': stats.level,
        'streak': stats.streak_count,
        'badges': stats.badges,
        'new_badges_awarded': new_badges
    })

@gamification_bp.route('/leaderboard', methods=['GET'])
@jwt_required()
def get_leaderboard():
    # Get top 10 users by points
    top_stats = UserStats.query.order_by(UserStats.points.desc()).limit(10).all()
    
    leaderboard = []
    for stat in top_stats:
        leaderboard.append({
            'name': stat.user.name,
            'points': stat.points,
            'level': stat.level,
            'department': stat.user.department
        })
        
    return jsonify(leaderboard)
