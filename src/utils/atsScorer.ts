import { ResumeData, JobDescription, ATSScore } from '../types/resume';

export class ATSScorer {
  static calculateScore(resumeData: ResumeData, jobDescription: JobDescription): ATSScore {
    const keywordScore = this.calculateKeywordMatch(resumeData, jobDescription);
    const formatScore = this.calculateFormatScore(resumeData);
    const overall = Math.round((keywordScore.score + formatScore) / 2);

    return {
      overall,
      keywordMatch: keywordScore.score,
      formatScore,
      missingKeywords: keywordScore.missing,
      suggestions: this.generateSuggestions(resumeData, jobDescription, keywordScore.missing)
    };
  }

  private static calculateKeywordMatch(resumeData: ResumeData, jobDescription: JobDescription): {
    score: number;
    missing: string[];
  } {
    const resumeText = this.extractResumeText(resumeData).toLowerCase();
    const requiredKeywords = jobDescription.keywords.map(k => k.toLowerCase());
    
    let matchedKeywords = 0;
    const missingKeywords: string[] = [];

    requiredKeywords.forEach(keyword => {
      if (resumeText.includes(keyword)) {
        matchedKeywords++;
      } else {
        missingKeywords.push(keyword);
      }
    });

    const score = requiredKeywords.length > 0 
      ? Math.round((matchedKeywords / requiredKeywords.length) * 100)
      : 100;

    return { score, missing: missingKeywords };
  }

  private static calculateFormatScore(resumeData: ResumeData): number {
    let score = 100;

    // Check for essential sections
    if (!resumeData.personalInfo.fullName) score -= 10;
    if (!resumeData.personalInfo.email) score -= 10;
    if (!resumeData.personalInfo.phone) score -= 5;
    if (!resumeData.summary) score -= 10;
    if (resumeData.experience.length === 0) score -= 15;
    if (resumeData.skills.technical.length === 0) score -= 10;

    // Check for proper formatting
    resumeData.experience.forEach(exp => {
      if (!exp.company || !exp.position) score -= 5;
      if (exp.achievements.length === 0) score -= 3;
    });

    return Math.max(0, score);
  }

  private static extractResumeText(resumeData: ResumeData): string {
    const textParts = [
      resumeData.summary,
      resumeData.experience.map(exp => `${exp.company} ${exp.position} ${exp.description} ${exp.achievements.join(' ')}`).join(' '),
      resumeData.projects.map(proj => `${proj.name} ${proj.description} ${proj.technologies.join(' ')} ${proj.achievements.join(' ')}`).join(' '),
      resumeData.skills.technical.join(' '),
      resumeData.skills.soft.join(' '),
      resumeData.certifications.map(cert => `${cert.name} ${cert.organization}`).join(' '),
      resumeData.additionalInfo
    ];

    return textParts.filter(Boolean).join(' ');
  }

  private static generateSuggestions(resumeData: ResumeData, jobDescription: JobDescription, missingKeywords: string[]): string[] {
    const suggestions: string[] = [];

    if (missingKeywords.length > 0) {
      suggestions.push(`Add these missing keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
    }

    if (!resumeData.summary) {
      suggestions.push('Add a professional summary section');
    }

    if (resumeData.experience.length === 0) {
      suggestions.push('Add work experience with quantified achievements');
    }

    if (resumeData.skills.technical.length < 5) {
      suggestions.push('Include more relevant technical skills');
    }

    const hasQuantifiedAchievements = resumeData.experience.some(exp => 
      exp.achievements.some(achievement => /\d+/.test(achievement))
    );

    if (!hasQuantifiedAchievements) {
      suggestions.push('Add quantified achievements (numbers, percentages, metrics)');
    }

    return suggestions;
  }
}