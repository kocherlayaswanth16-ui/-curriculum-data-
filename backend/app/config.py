import os

class Config:
    SECRET_KEY = os.environ.get('JWT_SECRET') or 'hard-to-guess-string'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///skill_engine.db'
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(',')
    
    # External API Keys
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    JSEARCH_API_KEY = os.environ.get('JSEARCH_API_KEY')
    RAPIDAPI_KEY = os.environ.get('RAPIDAPI_KEY')
    
    DEBUG = os.environ.get('DEBUG', 'True') == 'True'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}