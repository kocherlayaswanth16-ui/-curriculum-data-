from flask import Blueprint, request, jsonify
from ..models import db, SystemSetting
from flask_jwt_extended import jwt_required

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/', methods=['GET'])
def get_settings():
    category = request.args.get('category')
    query = SystemSetting.query
    if category:
        query = query.filter_by(category=category)
    
    settings = query.all()
    return jsonify({s.key: s.to_dict() for s in settings})

@settings_bp.route('/', methods=['POST', 'PUT'])
@jwt_required()
def update_setting():
    data = request.json
    key = data.get('key')
    if not key:
        return jsonify({'error': 'Key is required'}), 400
        
    setting = SystemSetting.query.filter_by(key=key).first()
    if not setting:
        setting = SystemSetting(key=key)
        db.session.add(setting)
        
    setting.value = data.get('value')
    setting.category = data.get('category', setting.category)
    setting.description = data.get('description', setting.description)
    
    db.session.commit()
    return jsonify(setting.to_dict())
