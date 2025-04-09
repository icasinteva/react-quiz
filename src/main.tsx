import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Quiz from './components/Quiz';
import { QuizProvider } from './contexts/quiz';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  </StrictMode>
);
