import React from 'react';
import { Certification } from '../../types/resume';
import { DatePicker } from '../common/DatePicker';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      organization: '',
      issueDate: null,
      expirationDate: null,
      credentialId: '',
      credentialUrl: ''
    };
    onChange([...data, newCertification]);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  return (
    <div className="section-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="btn-secondary flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No certifications yet. Click "Add Certification" to showcase your credentials.
        </p>
      )}

      {data.map((certification, index) => (
        <div key={certification.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Certification {index + 1}</h4>
            <button
              onClick={() => removeCertification(certification.id)}
              className="text-red-600 hover:text-red-800 p-1"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name *
              </label>
              <input
                type="text"
                value={certification.name}
                onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                placeholder="e.g., AWS Certified Solutions Architect"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={certification.organization}
                onChange={(e) => updateCertification(certification.id, 'organization', e.target.value)}
                placeholder="e.g., Amazon Web Services (AWS)"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <DatePicker
                selected={certification.issueDate}
                onChange={(date) => updateCertification(certification.id, 'issueDate', date)}
                placeholder="Select issue date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <DatePicker
                selected={certification.expirationDate}
                onChange={(date) => updateCertification(certification.id, 'expirationDate', date)}
                placeholder="Select expiration date"
                minDate={certification.issueDate || undefined}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                value={certification.credentialId || ''}
                onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                placeholder="e.g., ABCD-1234"
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential URL
              </label>
              <input
                type="url"
                value={certification.credentialUrl || ''}
                onChange={(e) => updateCertification(certification.id, 'credentialUrl', e.target.value)}
                placeholder="e.g., https://aws.amazon.com/certification/verify"
                className="form-input"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};