import { ResumeData, PersonalInfo, Education, Experience, Project, Certification } from '../types/resume';

export class ResumeParser {
  static parseUploadedResume(text: string): Partial<ResumeData> {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const result: Partial<ResumeData> = {
      personalInfo: this.extractPersonalInfo(lines),
      summary: this.extractSummary(lines),
      education: this.extractEducation(lines),
      experience: this.extractExperience(lines),
      projects: this.extractProjects(lines),
      skills: this.extractSkills(lines),
      certifications: this.extractCertifications(lines),
      additionalInfo: this.extractAdditionalInfo(lines)
    };

    return result;
  }

  private static extractPersonalInfo(lines: string[]): PersonalInfo {
    const personalInfo: PersonalInfo = {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    };

    // Extract name (usually first line or after common headers)
    const nameIndex = lines.findIndex(line => 
      !line.toLowerCase().includes('resume') && 
      !line.toLowerCase().includes('cv') &&
      line.length > 3 && 
      line.length < 50 &&
      /^[A-Za-z\s]+$/.test(line)
    );
    
    if (nameIndex !== -1) {
      personalInfo.fullName = lines[nameIndex];
    }

    // Extract email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailLine = lines.find(line => emailRegex.test(line));
    if (emailLine) {
      const emailMatch = emailLine.match(emailRegex);
      if (emailMatch) personalInfo.email = emailMatch[0];
    }

    // Extract phone
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const phoneLine = lines.find(line => phoneRegex.test(line));
    if (phoneLine) {
      const phoneMatch = phoneLine.match(phoneRegex);
      if (phoneMatch) personalInfo.phone = phoneMatch[0];
    }

    // Extract LinkedIn
    const linkedInLine = lines.find(line => 
      line.toLowerCase().includes('linkedin') || 
      line.includes('linkedin.com')
    );
    if (linkedInLine) {
      personalInfo.linkedIn = linkedInLine;
    }

    return personalInfo;
  }

  private static extractSummary(lines: string[]): string {
    const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
    const summaryIndex = lines.findIndex(line => 
      summaryKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    if (summaryIndex !== -1) {
      const summaryLines = [];
      for (let i = summaryIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (this.isNewSection(line)) break;
        summaryLines.push(line);
      }
      return summaryLines.join(' ').trim();
    }

    return '';
  }

  private static extractEducation(lines: string[]): Education[] {
    const educationKeywords = ['education', 'academic', 'qualification'];
    const educationIndex = lines.findIndex(line => 
      educationKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const education: Education[] = [];
    if (educationIndex !== -1) {
      const educationLines = this.getSectionLines(lines, educationIndex);
      
      // Simple parsing - can be enhanced with more sophisticated logic
      let currentEducation: Partial<Education> = {};
      
      educationLines.forEach(line => {
        if (line.includes('University') || line.includes('College') || line.includes('Institute')) {
          if (currentEducation.institution) {
            education.push(this.createEducationEntry(currentEducation));
            currentEducation = {};
          }
          currentEducation.institution = line;
        } else if (line.includes('Bachelor') || line.includes('Master') || line.includes('PhD')) {
          currentEducation.degree = line;
        }
      });

      if (currentEducation.institution) {
        education.push(this.createEducationEntry(currentEducation));
      }
    }

    return education;
  }

  private static extractExperience(lines: string[]): Experience[] {
    const experienceKeywords = ['experience', 'employment', 'work history', 'professional'];
    const experienceIndex = lines.findIndex(line => 
      experienceKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const experience: Experience[] = [];
    if (experienceIndex !== -1) {
      const experienceLines = this.getSectionLines(lines, experienceIndex);
      
      let currentExperience: Partial<Experience> = {};
      
      experienceLines.forEach(line => {
        // This is a simplified parser - can be enhanced
        if (line.length > 10 && !line.startsWith('•') && !line.startsWith('-')) {
          if (currentExperience.company) {
            experience.push(this.createExperienceEntry(currentExperience));
            currentExperience = {};
          }
          
          // Try to parse company and position
          const parts = line.split('|').map(p => p.trim());
          if (parts.length >= 2) {
            currentExperience.position = parts[0];
            currentExperience.company = parts[1];
          } else {
            currentExperience.company = line;
          }
        } else if (line.startsWith('•') || line.startsWith('-')) {
          if (!currentExperience.achievements) {
            currentExperience.achievements = [];
          }
          currentExperience.achievements.push(line.substring(1).trim());
        }
      });

      if (currentExperience.company) {
        experience.push(this.createExperienceEntry(currentExperience));
      }
    }

    return experience;
  }

  private static extractProjects(lines: string[]): Project[] {
    const projectKeywords = ['projects', 'portfolio'];
    const projectIndex = lines.findIndex(line => 
      projectKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const projects: Project[] = [];
    if (projectIndex !== -1) {
      const projectLines = this.getSectionLines(lines, projectIndex);
      
      let currentProject: Partial<Project> = {};
      
      projectLines.forEach(line => {
        if (line.length > 5 && !line.startsWith('•') && !line.startsWith('-')) {
          if (currentProject.name) {
            projects.push(this.createProjectEntry(currentProject));
            currentProject = {};
          }
          currentProject.name = line;
        } else if (line.startsWith('•') || line.startsWith('-')) {
          if (!currentProject.achievements) {
            currentProject.achievements = [];
          }
          currentProject.achievements.push(line.substring(1).trim());
        }
      });

      if (currentProject.name) {
        projects.push(this.createProjectEntry(currentProject));
      }
    }

    return projects;
  }

  private static extractSkills(lines: string[]): { technical: string[]; soft: string[] } {
    const skillsKeywords = ['skills', 'technical skills', 'competencies'];
    const skillsIndex = lines.findIndex(line => 
      skillsKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const skills = { technical: [], soft: [] };
    
    if (skillsIndex !== -1) {
      const skillsLines = this.getSectionLines(lines, skillsIndex);
      
      skillsLines.forEach(line => {
        // Split by common delimiters
        const skillItems = line.split(/[,|•\-]/).map(s => s.trim()).filter(s => s.length > 0);
        skills.technical.push(...skillItems);
      });
    }

    return skills;
  }

  private static extractCertifications(lines: string[]): Certification[] {
    const certKeywords = ['certifications', 'certificates', 'credentials'];
    const certIndex = lines.findIndex(line => 
      certKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    const certifications: Certification[] = [];
    
    if (certIndex !== -1) {
      const certLines = this.getSectionLines(lines, certIndex);
      
      certLines.forEach(line => {
        if (line.length > 5) {
          certifications.push({
            id: Date.now().toString() + Math.random(),
            name: line,
            organization: '',
            issueDate: null,
            expirationDate: null
          });
        }
      });
    }

    return certifications;
  }

  private static extractAdditionalInfo(lines: string[]): string {
    const additionalKeywords = ['additional', 'other', 'awards', 'achievements', 'volunteer'];
    const additionalIndex = lines.findIndex(line => 
      additionalKeywords.some(keyword => 
        line.toLowerCase().includes(keyword)
      )
    );

    if (additionalIndex !== -1) {
      const additionalLines = this.getSectionLines(lines, additionalIndex);
      return additionalLines.join(' ').trim();
    }

    return '';
  }

  private static getSectionLines(lines: string[], startIndex: number): string[] {
    const sectionLines = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (this.isNewSection(line)) break;
      sectionLines.push(line);
    }
    return sectionLines;
  }

  private static isNewSection(line: string): boolean {
    const sectionKeywords = [
      'education', 'experience', 'skills', 'projects', 'certifications',
      'summary', 'objective', 'employment', 'work history', 'portfolio'
    ];
    
    return sectionKeywords.some(keyword => 
      line.toLowerCase().includes(keyword) && line.length < 30
    );
  }

  private static createEducationEntry(data: Partial<Education>): Education {
    return {
      id: Date.now().toString() + Math.random(),
      institution: data.institution || '',
      degree: data.degree || '',
      field: data.field || '',
      startDate: null,
      endDate: null,
      location: data.location || '',
      gpa: data.gpa || '',
      achievements: data.achievements || ''
    };
  }

  private static createExperienceEntry(data: Partial<Experience>): Experience {
    return {
      id: Date.now().toString() + Math.random(),
      company: data.company || '',
      position: data.position || '',
      startDate: null,
      endDate: null,
      current: false,
      location: data.location || '',
      description: data.description || '',
      achievements: data.achievements || []
    };
  }

  private static createProjectEntry(data: Partial<Project>): Project {
    return {
      id: Date.now().toString() + Math.random(),
      name: data.name || '',
      description: data.description || '',
      technologies: data.technologies || [],
      startDate: null,
      endDate: null,
      url: data.url || '',
      github: data.github || '',
      achievements: data.achievements || []
    };
  }
}