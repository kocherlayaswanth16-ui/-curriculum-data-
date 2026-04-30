import requests
import json
import random
from datetime import datetime
from flask import current_app

class MarketIntelligenceService:
    @staticmethod
    def get_trending_skills():
        api_key = current_app.config.get('RAPIDAPI_KEY')
        # Logic to use api_key for real fetching...
        # Mocking the API response for now
        categories = {
            'High Growth': ['Generative AI', 'Rust', 'Cloud Native', 'Cybersecurity Engineering'],
            'Stable': ['Python', 'React', 'Java', 'SQL', 'AWS'],
            'Declining': ['PHP (Legacy)', 'jQuery', 'Manual Testing', 'On-premise Server Mgt']
        }
        
        trends = []
        for category, skills in categories.items():
            for skill in skills:
                demand_score = random.randint(80, 99) if category == 'High Growth' else \
                               random.randint(60, 80) if category == 'Stable' else \
                               random.randint(10, 40)
                
                trends.append({
                    'skill': skill,
                    'category': category,
                    'demand_score': demand_score,
                    'growth_rate': random.uniform(5, 15) if category == 'High Growth' else random.uniform(-5, 5),
                    'last_updated': datetime.utcnow().isoformat()
                })
        
        return sorted(trends, key=lambda x: x['demand_score'], reverse=True)

    @staticmethod
    def fetch_live_jobs(query=None):
        """
        Simulates fetching live job postings.
        """
        mock_jobs = [
            {'company': 'Google', 'role': 'AI Research Engineer', 'location': 'Remote/Bangalore', 'salary': '35-50 LPA'},
            {'company': 'Microsoft', 'role': 'Cloud Solutions Architect', 'location': 'Hyderabad', 'salary': '40-60 LPA'},
            {'company': 'Amazon', 'role': 'SDE II (Cloud Native)', 'location': 'Pune', 'salary': '30-45 LPA'},
            {'company': 'Zomato', 'role': 'Full Stack Developer (Next.js)', 'location': 'Gurgaon', 'salary': '25-40 LPA'},
            {'company': 'Tesla', 'role': 'Autonomous Systems Engineer', 'location': 'Remote', 'salary': '60-80 LPA'}
        ]
        
        if query:
            return [j for j in mock_jobs if query.lower() in j['role'].lower() or query.lower() in j['company'].lower()]
        
        return mock_jobs
