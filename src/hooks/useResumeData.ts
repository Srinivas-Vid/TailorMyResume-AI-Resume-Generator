import { useState, useCallback } from 'react';
import { ResumeData, PersonalInfo, Education, Experience, Project, Certification, JobDescription } from '../types/resume';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  portfolio: '',
  github: ''
};

const initialJobDescription: JobDescription = {
  title: '',
  company: '',
  description: '',
  requirements: [],
  keywords: []
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: []
  },
  certifications: [],
  additionalInfo: ''
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [jobDescription, setJobDescription] = useState<JobDescription>(initialJobDescription);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const updatePersonalInfo = useCallback((data: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo: data }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  }, []);

  const updateEducation = useCallback((education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  }, []);

  const updateExperience = useCallback((experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  }, []);

  const updateProjects = useCallback((projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  }, []);

  const updateSkills = useCallback((skills: { technical: string[]; soft: string[] }) => {
    setResumeData(prev => ({ ...prev, skills }));
  }, []);

  const updateCertifications = useCallback((certifications: Certification[]) => {
    setResumeData(prev => ({ ...prev, certifications }));
  }, []);

  const updateAdditionalInfo = useCallback((additionalInfo: string) => {
    setResumeData(prev => ({ ...prev, additionalInfo }));
  }, []);

  const updateJobDescription = useCallback((jd: JobDescription) => {
    setJobDescription(jd);
  }, []);

  const setResumeFromUpload = useCallback((data: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...data,
      personalInfo: { ...prev.personalInfo, ...data.personalInfo },
      skills: { ...prev.skills, ...data.skills }
    }));
  }, []);

  const resetResumeData = useCallback(() => {
    setResumeData(initialResumeData);
    setJobDescription(initialJobDescription);
    setUploadedFile(null);
  }, []);

  return {
    resumeData,
    jobDescription,
    uploadedFile,
    setUploadedFile,
    updatePersonalInfo,
    updateSummary,
    updateEducation,
    updateExperience,
    updateProjects,
    updateSkills,
    updateCertifications,
    updateAdditionalInfo,
    updateJobDescription,
    setResumeFromUpload,
    resetResumeData
  };
};