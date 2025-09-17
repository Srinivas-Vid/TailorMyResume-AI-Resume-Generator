import React from 'react';
import { Education } from '../../types/resume';
import { DatePicker } from '../common/DatePicker';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: null,
      endDate: null,
      gpa: '',
      location: '',
      achievements: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={addEducation}
          className="btn-secondary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No education entries yet. Click "Add Education" to get started.
        </p>
      )}

      {data.map((education, index) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                placeholder="e.g., Stanford University"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                placeholder="e.g., Stanford, CA"
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <DatePicker
                selected={education.startDate}
                onChange={(date) => updateEducation(education.id, 'startDate', date)}
                placeholder="Select start date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <DatePicker
                selected={education.endDate}
                onChange={(date) => updateEducation(education.id, 'endDate', date)}
                placeholder="Select end date"
                minDate={education.startDate || undefined}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={education.gpa || ''}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
                className="form-input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievements & Activities
              </label>
              <textarea
                value={education.achievements || ''}
                onChange={(e) => updateEducation(education.id, 'achievements', e.target.value)}
                placeholder="e.g., Dean's List, Relevant coursework, Academic honors, Extracurricular activities"
                className="form-textarea h-20"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};