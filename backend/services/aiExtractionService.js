const ai = require('../config/gemini');
const { resumeExtractionPrompt, jdExtractionPrompt } = require('../utils/promptTemplates');

const MODEL = 'gemini-3.5-flash';

const cleanJSONResponse = (text) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

const extractResumeData = async (resumeText) => {
  const prompt = resumeExtractionPrompt(resumeText);

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

const extractJDData = async (jdText) => {
  const prompt = jdExtractionPrompt(jdText);

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

module.exports = { extractResumeData, extractJDData };