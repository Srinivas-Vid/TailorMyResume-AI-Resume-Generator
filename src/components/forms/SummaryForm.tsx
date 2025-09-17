import React from 'react';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary *
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling 2-3 sentence summary highlighting your key skills, experience, and career objectives. Focus on what makes you unique and valuable to employers."
          className="form-textarea h-32"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Tip: Include relevant keywords from the job description and quantify your achievements where possible.
        </p>
      </div>
    </div>
  );
};