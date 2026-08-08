const resumeExtractionPrompt = (resumeText) => `
You are an expert resume parser. Extract structured information from the resume text below.

Return ONLY valid JSON in this exact format, with no extra text, no markdown code fences, no explanation:

{
  "skills": ["skill1", "skill2"],
  "tools": ["tool1", "tool2"],
  "experienceYears": <number>,
  "roles": ["role1", "role2"],
  "education": ["degree1"]
}

Rules:
- "skills" = technical/soft skills mentioned (e.g. React, Communication, Problem Solving)
- "tools" = specific tools/technologies/platforms (e.g. Git, Docker, VS Code)
- "experienceYears" = total years of professional experience as a number (estimate if not explicit)
- "roles" = job titles held
- "education" = degrees/certifications mentioned
- If a field has no data, return an empty array or 0
- Do not include any text outside the JSON object

Resume text:
"""
${resumeText}
"""
`;

const jdExtractionPrompt = (jdText) => `
You are an expert job description parser. Extract structured requirements from the job description below.

Return ONLY valid JSON in this exact format, with no extra text, no markdown code fences, no explanation:

{
  "requiredSkills": ["skill1", "skill2"],
  "requiredTools": ["tool1", "tool2"],
  "minExperienceYears": <number>,
  "roleTitle": "string"
}

Rules:
- "requiredSkills" = technical/soft skills explicitly required or preferred
- "requiredTools" = specific tools/technologies/platforms mentioned
- "minExperienceYears" = minimum years of experience required as a number (0 if not mentioned)
- "roleTitle" = the job title being hired for
- Do not include any text outside the JSON object

Job description:
"""
${jdText}
"""
`;

const gapAnalysisPrompt = (resumeData, jdData) => `
You are an expert technical recruiter. Compare the candidate's profile against the job requirements below.

Candidate profile (JSON):
${JSON.stringify(resumeData)}

Job requirements (JSON):
${JSON.stringify(jdData)}

Return ONLY valid JSON in this exact format, with no extra text, no markdown code fences, no explanation:

{
  "matchScore": <number 0-100>,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "experienceGap": "string describing if experience meets requirement",
  "summary": "one short sentence overall assessment"
}

Rules:
- "matchScore" = percentage of required skills+tools the candidate has, weighted by relevance
- "matchedSkills" = skills/tools from requirements that the candidate HAS
- "missingSkills" = skills/tools from requirements that the candidate DOES NOT have
- Compare case-insensitively and consider close synonyms as matches (e.g. "JS" matches "JavaScript")
- Do not include any text outside the JSON object
`;


const roadmapPrompt = (missingSkills) => `
You are a career mentor helping a job seeker close skill gaps quickly.

The candidate is missing these skills: ${missingSkills.join(', ')}

Create a realistic 2-week learning roadmap to help them get up to speed. Focus on the highest-impact skills first if there are many.

Return ONLY valid JSON in this exact format, with no extra text, no markdown code fences, no explanation:

{
  "roadmap": [
    {
      "title": "string (e.g. 'Days 1-3: Learn Docker basics')",
      "description": "string — what to focus on and why",
      "resources": ["free resource name or platform, e.g. 'Docker official docs', 'freeCodeCamp Docker course'"]
    }
  ]
}

Rules:
- Break the roadmap into 3-5 chunks covering the full 2 weeks
- Prioritize skills that appear most critical/frequently required
- Only suggest genuinely free resources (official docs, freeCodeCamp, YouTube channels, MDN, etc.) — no paid courses
- Keep each description to 1-2 sentences
- Do not include any text outside the JSON object
`;

module.exports = { resumeExtractionPrompt, jdExtractionPrompt, gapAnalysisPrompt, roadmapPrompt };