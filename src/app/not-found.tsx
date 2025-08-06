import Link from 'next/link'

/**
 * 404 Not Found Page
 * Next.js App Router not-found.tsx file
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center">
          {/* 404 Icon */}
          <div className="text-6xl mb-4">🔍</div>
          
          {/* 404 Message */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            404
          </h1>
          
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Seite nicht gefunden
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht hilft dir eine dieser Optionen:
          </p>
          
          {/* Navigation Options */}
          <div className="space-y-3 mb-6">
            <Link
              href="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Zur Startseite
            </Link>
            
            <Link
              href="/chat"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              💬 Chat starten
            </Link>
            
            <Link
              href="/help"
              className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              ❓ Hilfe & Support
            </Link>
          </div>
          
          {/* Popular Links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📝 Beliebte Bereiche
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                href="/evaluate"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                TestDaF Bewertung
              </Link>
              <Link
                href="/training"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                Training
              </Link>
              <Link
                href="/progress"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                Fortschritt
              </Link>
              <Link
                href="/pricing"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                Preise
              </Link>
            </div>
          </div>
          
          {/* Exam Types */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🎓 C1-Prüfungen
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                TestDaF
              </span>
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                Goethe C1
              </span>
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                telc C1
              </span>
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                DSH
              </span>
            </div>
          </div>
          
          {/* Search Suggestion */}
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            💡 Tipp: Nutze die Suche oder den Chat, um schnell zu finden, was du brauchst!
          </div>
        </div>
      </div>
    </div>
  )
}