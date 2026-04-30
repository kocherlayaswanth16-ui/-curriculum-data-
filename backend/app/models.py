from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.Enum('student', 'faculty', 'hod', 'admin'), nullable=False)
    department = db.Column(db.String(100))
    year = db.Column(db.Integer)  # For students
    semester = db.Column(db.Integer)  # For students
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    syllabi = db.relationship('Syllabus', backref='uploaded_by_user', lazy=True)
    subjects = db.relationship('Subject', backref='faculty_user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'department': self.department,
            'year': self.year,
            'semester': self.semester,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat()
        }

class Department(db.Model):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    code = db.Column(db.String(10), unique=True, nullable=False)
    hod_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    hod = db.relationship('User', backref='department_hod', uselist=False)
    subjects = db.relationship('Subject', backref='department', lazy=True)

class Subject(db.Model):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    faculty_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)  # 1, 2, 3, 4
    semester = db.Column(db.Integer, nullable=False)  # 1, 2
    credits = db.Column(db.Integer, default=4)
    syllabus_file = db.Column(db.String(500))  # File path
    relevance_score = db.Column(db.Float, default=0.0)
    outdated_topics_count = db.Column(db.Integer, default=0)
    missing_skills_count = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    modules = db.relationship('Module', backref='subject', lazy=True, cascade='all, delete-orphan')

class Module(db.Model):
    __tablename__ = 'modules'

    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    order = db.Column(db.Integer)  # To maintain sequence (Unit 1, Unit 2, etc.)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    topics = db.relationship('Topic', backref='module', lazy=True, cascade='all, delete-orphan')
    skills = db.relationship('Skill', secondary='module_skill_mapping', backref='modules')

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=False)
    name = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text)
    relevance_score = db.Column(db.Float, default=0.0)
    is_outdated = db.Column(db.Boolean, default=False)
    replacement_suggestion = db.Column(db.Text)
    industry_demand = db.Column(db.Float, default=0.0)  # 0-100 scale
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ModuleSkillMapping(db.Model):
    __tablename__ = 'module_skill_mapping'

    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), primary_key=True)
    industry_tag = db.Column(db.String(100))  # e.g., 'AI', 'Web Dev'
    relevance_weight = db.Column(db.Float, default=1.0)

class Syllabus(db.Model):
    __tablename__ = 'syllabi'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(300), nullable=False)
    original_filename = db.Column(db.String(300), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.Integer)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    analysis_status = db.Column(db.Enum('pending', 'processing', 'completed', 'failed'), default='pending')
    relevance_score = db.Column(db.Float, default=0.0)
    outdated_topics = db.Column(db.JSON)  # List of outdated topics
    missing_skills = db.Column(db.JSON)   # List of missing skills
    recommendations = db.Column(db.JSON)  # Analysis recommendations
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    analyzed_at = db.Column(db.DateTime)

class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    category = db.Column(db.String(100))  # Programming, Cloud, AI, etc.
    industry_demand = db.Column(db.Float, default=0.0)  # 0-100 scale
    growth_rate = db.Column(db.Float, default=0.0)     # Annual growth %
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserSkill(db.Model):
    __tablename__ = 'user_skills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)
    proficiency_level = db.Column(db.Float, default=0.0)  # 0-100 scale
    target_level = db.Column(db.Float, default=0.0)       # Target proficiency
    priority = db.Column(db.Enum('low', 'medium', 'high'), default='medium')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='user_skills')
    skill = db.relationship('Skill', backref='user_skills')

class Analytics(db.Model):
    __tablename__ = 'analytics'

    id = db.Column(db.Integer, primary_key=True)
    metric_type = db.Column(db.String(100), nullable=False)  # user_count, syllabus_uploads, etc.
    metric_value = db.Column(db.Float, nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))
    date_recorded = db.Column(db.Date, default=datetime.utcnow().date)
    extra_data = db.Column(db.JSON)  # Additional data

    # Relationships
    department = db.relationship('Department', backref='analytics')

class UserStats(db.Model):
    __tablename__ = 'user_stats'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    points = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak_count = db.Column(db.Integer, default=0)
    last_activity_date = db.Column(db.Date)
    badges = db.Column(db.JSON)  # List of badge names/IDs
    achievements = db.Column(db.JSON)  # Detailed achievements list
    
    # Relationships
    user = db.relationship('User', backref=db.backref('stats', uselist=False))

class Mentorship(db.Model):
    __tablename__ = 'mentorships'

    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mentee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Enum('pending', 'active', 'completed', 'rejected'), default='pending')
    focus_area = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    mentor = db.relationship('User', foreign_keys=[mentor_id], backref='mentorships_as_mentor')
    mentee = db.relationship('User', foreign_keys=[mentee_id], backref='mentorships_as_mentee')

class ObsolescenceTrend(db.Model):
    __tablename__ = 'obsolescence_trends'

    id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(200), nullable=False)
    current_relevance = db.Column(db.Float)  # 0-100
    predicted_relevance_1yr = db.Column(db.Float)
    predicted_relevance_2yr = db.Column(db.Float)
    status = db.Column(db.Enum('rising', 'stable', 'declining', 'obsolete'), default='stable')
    replacement_suggestion = db.Column(db.String(200))
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

class LearningActivity(db.Model):
    __tablename__ = 'learning_activities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    activity_type = db.Column(db.String(100))  # quiz, course_complete, syllabus_upload
    score = db.Column(db.Float)
    difficulty = db.Column(db.Enum('beginner', 'intermediate', 'advanced'))
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

class SystemEvent(db.Model):
    __tablename__ = 'system_events'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)  # info, warning, error, success
    category = db.Column(db.String(100))  # security, academic, system, user
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='system_events')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'category': self.category,
            'message': self.message,
            'user_id': self.user_id,
            'user_name': self.user.name if self.user else 'System',
            'created_at': self.created_at.isoformat()
        }

class SystemSetting(db.Model):
    __tablename__ = 'system_settings'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.JSON, nullable=False)
    category = db.Column(db.String(100))  # security, UI, api, academic
    description = db.Column(db.String(300))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'key': self.key,
            'value': self.value,
            'category': self.category,
            'description': self.description,
            'updated_at': self.updated_at.isoformat()
        }