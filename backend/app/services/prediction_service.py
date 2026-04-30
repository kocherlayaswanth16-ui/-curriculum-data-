from ..models import db, ObsolescenceTrend, Skill
from datetime import datetime
import random

class PredictionService:
    @staticmethod
    def update_trends():
        """Update skill obsolescence trends based on market data"""
        # In a real app, this would involve complex ML or data processing
        # For now, we simulate trend updates
        skills = Skill.query.all()
        for skill in skills:
            trend = ObsolescenceTrend.query.filter_by(skill_name=skill.name).first()
            if not trend:
                trend = ObsolescenceTrend(skill_name=skill.name)
                db.session.add(trend)
            
            # Simulate trend analysis
            trend.current_relevance = skill.industry_demand
            
            # Simplified prediction logic
            if skill.category in ['AI', 'Cloud', 'Data Science']:
                trend.predicted_relevance_1yr = min(trend.current_relevance + random.uniform(5, 10), 100)
                trend.status = 'rising'
            elif skill.category in ['Legacy']:
                trend.predicted_relevance_1yr = max(trend.current_relevance - random.uniform(10, 20), 0)
                trend.status = 'declining'
            else:
                trend.predicted_relevance_1yr = trend.current_relevance + random.uniform(-5, 5)
                trend.status = 'stable'
                
            trend.predicted_relevance_2yr = trend.predicted_relevance_1yr + random.uniform(-10, 10)
            trend.last_updated = datetime.utcnow()
            
        db.session.commit()

    @staticmethod
    def get_obsolescence_report():
        """Get skills that are predicted to become obsolete"""
        declining = ObsolescenceTrend.query.filter(ObsolescenceTrend.status == 'declining').all()
        rising = ObsolescenceTrend.query.filter(ObsolescenceTrend.status == 'rising').all()
        
        return {
            'declining': [
                {
                    'skill': t.skill_name, 
                    'current': t.current_relevance, 
                    'predicted_1yr': t.predicted_relevance_1yr,
                    'replacement': t.replacement_suggestion
                } for t in declining
            ],
            'rising': [
                {
                    'skill': t.skill_name, 
                    'current': t.current_relevance, 
                    'predicted_1yr': t.predicted_relevance_1yr
                } for t in rising
            ]
        }
