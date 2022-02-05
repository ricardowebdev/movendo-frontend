import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing"
import config from '../../config.json';

function init() {
    Sentry.init({
        dsn: config.dsn,
        environment: config.environment,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log
}