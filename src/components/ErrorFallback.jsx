import * as Sentry from "@sentry/react";

export const ErrorFallback = ({ error, resetError }) => {
  return (
    <div role="alert" className="error-fallback">
      <h1>Something went wrong</h1>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={() => {
        Sentry.captureException(error);
        resetError();
      }}>
        Try again
      </button>
      <button onClick={() => window.location.href = "/"}>
        Go to Home
      </button>
    </div>
  );
};