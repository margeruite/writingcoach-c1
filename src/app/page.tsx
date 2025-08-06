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
            AI-powered writing coach for your C1 exam
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            TestDaF • Goethe C1 • telc C1 Hochschule • DSH
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            🎯 Your Mission: Pass C1!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We help international students pass their C1 German exam 
            and get admitted to German universities. With personalized AI coaching 
            through an intelligent chat interface.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              GPT-4o Evaluations
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &gt;95% Consistency • &lt;30 Seconds • All 4 Exam Types
            </p>
          </div>
          
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Conversational Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Chat Interface • L1-Adaptive • Emotional AI
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-8">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            🚧 In Development - Micro-Step 3 of 150 completed
          </p>
        </div>

        {/* Success Metrics */}
        <div className="text-sm text-gray-500 dark:text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-semibold">Target: 95%</div>
            <div>Consistency</div>
          </div>
          <div>
            <div className="font-semibold">Target: 85%</div>
            <div>Pass Rate</div>
          </div>
          <div>
            <div className="font-semibold">Target: &lt;30s</div>
            <div>Evaluation Time</div>
          </div>
          <div>
            <div className="font-semibold">Target: 4.5/5</div>
            <div>Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
