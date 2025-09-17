import React from 'react';
import { Project } from '../../types/resume';
import { DatePicker } from '../common/DatePicker';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: null,
      endDate: null,
      url: '',
      github: '',
      achievements: ['']
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const addTechnology = (id: string, tech: string) => {
    if (!tech.trim()) return;
    const project = data.find(proj => proj.id === id);
    if (project && !project.technologies.includes(tech.trim())) {
      updateProject(id, 'technologies', [...project.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (id: string, tech: string) => {
    const project = data.find(proj => proj.id === id);
    if (project) {
      updateProject(id, 'technologies', project.technologies.filter(t => t !== tech));
    }
  };

  const addAchievement = (id: string) => {
    const project = data.find(proj => proj.id === id);
    if (project) {
      updateProject(id, 'achievements', [...project.achievements, '']);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const project = data.find(proj => proj.id === id);
    if (project) {
      const newAchievements = project.achievements.filter((_, i) => i !== index);
      updateProject(id, 'achievements', newAchievements);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const project = data.find(proj => proj.id === id);
    if (project) {
      const newAchievements = [...project.achievements];
      newAchievements[index] = value;
      updateProject(id, 'achievements', newAchievements);
    }
  };

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <button
          onClick={addProject}
          className="btn-secondary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No projects yet. Click "Add Project" to showcase your work.
        </p>
      )}

      {data.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="e.g., E-commerce Platform"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                type="url"
                value={project.url || ''}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder="e.g., https://myproject.com"
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Repository
              </label>
              <input
                type="url"
                value={project.github || ''}
                onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                placeholder="e.g., https://github.com/username/project"
                className="form-input"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={project.startDate}
                  onChange={(date) => updateProject(project.id, 'startDate', date)}
                  placeholder="Select start date"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={project.endDate}
                  onChange={(date) => updateProject(project.id, 'endDate', date)}
                  placeholder="Select end date"
                  minDate={project.startDate || undefined}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description *
            </label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Brief description of the project, its purpose, and your role..."
              className="form-textarea h-20"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {tech}
                  <button
                    onClick={() => removeTechnology(project.id, tech)}
                    className="ml-2 hover:text-primary-600"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB (press Enter to add)"
              className="form-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechnology(project.id, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements
              </label>
              <button
                onClick={() => addAchievement(project.id)}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                + Add Achievement
              </button>
            </div>

            {project.achievements.map((achievement, achIndex) => (
              <div key={achIndex} className="flex items-start space-x-2 mb-2">
                <span className="text-gray-400 mt-2">•</span>
                <textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(project.id, achIndex, e.target.value)}
                  placeholder="e.g., Implemented responsive design that improved mobile user engagement by 40%"
                  className="form-textarea flex-1 h-16"
                />
                {project.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(project.id, achIndex)}
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