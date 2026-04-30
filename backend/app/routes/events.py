from flask import Blueprint, request, jsonify
from ..models import db, SystemEvent
from flask_jwt_extended import jwt_required, get_jwt_identity

events_bp = Blueprint('events', __name__)

@events_bp.route('/', methods=['GET'])
def get_events():
    category = request.args.get('category')
    event_type = request.args.get('type')
    
    query = SystemEvent.query
    if category:
        query = query.filter_by(category=category)
    if event_type:
        query = query.filter_by(type=event_type)
        
    events = query.order_by(SystemEvent.created_at.desc()).limit(50).all()
    return jsonify([e.to_dict() for e in events])

@events_bp.route('/', methods=['POST'])
@jwt_required()
def create_event():
    data = request.json
    new_event = SystemEvent(
        type=data.get('type', 'info'),
        category=data.get('category', 'system'),
        message=data.get('message'),
        user_id=data.get('user_id')
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201
