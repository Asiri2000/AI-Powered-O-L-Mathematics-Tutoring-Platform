def build_remediation_prompt(chapter: str, analytics: dict):
    return f"""
You are an expert O/L Mathematics tutor.

Student performance data:
- Chapter: {chapter}
- Accuracy: {analytics.get('accuracy_percentage')}%
- Attempts: {analytics.get('total_attempts')}
- Average Time: {analytics.get('avg_time_seconds')} seconds

Your task:
1. Identify the main misconceptions.
2. Explain mistakes in simple student-friendly language.
3. Provide a clear step-by-step revision plan.
4. Suggest 3 practice question types (do NOT give answers).
5. Recommend whether the student should revise basics or advance.

Output format:
- Diagnosis:
- Why mistakes happen:
- Revision plan:
- Practice focus:
- Study priority:
"""
