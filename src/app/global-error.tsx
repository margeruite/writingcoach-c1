'use client'

import { useEffect } from 'react'

import { isDev } from '@/lib/env'

/**
 * Global Error Handler
 * Next.js App Router global-error.tsx file
 * Catches errors in the root layout and above
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the critical error
    console.error('Global Error (Critical):', error)
    
    // TODO: Send critical error to monitoring service immediately
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, { level: 'fatal' })
    // }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="max-w-md w-full">
            <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-red-200">
              {/* Critical Error Icon */}
              <div className="text-6xl mb-4">🚨</div>
              
              {/* Error Message */}
              <h1 className="text-2xl font-bold text-red-800 mb-4">
                Kritischer Systemfehler
              </h1>
              
              <p className="text-red-600 mb-6">
                Es ist ein schwerwiegender Fehler aufgetreten. Die Anwendung kann momentan nicht geladen werden.
              </p>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => reset()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  🔄 Anwendung neu starten
                </button>
                
                <button
                  onClick={() => window.location.href = 'https://writingcoach-c1.com'}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  🌐 Hauptseite besuchen
                </button>
              </div>
              
              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-300">
                <h3 className="text-sm font-semibold text-red-800 mb-2">
                  🆘 Notfall-Support
                </h3>
                <p className="text-xs text-red-700">
                  Kritischer Fehler gemeldet. Unser Team arbeitet an der Lösung.
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Email: emergency@writingcoach-c1.com
                </p>
              </div>
              
              {/* Development Error Details */}
              {isDev && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
                    🔍 Critical Error Details (Development only)
                  </summary>
                  <div className="mt-3 p-4 bg-red-100 rounded-lg border border-red-300">
                    <div className="text-sm font-mono text-red-900 space-y-2">
                      <div>
                        <strong>Error Type:</strong> {error.name} (GLOBAL/CRITICAL)
                      </div>
                      <div>
                        <strong>Message:</strong> {error.message}
                      </div>
                      {error.digest && (
                        <div>
                          <strong>Digest:</strong> {error.digest}
                        </div>
                      )}
                      <div>
                        <strong>Timestamp:</strong> {new Date().toISOString()}
                      </div>
                      {error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="mt-2 whitespace-pre-wrap text-xs overflow-x-auto max-h-32 bg-white p-2 rounded border">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}
              
              {/* System Status */}
              <div className="mt-4 text-xs text-gray-500">
                System Status: Error • WritingCoach C1 v0.1.0
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}