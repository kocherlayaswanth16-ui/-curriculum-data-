from flask import Blueprint, jsonify, request
from datetime import datetime
from ..services.market_intelligence_service import MarketIntelligenceService

market_bp = Blueprint('market', __name__)

@market_bp.route('/trends', methods=['GET'])
def get_trends():
    trends = MarketIntelligenceService.get_trending_skills()
    return jsonify(trends)

@market_bp.route('/jobs', methods=['GET'])
def get_jobs():
    query = request.args.get('q')
    jobs = MarketIntelligenceService.fetch_live_jobs(query)
    return jsonify(jobs)

@market_bp.route('/analytics', methods=['GET'])
def get_market_analytics():
    # Consolidated analytics for dashboards
    trends = MarketIntelligenceService.get_trending_skills()
    rising = [t for t in trends if t['category'] == 'High Growth']
    declining = [t for t in trends if t['category'] == 'Declining']
    
    return jsonify({
        'rising_skills': rising[:5],
        'declining_skills': declining[:5],
        'market_sentiment': 'Highly Bullish on AI/Cloud',
        'update_timestamp': datetime.utcnow().isoformat()
    })
