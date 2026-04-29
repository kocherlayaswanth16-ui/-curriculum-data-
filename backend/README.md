# Curriculum Analytics Backend

A Flask-based REST API for the College Curriculum Management and Analytics System.

## Features

- **Role-based Authentication**: Support for Student, Faculty, HOD, and Admin roles
- **Syllabus Management**: Upload, analyze, and manage curriculum documents
- **Analytics Dashboard**: Comprehensive analytics for different user roles
- **ML-powered Analysis**: Automated syllabus analysis using NLP and machine learning
- **File Processing**: Support for PDF and DOCX syllabus documents
- **Skill Gap Analysis**: Track and analyze student/faculty skill development

## Tech Stack

- **Framework**: Flask 2.3.3
- **Database**: MySQL with SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)
- **ML/NLP**: scikit-learn, NLTK
- **File Processing**: PyPDF2, python-docx
- **Data Analysis**: pandas, numpy

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `.env` file and update the values
   - Configure database connection
   - Set secret keys

5. **Set up the database:**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE curriculum_analytics;
   ```

6. **Run database migrations:**
   ```bash
   flask db upgrade
   ```

7. **Run the application:**
   ```bash
   python run.py
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/register` - Register new user (admin/HOD only)

### Syllabus Management
- `POST /api/syllabus/upload` - Upload syllabus file
- `GET /api/syllabus/list` - List syllabi
- `GET /api/syllabus/<id>` - Get syllabus details
- `GET /api/syllabus/<id>/download` - Download syllabus file

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/reports/syllabus-analysis` - Get syllabus analysis report
- `GET /api/analytics/skills/gap-analysis` - Get skill gap analysis

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/list` - List users (admin/HOD)
- `GET /api/users/<id>` - Get user details
- `PUT /api/users/<id>` - Update user (admin/HOD)
- `DELETE /api/users/<id>` - Deactivate user (admin)
- `GET /api/users/skills` - Get user skills
- `POST /api/users/skills` - Add user skill
- `PUT /api/users/skills/<id>` - Update user skill
- `DELETE /api/users/skills/<id>` - Remove user skill

## Database Schema

### Core Tables
- **users**: User accounts with role-based access
- **departments**: Academic departments
- **subjects**: Course subjects with metadata
- **syllabi**: Uploaded syllabus documents
- **topics**: Individual topics within subjects
- **skills**: Industry skills database
- **user_skills**: User skill proficiency tracking
- **analytics**: Analytics data storage

## ML Analysis Features

### Syllabus Analysis
- **Relevance Scoring**: Compare syllabus content against industry standards
- **Outdated Topic Detection**: Identify obsolete technologies and concepts
- **Missing Skills Identification**: Recommend important missing skills
- **Automated Recommendations**: Generate actionable improvement suggestions

### Skill Gap Analysis
- **Proficiency Tracking**: Monitor skill development over time
- **Gap Calculation**: Compare current vs target skill levels
- **Priority-based Recommendations**: Focus on high-impact skill development

## Security Features

- JWT-based authentication
- Password hashing with Werkzeug
- Role-based access control
- File upload validation
- CORS protection
- Input sanitization

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
flake8 .
```

### Database Migrations
```bash
flask db migrate -m "Migration message"
flask db upgrade
```

## Deployment

### Production Setup
1. Set `FLASK_ENV=production` in environment
2. Use a production WSGI server (gunicorn, uwsgi)
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure database connection pooling
6. Set up monitoring and logging

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request

## License

This project is licensed under the MIT License.