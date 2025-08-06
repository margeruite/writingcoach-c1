'use client'

import { useEffect } from 'react'

import { isDev } from '@/lib/env'

/**
 * Global Error Page
 * Next.js App Router error.tsx file
 * Handles errors in app directory
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to the console
    console.error('App Router Error:', error)
    
    // TODO: Log to error monitoring service
    // if (isProd && window.Sentry) {
    //   window.Sentry.captureException(error)
    // }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="text-6xl mb-4">🚫</div>
          
          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Anwendungsfehler
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Es ist ein Fehler in der Anwendung aufgetreten. Das WritingCoach Team wurde automatisch benachrichtigt.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => reset()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              🔄 Erneut versuchen
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Zur Startseite
            </button>
          </div>
          
          {/* Support Information */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🎧 Brauchen Sie Hilfe?
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Wenn das Problem weiterhin besteht, kontaktieren Sie uns unter support@writingcoach-c1.com
            </p>
          </div>
          
          {/* Development Error Details */}
          {isDev && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                🔍 Error Details (Development only)
              </summary>
              <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-sm font-mono text-red-800 dark:text-red-200 space-y-2">
                  <div>
                    <strong>Error:</strong> {error.name}
                  </div>
                  <div>
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div>
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                  {error.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="mt-2 whitespace-pre-wrap text-xs overflow-x-auto max-h-40">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}