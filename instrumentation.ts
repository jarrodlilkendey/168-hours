import { registerOTel } from '@vercel/otel'

export function register() {
    registerOTel({ serviceName: '168-hours-app' })
}
