import React from 'react';

interface AdditionalInfoFormProps {
  data: string;
  onChange: (data: string) => void;
}

export const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ data, onChange }) => {
  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add details such as awards, volunteering, publications, or hobbies."
          className="form-textarea h-32"
        />
        <p className="text-xs text-gray-500 mt-1">
          Include any relevant information that doesn't fit in other sections, such as awards, volunteer work, publications, languages, or interests.
        </p>
      </div>
    </div>
  );
};