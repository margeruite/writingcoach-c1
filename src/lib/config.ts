import { env, isDev, isProd, isTest } from './env'

/**
 * Application Configuration
 * Environment-specific settings for WritingCoach C1
 */

export const appConfig = {
  // App Information
  app: {
    name: 'WritingCoach C1',
    description: 'AI-powered C1 German writing coach for international students',
    version: '0.1.0',
    url: env.NEXT_PUBLIC_APP_URL,
  },

  // Development Configuration
  development: {
    // Database
    database: {
      logging: true,
      pool: { min: 1, max: 5 },
      ssl: false,
    },
    
    // AI Services
    ai: {
      openai: {
        maxRetries: 3,
        timeout: 30000,
        model: 'gpt-4o',
        temperature: 0.3,
        maxTokens: 2000,
      },
      anthropic: {
        model: 'claude-3-haiku-20240307',
        maxTokens: 1000,
      },
    },
    
    // Caching
    cache: {
      enabled: false,
      ttl: 60, // 1 minute in dev
    },
    
    // Logging
    logging: {
      level: 'debug',
      prettyPrint: true,
      logRequests: true,
    },
    
    // Rate Limiting (lenient in dev)
    rateLimiting: {
      enabled: false,
      requests: 1000,
      windowMs: 60 * 1000, // 1 minute
    },
    
    // Features (more permissive in dev)
    features: {
      skipEmailVerification: true,
      allowTestAccounts: true,
      mockPayments: true,
      detailedErrors: true,
    },
  },

  // Production Configuration
  production: {
    // Database
    database: {
      logging: false,
      pool: { min: 5, max: 20 },
      ssl: true,
      connectionTimeout: 10000,
    },
    
    // AI Services
    ai: {
      openai: {
        maxRetries: 5,
        timeout: 45000,
        model: 'gpt-4o',
        temperature: 0.3,
        maxTokens: 2000,
        enableCaching: true,
      },
      anthropic: {
        model: 'claude-3-haiku-20240307',
        maxTokens: 1000,
        enableCaching: true,
      },
    },
    
    // Caching (aggressive in production)
    cache: {
      enabled: true,
      ttl: 3600, // 1 hour
      promptCache: {
        enabled: true,
        ttl: 86400, // 24 hours
      },
    },
    
    // Logging (minimal in production)
    logging: {
      level: 'info',
      prettyPrint: false,
      logRequests: false,
      structuredLogs: true,
    },
    
    // Rate Limiting (strict in production)
    rateLimiting: {
      enabled: true,
      free: {
        requests: 10,
        windowMs: 60 * 60 * 1000, // 1 hour
      },
      paid: {
        requests: 1000,
        windowMs: 60 * 60 * 1000, // 1 hour
      },
      premium: {
        requests: 10000,
        windowMs: 60 * 60 * 1000, // 1 hour
      },
    },
    
    // Features (security-focused in production)
    features: {
      skipEmailVerification: false,
      allowTestAccounts: false,
      mockPayments: false,
      detailedErrors: false,
    },
    
    // Security
    security: {
      helmet: true,
      cors: {
        origin: [env.NEXT_PUBLIC_APP_URL],
        credentials: true,
      },
      rateLimit: true,
      csrf: true,
    },
  },

  // Test Configuration
  test: {
    // Database
    database: {
      logging: false,
      pool: { min: 1, max: 3 },
      ssl: false,
    },
    
    // AI Services (mocked in tests)
    ai: {
      mock: true,
      openai: {
        model: 'gpt-3.5-turbo', // cheaper for tests
        maxTokens: 500,
      },
    },
    
    // Caching (disabled in tests)
    cache: {
      enabled: false,
    },
    
    // Logging (minimal in tests)
    logging: {
      level: 'error',
      prettyPrint: false,
    },
    
    // Features (test-friendly)
    features: {
      skipEmailVerification: true,
      allowTestAccounts: true,
      mockPayments: true,
      detailedErrors: true,
    },
  },
} as const

/**
 * Get current environment configuration
 */
function getCurrentConfig() {
  if (isDev) return appConfig.development
  if (isProd) return appConfig.production  
  if (isTest) return appConfig.test
  return appConfig.development // fallback
}

/**
 * Current configuration based on NODE_ENV
 */
export const config = {
  ...appConfig.app,
  ...getCurrentConfig(),
} as const

/**
 * C1 Exam Specific Configuration
 */
export const examConfig = {
  // Supported exam types
  supportedExams: ['testdaf', 'goethe_c1', 'telc_c1_hochschule', 'dsh'] as const,
  
  // Evaluation targets (from PRD)
  targets: {
    consistency: 0.95, // >95% consistency
    processingTime: 30000, // <30 seconds
    passRate: 0.85, // >85% user pass rate
    satisfaction: 4.5, // >4.5/5 user satisfaction
  },
  
  // Scoring systems per exam
  scoring: {
    testdaf: {
      scale: 'TDN',
      levels: ['TDN_3', 'TDN_4', 'TDN_5'],
      passingLevel: 'TDN_4',
      criteria: 3,
    },
    goethe_c1: {
      scale: 'points',
      maxPoints: 100,
      passingScore: 60,
      criteria: 4,
    },
    telc_c1_hochschule: {
      scale: 'A-D',
      levels: ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'],
      passingRequirement: 0.6, // 60% of total points
      criteria: 4,
    },
    dsh: {
      scale: 'percentage',
      levels: ['DSH-1', 'DSH-2', 'DSH-3'],
      passingScore: 67, // DSH-2
      criteria: 3,
      weights: [0.40, 0.30, 0.30], // Content, Structure, Language
    },
  },
  
  // Word count requirements
  wordCount: {
    testdaf: { min: 200, max: 350, target: 250 },
    goethe_c1: {
      task1: { min: 300, max: 400, target: 350 },
      task2: { min: 150, max: 250, target: 200 },
    },
    telc_c1_hochschule: { min: 200, max: 300, target: 250 },
    dsh: { min: 200, max: 300, target: 250 },
  },
  
  // Time limits (in minutes)
  timeLimit: {
    testdaf: 60,
    goethe_c1: 80,
    telc_c1_hochschule: 70,
    dsh: 70,
  },
} as const

/**
 * Feature flags for different environments
 */
export const featureFlags = {
  // AI Features
  evaluation: {
    enabled: env.OPENAI_API_KEY !== 'sk-your-openai-key-here',
    consistency: examConfig.targets.consistency,
    maxProcessingTime: examConfig.targets.processingTime,
  },
  
  // OCR
  ocr: {
    enabled: env.GOOGLE_CLOUD_KEY !== 'your-google-cloud-vision-key-here',
    supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  
  // Payment
  payments: {
    enabled: env.STRIPE_SECRET_KEY?.startsWith('sk_'),
    tiers: ['free', 'single', 'training', 'simulation', 'powerpass'],
    prices: {
      single: 9, // €9
      training: 49, // €49/month  
      simulation: 69, // €69/month
      powerpass: 99, // €99/14 days
    },
  },
  
  // Analytics
  analytics: {
    enabled: isProd && !!env.POSTHOG_KEY,
    events: ['text_submitted', 'evaluation_completed', 'user_registered'],
  },
  
  // Monitoring
  monitoring: {
    enabled: isProd && !!env.SENTRY_DSN,
    captureLevel: isProd ? 'error' : 'debug',
  },
} as const

/**
 * Export environment-aware configuration
 */
export { isDev, isProd, isTest, env }

/**
 * Utility functions
 */
export const utils = {
  // Check if feature is enabled
  isFeatureEnabled: (feature: keyof typeof featureFlags) => {
    return featureFlags[feature].enabled
  },
  
  // Get exam configuration
  getExamConfig: (examType: typeof examConfig.supportedExams[number]) => {
    return examConfig.scoring[examType]
  },
  
  // Check if environment is ready
  isEnvironmentReady: () => {
    const required = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXT_PUBLIC_APP_URL']
    return required.every(key => env[key as keyof typeof env])
  },
} as const

/**
 * Environment validation on import
 */
if (isProd && !utils.isEnvironmentReady()) {
  throw new Error('❌ Production environment is not properly configured')
}

console.log(`🔧 Configuration loaded for ${env.NODE_ENV} environment`)
if (isDev) {
  console.log('🚀 Development mode: Enhanced logging and debugging enabled')
  console.log('🎯 Available features:', Object.keys(featureFlags).filter(key => featureFlags[key as keyof typeof featureFlags].enabled))
}