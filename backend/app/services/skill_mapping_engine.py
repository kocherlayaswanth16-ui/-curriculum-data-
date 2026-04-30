import random
from flask import current_app
from ..models import db, Subject, Module, Topic, Skill, ModuleSkillMapping

class SkillMappingEngine:
    @staticmethod
    def map_curriculum_to_skills(subject_id):
        """
        Connects curriculum topics → industry skills → job roles.
        """
        subject = Subject.query.get(subject_id)
        if not subject:
            return None

        analysis = {
            'subject_name': subject.name,
            'total_relevance': 0,
            'skills_extracted': [],
            'job_roles_predicted': [],
            'recommendations': []
        }

        # Mock Mapping Logic (In production, use NLP/LLM to extract)
        # Curriculum Topic -> Skill Output
        mapping_dictionary = {
            'DBMS': ['SQL', 'Database Design', 'NoSQL', 'ACID Properties'],
            'OS': ['System Design', 'Linux Architecture', 'Process Scheduling', 'Bash Scripting'],
            'AI': ['Machine Learning', 'Python', 'Neural Networks', 'Probability'],
            'Cloud Computing': ['AWS', 'Docker', 'Kubernetes', 'Serverless'],
            'Data Structures': ['Algorithm Optimization', 'Memory Management', 'Big O Analysis'],
            'Software Engineering': ['Agile / Scrum', 'SDLC', 'Design Patterns', 'Unit Testing']
        }

        roles_dictionary = {
            'Machine Learning': ['AI Engineer', 'Data Scientist', 'MLOps Engineer'],
            'SQL': ['Database Administrator', 'Backend Developer', 'Data Analyst'],
            'AWS': ['Cloud Solutions Architect', 'DevOps Engineer', 'Site Reliability Engineer'],
            'System Design': ['Software Architect', 'Backend Engineer', 'Systems Programmer']
        }

        extracted_skills = set()
        for module in subject.modules:
            for topic in module.topics:
                # Basic keyword matching for mock engine
                for key, skills in mapping_dictionary.items():
                    if key.lower() in topic.name.lower() or key.lower() in subject.name.lower():
                        extracted_skills.update(skills)

        analysis['skills_extracted'] = list(extracted_skills)
        
        # Predict Job Roles
        predicted_roles = set()
        for skill in analysis['skills_extracted']:
            for key, roles in roles_dictionary.items():
                if key.lower() in skill.lower():
                    predicted_roles.update(roles)
        
        analysis['job_roles_predicted'] = list(predicted_roles)
        
        # Calculate Relevance based on Industry Demand (Mock)
        analysis['total_relevance'] = random.randint(65, 85)
        
        if analysis['total_relevance'] < 75:
            analysis['recommendations'].append({
                'type': 'Update',
                'module': 'Module 4 (Current Trends)',
                'suggestion': 'Integrate Cloud Computing and DevOps basics to improve relevance.'
            })

        return analysis

    @staticmethod
    def generate_updated_curriculum(subject_id, industry_trends):
        """
        AI-driven curriculum optimization suggestions.
        """
        # Compares syllabus vs job market needs
        # Suggests topics to add/remove
        pass
