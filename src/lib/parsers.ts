
import type { ResumeData, PersonalInfo, WorkExperience, Education, Award, Project, ResumeSection } from './types';

export function parseResumeText(text: string): ResumeData | null {
    if (!text) return null;

    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // With the new AI prompt, we can reliably assume the first three lines are header info.
    const name = lines[0] || '';
    const title = lines[1] || '';
    const contactLine = lines[2] || '';
    const contactParts = contactLine.split(' | ');

    const personalInfo: PersonalInfo = {
        name,
        title,
        contact: {
            phone: contactParts[0]?.trim() || '',
            email: contactParts[1]?.trim() || '',
            address: contactParts[2]?.trim() || ''
        }
    };

    const sections: { [key: string]: ResumeSection } = {
        summary: { title: 'Professional Summary', content: '' },
        workExperience: { title: 'Work Experience', content: [] },
        education: { title: 'Education', content: [] },
        skills: { title: 'Skills', content: [] },
        awards: { title: 'Awards', content: [] },
        projects: { title: 'Projects', content: [] }
    };

    let currentSectionKey: keyof typeof sections | null = null;
    let currentWorkExperience: WorkExperience | null = null;
    let currentProject: Project | null = null;

    // Start parsing from the first heading, which should be after the header info
    const firstHeadingIndex = lines.findIndex(line => line.startsWith('##'));

    for (let i = firstHeadingIndex; i >= 0 && i < lines.length; i++) {
        const line = lines[i]?.trim();
        if (!line) continue;

        if (line.startsWith('## ')) {
            const sectionTitle = line.substring(3).trim();
            currentWorkExperience = null; // Reset when we hit a new major section
            currentProject = null;
            switch (sectionTitle.toLowerCase()) {
                case 'professional summary':
                    currentSectionKey = 'summary';
                    break;
                case 'work experience':
                    currentSectionKey = 'workExperience';
                    break;
                case 'education':
                    currentSectionKey = 'education';
                    break;
                case 'skills':
                    currentSectionKey = 'skills';
                    break;
                case 'awards':
                    currentSectionKey = 'awards';
                    break;
                case 'projects':
                    currentSectionKey = 'projects';
                    break;
                default:
                    currentSectionKey = null;
            }
            continue;
        }
        
        if (currentSectionKey) {
            switch(currentSectionKey) {
                case 'summary':
                    if (typeof sections.summary.content === 'string') {
                       sections.summary.content += (sections.summary.content ? ' ' : '') + line;
                    }
                    break;
                case 'skills':
                    if (Array.isArray(sections.skills.content)) {
                       sections.skills.content = line.split(/, |,| and /).map(s => s.trim());
                    }
                    break;
                case 'workExperience':
                    if (line.startsWith('### ')) {
                        if (currentWorkExperience) {
                           (sections.workExperience.content as WorkExperience[]).push(currentWorkExperience);
                        }
                        currentWorkExperience = {
                            title: line.substring(4),
                            company: '',
                            date: '',
                            location: '',
                            description: []
                        };
                    } else if (currentWorkExperience) {
                         if (!currentWorkExperience.company) {
                             const parts = line.split(' | ');
                             currentWorkExperience.company = parts[0]?.trim() || '';
                             currentWorkExperience.date = parts[1]?.trim() || '';
                             currentWorkExperience.location = parts[2]?.trim() || '';
                         } else if (line.startsWith('- ')) {
                             currentWorkExperience.description.push(line.substring(2));
                         }
                    }
                    break;
                case 'education':
                    if (line.startsWith('### ')) {
                        const degree = line.substring(4).trim();
                        let institution = '', date = '', location = '', description = undefined;
                        
                        // Look ahead for details
                        let j = i + 1;
                        while (j < lines.length && !lines[j].startsWith('##')) {
                            const currentLine = lines[j].trim();
                            if (currentLine.includes(' | ')) {
                                const parts = currentLine.split(' | ');
                                institution = parts[0]?.trim() || '';
                                date = parts[1]?.trim() || '';
                                location = parts[2]?.trim() || '';
                            } else if (!currentLine.startsWith('### ') && currentLine.length > 0) {
                                description = currentLine.startsWith('- ') ? currentLine.substring(2) : currentLine;
                            }
                            j++;
                        }
                        
                        const edu: Education = {
                            degree,
                            institution,
                            date,
                            location,
                            description
                        };
                        (sections.education.content as Education[]).push(edu);
                        i = j - 1; // Skip processed lines
                    }
                    break;
                case 'projects':
                    if (line.startsWith('### ')) {
                        if (currentProject) {
                            (sections.projects.content as Project[]).push(currentProject);
                        }
                        const parts = line.substring(4).split(' | ');
                        currentProject = {
                            name: parts[0]?.trim() || '',
                            detail: parts[1]?.trim() || '',
                            description: ''
                        };
                    } else if (currentProject) {
                        currentProject.description += (currentProject.description ? ' ' : '') + line;
                    }
                    break;
                case 'awards':
                    const awardParts = line.split(' | ');
                    if(awardParts.length === 3) {
                        const award: Award = {
                            name: awardParts[0].trim(),
                            from: awardParts[1].trim(),
                            year: awardParts[2].trim()
                        };
                        (sections.awards.content as Award[]).push(award);
                    }
                    break;
            }
        }
    }
    // Push the last item
    if (currentWorkExperience) {
        (sections.workExperience.content as WorkExperience[]).push(currentWorkExperience);
    }
    if (currentProject) {
        (sections.projects.content as Project[]).push(currentProject);
    }

    return {
        personalInfo,
        summary: sections.summary,
        workExperience: sections.workExperience,
        education: sections.education,
        skills: sections.skills,
        awards: sections.awards,
        projects: sections.projects,
    };
}
