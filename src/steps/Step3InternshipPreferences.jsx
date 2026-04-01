import { useFormContext, useWatch } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";

const DOMAINS = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "AI / Machine Learning",
  "IoT & Embedded Systems",
  "3D Modeling / Blender",
  "Digital Marketing / SEO",
  "Chrome Extension Development",
  "3D Printing",
  "Other",
];

const INTERNSHIP_TYPES = ["Remote", "In-office (Puducherry)", "Hybrid"];

const DURATIONS = [
  "1 month",
  "2 months",
  "3 months",
  "6 months",
  "Academic Project-Based",
];

const Step3InternshipPreferences = ({ onNext, shake }) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const selectedDomains = useWatch({ control, name: "internshipDomains" }) || [];
  const isOtherSelected = selectedDomains.includes("Other");

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Internship Preferences</h2>

          {/* INTERNSHIP DOMAIN — CHECKBOXES */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">
              Preferred / Interested Internship Domain <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {DOMAINS.map((domain) => (
                <label
                  key={domain}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={domain}
                    {...register("internshipDomains", {
                      onChange: () => clearErrors("internshipDomains"),
                    })}
                    className="w-5 h-5 rounded accent-white bg-[#0f0f0f] border-gray-600 cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {domain}
                  </span>
                </label>
              ))}
            </div>

            {/* OTHER TEXT INPUT */}
            {isOtherSelected && (
              <div className="mt-4">
                <input
                  {...register("internshipDomainOther", {
                    onChange: () => clearErrors("internshipDomainOther"),
                  })}
                  placeholder="Please specify your domain"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.internshipDomainOther && (
                  <p className="mt-1 text-sm text-red-400">
                    * {errors.internshipDomainOther.message}
                  </p>
                )}
              </div>
            )}

            {showErrors && errors.internshipDomains && (
              <p className="mt-2 text-sm text-red-400">
                * {errors.internshipDomains.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* INTERNSHIP TYPE — RADIO */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">
              Available Internship Type <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {INTERNSHIP_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("internshipType", {
                      onChange: () => clearErrors("internshipType"),
                    })}
                    className="w-5 h-5 accent-white bg-[#0f0f0f] cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
            {showErrors && errors.internshipType && (
              <p className="mt-2 text-sm text-red-400">
                * {errors.internshipType.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* PREFERRED START DATE */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Preferred Start Date <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("preferredStartDate", {
                  onChange: () => clearErrors("preferredStartDate"),
                })}
                className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white focus:outline-none"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                <CalendarDays />
              </span>
            </div>
            {showErrors && errors.preferredStartDate && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.preferredStartDate.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* INTERNSHIP DURATION — RADIO */}
          <div className="mb-2">
            <label className="block mb-3 font-medium">
              Preferred Duration for Internship <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {DURATIONS.map((duration) => (
                <label
                  key={duration}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={duration}
                    {...register("internshipDuration", {
                      onChange: () => clearErrors("internshipDuration"),
                    })}
                    className="w-5 h-5 accent-white bg-[#0f0f0f] cursor-pointer"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {duration}
                  </span>
                </label>
              ))}
            </div>
            {showErrors && errors.internshipDuration && (
              <p className="mt-2 text-sm text-red-400">
                * {errors.internshipDuration.message}
              </p>
            )}
          </div>

        </div>

        {/* NEXT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            className="max-w-lg w-full py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-200 transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3InternshipPreferences;
