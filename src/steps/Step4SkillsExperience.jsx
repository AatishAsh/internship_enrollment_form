import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";

const Step4SkillsExperience = ({ onNext, shake }) => {
  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const removeFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== indexToRemove);
    setSelectedFiles(updatedFiles);
    setValue("resume", updatedFiles, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Skills & Experience</h2>

          {/* TECHNICAL SKILLS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Briefly describe your technical skills / experience{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("technicalSkills", {
                onChange: () => clearErrors("technicalSkills"),
              })}
              placeholder="e.g. I have experience in HTML, CSS, JavaScript and React. I've built a few landing pages and small web apps..."
              rows={5}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-32 focus:outline-none"
            />
            {showErrors && errors.technicalSkills && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.technicalSkills.message}
              </p>
            )}
          </div>

          {/* PROJECTS */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Have you worked on any personal or academic projects? Briefly explain{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("projectDetails", {
                onChange: () => clearErrors("projectDetails"),
              })}
              placeholder="e.g. I built a to-do app using React and Firebase as part of my college mini project. I also made a personal portfolio website..."
              rows={5}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-32 focus:outline-none"
            />
            {showErrors && errors.projectDetails && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.projectDetails.message}
              </p>
            )}
          </div>

          {/* LINKEDIN / GITHUB / PORTFOLIO */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              LinkedIn Profile / GitHub / Portfolio{" "}
              <span className="text-gray-400 text-sm font-normal">(Optional)</span>
            </label>
            <input
              {...register("profileLink", {
                onChange: () => clearErrors("profileLink"),
              })}
              placeholder="e.g. https://github.com/yourname"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.profileLink && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.profileLink.message}
              </p>
            )}
          </div>

          {/* RESUME / PORTFOLIO UPLOAD */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Attach Resume / Portfolio{" "}
              <span className="text-red-400">*</span>
              <span className="text-[12.8px] text-gray-400 ml-1">
                (PDF, DOC, DOCX — max 10MB)
              </span>
            </label>

            <label
              htmlFor="resumeUpload"
              className={`w-full p-4 border-2 border-dashed rounded-md
                bg-[#0f0f0f] text-gray-300 cursor-pointer
                flex flex-col items-center justify-center gap-2
                transition-colors border-gray-500 hover:border-gray-400`}
            >
              {selectedFiles.length === 0 && (
                <span className="text-center flex items-center gap-2">
                  Click to upload your resume <Upload size={20} />
                </span>
              )}

              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full bg-black/40 px-3 py-2 rounded-md text-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFile(index);
                    }}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </label>

            <input
              type="file"
              id="resumeUpload"
              multiple={false}
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files || []);
                if (newFiles.length === 0) return;

                setSelectedFiles(newFiles);
                setValue("resume", newFiles, { shouldValidate: true });
                clearErrors("resume");
                e.target.value = "";
              }}
            />

            {showErrors && errors.resume && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.resume.message}
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

export default Step4SkillsExperience;
