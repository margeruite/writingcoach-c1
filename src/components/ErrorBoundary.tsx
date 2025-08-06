'use client'

import React, { Component, ReactNode } from 'react'

import { isDev } from '@/lib/env'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Update state with error info
    this.setState({ error, errorInfo })
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo)
    
    // TODO: Send to error monitoring service (Sentry)
    // if (isProd) {
    //   Sentry.captureException(error, { contexts: { react: { errorInfo } } })
    // }
  }

  override render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      // Default error UI
      return <DefaultErrorFallback error={this.state.error} errorInfo={this.state.errorInfo} />
    }

    return this.props.children
  }
}

/**
 * Default Error Fallback Component
 */
function DefaultErrorFallback({ error, errorInfo }: { error?: Error; errorInfo?: React.ErrorInfo }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="text-6xl mb-4">⚠️</div>
          
          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Etwas ist schiefgelaufen
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Entschuldigung! Es gab ein unerwartetes Problem. Bitte versuche es erneut oder kontaktiere den Support.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              🔄 Seite neu laden
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Zur Startseite
            </button>
          </div>
          
          {/* Development Error Details */}
          {isDev && error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                🔍 Debug Information (Development only)
              </summary>
              <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-sm font-mono text-red-800 dark:text-red-200 space-y-2">
                  <div>
                    <strong>Error:</strong> {error.name}
                  </div>
                  <div>
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-2 whitespace-pre-wrap text-xs overflow-x-auto">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-2 whitespace-pre-wrap text-xs overflow-x-auto">
                        {errorInfo.componentStack}
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

/**
 * Specialized Error Boundaries for different contexts
 */

/**
 * Chat Error Boundary
 * For errors in the chat interface
 */
export function ChatErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">💬❌</div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            Chat-Problem
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Der Chat konnte nicht geladen werden. Versuche es erneut.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            🔄 Chat neu laden
          </button>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error('Chat Error:', error, errorInfo)
        // TODO: Track chat-specific errors
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Evaluation Error Boundary  
 * For errors in text evaluation
 */
export function EvaluationErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-4xl mb-2">📝❌</div>
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
            Bewertungs-Fehler
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300 mb-4">
            Die Textbewertung konnte nicht durchgeführt werden. Versuche es erneut oder wende dich an den Support.
          </p>
          <div className="space-x-3">
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🔄 Erneut versuchen
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
            >
              🏠 Startseite
            </button>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error('Evaluation Error:', error, errorInfo)
        // TODO: Track evaluation-specific errors with high priority
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Payment Error Boundary
 * For errors in payment processing
 */
export function PaymentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 text-center bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="text-4xl mb-2">💳❌</div>
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Payment-Problem
          </h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-4">
            Es gab ein Problem mit der Zahlungsabwicklung. Deine Zahlung wurde NICHT belastet.
          </p>
          <div className="space-x-3">
            <button 
              onClick={() => window.location.reload()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🔄 Erneut versuchen
            </button>
            <button
              onClick={() => window.location.href = '/support'}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
            >
              🎧 Support kontaktieren
            </button>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error('Payment Error:', error, errorInfo)
        // TODO: High priority error tracking for payment issues
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * HOC for adding error boundary to any component
 */
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}