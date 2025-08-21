
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

  const systemPrompt = `You are an expert resume writer. Given the user's input, generate a complete, professional resume as a single block of formatted text.

- If a name is not provided, invent a realistic one.
- Use "Creative Director" as a default job title if one isn't implied.
- Fill in any missing details (contact info, work history, education, skills, projects, awards) with plausible, realistic-looking mock data.
- Do not use placeholders like "[Your Name]".
- Structure the output clearly with headings prefixed by "##" (e.g., "## Work Experience") and subheadings by "###" (e.g., "### Creative Director").
- Separate contact info items with " | ".
- Format work experience descriptions as bullet points starting with "-".
- Ensure the final output is just the raw text of the resume, with no extra explanations, JSON, or markdown formatting.
`;
  
  const userPrompt = `
Here is the information I have. Please generate a full resume from it.

Name: ${input.name || 'Not provided'}
Details: ${input.otherDetails || 'Not provided'}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'z-ai/glm-4.5-air:free',
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
    // Re-throw the original error to be caught by the server action
    throw error;
  }
}
