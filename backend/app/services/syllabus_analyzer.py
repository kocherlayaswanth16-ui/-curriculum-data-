import re
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from datetime import datetime

# Download required NLTK data (this would be done during setup)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class SyllabusAnalyzer:
    def __init__(self):
        # Industry skills database (in a real app, this would be in a database)
        self.industry_skills = {
            'programming': [
                'python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'go', 'rust',
                'html', 'css', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql',
                'react', 'angular', 'vue', 'node.js', 'django', 'flask', 'spring',
                'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp'
            ],
            'data_science': [
                'machine learning', 'deep learning', 'neural networks', 'tensorflow',
                'pytorch', 'pandas', 'numpy', 'scikit-learn', 'jupyter', 'matplotlib',
                'statistics', 'probability', 'data mining', 'big data', 'hadoop',
                'spark', 'tableau', 'power bi'
            ],
            'cybersecurity': [
                'encryption', 'firewall', 'penetration testing', 'ethical hacking',
                'network security', 'cryptography', 'blockchain', 'cyber threats'
            ],
            'cloud_computing': [
                'cloud architecture', 'microservices', 'serverless', 'devops',
                'ci/cd', 'infrastructure as code', 'monitoring', 'scalability'
            ],
            'soft_skills': [
                'communication', 'teamwork', 'problem solving', 'critical thinking',
                'project management', 'agile', 'scrum', 'leadership'
            ]
        }

        # Outdated technologies (based on current industry standards)
        self.outdated_technologies = [
            'cobol', 'fortran', 'pascal', 'visual basic 6', 'delphi',
            'frontpage', 'dreamweaver', 'flash', 'silverlight',
            'windows xp', 'windows vista', 'windows 7', 'ie6', 'ie7', 'ie8',
            'jquery mobile', 'phonegap', 'cordova', 'appcelerator'
        ]

        # Initialize TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=1000,
            ngram_range=(1, 2)
        )

    def analyze_syllabus(self, file_path):
        """Main analysis function"""
        try:
            # Extract text from file
            from .file_handler import FileHandler
            text = FileHandler.extract_text_from_file(file_path)

            if not text:
                raise Exception("No text content found in file")

            # Preprocess text
            processed_text = self._preprocess_text(text)

            # Analyze content
            relevance_score = self._calculate_relevance_score(processed_text)
            outdated_topics = self._identify_outdated_topics(processed_text)
            missing_skills = self._identify_missing_skills(processed_text)
            recommendations = self._generate_recommendations(
                relevance_score, outdated_topics, missing_skills
            )

            return {
                'relevance_score': relevance_score,
                'outdated_topics': outdated_topics,
                'missing_skills': missing_skills,
                'recommendations': recommendations,
                'word_count': len(processed_text.split()),
                'analyzed_at': datetime.utcnow().isoformat()
            }

        except Exception as e:
            raise Exception(f"Syllabus analysis failed: {str(e)}")

    def _preprocess_text(self, text):
        """Clean and preprocess text"""
        # Convert to lowercase
        text = text.lower()

        # Remove special characters and numbers
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\d+', '', text)

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        # Tokenize and remove stopwords
        stop_words = set(stopwords.words('english'))
        words = word_tokenize(text)
        filtered_words = [word for word in words if word not in stop_words and len(word) > 2]

        return ' '.join(filtered_words)

    def _calculate_relevance_score(self, text):
        """Calculate how relevant the syllabus is to current industry needs"""
        words = text.split()
        total_words = len(words)

        if total_words == 0:
            return 0.0

        # Count industry-relevant terms
        relevant_count = 0
        all_industry_skills = []
        for category in self.industry_skills.values():
            all_industry_skills.extend(category)

        for skill in all_industry_skills:
            skill_words = skill.lower().split()
            if len(skill_words) == 1:
                relevant_count += words.count(skill)
            else:
                # For multi-word skills, check if all words appear
                skill_present = all(word in words for word in skill_words)
                if skill_present:
                    relevant_count += len(skill_words)

        # Calculate relevance score (0-100)
        relevance_ratio = min(relevant_count / total_words, 1.0)
        return round(relevance_ratio * 100, 2)

    def _identify_outdated_topics(self, text):
        """Identify potentially outdated topics"""
        words = text.split()
        outdated_found = []

        for tech in self.outdated_technologies:
            tech_words = tech.lower().split()
            if len(tech_words) == 1:
                if tech in words:
                    outdated_found.append({
                        'topic': tech,
                        'reason': 'Technology is outdated or obsolete',
                        'replacement': self._suggest_replacement(tech)
                    })
            else:
                if all(word in words for word in tech_words):
                    outdated_found.append({
                        'topic': tech,
                        'reason': 'Technology stack is outdated',
                        'replacement': self._suggest_replacement(tech)
                    })

        return outdated_found

    def _identify_missing_skills(self, text):
        """Identify important industry skills missing from syllabus"""
        words = text.lower().split()
        missing_skills = []

        # Check for missing skills in each category
        for category, skills in self.industry_skills.items():
            category_missing = []
            for skill in skills:
                skill_words = skill.lower().split()
                if not all(word in words for word in skill_words):
                    category_missing.append(skill)

            # Take top missing skills from each category (limit to 3 per category)
            if category_missing:
                missing_skills.extend([{
                    'skill': skill,
                    'category': category,
                    'importance': self._calculate_skill_importance(skill, category)
                } for skill in category_missing[:3]])

        # Sort by importance
        missing_skills.sort(key=lambda x: x['importance'], reverse=True)

        return missing_skills[:10]  # Return top 10 missing skills

    def _calculate_skill_importance(self, skill, category):
        """Calculate importance score for a skill (0-100)"""
        # This is a simplified scoring system
        base_scores = {
            'programming': 80,
            'data_science': 85,
            'cybersecurity': 75,
            'cloud_computing': 90,
            'soft_skills': 70
        }

        base_score = base_scores.get(category, 50)

        # Adjust based on specific skills
        high_demand_skills = ['python', 'javascript', 'aws', 'docker', 'kubernetes', 'machine learning']
        if any(s in skill.lower() for s in high_demand_skills):
            base_score += 15

        return min(base_score, 100)

    def _suggest_replacement(self, outdated_tech):
        """Suggest modern replacement for outdated technology"""
        replacements = {
            'cobol': 'Python, Java, or C#',
            'fortran': 'Python with NumPy/SciPy',
            'pascal': 'Python or Java',
            'visual basic 6': 'C# with .NET',
            'delphi': 'C# or Java',
            'frontpage': 'Modern HTML/CSS/JavaScript frameworks',
            'dreamweaver': 'VS Code or modern IDEs',
            'flash': 'HTML5, CSS3, JavaScript',
            'silverlight': 'HTML5, WebAssembly',
            'windows xp': 'Modern Windows versions or cross-platform solutions',
            'ie6': 'Modern browsers (Chrome, Firefox, Edge)',
            'jquery mobile': 'Progressive Web Apps, React Native',
            'phonegap': 'React Native, Flutter, or Capacitor'
        }

        return replacements.get(outdated_tech.lower(), 'Modern equivalent technologies')

    def _generate_recommendations(self, relevance_score, outdated_topics, missing_skills):
        """Generate actionable recommendations"""
        recommendations = []

        # Relevance-based recommendations
        if relevance_score < 30:
            recommendations.append({
                'type': 'critical',
                'title': 'Major syllabus overhaul needed',
                'description': 'The syllabus has very low relevance to current industry needs. Consider comprehensive revision.',
                'priority': 'high'
            })
        elif relevance_score < 60:
            recommendations.append({
                'type': 'improvement',
                'title': 'Update core technologies',
                'description': 'Add modern programming languages, frameworks, and tools to improve industry relevance.',
                'priority': 'medium'
            })

        # Outdated topics recommendations
        if outdated_topics:
            recommendations.append({
                'type': 'update',
                'title': f'Replace {len(outdated_topics)} outdated topics',
                'description': f'Update or replace the following technologies: {", ".join([t["topic"] for t in outdated_topics[:3]])}',
                'priority': 'high' if len(outdated_topics) > 3 else 'medium'
            })

        # Missing skills recommendations
        if missing_skills:
            top_missing = missing_skills[:5]
            recommendations.append({
                'type': 'addition',
                'title': f'Add {len(top_missing)} high-priority skills',
                'description': f'Include modules on: {", ".join([s["skill"] for s in top_missing])}',
                'priority': 'medium'
            })

        # General recommendations
        recommendations.extend([
            {
                'type': 'structure',
                'title': 'Include practical projects',
                'description': 'Add hands-on projects, case studies, and industry-relevant assignments.',
                'priority': 'medium'
            },
            {
                'type': 'assessment',
                'title': 'Modern assessment methods',
                'description': 'Include continuous assessment, peer reviews, and industry-standard evaluation methods.',
                'priority': 'low'
            }
        ])

        return recommendations