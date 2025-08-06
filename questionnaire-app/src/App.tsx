import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { ResultsPage } from './components/ResultsPage';
import { PersonalInfo, QuestionnaireAnswer } from './types';
import './App.css';

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswer[]>([]);

  const handlePersonalInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  const handleQuestionnaireSubmit = (answers: QuestionnaireAnswer[]) => {
    setQuestionnaireAnswers(answers);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage onPersonalInfoSubmit={handlePersonalInfoSubmit} />
            } 
          />
          <Route 
            path="/questionnaire" 
            element={
              <QuestionnaireForm 
                personalInfo={personalInfo}
                onQuestionnaireSubmit={handleQuestionnaireSubmit}
              />
            } 
          />
          <Route 
            path="/results" 
            element={
              <ResultsPage 
                personalInfo={personalInfo}
                questionnaireAnswers={questionnaireAnswers}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
