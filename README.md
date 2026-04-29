# Curriculum Relevance Analytics Engine 🎓

A comprehensive web application for analyzing college curriculum relevance, identifying skill gaps, and recommending industry-aligned updates.

## 🌟 Features

### Role-Based Access
- **Student Portal**: View personal skill gaps, learning roadmap, course relevance
- **Faculty Portal**: Manage syllabus, view analytics, update curriculum
- **HOD Portal**: Department-wide analytics, comparison, planning
- **Admin Portal**: System management, user administration, settings

### Core Functionalities

#### 📊 Dashboard Analytics
- Real-time curriculum relevance scores
- Industry skill demand visualization
- Outdated topic identification
- Missing skills analysis with recommendations
- Department-wise comparison
- Student placement prediction

#### 📤 Syllabus Upload & Analysis
- PDF/DOCX syllabus upload
- Automatic content extraction
- Relevance scoring (0-100%)
- Outdated topics detection
- Missing skill identification
- Actionable recommendations
- Export reports (PDF, Excel)

#### 👨‍🎓 Student Features
- Personal skill gap analysis
- 6-month learning roadmap
- Industry skill comparison charts
- Personalized course recommendations
- Career path suggestions
- Progress tracking

#### 👨‍🏫 Faculty Features
- Subject management (Year-wise, Semester-wise, Branch-wise)
- Syllabus upload & analysis
- Curriculum gap analytics
- Recommendation engine
- Multiple subject tracking
- Industry trend monitoring

#### 👨‍💼 HOD Features
- Department-wide analytics dashboard
- Branch-wise comparison
- Curriculum planning tools
- Skill trend analysis
- Placement readiness metrics
- Strategic recommendations
- User management (per department)

#### ⚙️ Admin Features
- Complete user management
- System configuration
- Database backup/restore
- Role management
- System health monitoring
- Analytics overview

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling with dark theme
- **Chart.js** - Data visualization
- **Vite** - Build tool

### Design Patterns
- Context API for state management
- Protected routes with role-based access control
- Reusable UI components
- Modern glass morphism design
- Responsive layout

## 📁 Project Structure

```
src/
├── components/
│   ├── NavbarEnhanced.jsx       # Navigation with role awareness
│   ├── ProtectedRoute.jsx       # Route protection wrapper
│   ├── ChartBox.jsx             # Chart component wrapper
│   ├── StatCard.jsx             # Statistics display
│   ├── FeatureCard.jsx          # Feature showcase
│   └── Footer.jsx               # Footer component
│
├── context/
│   └── AuthContext.jsx          # Authentication state
│
├── pages/
│   ├── Home.jsx                 # Landing page
│   ├── LoginEnhanced.jsx        # Role-based login
│   ├── StudentDashboard.jsx     # Student portal
│   ├── FacultyDashboard.jsx     # Faculty portal
│   ├── HODDashboard.jsx         # HOD portal
│   ├── AdminDashboard.jsx       # Admin portal
│   ├── SyllabusAnalysisPage.jsx # Syllabus analysis
│   ├── SkillsGapAnalysis.jsx    # Skills gap analysis
│   ├── Upload.jsx               # File upload
│   ├── Analytics.jsx            # Analytics page
│   ├── Dashboard.jsx            # Generic dashboard
│   ├── Login.jsx                # Basic login
│   └── NotFound.jsx             # 404 page
│
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
├── index.css                    # Global styles
```

## 🎨 UI/UX Design Features

### Modern Design Elements
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Accents**: Sky blue to cyan gradient theme
- **Responsive Layout**: Mobile-first approach
- **Dark Theme**: Comfortable for extended usage
- **Smooth Animations**: Subtle transitions and effects
- **Intuitive Navigation**: Clear role-based routing

### Color Scheme
- **Primary**: Sky Blue (#38bdf8)
- **Success**: Emerald Green (#22c55e)
- **Warning**: Amber Yellow (#f59e0b)
- **Danger**: Rose Red (#ef4444)
- **Background**: Slate 900-950

### Components Styling
- Custom button classes (`.btn-primary`, `.btn-secondary`, `.btn-outline`)
- Card styles with hover effects (`.card`, `.card-elevated`, `.card-interactive`)
- Badge components with color variants
- Progress bars with gradient fills
- Input fields with focus states

## 🔐 Authentication & Authorization

### Login System
1. Select user role (Student, Faculty, HOD, Admin)
2. Enter email and password
3. System redirects to role-specific dashboard
4. Protected routes enforce access control

### Demo Credentials
- Any email + any password works in demo mode
- Different roles show different interfaces

## 📊 Key Metrics Displayed

### Student Portal
- Overall Skill Match Percentage
- Subject Relevance Scores
- Skill Gap Analysis
- Learning Progress (6 months)
- Recommended Skills with Priority

### Faculty Portal
- Average Relevance Score
- Subject Count
- Outdated Topics Count
- Industry Gaps Count
- Topic Distribution Charts

### HOD Portal
- Department Comparison
- Skill Trend Prediction
- Student Count per Department
- Outdated Topics per Department
- Strategic Recommendations

### Admin Portal
- Total Users
- Department Count
- Active Users (6 months)
- User Role Distribution
- System Uptime

## 🎯 Syllabus Analysis Features

### Upload & Analysis
1. Upload PDF/DOCX syllabus
2. Select department/branch
3. Automatic content analysis
4. Get detailed report with:
   - Relevance score
   - Outdated topics
   - Missing skills
   - Industry gap analysis

### Output
- **Relevance Score**: Percentage match with industry standards
- **Outdated Topics**: List with recommended replacements
- **Missing Skills**: Prioritized by industry demand
- **Gap Analysis**: Detailed breakdown of missing areas
- **Recommendations**: Actionable suggestions with timeline

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview build:**
```bash
npm run preview
```

### First Time Setup
1. Navigate to http://localhost:5173
2. Click "Sign in" or go to `/login`
3. Select your role
4. Enter any credentials (demo mode)
5. Explore the role-specific dashboard

## 🌐 Deployment

### Netlify/Vercel
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

## 📈 Future Enhancements

### Backend Integration
- Real syllabus PDF parsing with ML
- Database storage (MySQL/MongoDB)
- Real-time analytics from job APIs
- User authentication with JWT
- Email notifications

### AI/ML Features
- Skill prediction using machine learning
- NLP-based syllabus analysis
- Recommendation engine refinement
- Chatbot for student queries

### Advanced Analytics
- Real-time job market data integration
- LinkedIn/Indeed skill scraping
- Placement rate prediction
- Alumni career tracking

### Additional Features
- Resume analyzer
- Interview preparation module
- Industry expert feedback integration
- Student-Faculty collaboration tools
- Mobile app

## 🛠️ Technologies Used

### Frontend Framework
- React 18 with Hooks
- React Router for navigation

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS for advanced effects
- Responsive breakpoints

### Visualization
- Chart.js with react-chartjs-2
- Custom chart components

### Build Tools
- Vite for fast development
- PostCSS for CSS processing
- ESM module support

## 📝 Navigation Guide

### Public Routes
- `/` - Home page
- `/login` - Login with role selection

### Student Routes (Protected)
- `/dashboard/student` - Student portal
- `/skills-gap` - Skill gap analysis
- `/roadmap` - Learning roadmap

### Faculty Routes (Protected)
- `/dashboard/faculty` - Faculty portal
- `/manage-subjects` - Manage courses
- `/upload-syllabus` - Upload & analyze

### HOD Routes (Protected)
- `/dashboard/hod` - HOD portal
- `/department-analytics` - Analytics
- `/curriculum-planning` - Planning tools

### Admin Routes (Protected)
- `/dashboard/admin` - Admin portal
- `/manage-users` - User management
- `/settings` - System settings

## 🎓 Use Cases

### For Students
- "What skills should I learn this semester?"
- "How does my curriculum compare to industry needs?"
- "What's my learning roadmap for the next 6 months?"

### For Faculty
- "How relevant is my syllabus?"
- "What topics are outdated?"
- "What industry skills should I include?"

### For HOD
- "Which department has the most relevant curriculum?"
- "What's our department's skill gap?"
- "What curriculum changes should we prioritize?"

### For Admin
- "How many active users do we have?"
- "What's the system health?"
- "Need to manage user roles?"

## 🔗 API Integration (Ready for Backend)

### Endpoints Structure
```
POST /api/auth/login
GET  /api/user/profile
POST /api/syllabus/upload
GET  /api/syllabus/analyze
GET  /api/skills/recommendations
GET  /api/analytics/dashboard
```

## 📄 License

This project is designed for educational institutions and is available for academic use.

---

**Built with ❤️ for college curriculum modernization**

For questions or support, contact the development team.

