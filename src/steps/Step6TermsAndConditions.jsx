import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

const Step6TermsAndConditions = ({ onNext, shake, isSubmitting }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const accepted = watch("acceptTerms");

  return (
    <div
      className={`min-h-screen bg-[#000001] text-white p-6 sm:p-8 ${
        shake ? "animate-shake" : ""
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Terms and Conditions
        </h1>

        {/* ✅ TERMS CONTENT */}
        <div className="bg-[#1a1a1a] rounded-md p-6 space-y-6 max-h-[60vh] overflow-y-auto">

          <section>
            <h2 className="text-xl font-semibold mb-2">Eligibility Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Applicant must be currently studying or recently graduated.</li>
              <li>Applicant must meet the required educational qualification.</li>
              <li>Applicant should have the required skills for the internship role.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Applicant Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>All information provided must be true and correct.</li>
              <li>Submission does not guarantee selection.</li>
              <li>All required documents must be uploaded.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Selection Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>The company has the right to shortlist candidates.</li>
              <li>Only selected candidates will be contacted.</li>
              <li>Applications may be rejected without reason.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Attendance Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Interns must attend regularly.</li>
              <li>Leave should be informed in advance.</li>
              <li>Poor attendance may lead to cancellation.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Work Responsibility Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Tasks must be completed on time.</li>
              <li>Maintain discipline and professionalism.</li>
              <li>Follow mentor/supervisor instructions.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Internship Mode Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Internship can be Online, Offline, or Hybrid.</li>
              <li>Interns must arrange their own resources.</li>
              <li>Must be available during working hours.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Termination Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Internship may be terminated for misconduct.</li>
              <li>Poor performance may lead to cancellation.</li>
              <li>False information may result in rejection.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Certificate Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Certificate given only after completion.</li>
              <li>All tasks must be completed.</li>
              <li>Poor attendance may result in no certificate.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Consent Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Applicant agrees to all terms.</li>
              <li>Confirms all details are correct.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Submission Confirmation Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Check for submission confirmation.</li>
              <li>Company not responsible for incomplete forms.</li>
              <li>Keep screenshot of submission.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Communication Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Updates will be sent via email/mobile.</li>
              <li>Check messages regularly.</li>
              <li>Only shortlisted candidates will be contacted.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Security Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Do not share login credentials.</li>
              <li>Company not responsible for misuse.</li>
              <li>User responsible for account activity.</li>
            </ul>
          </section>

          <hr className="border-gray-700" />

          <section>
            <h2 className="text-xl font-semibold mb-2">Final Consent Terms</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>All details entered are correct.</li>
              <li>Applicant completed all actions personally.</li>
              <li>Applicant accepts company’s final decision.</li>
            </ul>
          </section>

        </div>

        {/* ✅ CHECKBOX */}
        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="terms"
            {...register("acceptTerms", {
              required: "You must accept terms",
            })}
            className="w-4 h-4"
          />

          <label htmlFor="terms" className="text-gray-300">
            I agree to the Terms and Conditions
          </label>
        </div>

        {/* ERROR */}
        {errors.acceptTerms && (
          <p className="text-red-400 mt-2 text-sm">
            {errors.acceptTerms.message}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onNext}
            disabled={!accepted || isSubmitting}
            className={`px-6 py-3 rounded-full text-lg font-bold transition-all
              ${
                accepted && !isSubmitting
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
          >
            Submit Application
          </button>
        </div>
      </div>

      {/* FULL-SCREEN LOADING OVERLAY — shown while submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">

          {/* Spinner */}
          <div className="w-16 h-16 rounded-full border-4 border-gray-600 border-t-white animate-spin mb-6" />

          {/* Message */}
          <p className="text-white text-xl font-semibold mb-2">
            Submitting your application...
          </p>
          <p className="text-gray-400 text-sm text-center max-w-xs px-4">
            Please wait and do not close this page.
            <br />
            Uploading your documents to Server.
          </p>
        </div>
      )}
    </div>
  );
};

export default Step6TermsAndConditions;