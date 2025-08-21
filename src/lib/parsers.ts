import type { ResumeData, PersonalInfo, WorkExperience, Education, Award, Project, ResumeSection } from './types';

export function parseResumeText(text: string): ResumeData | null {
    if (!text) return null;

    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    const contactParts = (lines[2] || '').split(' | ');
    const personalInfo: PersonalInfo = {
        name: lines[0] || '',
        title: lines[1] || '',
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

    for (let i = 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        if (line.startsWith('## ')) {
            const title = line.substring(3);
            currentWorkExperience = null; // Reset when we hit a new major section
            currentProject = null;
            switch (title.toLowerCase()) {
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
                       sections.skills.content = line.split(',').map(s => s.trim());
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
                         const nextLine = lines[++i];
                         const parts = nextLine ? nextLine.split(' | ') : [];
                         const edu: Education = {
                           degree: line.substring(4),
                           institution: parts[0]?.trim() || '',
                           date: parts[1]?.trim() || '',
                           location: parts[2]?.trim() || '',
                           description: lines[i+1] && !lines[i+1].startsWith('###') && !lines[i+1].startsWith('## ') ? lines[++i] : undefined,
                        };
                        (sections.education.content as Education[]).push(edu);
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
    // Push the last work experience item
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
