
'use server';

import { aiEditResume } from '@/ai/flows/ai-edit-resume';
import { completeResumeData } from '@/ai/flows/complete-resume-data';

export async function generateResumeAction(
  userInput: string,
  userName: string
): Promise<string> {
  try {
    // The AI flow now directly returns the formatted string.
    const resumeString = await completeResumeData({
      otherDetails: userInput,
      name: userName,
    });
    return resumeString;
  } catch (error: any) {
    console.error('Error generating resume:', error);
    // Pass the specific error message to the UI
    return `Sorry, I was unable to generate the resume. Reason: ${error.message}`;
  }
}

export async function editResumeAction(
  currentResume: string,
  instructions: string
): Promise<string> {
  try {
    const { editedResume } = await aiEditResume({
      resumeContent: currentResume,
      editInstructions: instructions,
    });
    return editedResume;
  } catch (error: any) {
    console.error('Error editing resume:', error);
    // Pass the specific error message to the UI
    return `Sorry, I was unable to edit the resume. Reason: ${error.message}`;
  }
}
