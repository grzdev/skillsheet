
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

  const systemPrompt = `You are an expert resume writer. Generate a detailed, professional resume based on the user's input. If details are missing, generate realistic content that shows career progression and achievements.

**REQUIRED STRUCTURE:**
Name on first line (exactly as provided, no numbers or prefixes)
Title on second line (extract from input or generate based on experience)
Contact info on third line (format: "phone | email | address")

**FOLLOWED BY THESE SECTIONS:**
## Professional Summary
- Write 2-3 sentences highlighting key achievements and expertise

## Work Experience
For each position (generate 3-4 positions showing career growth):
### [Job Title]
- Company name and specific years (e.g., "Tech Solutions Inc., 2020-2023")
- 4-5 detailed bullet points about achievements and responsibilities
- Use specific metrics and numbers
- Focus on impact and results

## Education
For each education entry:
### [Degree Name]
[Institution Name] | [Year or Year Range] | [Location]
[Optional: Brief description of achievements, honors, or relevant coursework]

## Skills
- List 8-10 relevant technical and soft skills
- Group similar skills together

## Projects
For each project (include 2-3 significant projects):
- Project name and technologies used
- Detailed description of purpose and impact
- Measurable results or improvements

IMPORTANT:
- Never use placeholders or brackets like [Company Name] or [Year]
- Use specific numbers, metrics, and achievements
- Write in active voice with action verbs
- Focus on concrete accomplishments rather than responsibilities
- Keep dates realistic and consistent
- Generate content that matches the level of seniority implied by the title
- Format work experience bullet points with "-" at the start
`;
  
  const userPrompt = `
Here is the information I have. Please generate a full resume from it.

Name: ${input.name || 'Not provided'}
Details: ${input.otherDetails || 'Not provided'}
`;

  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://github.com/grzdev/skillsheet',
        'X-Title': 'Skillsheet Resume Builder',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
       const errorBody = await response.text();
       console.error('OpenRouter API error:', response.status, errorBody);
       throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorBody}`);
    }

    const result = await response.json();
    const choice = result.choices[0];
    const resumeText = choice?.message?.content;
    
    if (resumeText === null) {
       // Handle cases where the model returns null content, often due to safety flags
       const stopReason = choice?.finish_reason || 'unknown reason';
       throw new Error(`The AI model returned no content. Stop reason: ${stopReason}`);
    }
    
    if (!resumeText) {
      console.error('API returned an empty or unexpected response:', result);
      throw new Error('API returned an empty response.');
    }

    return resumeText;

  } catch (error: any) {
    console.error('Failed to complete resume data with OpenRouter:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error(error.message || 'Failed to generate resume. Please try again.');
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
