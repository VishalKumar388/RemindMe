import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalInfo, QuestionnaireAnswer } from '../types';
import { questions } from '../data/questions';
import { User, Calendar, Heart, Home, Star, Download, RotateCcw } from 'lucide-react';

interface ResultsPageProps {
  personalInfo: PersonalInfo | null;
  questionnaireAnswers: QuestionnaireAnswer[];
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  personalInfo,
  questionnaireAnswers
}) => {
  const navigate = useNavigate();

  if (!personalInfo) {
    navigate('/');
    return null;
  }

  const getQuestionById = (id: string) => {
    return questions.find(q => q.id === id);
  };

  const getAnswerDisplay = (answer: string | string[], question: any) => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    
    if (question?.type === 'rating') {
      const rating = parseInt(answer as string);
      return (
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
      );
    }
    
    return answer;
  };

  // Group answers by category
  const answersByCategory = questionnaireAnswers.reduce((acc, answer) => {
    const question = getQuestionById(answer.questionId);
    if (question) {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push({ question, answer: answer.answer });
    }
    return acc;
  }, {} as Record<string, Array<{ question: any; answer: string | string[] }>>);

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleStartOver = () => {
    navigate('/');
  };

  const handleDownloadResults = () => {
    const resultsData = {
      personalInfo,
      questionnaireAnswers: answersByCategory,
      completedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(resultsData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questionnaire-results-${personalInfo.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Questionnaire Complete! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for sharing your preferences with us, {personalInfo.name}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleDownloadResults}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Results
          </button>
          <button
            onClick={handleStartOver}
            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start Over
          </button>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-green-600" />
            Personal Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{personalInfo.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(personalInfo.dateOfBirth).toLocaleDateString()} 
                    <span className="text-gray-600 ml-2">
                      (Age: {calculateAge(personalInfo.dateOfBirth)})
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Orientation</p>
                  <p className="font-semibold text-gray-900">{personalInfo.orientation}</p>
                </div>
              </div>
            </div>
            
            {personalInfo.spouseName && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Spouse/Partner</p>
                    <p className="font-semibold text-gray-900">{personalInfo.spouseName}</p>
                  </div>
                </div>
                
                {personalInfo.spouseDateOfBirth && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Partner's Date of Birth</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(personalInfo.spouseDateOfBirth).toLocaleDateString()}
                        <span className="text-gray-600 ml-2">
                          (Age: {calculateAge(personalInfo.spouseDateOfBirth)})
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Questionnaire Results */}
        <div className="space-y-8">
          {Object.entries(answersByCategory).map(([category, categoryAnswers]) => (
            <div key={category} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                {category}
              </h2>
              
              <div className="grid gap-6">
                {categoryAnswers.map(({ question, answer }, index) => (
                  <div key={question.id} className="border-l-4 border-purple-200 pl-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {question.question}
                    </h3>
                    <div className="text-gray-700">
                      {getAnswerDisplay(answer, question)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Summary
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.keys(answersByCategory).length}
              </div>
              <div className="text-gray-600">Categories Completed</div>
            </div>
            
            <div className="p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {questionnaireAnswers.length}
              </div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};