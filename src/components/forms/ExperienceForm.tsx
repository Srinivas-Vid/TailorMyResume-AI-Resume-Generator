import React from 'react';
import { Experience } from '../../types/resume';
import { DatePicker } from '../common/DatePicker';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: null,
      endDate: null,
      current: false,
      location: '',
      description: '',
      achievements: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'achievements', [...experience.achievements, '']);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={addExperience}
          className="btn-secondary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No work experience entries yet. Click "Add Experience" to get started.
        </p>
      )}

      {data.map((experience, index) => (
        <div key={experience.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                placeholder="e.g., Google Inc."
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
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
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                placeholder="e.g., San Francisco, CA"
                className="form-input"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={experience.startDate}
                  onChange={(date) => updateExperience(experience.id, 'startDate', date)}
                  placeholder="Select start date"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={experience.endDate}
                  onChange={(date) => updateExperience(experience.id, 'endDate', date)}
                  placeholder="Select end date"
                  disabled={experience.current}
                  minDate={experience.startDate || undefined}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => {
                    updateExperience(experience.id, 'current', e.target.checked);
                    if (e.target.checked) {
                      updateExperience(experience.id, 'endDate', null);
                    }
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I currently work here</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              placeholder="Brief description of your role and responsibilities..."
              className="form-textarea h-20"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements
              </label>
              <button
                onClick={() => addAchievement(experience.id)}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                + Add Achievement
              </button>
            </div>

            {experience.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex items-start space-x-2 mb-2">
                <span className="text-gray-400 mt-2">•</span>
                <textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                  placeholder="e.g., Increased team productivity by 25% through implementation of automated testing"
                  className="form-textarea flex-1 h-16"
                />
                {experience.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(experience.id, achIndex)}
                    className="text-red-600 hover:text-red-800 p-1 mt-1"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};