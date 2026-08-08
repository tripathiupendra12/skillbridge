const ai = require('../config/gemini');
const { gapAnalysisPrompt } = require('../utils/promptTemplates');

const MODEL = 'gemini-3.5-flash';

const cleanJSONResponse = (text) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

const runGapAnalysis = async (resumeData, jdData) => {
  const prompt = gapAnalysisPrompt(resumeData, jdData);

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  const cleaned = cleanJSONResponse(response.text);

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse AI response as JSON:', cleaned);
    throw new Error('AI returned invalid JSON — try refining the prompt');
  }
};

module.exports = { runGapAnalysis };