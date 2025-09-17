import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { EducationForm } from './components/forms/EducationForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { CertificationsForm } from './components/forms/CertificationsForm';
import { AdditionalInfoForm } from './components/forms/AdditionalInfoForm';
import { JobDescriptionForm } from './components/forms/JobDescriptionForm';
import { ATSScoreCard } from './components/ats/ATSScoreCard';
import { ResumePreview } from './components/resume/ResumePreview';
import { FileUpload } from './components/common/FileUpload';
import { useResumeData } from './hooks/useResumeData';
import { ResumeParser } from './utils/resumeParser';
import { JobDescriptionParser } from './utils/jobDescriptionParser';
import { ATSScorer } from './utils/atsScorer';
import { ATSScore } from './types/resume';
import { 
  DocumentArrowDownIcon, 
  EyeIcon, 
  SparklesIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

function App() {
  const {
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
  } = useResumeData();

  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Calculate ATS score when resume data or job description changes
  useEffect(() => {
    if (jobDescription.description && resumeData.personalInfo.fullName) {
      const parsedJD = JobDescriptionParser.parseJobDescription(jobDescription.description);
      const score = ATSScorer.calculateScore(resumeData, parsedJD);
      setAtsScore(score);
    }
  }, [resumeData, jobDescription]);

  const handleFileUpload = async (file: File) => {
    setIsProcessingUpload(true);
    setUploadedFile(file);
    setUploadMessage('');

    try {
      const text = await file.text();
      const parsedData = ResumeParser.parseUploadedResume(text);
      
      if (parsedData) {
        setResumeFromUpload(parsedData);
        setUploadMessage('Resume uploaded and parsed successfully! You can now review and edit the extracted information.');
        setActiveSection('personal');
      }
    } catch (error) {
      console.error('Error parsing resume:', error);
      setUploadMessage('Error parsing resume. Please try again or fill in the information manually.');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadMessage('');
    resetResumeData();
  };

  const handleJobDescriptionChange = (jd: any) => {
    updateJobDescription(jd);
    if (jd.description) {
      const parsed = JobDescriptionParser.parseJobDescription(jd.description);
      updateJobDescription(parsed);
    }
  };

  const handleExportResume = () => {
    // This would integrate with a PDF generation service
    console.log('Exporting resume...', resumeData);
    alert('Resume export functionality will be implemented with backend integration.');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={resumeData.summary}
            onChange={updateSummary}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={updateEducation}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={updateExperience}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={updateProjects}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={updateSkills}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            data={resumeData.certifications}
            onChange={updateCertifications}
          />
        );
      case 'additional':
        return (
          <AdditionalInfoForm
            data={resumeData.additionalInfo}
            onChange={updateAdditionalInfo}
          />
        );
      case 'job-description':
        return (
          <JobDescriptionForm
            data={jobDescription}
            onChange={handleJobDescriptionChange}
          />
        );
      case 'ats-score':
        return atsScore ? (
          <ATSScoreCard score={atsScore} />
        ) : (
          <div className="section-card text-center py-12">
            <ExclamationCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ATS Score Available</h3>
            <p className="text-gray-600">
              Please fill in your resume information and add a job description to see your ATS compatibility score.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          atsScore={atsScore?.overall}
        />
        
        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Upload Section */}
              {!uploadedFile && activeSection === 'personal' && (
                <div className="mb-6">
                  <FileUpload
                    onFileUpload={handleFileUpload}
                    uploadedFile={uploadedFile}
                    onRemoveFile={handleRemoveFile}
                    label="Quick Start: Upload Existing Resume"
                    description="Upload your current resume to auto-fill the form, or skip and fill manually"
                  />
                  
                  {isProcessingUpload && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <SparklesIcon className="h-5 w-5 text-blue-600 mr-2 animate-spin" />
                        <span className="text-blue-800">Processing your resume...</span>
                      </div>
                    </div>
                  )}
                  
                  {uploadMessage && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      uploadMessage.includes('Error') 
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : 'bg-green-50 border border-green-200 text-green-800'
                    }`}>
                      <div className="flex items-start">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            {uploadMessage.includes('Error') ? 'Upload Error' : 'Upload Successful'}
                          </p>
                          <p className="text-sm mt-1">{uploadMessage}</p>
                          {uploadedFile && !uploadMessage.includes('Error') && (
                            <p className="text-xs mt-2">
                              Since you uploaded an existing resume, the system has auto-extracted your data and tailored it as per the JD. You may review and edit before download.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Form Sections */}
              {renderActiveSection()}
            </div>
          </div>
          
          {/* Preview Panel */}
          {showPreview && (
            <div className="w-1/2 border-l border-gray-200 bg-gray-50 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <ResumePreview data={resumeData} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {atsScore && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">ATS Score:</span>
                <span className={`font-semibold ${
                  atsScore.overall >= 80 ? 'text-green-600' :
                  atsScore.overall >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {atsScore.overall}%
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary flex items-center space-x-2"
            >
              <EyeIcon className="h-4 w-4" />
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            
            <button
              onClick={handleExportResume}
              className="btn-primary flex items-center space-x-2"
              disabled={!resumeData.personalInfo.fullName}
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              <span>Export Resume</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;