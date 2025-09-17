import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SkillsFormProps {
  data: {
    technical: string[];
    soft: string[];
  };
  onChange: (data: { technical: string[]; soft: string[] }) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [techSkillInput, setTechSkillInput] = useState('');
  const [softSkillInput, setSoftSkillInput] = useState('');

  const addTechnicalSkill = (skill: string) => {
    if (!skill.trim()) return;
    if (!data.technical.includes(skill.trim())) {
      onChange({
        ...data,
        technical: [...data.technical, skill.trim()]
      });
    }
    setTechSkillInput('');
  };

  const removeTechnicalSkill = (skill: string) => {
    onChange({
      ...data,
      technical: data.technical.filter(s => s !== skill)
    });
  };

  const addSoftSkill = (skill: string) => {
    if (!skill.trim()) return;
    if (!data.soft.includes(skill.trim())) {
      onChange({
        ...data,
        soft: [...data.soft, skill.trim()]
      });
    }
    setSoftSkillInput('');
  };

  const removeSoftSkill = (skill: string) => {
    onChange({
      ...data,
      soft: data.soft.filter(s => s !== skill)
    });
  };

  const suggestedTechSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
    'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'Angular', 'Vue.js'
  ];

  const suggestedSoftSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
    'Critical Thinking', 'Adaptability', 'Project Management', 'Analytical Skills'
  ];

  return (
    <div className="section-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>

      {/* Technical Skills */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Technical Skills
        </label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {data.technical.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {skill}
              <button
                onClick={() => removeTechnicalSkill(skill)}
                className="ml-2 hover:text-blue-600"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          value={techSkillInput}
          onChange={(e) => setTechSkillInput(e.target.value)}
          placeholder="e.g., JavaScript, Python, React (press Enter to add)"
          className="form-input mb-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTechnicalSkill(techSkillInput);
            }
          }}
        />

        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-gray-500 mr-2">Suggestions:</span>
          {suggestedTechSkills
            .filter(skill => !data.technical.includes(skill))
            .slice(0, 8)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => addTechnicalSkill(skill)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Soft Skills
        </label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {data.soft.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {skill}
              <button
                onClick={() => removeSoftSkill(skill)}
                className="ml-2 hover:text-green-600"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          value={softSkillInput}
          onChange={(e) => setSoftSkillInput(e.target.value)}
          placeholder="e.g., Leadership, Communication, Problem Solving (press Enter to add)"
          className="form-input mb-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSoftSkill(softSkillInput);
            }
          }}
        />

        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-gray-500 mr-2">Suggestions:</span>
          {suggestedSoftSkills
            .filter(skill => !data.soft.includes(skill))
            .slice(0, 6)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => addSoftSkill(skill)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};