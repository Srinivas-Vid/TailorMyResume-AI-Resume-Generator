import React from 'react';
import { JobDescription } from '../../types/resume';

interface JobDescriptionFormProps {
  data: JobDescription;
  onChange: (data: JobDescription) => void;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof JobDescription, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g., Google Inc."
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description *
          </label>
          <textarea
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Paste the complete job description here. Our AI will analyze it to extract key requirements and optimize your resume accordingly."
            className="form-textarea h-48"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Paste the full job posting for best results. The AI will identify key skills, requirements, and keywords to tailor your resume.
          </p>
        </div>
      </div>
    </div>
  );
};