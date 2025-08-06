# Personal Questionnaire App

A comprehensive lifestyle and preferences questionnaire built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 Home Page
- Personal information collection (name, date of birth, orientation)
- Optional spouse/partner information
- Beautiful, responsive form design
- Input validation and user-friendly interface

### 📋 Comprehensive Questionnaire
- **Multiple Question Types**: Text, multiple choice, checkboxes, ratings, and text areas
- **7+ Categories**: 
  - Hobbies & Interests
  - Food & Dining
  - Movies & Entertainment
  - Lifestyle
  - Travel & Adventure
  - Personal Values & Goals
  - Technology & Digital Life

### ✨ Interactive Features
- Progress tracking with visual progress bar
- Category-based organization
- Question navigation (next/previous)
- Real-time answer validation
- Category completion indicators

### 📊 Results Page
- Beautiful summary of all responses
- Personal information display with calculated ages
- Categorized answer display
- Download results as JSON
- Completion statistics

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Modern responsive design**

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd questionnaire-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── HomePage.tsx          # Personal information form
│   ├── QuestionnaireForm.tsx # Main questionnaire interface
│   └── ResultsPage.tsx       # Results display and download
├── data/
│   └── questions.ts          # Question data and configuration
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main app component with routing
├── main.tsx                 # App entry point
└── index.css               # Global styles with Tailwind

```

## Question Categories

1. **Hobbies & Interests** - Favorite activities, frequency, new interests
2. **Food & Dining** - Cuisine preferences, dietary restrictions, cooking skills
3. **Movies & Entertainment** - Genre preferences, streaming services, viewing habits
4. **Lifestyle** - Morning routines, exercise habits, social preferences
5. **Travel & Adventure** - Travel frequency, dream destinations, travel style
6. **Personal Values & Goals** - Important values, life goals
7. **Technology & Digital Life** - Tech comfort level, social media usage

## Features in Detail

### Question Types
- **Text Input**: Free-form text responses
- **Multiple Choice**: Single selection from options
- **Checkboxes**: Multiple selections allowed
- **Rating**: 1-5 star rating system
- **Text Area**: Longer form responses

### Data Handling
- Client-side state management
- Form validation
- JSON export functionality
- Age calculation from birth dates
- Answer formatting and display

### UI/UX Features
- Gradient backgrounds for visual appeal
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Progress indicators and completion feedback
- Category-based navigation
- Accessible form controls

## Customization

### Adding New Questions
Edit `src/data/questions.ts` to add new questions:

```typescript
{
  id: 'unique-id',
  category: 'Category Name',
  question: 'Your question here?',
  type: 'text' | 'multiple-choice' | 'checkbox' | 'rating' | 'textarea',
  options: ['Option 1', 'Option 2'], // for multiple-choice/checkbox
  required: true | false
}
```

### Styling
The app uses Tailwind CSS. Modify classes in components or extend the theme in `tailwind.config.js`.

### Adding New Categories
Simply add questions with new category names - the app automatically groups them.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Data persistence with localStorage/sessionStorage
- User authentication and profile management
- Advanced analytics and insights
- Export to PDF format
- Question branching based on previous answers
- Multi-language support
- Accessibility improvements
- Dark mode theme
