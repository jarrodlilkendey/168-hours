// Imports
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { Resource } from '@opentelemetry/resources'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'

export function register() {
    // Configure the trace provider
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SEMRESATTRS_SERVICE_NAME]: '168-hours-application',
            [SEMRESATTRS_SERVICE_VERSION]: '0.0.1',
        }),
    })

    // Configure how spans are processed and exported. In this case we're sending spans
    // as we receive them to an OTLP-compatible collector (e.g. Jaeger).
    provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()))

    // Register your auto-instrumentors
    registerInstrumentations({
        tracerProvider: provider,
        instrumentations: [
            new HttpInstrumentation(),
            new PrismaInstrumentation(),
        ],
    })

    // Register the provider globally
    provider.register()
}
