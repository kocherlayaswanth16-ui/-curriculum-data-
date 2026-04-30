from ..models import db, UserStats, LearningActivity
from datetime import datetime, date

class GamificationService:
    POINTS_CONFIG = {
        'syllabus_upload': 50,
        'quiz_completion': 30,
        'daily_login': 10,
        'skill_gap_bridge': 100
    }

    @staticmethod
    def award_points(user_id, activity_type, score=None):
        """Award points to a user for a specific activity"""
        stats = UserStats.query.filter_by(user_id=user_id).first()
        if not stats:
            stats = UserStats(user_id=user_id, points=0, level=1, streak_count=0, badges=[], achievements=[])
            db.session.add(stats)

        points_to_add = GamificationService.POINTS_CONFIG.get(activity_type, 10)
        if score:
            # Bonus points for high scores
            points_to_add += int(score / 10)

        stats.points += points_to_add
        
        # Level up logic (every 500 points)
        new_level = (stats.points // 500) + 1
        if new_level > stats.level:
            stats.level = new_level
            # Logic for level-up notification or badge can go here

        # Record activity
        activity = LearningActivity(
            user_id=user_id,
            activity_type=activity_type,
            score=score
        )
        db.session.add(activity)
        
        db.session.commit()
        return stats

    @staticmethod
    def update_streak(user_id):
        """Update daily login streak"""
        stats = UserStats.query.filter_by(user_id=user_id).first()
        if not stats:
            return None

        today = date.today()
        if stats.last_activity_date == today:
            return stats # Already updated today

        if stats.last_activity_date:
            delta = (today - stats.last_activity_date).days
            if delta == 1:
                stats.streak_count += 1
            else:
                stats.streak_count = 1
        else:
            stats.streak_count = 1

        stats.last_activity_date = today
        db.session.commit()
        return stats

    @staticmethod
    def check_badges(user_id):
        """Check and award new badges based on user stats"""
        stats = UserStats.query.filter_by(user_id=user_id).first()
        if not stats: return []

        new_badges = []
        current_badges = stats.badges or []

        # Example Badge: Starter
        if stats.points >= 100 and 'starter' not in current_badges:
            new_badges.append('starter')
            
        # Example Badge: Consistent Learner
        if stats.streak_count >= 5 and 'consistent_learner' not in current_badges:
            new_badges.append('consistent_learner')

        if new_badges:
            stats.badges = current_badges + new_badges
            db.session.commit()
            
        return new_badges
