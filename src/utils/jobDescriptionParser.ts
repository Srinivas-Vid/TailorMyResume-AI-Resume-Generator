import { JobDescription } from '../types/resume';

export class JobDescriptionParser {
  static parseJobDescription(text: string): JobDescription {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return {
      title: this.extractJobTitle(lines),
      company: this.extractCompany(lines),
      description: text,
      requirements: this.extractRequirements(lines),
      keywords: this.extractKeywords(text)
    };
  }

  private static extractJobTitle(lines: string[]): string {
    // Look for common job title patterns
    const titlePatterns = [
      /^(.*?)\s*-\s*job/i,
      /^job title:\s*(.*)/i,
      /^position:\s*(.*)/i,
      /^role:\s*(.*)/i
    ];

    for (const line of lines.slice(0, 5)) {
      for (const pattern of titlePatterns) {
        const match = line.match(pattern);
        if (match) return match[1].trim();
      }
      
      // If no pattern matches, assume first meaningful line is title
      if (line.length > 5 && line.length < 100) {
        return line;
      }
    }

    return 'Software Developer'; // Default fallback
  }

  private static extractCompany(lines: string[]): string {
    const companyPatterns = [
      /company:\s*(.*)/i,
      /employer:\s*(.*)/i,
      /organization:\s*(.*)/i
    ];

    for (const line of lines.slice(0, 10)) {
      for (const pattern of companyPatterns) {
        const match = line.match(pattern);
        if (match) return match[1].trim();
      }
    }

    return 'Tech Company'; // Default fallback
  }

  private static extractRequirements(lines: string[]): string[] {
    const requirements: string[] = [];
    let inRequirementsSection = false;

    const requirementKeywords = [
      'requirements', 'qualifications', 'skills', 'experience',
      'must have', 'required', 'essential', 'responsibilities'
    ];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check if we're entering a requirements section
      if (requirementKeywords.some(keyword => lowerLine.includes(keyword))) {
        inRequirementsSection = true;
        continue;
      }

      // Check if we're leaving requirements section
      if (inRequirementsSection && (
        lowerLine.includes('benefits') ||
        lowerLine.includes('salary') ||
        lowerLine.includes('about us') ||
        lowerLine.includes('company culture')
      )) {
        inRequirementsSection = false;
        continue;
      }

      // Extract requirement items
      if (inRequirementsSection && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
        requirements.push(line.substring(1).trim());
      } else if (inRequirementsSection && line.length > 10 && line.length < 200) {
        requirements.push(line);
      }
    }

    return requirements;
  }

  private static extractKeywords(text: string): string[] {
    const keywords = new Set<string>();
    
    // Technical skills patterns
    const techPatterns = [
      // Programming languages
      /\b(javascript|python|java|c\+\+|c#|php|ruby|go|rust|swift|kotlin|typescript)\b/gi,
      // Frameworks
      /\b(react|angular|vue|node\.?js|express|django|flask|spring|laravel|rails)\b/gi,
      // Databases
      /\b(mysql|postgresql|mongodb|redis|elasticsearch|oracle|sql server)\b/gi,
      // Cloud platforms
      /\b(aws|azure|gcp|google cloud|docker|kubernetes|terraform)\b/gi,
      // Tools
      /\b(git|jenkins|jira|confluence|slack|figma|sketch)\b/gi,
      // Methodologies
      /\b(agile|scrum|kanban|devops|ci\/cd|tdd|bdd)\b/gi
    ];

    techPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => keywords.add(match.toLowerCase()));
      }
    });

    // Extract years of experience
    const experiencePattern = /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi;
    const expMatches = text.match(experiencePattern);
    if (expMatches) {
      expMatches.forEach(match => keywords.add(match.toLowerCase()));
    }

    // Extract degree requirements
    const degreePattern = /\b(bachelor|master|phd|degree|diploma|certification)\b/gi;
    const degreeMatches = text.match(degreePattern);
    if (degreeMatches) {
      degreeMatches.forEach(match => keywords.add(match.toLowerCase()));
    }

    // Extract soft skills
    const softSkills = [
      'communication', 'leadership', 'teamwork', 'problem solving',
      'analytical', 'creative', 'detail oriented', 'time management'
    ];

    softSkills.forEach(skill => {
      if (text.toLowerCase().includes(skill)) {
        keywords.add(skill);
      }
    });

    return Array.from(keywords);
  }
}