import React from 'react';
import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  CodeBracketIcon, 
  CpuChipIcon,
  TrophyIcon,
  InformationCircleIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  atsScore?: number;
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: UserIcon },
  { id: 'summary', label: 'Summary', icon: DocumentTextIcon },
  { id: 'education', label: 'Education', icon: AcademicCapIcon },
  { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
  { id: 'projects', label: 'Projects', icon: CodeBracketIcon },
  { id: 'skills', label: 'Skills', icon: CpuChipIcon },
  { id: 'certifications', label: 'Certifications', icon: TrophyIcon },
  { id: 'additional', label: 'Additional Info', icon: InformationCircleIcon },
  { id: 'job-description', label: 'Job Description', icon: ClipboardDocumentListIcon },
  { id: 'ats-score', label: 'ATS Score', icon: ChartBarIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, atsScore }) => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Sections</h2>
        
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="flex-1 text-left">{section.label}</span>
                {section.id === 'ats-score' && atsScore !== undefined && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    atsScore >= 80 ? 'bg-green-100 text-green-800' :
                    atsScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {atsScore}%
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};