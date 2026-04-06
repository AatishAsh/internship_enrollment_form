const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#000001] text-white p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="bg-[#1a1a1a] rounded-md p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Internship Agreement</h2>
            <p className="text-gray-300 leading-relaxed">
              By submitting this internship application, you agree to participate in the internship program 
              offered by Shine Craft Technologies. You acknowledge that this is an educational opportunity 
              designed to provide practical experience in your field of interest.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Responsibilities</h2>
            <p className="text-gray-300 leading-relaxed">
              As an intern, you are responsible for:
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Attending all scheduled internship sessions</li>
                <li>Completing assigned tasks and projects</li>
                <li>Maintaining professional conduct</li>
                <li>Following company policies and guidelines</li>
              </ul>
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Confidentiality</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to maintain the confidentiality of any proprietary information, 
              trade secrets, or sensitive data you may access during your internship. 
              Unauthorized disclosure of company information is strictly prohibited.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Code of Conduct</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to conduct yourself professionally and respect the rights and dignity 
              of all colleagues. Discrimination, harassment, or unethical behavior will not be tolerated.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              Any work, code, designs, or materials created during the internship period are the 
              property of Shine Craft Technologies unless otherwise agreed upon in writing.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              Shine Craft Technologies is not responsible for any personal injury or property damage 
              that occurs during the internship period, except where required by law.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              Both the intern and Shine Craft Technologies reserve the right to terminate the internship 
              at any time with written notice, subject to applicable laws.
            </p>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Acknowledgement</h2>
            <p className="text-gray-300 leading-relaxed">
              By checking the "I agree to the Terms and Conditions" checkbox in the application form, 
              you confirm that you have read, understood, and agree to be bound by these terms.
            </p>
          </section>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => window.close()}
            className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Close Tab
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
