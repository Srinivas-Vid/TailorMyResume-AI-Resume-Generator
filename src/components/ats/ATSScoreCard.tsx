import React from 'react';
import { ATSScore } from '../../types/resume';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ATSScoreCardProps {
  score: ATSScore;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 80) return 'text-green-600';
    if (scoreValue >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (scoreValue: number) => {
    if (scoreValue >= 80) return <CheckCircleIcon className="h-6 w-6 text-green-600" />;
    if (scoreValue >= 60) return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />;
    return <XCircleIcon className="h-6 w-6 text-red-600" />;
  };

  const getScoreBg = (scoreValue: number) => {
    if (scoreValue >= 80) return 'bg-green-50 border-green-200';
    if (scoreValue >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`section-card ${getScoreBg(score.overall)}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
        <div className="flex items-center space-x-2">
          {getScoreIcon(score.overall)}
          <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Keyword Match</span>
            <span className={`font-semibold ${getScoreColor(score.keywordMatch)}`}>
              {score.keywordMatch}%
            </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                score.keywordMatch >= 80 ? 'bg-green-500' :
                score.keywordMatch >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score.keywordMatch}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Format Score</span>
            <span className={`font-semibold ${getScoreColor(score.formatScore)}`}>
              {score.formatScore}%
            </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                score.formatScore >= 80 ? 'bg-green-500' :
                score.formatScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score.formatScore}%` }}
            />
          </div>
        </div>
      </div>

      {score.missingKeywords.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {score.missingKeywords.slice(0, 10).map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
            {score.missingKeywords.length > 10 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{score.missingKeywords.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}

      {score.suggestions.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Improvement Suggestions</h4>
          <ul className="space-y-1">
            {score.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};