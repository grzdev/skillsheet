export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export interface PersonalInfo {
    name: string;
    title: string;
    contact: {
        phone: string;
        email: string;
        address: string;
    }
}

export interface WorkExperience {
    title: string;
    company: string;
    date: string;
    location: string;
    description: string[];
}

export interface Education {
    degree: string;
    institution: string;
    date: string;
    location: string;
    description?: string;
}

export interface Project {
    name: string;
    detail: string;
    description: string;
}

export interface Award {
    name: string;
    from: string;
    year: string;
}

export interface ResumeSection {
    title: string;
    content: string | string[] | WorkExperience[] | Education[] | Award[] | Project[];
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: ResumeSection;
    workExperience: ResumeSection;
    education: ResumeSection;
    skills: ResumeSection;
    awards: ResumeSection;
    projects: ResumeSection;
}
