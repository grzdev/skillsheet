
'use server';

import type { z } from 'zod';

const AiEditResumeInputSchema = {
  resumeContent: '',
  editInstructions: '',
};

export type AiEditResumeInput = typeof AiEditResumeInputSchema;

const AiEditResumeOutputSchema = {
  editedResume: '',
};

export type AiEditResumeOutput = typeof AiEditResumeOutputSchema;

export async function aiEditResume(
  input: AiEditResumeInput
): Promise<AiEditResumeOutput> {
  const systemPrompt = `You are an expert resume editor. Please edit the following resume content according to the instructions provided. Return only the new resume content as a raw string, without any markdown, JSON, or other formatting.`;

  const userPrompt = `
Resume Content:
${input.resumeContent}

Edit Instructions:
${input.editInstructions}
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
    const editedResume = choice?.message?.content;

    if (editedResume === null) {
       const stopReason = choice?.finish_reason || 'unknown reason';
       throw new Error(`The AI model returned no content. Stop reason: ${stopReason}`);
    }
    
    if (!editedResume) {
      console.error('API returned an empty or unexpected response:', result);
      throw new Error('API returned an empty response.');
    }

    return { editedResume };
  } catch (error: any) {
    console.error('Failed to edit resume with OpenRouter:', error);
    // Re-throw the original error to be caught by the server action
    throw error;
  }
}
