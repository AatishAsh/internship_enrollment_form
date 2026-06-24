import { useFormContext, useWatch } from "react-hook-form";
import { CalendarDays, BookOpen, Briefcase, Award, Check } from "lucide-react";
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

const LEVELS_DATA = {
  sectionTitle: "Internship Levels",
  description: "The internship level will be assigned by our team based on your skills, knowledge, and performance during the evaluation process. Candidates are not required to select a level during registration.",
  levels: [
    {
      title: "Learning Level",
      description: "Assigned for beginners who are starting their learning journey",
      features: ["Guided training", "Mentorship support", "Beginner friendly"],
      footer: "Paid Learning Program"
    },
    {
      title: "Beginner Level",
      description: "Assigned for candidates with basic knowledge",
      features: ["Work on real-time projects", "Improve practical skills"],
      footer: "Unpaid Internship"
    },
    {
      title: "Professional Level",
      description: "Assigned for candidates with strong skills and experience",
      features: ["Work on advanced real-world projects", "High responsibility tasks"],
      footer: "Paid Internship (Salary Provided)"
    }
  ]
};

const Step3InternshipPreferences = ({ onNext, shake }) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const selectedDomains =
    useWatch({ control, name: "internshipDomains" }) || [];
  const isOtherSelected = selectedDomains.includes("Other");

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md md:max-w-5xl px-4 sm:px-6 mx-auto pt-4 pb-8">

        {/* Internship Levels Cards Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            {LEVELS_DATA.sectionTitle}
          </h2>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed">
            {LEVELS_DATA.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {LEVELS_DATA.levels.map((level) => {
            let Icon = BookOpen;
            let footerStyle = "bg-indigo-950/60 text-indigo-300 border-indigo-500/30 hover:bg-indigo-900/60";
            
            if (level.title.includes("Beginner")) {
              Icon = Briefcase;
              footerStyle = "bg-gray-900/60 text-gray-300 border-gray-700/50 hover:bg-gray-800/60";
            } else if (level.title.includes("Professional")) {
              Icon = Award;
              footerStyle = "bg-emerald-950/60 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/60";
            }

            return (
              <div
                key={level.title}
                className="bg-[#0f0f13] border border-gray-800/80 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group relative overflow-hidden"
              >
                {/* Visual Accent top border on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  {/* Card Header with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-gray-800/50 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                      {level.title}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="text-sm text-gray-400 mb-6 min-h-[40px] leading-relaxed">
                    {level.description}
                  </p>

                  {/* Card Features List */}
                  <ul className="space-y-3 mb-8">
                    {level.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visually Distinct Footer (Button-like) */}
                <div className={`w-full py-3 px-4 rounded-lg border text-center font-semibold text-sm transition-all duration-200 cursor-default ${footerStyle}`}>
                  {level.footer}
                </div>
              </div>
            );
          })}
        </div>

        {/* FORM CONTAINER - keeps form neat on larger screens */}
        <div className="max-w-2xl mx-auto">
          {/* FORM CARD */}
          <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

            <h2 className="text-2xl font-semibold mb-8">
              Internship Preferences
            </h2>

            {/* INTERNSHIP DOMAIN */}
            <div className="mb-6">
              <label className="block mb-3 font-medium">
                Preferred / Interested Internship Domain{" "}
                <span className="text-red-400">*</span>
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

              {/* OTHER INPUT */}
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

            {/* INTERNSHIP TYPE */}
            <div className="mb-6">
              <label className="block mb-3 font-medium">
                Available Internship Type{" "}
                <span className="text-red-400">*</span>
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

            {/* START DATE */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Preferred Start Date{" "}
                <span className="text-red-400">*</span>
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

            {/* DURATION */}
            <div className="mb-2">
              <label className="block mb-3 font-medium">
                Preferred Duration for Internship{" "}
                <span className="text-red-400">*</span>
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
          <div className="mt-5 mb-8 flex justify-center">
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
    </div>
  );
};

export default Step3InternshipPreferences;