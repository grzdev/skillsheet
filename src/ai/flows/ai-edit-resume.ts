
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
    const editedResume = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!editedResume) {
      console.error('API returned an empty or unexpected response:', result);
      throw new Error('API returned an empty response.');
    }

    return { editedResume };
  } catch (error: any) {
    console.error('Failed to edit resume with Gemini:', error);
    throw error;
  }
  }
