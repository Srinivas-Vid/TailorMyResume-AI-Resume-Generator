import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';

interface ResumePreviewProps {
  data: ResumeData;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <span>{data.personalInfo.email}</span>
            )}
            {data.personalInfo.phone && (
              <span>{data.personalInfo.phone}</span>
            )}
            {data.personalInfo.location && (
              <span>{data.personalInfo.location}</span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-1">
            {data.personalInfo.linkedIn && (
              <span>{data.personalInfo.linkedIn}</span>
            )}
            {data.personalInfo.portfolio && (
              <span>{data.personalInfo.portfolio}</span>
            )}
            {data.personalInfo.github && (
              <span>{data.personalInfo.github}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDateRange(edu.startDate, edu.endDate)}</p>
                    {edu.location && <p>{edu.location}</p>}
                  </div>
                </div>
                {edu.achievements && (
                  <p className="text-gray-700 text-sm mt-1">{edu.achievements}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {exp.achievements.filter(Boolean).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.technologies.length > 0 && (
                      <p className="text-gray-600 text-sm">
                        Technologies: {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDateRange(project.startDate, project.endDate)}</p>
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                )}
                {project.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {project.achievements.filter(Boolean).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-4 text-xs text-blue-600 mt-1">
                  {project.url && (
                    <span>Live Demo: {project.url}</span>
                  )}
                  {project.github && (
                    <span>GitHub: {project.github}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              SKILLS
            </h2>
            {data.skills.technical.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold text-gray-900">Technical: </span>
                <span className="text-gray-700">{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <span className="font-semibold text-gray-900">Soft Skills: </span>
                <span className="text-gray-700">{data.skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              CERTIFICATIONS
            </h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700">{cert.organization}</p>
                    {cert.credentialId && (
                      <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDateRange(cert.issueDate, cert.expirationDate)}</p>
                  </div>
                </div>
                {cert.credentialUrl && (
                  <p className="text-blue-600 text-xs mt-1">{cert.credentialUrl}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Additional Information */}
        {data.additionalInfo && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              ADDITIONAL INFORMATION
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};