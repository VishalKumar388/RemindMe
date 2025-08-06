import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question, QuestionnaireAnswer, PersonalInfo } from '../types';
import { questions } from '../data/questions';
import { ChevronLeft, ChevronRight, Star, Check, FileText } from 'lucide-react';

interface QuestionnaireFormProps {
  personalInfo: PersonalInfo | null;
  onQuestionnaireSubmit: (answers: QuestionnaireAnswer[]) => void;
}

export const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  personalInfo,
  onQuestionnaireSubmit
}) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  if (!personalInfo) {
    navigate('/');
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Convert answers to the required format
      const questionnaireAnswers: QuestionnaireAnswer[] = Object.entries(answers).map(
        ([questionId, answer]) => ({
          questionId,
          answer
        })
      );
      onQuestionnaireSubmit(questionnaireAnswers);
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.required) {
      if (Array.isArray(answer)) {
        return answer.length > 0;
      }
      return answer && answer.trim() !== '';
    }
    return true; // Optional questions can be skipped
  };

  const renderQuestion = (question: Question) => {
    const answer = answers[question.id];

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(answer as string) || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Type your answer here..."
          />
        );

      case 'textarea':
        return (
          <textarea
            value={(answer as string) || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Share your thoughts..."
          />
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  answer === option
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answer === option
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}
                >
                  {answer === option && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const selectedOptions = (answer as string[]) || [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedOptions.includes(option)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleAnswer(question.id, [...selectedOptions, option]);
                    } else {
                      handleAnswer(question.id, selectedOptions.filter(item => item !== option));
                    }
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                    selectedOptions.includes(option)
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedOptions.includes(option) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'rating':
        const rating = parseInt((answer as string) || '0');
        return (
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleAnswer(question.id, star.toString())}
                className="p-2 transition-all hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <div className="ml-4 text-sm text-gray-600 self-center">
              {rating > 0 ? `${rating}/5` : 'Click to rate'}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Group questions by category for progress indicator
  const categories = [...new Set(questions.map(q => q.category))];
  const currentCategory = currentQuestion.category;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hi {personalInfo.name}!
          </h1>
          <p className="text-lg text-gray-600">
            Let's learn more about your preferences and lifestyle
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {currentCategory}
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
            {currentQuestion.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </h2>

          {renderQuestion(currentQuestion)}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-white hover:shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              isAnswered()
                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Category Progress */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => {
              const categoryQuestions = questions.filter(q => q.category === category);
              const categoryStartIndex = questions.findIndex(q => q.category === category);
              const categoryEndIndex = categoryStartIndex + categoryQuestions.length - 1;
              const isCompleted = currentQuestionIndex > categoryEndIndex;
              const isCurrent = currentCategory === category;
              
              return (
                <div
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted
                      ? 'bg-green-100 text-green-800'
                      : isCurrent
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category}
                  {isCompleted && (
                    <Check className="w-3 h-3 inline ml-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};