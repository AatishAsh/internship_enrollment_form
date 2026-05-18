import { useFormContext, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";

const Step2AcademicDetails = ({ onNext, shake }) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const educationStatus = useWatch({ control, name: "educationStatus" });

  const isSchool = educationStatus === "School Student";
  const isCollege = educationStatus === "College Student";
  const isGraduate = educationStatus === "Recent Graduate";
  const isSelfLearner = educationStatus === "Self-Learner";

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Academic Details</h2>

          {/* CURRENT EDUCATION STATUS */}
          <div className="mb-6 relative">
            <label className="block mb-2 font-medium">
              Current Education Status <span className="text-red-400">*</span>
            </label>
            <select
              {...register("educationStatus", {
                onChange: () => clearErrors("educationStatus"),
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select Education Status</option>
              <option value="School Student">School Student</option>
              <option value="College Student">College Student</option>
              <option value="Recent Graduate">Recent Graduate</option>
              <option value="Self-Learner">Self-Learner</option>
            </select>
            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <ChevronDown />
            </span>
            {showErrors && errors.educationStatus && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.educationStatus.message}
              </p>
            )}
          </div>

          {/* ── SCHOOL STUDENT ── */}
          {isSchool && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  School Registration Number <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("schoolRegNumber", {
                    onChange: () => clearErrors("schoolRegNumber"),
                  })}
                  placeholder="e.g. SCH2024001"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.schoolRegNumber && (
                  <p className="mt-1 text-sm text-red-400">* {errors.schoolRegNumber.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Group <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("schoolGroup", {
                    onChange: () => clearErrors("schoolGroup"),
                  })}
                  placeholder="e.g. Computer Science, Biology"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.schoolGroup && (
                  <p className="mt-1 text-sm text-red-400">* {errors.schoolGroup.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Institution Name <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("schoolName", {
                    onChange: () => clearErrors("schoolName"),
                  })}
                  placeholder="e.g. St. Joseph's Higher Secondary School"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.schoolName && (
                  <p className="mt-1 text-sm text-red-400">* {errors.schoolName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Institution Address <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("schoolAddress", {
                    onChange: () => clearErrors("schoolAddress"),
                  })}
                  placeholder="e.g. 12, Anna Salai, Chennai - 600002"
                  rows={3}
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-24 focus:outline-none"
                />
                {showErrors && errors.schoolAddress && (
                  <p className="mt-1 text-sm text-red-400">* {errors.schoolAddress.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Graduation Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  {...register("schoolGraduationYear", {
                    onChange: () => clearErrors("schoolGraduationYear"),
                  })}
                  placeholder="e.g. 2025"
                  min={2000}
                  max={2100}
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.schoolGraduationYear && (
                  <p className="mt-1 text-sm text-red-400">* {errors.schoolGraduationYear.message}</p>
                )}
              </div>
            </>
          )}

          {/* ── COLLEGE STUDENT or RECENT GRADUATE (same fields) ── */}
          {(isCollege || isGraduate) && (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  College Registration Number <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("collegeRegNumber", {
                    onChange: () => clearErrors("collegeRegNumber"),
                  })}
                  placeholder="e.g. 21CS001"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.collegeRegNumber && (
                  <p className="mt-1 text-sm text-red-400">* {errors.collegeRegNumber.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Course / Degree Name <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("courseName", {
                    onChange: () => clearErrors("courseName"),
                  })}
                  placeholder="e.g. B.E Computer Science"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.courseName && (
                  <p className="mt-1 text-sm text-red-400">* {errors.courseName.message}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <label className="block mb-2 font-medium">
                  Year of Study <span className="text-red-400">*</span>
                </label>
                <select
                  {...register("yearOfStudy", {
                    onChange: () => clearErrors("yearOfStudy"),
                  })}
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="Completed">Completed / Alumni</option>
                </select>
                <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
                  <ChevronDown />
                </span>
                {showErrors && errors.yearOfStudy && (
                  <p className="mt-1 text-sm text-red-400">* {errors.yearOfStudy.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Institution / College Name <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("collegeName", {
                    onChange: () => clearErrors("collegeName"),
                  })}
                  placeholder="e.g. Anna University"
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.collegeName && (
                  <p className="mt-1 text-sm text-red-400">* {errors.collegeName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Institution / College Address <span className="text-red-400">*</span>
                </label>
                <textarea
                  {...register("collegeAddress", {
                    onChange: () => clearErrors("collegeAddress"),
                  })}
                  placeholder="e.g. Sardar Patel Road, Guindy, Chennai - 600025"
                  rows={3}
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-24 focus:outline-none"
                />
                {showErrors && errors.collegeAddress && (
                  <p className="mt-1 text-sm text-red-400">* {errors.collegeAddress.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Graduation Year <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  {...register("collegeGraduationYear", {
                    onChange: () => clearErrors("collegeGraduationYear"),
                  })}
                  placeholder="e.g. 2026"
                  min={2000}
                  max={2100}
                  className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
                />
                {showErrors && errors.collegeGraduationYear && (
                  <p className="mt-1 text-sm text-red-400">* {errors.collegeGraduationYear.message}</p>
                )}
              </div>
            </>
          )}

          {/* ── SELF LEARNER ── */}
          {isSelfLearner && (
            <div className="py-4 px-4 bg-[#0f0f0f] rounded-md text-gray-400 text-sm">
              No additional academic details required for Self-Learners. Click <span className="text-white font-medium">Next</span> to continue.
            </div>
          )}

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

export default Step2AcademicDetails;
