export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
            📚 WritingCoach C1
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            KI-gestützter Schreibcoach für deine C1-Prüfung
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            TestDaF • Goethe C1 • telc C1 Hochschule • DSH
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            🎯 Deine Mission: C1 bestehen!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Wir helfen internationalen Studierenden dabei, ihre C1-Deutschprüfung zu bestehen 
            und an deutschen Universitäten zugelassen zu werden. Mit personalisierten KI-Coaching 
            durch eine intelligente Chat-Oberfläche.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              GPT-4o Bewertungen
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &gt;95% Konsistenz • &lt;30 Sekunden • Alle 4 Prüfungstypen
            </p>
          </div>
          
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Dialogisches Lernen
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Chat-Interface • L1-adaptiv • Emotionale KI
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-8">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            🚧 In Entwicklung - Micro-Step 3 von 150 abgeschlossen
          </p>
        </div>

        {/* Success Metrics */}
        <div className="text-sm text-gray-500 dark:text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-semibold">Ziel: 95%</div>
            <div>Konsistenz</div>
          </div>
          <div>
            <div className="font-semibold">Ziel: 85%</div>
            <div>Bestehensrate</div>
          </div>
          <div>
            <div className="font-semibold">Ziel: &lt;30s</div>
            <div>Bewertungszeit</div>
          </div>
          <div>
            <div className="font-semibold">Ziel: 4.5/5</div>
            <div>Zufriedenheit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
