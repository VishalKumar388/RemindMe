import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalInfo } from '../types';
import { User, Heart, Calendar, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onPersonalInfoSubmit: (info: PersonalInfo) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPersonalInfoSubmit }) => {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    dateOfBirth: '',
    orientation: '',
    spouseName: '',
    spouseDateOfBirth: ''
  });

  const orientationOptions = [
    'Straight',
    'Gay',
    'Lesbian',
    'Bisexual',
    'Pansexual',
    'Asexual',
    'Prefer not to say',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalInfo.name && personalInfo.dateOfBirth && personalInfo.orientation) {
      onPersonalInfoSubmit(personalInfo);
      navigate('/questionnaire');
    }
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = personalInfo.name && personalInfo.dateOfBirth && personalInfo.orientation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Questionnaire</h1>
          <p className="text-lg text-gray-600">
            Get to know yourself better through our comprehensive lifestyle questionnaire
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-indigo-600" />
            Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={personalInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="orientation" className="block text-sm font-medium text-gray-700 mb-2">
                Sexual Orientation *
              </label>
              <select
                id="orientation"
                value={personalInfo.orientation}
                onChange={(e) => handleInputChange('orientation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              >
                <option value="">Select your orientation</option>
                {orientationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Spouse Information (Optional)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="spouseName" className="block text-sm font-medium text-gray-700 mb-2">
                    Spouse/Partner Name
                  </label>
                  <input
                    type="text"
                    id="spouseName"
                    value={personalInfo.spouseName}
                    onChange={(e) => handleInputChange('spouseName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter spouse/partner name"
                  />
                </div>

                <div>
                  <label htmlFor="spouseDateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Spouse/Partner Date of Birth
                  </label>
                  <input
                    type="date"
                    id="spouseDateOfBirth"
                    value={personalInfo.spouseDateOfBirth}
                    onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                isFormValid
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continue to Questionnaire
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};