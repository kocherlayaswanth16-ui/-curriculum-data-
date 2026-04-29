import re
from email_validator import validate_email as validate_email_lib, EmailNotValidError

def validate_email(email):
    """Validate email format and deliverability"""
    try:
        validate_email_lib(email, check_deliverability=False)
        return True
    except EmailNotValidError:
        return False

def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False

    # Check for at least one uppercase, one lowercase, one digit
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'\d', password):
        return False

    return True

def clean_text(text):
    """Clean and normalize text input"""
    if not text:
        return ""

    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text.strip())

    # Remove potentially harmful characters
    text = re.sub(r'[<>]', '', text)

    return text

def format_file_size(size_bytes):
    """Format file size in human readable format"""
    if size_bytes == 0:
        return "0 B"

    size_names = ["B", "KB", "MB", "GB", "TB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1

    return ".1f"

def calculate_percentage(part, total):
    """Calculate percentage safely"""
    if total == 0:
        return 0.0
    return round((part / total) * 100, 2)

def safe_divide(numerator, denominator, default=0.0):
    """Safe division that returns default value if denominator is zero"""
    try:
        return numerator / denominator if denominator != 0 else default
    except (ZeroDivisionError, TypeError):
        return default

def paginate_query(query, page, per_page=20, max_per_page=100):
    """Paginate SQLAlchemy query"""
    page = max(1, page)
    per_page = min(per_page, max_per_page)

    items = query.limit(per_page).offset((page - 1) * per_page).all()
    total = query.count()

    return {
        'items': items,
        'page': page,
        'per_page': per_page,
        'total': total,
        'pages': (total + per_page - 1) // per_page,
        'has_next': page * per_page < total,
        'has_prev': page > 1
    }

def generate_secure_token(length=32):
    """Generate a secure random token"""
    import secrets
    import string

    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def hash_string(text):
    """Generate a hash for a string (for caching, etc.)"""
    import hashlib
    return hashlib.sha256(text.encode()).hexdigest()

def truncate_text(text, max_length=100, suffix="..."):
    """Truncate text to specified length"""
    if not text or len(text) <= max_length:
        return text

    return text[:max_length - len(suffix)] + suffix

def is_valid_role(role):
    """Check if role is valid"""
    valid_roles = ['student', 'faculty', 'hod', 'admin']
    return role in valid_roles

def get_role_hierarchy():
    """Get role hierarchy for permission checking"""
    return {
        'student': 1,
        'faculty': 2,
        'hod': 3,
        'admin': 4
    }

def has_permission(user_role, required_role):
    """Check if user role has permission for required role"""
    hierarchy = get_role_hierarchy()
    return hierarchy.get(user_role, 0) >= hierarchy.get(required_role, 999)

def format_datetime(dt, format_string="%Y-%m-%d %H:%M:%S"):
    """Format datetime object"""
    if not dt:
        return None
    return dt.strftime(format_string)

def parse_datetime(date_string, format_string="%Y-%m-%d %H:%M:%S"):
    """Parse datetime from string"""
    from datetime import datetime
    try:
        return datetime.strptime(date_string, format_string)
    except (ValueError, TypeError):
        return None

def validate_year(year):
    """Validate academic year"""
    current_year = datetime.now().year
    return isinstance(year, int) and 2000 <= year <= current_year + 10

def validate_semester(semester):
    """Validate semester"""
    return isinstance(semester, int) and 1 <= semester <= 2

def get_academic_year():
    """Get current academic year"""
    from datetime import datetime
    now = datetime.now()
    year = now.year
    # Academic year starts in July
    if now.month < 7:
        year -= 1
    return year