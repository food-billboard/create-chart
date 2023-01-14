import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP !== 'static' &&
  Sentry.init({
    dsn: 'https://2babafe00db24c88931600842f6e202e@o1384315.ingest.sentry.io/6702540',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
