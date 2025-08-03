export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LinkedIn Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our beta program and be among the first to experience the future of LinkedIn automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">AI-Powered</div>
            <p className="text-gray-600">
              Advanced AI creates content that matches your professional voice and expertise
            </p>
          </div>

          <div className="text-center p-8 bg-green-50 rounded-2xl">
            <div className="text-3xl font-bold text-green-600 mb-2">Time-Saving</div>
            <p className="text-gray-600">
              Automate your entire LinkedIn content strategy and focus on what matters most
            </p>
          </div>

          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">Results-Driven</div>
            <p className="text-gray-600">Optimize posting times and content for maximum engagement and reach</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to transform your LinkedIn presence?</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-2">🚀 Early Access Program</h3>
            <p className="text-blue-700 text-sm">
              Be among the first to try Autorly! Join our beta program and get exclusive early access with special
              pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
