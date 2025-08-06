import { z } from 'zod'

/**
 * Environment Variables Schema
 * Validates all required environment variables at runtime
 */

const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // Database
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  DIRECT_URL: z.string().optional(), // Neon direct connection
  
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32, "NextAuth secret must be at least 32 characters"),
  
  // AI Services
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  ANTHROPIC_API_KEY: z.string().optional(), // Claude Haiku for task generation
  
  // Google Services
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLOUD_KEY: z.string().optional(), // For OCR
  
  // Payment
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  
  // External Services
  REDIS_URL: z.string().optional(), // Upstash for caching
  RESEND_API_KEY: z.string().optional(), // Email service
  
  // Monitoring & Analytics
  SENTRY_DSN: z.string().optional(),
  POSTHOG_KEY: z.string().optional(),
  POSTHOG_HOST: z.string().optional(),
})

/**
 * Environment Variables Type
 * Inferred from schema for type safety
 */
export type Env = z.infer<typeof envSchema>

/**
 * Validate and parse environment variables
 * Throws error if validation fails
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`❌ Invalid environment variables:\n${missingVars}`)
    }
    throw error
  }
}

/**
 * Validated environment variables
 * Safe to use throughout the application
 */
export const env = validateEnv()

/**
 * Type-safe environment variable access
 * Usage: env.DATABASE_URL, env.OPENAI_API_KEY, etc.
 */

/**
 * Development helpers
 */
export const isDev = env.NODE_ENV === 'development'
export const isProd = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

/**
 * Feature flags based on environment
 */
export const features = {
  // AI Services
  openAiEnabled: !!env.OPENAI_API_KEY,
  claudeEnabled: !!env.ANTHROPIC_API_KEY,
  ocrEnabled: !!env.GOOGLE_CLOUD_KEY,
  
  // Authentication
  googleAuthEnabled: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
  
  // Payment
  paymentsEnabled: !!(env.STRIPE_SECRET_KEY && env.STRIPE_PUBLISHABLE_KEY),
  
  // Monitoring
  sentryEnabled: !!env.SENTRY_DSN,
  analyticsEnabled: !!env.POSTHOG_KEY,
  
  // Performance
  redisEnabled: !!env.REDIS_URL,
  emailEnabled: !!env.RESEND_API_KEY,
} as const

/**
 * Environment-specific configurations
 */
export const config = {
  // Database
  database: {
    url: env.DATABASE_URL,
    directUrl: env.DIRECT_URL,
  },
  
  // Authentication
  auth: {
    secret: env.NEXTAUTH_SECRET,
    url: env.NEXTAUTH_URL,
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  
  // AI Services
  ai: {
    openai: {
      apiKey: env.OPENAI_API_KEY,
    },
    anthropic: {
      apiKey: env.ANTHROPIC_API_KEY,
    },
    google: {
      apiKey: env.GOOGLE_CLOUD_KEY,
    },
  },
  
  // Payment
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    publishableKey: env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  },
  
  // App
  app: {
    url: env.NEXT_PUBLIC_APP_URL,
    nodeEnv: env.NODE_ENV,
  },
} as const

/**
 * Runtime environment validation
 * Call this in your app startup to ensure all required vars are present
 */
export function validateEnvironment() {
  // Validating environment variables...
  
  const requiredForDev = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'OPENAI_API_KEY']
  const missing = requiredForDev.filter(key => !process.env[key])
  
  if (missing.length > 0 && isDev) {
    console.warn(`⚠️  Missing development environment variables: ${missing.join(', ')}`)
    console.warn('Some features may not work properly.')
  }
  
  if (isProd && missing.some(key => !process.env[key])) {
    throw new Error(`❌ Missing required production environment variables: ${missing.join(', ')}`)
  }
  
  // Environment validation complete
  // Running in ${env.NODE_ENV} mode
  
  // Log enabled features
  const enabledFeatures = Object.entries(features)
    .filter(([_, enabled]) => enabled)
    .map(([feature]) => feature)
  
  if (enabledFeatures.length > 0) {
    // Enabled features logged
  }
}