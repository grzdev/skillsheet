
'use server';

// The input schema is simplified as we are no longer building a complex object.
export type CompleteResumeDataInput = {
  name?: string;
  otherDetails?: string;
};

// The output is now a simple string.
export type CompleteResumeDataOutput = string;

export async function completeResumeData(
  input: CompleteResumeDataInput
): Promise<CompleteResumeDataOutput> {
  let timeoutId: NodeJS.Timeout | undefined;

  const systemPrompt = `You are an expert resume writer. Generate a detailed, professional resume using ONLY the user's provided name and details. Do NOT use placeholders like 'Your Name' or generic job titles. Always use the user's input for name, job title, and work experience. If details are missing, generate realistic content that matches the user's background and career progression.

**REQUIRED STRUCTURE:**
Name on first line (ALWAYS use the user's provided name, never use placeholders or generic names)
Title on second line (extract from input or generate based on experience)
Contact info on third line (ALWAYS generate realistic phone, email, and address if not provided; use mock data if necessary, but never leave blank)

**FOLLOWED BY THESE SECTIONS:**
## Professional Summary
- Write 2-3 sentences highlighting key achievements and expertise, based on the user's details.

## Work Experience
- For each position, use the user's job history and details. If the user provided specific roles or achievements, include them. If not, generate 3-4 positions showing career growth, but always use the user's input if available. STRICTLY LIMIT to two bullet points per position, never more.
### [Job Title]
- Company name and specific years (e.g., "Tech Solutions Inc., 2020-2023")
- 2 detailed bullet points about achievements and responsibilities, using the user's input if provided. NEVER write more than 2 bullet points per position.
- Use specific metrics and numbers.
- Focus on impact and results.

## Education
- If the user did not provide education, ALWAYS generate at least one realistic education entry. For each education entry, use the user's details if provided. Otherwise, generate realistic entries.
### [Degree Name]
[Institution Name] | [Year or Year Range] | [Location]
[Optional: Brief description of achievements, honors, or relevant coursework]

## Skills
- List 8-10 relevant technical and soft skills, using the user's input if provided.

## Projects
- If the user did not provide projects, ALWAYS generate at least one realistic project entry. For each project, use the user's details if provided. Otherwise, generate 2-3 significant projects.
- Project name and technologies used
- Detailed description of purpose and impact
- Measurable results or improvements
 Format work experience bullet points with "-" at the start
`;

  const userPrompt = `Here is the information I have. Please generate a full resume from it. Use my name and job details exactly as provided.\n\nName: ${input.name || 'Not provided'}\nDetails: ${input.otherDetails || 'Not provided'}\n`;
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY || '',
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `${systemPrompt}\n${userPrompt}` }] }
        ]
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Gemini API error:', response.status, errorBody);
      throw new Error(`Gemini API request failed with status ${response.status}: ${errorBody}`);
    }

    const result = await response.json();
    const resumeText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resumeText) {
      throw new Error('API returned an empty response.');
    }

    return resumeText;
  } catch (error: any) {
    console.error('Failed to complete resume data with Gemini:', error);
    throw new Error(error.message || 'Failed to generate resume. Please try again.');
  }
}
