import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as Sentry from "@sentry/react"; // Import Sentry
import { ErrorFallback } from './components/ErrorFallback'; // Import the ErrorFallback component

// Initialize Sentry
Sentry.init({
  dsn: "https://9e0e0ee399791da93bf2d6c54304abd5@o4508625988550656.ingest.us.sentry.io/4508625991237632",
  integrations: [
    Sentry.BrowserTracingIntegration(),
    Sentry.ReplayIntegration(),
  ],
  tracesSampleRate: 1.0, // Capture 100% of transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% on error sessions
});

// Create the root element and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}> {/* Use the ErrorFallback component */}
      <DarkModeProvider>
        <Router>
          <App />
        </Router>
      </DarkModeProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);