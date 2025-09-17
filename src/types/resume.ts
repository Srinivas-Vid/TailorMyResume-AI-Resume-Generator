export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  github?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date | null;
  endDate: Date | null;
  gpa?: string;
  location: string;
  achievements?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  location: string;
  description: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: Date | null;
  endDate: Date | null;
  url?: string;
  github?: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: Date | null;
  expirationDate: Date | null;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    technical: string[];
    soft: string[];
  };
  certifications: Certification[];
  additionalInfo: string;
}

export interface JobDescription {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  keywords: string[];
}

export interface ATSScore {
  overall: number;
  keywordMatch: number;
  formatScore: number;
  missingKeywords: string[];
  suggestions: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}