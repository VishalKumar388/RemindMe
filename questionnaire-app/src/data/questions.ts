import { Question } from '../types';

export const questions: Question[] = [
  // Hobbies & Interests
  {
    id: 'hobbies',
    category: 'Hobbies & Interests',
    question: 'What are your favorite hobbies? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Reading',
      'Writing',
      'Photography',
      'Painting/Drawing',
      'Music (Playing/Listening)',
      'Dancing',
      'Sports',
      'Hiking/Outdoor Activities',
      'Gaming',
      'Cooking',
      'Gardening',
      'Traveling',
      'Crafting/DIY',
      'Collecting',
      'Technology',
      'Other'
    ],
    required: true
  },
  {
    id: 'hobby-frequency',
    category: 'Hobbies & Interests',
    question: 'How often do you engage in your hobbies?',
    type: 'multiple-choice',
    options: ['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Occasionally'],
    required: true
  },
  {
    id: 'new-activities',
    category: 'Hobbies & Interests',
    question: 'What new activity would you like to try?',
    type: 'textarea',
    required: false
  },

  // Food & Dining
  {
    id: 'favorite-cuisine',
    category: 'Food & Dining',
    question: 'What are your favorite cuisines? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Italian',
      'Chinese',
      'Japanese',
      'Indian',
      'Mexican',
      'French',
      'Thai',
      'Mediterranean',
      'American',
      'Korean',
      'Vietnamese',
      'Greek',
      'Middle Eastern',
      'Other'
    ],
    required: true
  },
  {
    id: 'dietary-preferences',
    category: 'Food & Dining',
    question: 'Do you have any dietary preferences or restrictions?',
    type: 'checkbox',
    options: [
      'Vegetarian',
      'Vegan',
      'Pescatarian',
      'Gluten-free',
      'Dairy-free',
      'Low-carb',
      'Keto',
      'No restrictions',
      'Other'
    ],
    required: true
  },
  {
    id: 'cooking-skills',
    category: 'Food & Dining',
    question: 'How would you rate your cooking skills?',
    type: 'rating',
    required: true
  },
  {
    id: 'favorite-dish',
    category: 'Food & Dining',
    question: 'What is your favorite dish to cook or eat?',
    type: 'text',
    required: false
  },

  // Movies & Entertainment
  {
    id: 'movie-genres',
    category: 'Movies & Entertainment',
    question: 'What are your favorite movie genres? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Science Fiction',
      'Fantasy',
      'Romance',
      'Thriller',
      'Documentary',
      'Animation',
      'Musical',
      'Mystery',
      'Adventure',
      'Crime'
    ],
    required: true
  },
  {
    id: 'favorite-movie',
    category: 'Movies & Entertainment',
    question: 'What is your all-time favorite movie?',
    type: 'text',
    required: false
  },
  {
    id: 'streaming-services',
    category: 'Movies & Entertainment',
    question: 'Which streaming services do you use? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Netflix',
      'Amazon Prime Video',
      'Disney+',
      'HBO Max',
      'Hulu',
      'Apple TV+',
      'YouTube Premium',
      'Spotify',
      'Other',
      'None'
    ],
    required: true
  },
  {
    id: 'entertainment-time',
    category: 'Movies & Entertainment',
    question: 'How many hours per week do you spend watching movies/shows?',
    type: 'multiple-choice',
    options: ['Less than 5 hours', '5-10 hours', '11-20 hours', '21-30 hours', 'More than 30 hours'],
    required: true
  },

  // Lifestyle
  {
    id: 'morning-routine',
    category: 'Lifestyle',
    question: 'How would you describe your morning routine?',
    type: 'multiple-choice',
    options: [
      'Early riser with structured routine',
      'Moderate morning person',
      'Not a morning person',
      'Flexible schedule',
      'Night owl'
    ],
    required: true
  },
  {
    id: 'exercise-frequency',
    category: 'Lifestyle',
    question: 'How often do you exercise?',
    type: 'multiple-choice',
    options: ['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Rarely', 'Never'],
    required: true
  },
  {
    id: 'preferred-exercise',
    category: 'Lifestyle',
    question: 'What types of exercise do you prefer? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Running/Jogging',
      'Weight Training',
      'Yoga',
      'Swimming',
      'Cycling',
      'Team Sports',
      'Dancing',
      'Walking',
      'Martial Arts',
      'Rock Climbing',
      'Other',
      'None'
    ],
    required: true
  },
  {
    id: 'social-preference',
    category: 'Lifestyle',
    question: 'How do you prefer to spend your free time?',
    type: 'multiple-choice',
    options: [
      'Socializing with friends',
      'Quiet time alone',
      'Mix of both',
      'Family time',
      'Outdoor activities'
    ],
    required: true
  },

  // Travel & Adventure
  {
    id: 'travel-frequency',
    category: 'Travel & Adventure',
    question: 'How often do you travel?',
    type: 'multiple-choice',
    options: [
      'Several times a year',
      'Once a year',
      'Every few years',
      'Rarely',
      'Never'
    ],
    required: true
  },
  {
    id: 'dream-destination',
    category: 'Travel & Adventure',
    question: 'What is your dream travel destination?',
    type: 'text',
    required: false
  },
  {
    id: 'travel-style',
    category: 'Travel & Adventure',
    question: 'What type of travel do you prefer?',
    type: 'multiple-choice',
    options: [
      'Adventure/Backpacking',
      'Luxury/Resort',
      'Cultural/Historical',
      'Beach/Relaxation',
      'City Exploration',
      'Nature/Wilderness',
      'Road Trips'
    ],
    required: true
  },

  // Personal Values & Goals
  {
    id: 'important-values',
    category: 'Personal Values & Goals',
    question: 'What values are most important to you? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Family',
      'Career Success',
      'Health & Fitness',
      'Financial Security',
      'Adventure',
      'Creativity',
      'Learning',
      'Helping Others',
      'Independence',
      'Spirituality',
      'Environmental Responsibility',
      'Community'
    ],
    required: true
  },
  {
    id: 'life-goal',
    category: 'Personal Values & Goals',
    question: 'What is one major goal you want to achieve in the next 5 years?',
    type: 'textarea',
    required: false
  },

  // Technology & Digital Life
  {
    id: 'tech-comfort',
    category: 'Technology & Digital Life',
    question: 'How comfortable are you with technology?',
    type: 'rating',
    required: true
  },
  {
    id: 'social-media',
    category: 'Technology & Digital Life',
    question: 'Which social media platforms do you use? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Facebook',
      'Instagram',
      'Twitter/X',
      'TikTok',
      'LinkedIn',
      'YouTube',
      'Snapchat',
      'Pinterest',
      'Reddit',
      'Other',
      'None'
    ],
    required: true
  }
];