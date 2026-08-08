require('dotenv').config();
const { extractResumeData, extractJDData } = require('./services/aiExtractionService');

const sampleResume = `
Prince Kumar
Full Stack Developer

Experience:
- 2 years building web applications with React, Node.js, and MongoDB
- Worked as a Frontend Developer at a startup, built dashboards using Tailwind CSS
- Familiar with Git, Docker, and REST API design

Education:
- B.Tech in Computer Science
`;

const sampleJD = `
We are hiring a Full Stack Developer with 3+ years of experience.
Required: React, Node.js, Express, MongoDB, Docker, AWS.
Nice to have: TypeScript, GraphQL.
`;

const run = async () => {
  try {
    console.log('--- Resume extraction ---');
    const resumeResult = await extractResumeData(sampleResume);
    console.log(JSON.stringify(resumeResult, null, 2));

    console.log('\n--- JD extraction ---');
    const jdResult = await extractJDData(sampleJD);
    console.log(JSON.stringify(jdResult, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
};

run();