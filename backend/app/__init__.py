from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import config
from .models import db

def create_app(config_name='default'):
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config[config_name])

    # Initialize extensions
    CORS(app, origins=app.config['CORS_ORIGINS'])
    JWTManager(app)
    db.init_app(app)

    # Create upload directory if it doesn't exist
    import os
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Register blueprints
    from .routes.auth import auth_bp
    from .routes.syllabus import syllabus_bp
    from .routes.analytics import analytics_bp
    from .routes.users import users_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(syllabus_bp, url_prefix='/api/syllabus')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(users_bp, url_prefix='/api/users')

    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Backend is running'}

    return app