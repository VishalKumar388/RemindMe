export interface PersonalInfo {
  name: string;
  dateOfBirth: string;
  orientation: string;
  spouseName?: string;
  spouseDateOfBirth?: string;
}

export interface QuestionnaireAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuestionnaireData {
  personalInfo: PersonalInfo;
  answers: QuestionnaireAnswer[];
}

export interface Question {
  id: string;
  category: string;
  question: string;
  type: 'text' | 'multiple-choice' | 'checkbox' | 'rating' | 'textarea';
  options?: string[];
  required?: boolean;
}