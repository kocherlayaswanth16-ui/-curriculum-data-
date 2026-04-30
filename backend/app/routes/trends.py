from flask import Blueprint, jsonify
from datetime import datetime
from ..services.market_intelligence_service import MarketIntelligenceService

trends_bp = Blueprint('trends', __name__)

@trends_bp.route('/', methods=['GET'])
def get_market_trends():
    """
    Market Trends Data. (Scraped or via API)
    """
    # Using existing logic from MarketIntelligenceService
    trends = MarketIntelligenceService.get_trending_skills()
    rising = [t for t in trends if t['category'] == 'High Growth']
    
    return jsonify({
        'top_trending_skills': rising[:5],
        'sentiment': 'Highly Bullish on AI/Cloud',
        'timestamp': datetime.utcnow().isoformat()
    })
