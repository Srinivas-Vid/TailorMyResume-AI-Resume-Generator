import React from 'react';
import { DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TailorMyResume AI</h1>
              <p className="text-xs text-gray-500">ATS-Optimized Resume Generator</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SparklesIcon className="h-4 w-4" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};