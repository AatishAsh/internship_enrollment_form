import { useFormContext, useWatch } from "react-hook-form";
import { useFormUI } from "../context/FormUIContext";

const REFERRAL_SOURCES = [
  "Instagram",
  "LinkedIn",
  "College Referral",
  "Friend / Word of Mouth",
  "Website",
  "Other",
];

const Step5Additional = ({ onNext, shake, isSubmitting }) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  const hearAboutUs = useWatch({ control, name: "hearAboutUs" });
  const isOther = hearAboutUs === "Other";
  const declaration = useWatch({ control, name: "declaration" });

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto pt-4 pb-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Additional Information</h2>

          {/* HOW DID YOU HEAR ABOUT US */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">
              How did you hear about Shine Craft Technologies?{" "}
              <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              {REFERRAL_SOURCES.map((source) => (
                <label
                  key={source}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    value={source}
                    {...register("hearAboutUs", {
                      onChange: () => clearErrors("hearAboutUs"),
                    })}
                    className="w-5 h-5 accent-white bg-[#0f0f0f] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {source}
                  </span>

                  {/* Inline text input when Other is selected */}
                  {source === "Other" && isOther && (
                    <input
                      {...register("hearAboutUsOther", {
                        onChange: () => clearErrors("hearAboutUsOther"),
                      })}
                      placeholder="Please specify"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 p-2 rounded-md bg-[#0f0f0f] text-white placeholder-gray-500 text-sm focus:outline-none border border-gray-700"
                    />
                  )}
                </label>
              ))}
            </div>
            {showErrors && errors.hearAboutUs && (
              <p className="mt-2 text-sm text-red-400">
                * {errors.hearAboutUs.message}
              </p>
            )}
            {showErrors && isOther && errors.hearAboutUsOther && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.hearAboutUsOther.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* EXPECTATIONS / GOALS */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Do you have any specific expectations or goals from this internship?{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("expectations", {
                onChange: () => clearErrors("expectations"),
              })}
              placeholder="e.g. I want to gain hands-on experience in web development and work on real-world projects to build my portfolio..."
              rows={5}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 resize-y min-h-32 focus:outline-none"
            />
            {showErrors && errors.expectations && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.expectations.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* ACKNOWLEDGEMENT */}
          <div className="mb-2">
            <label className="block mb-3 font-medium">
              Acknowledgement <span className="text-red-400">*</span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register("declaration", {
                  onChange: () => clearErrors("declaration"),
                })}
                className="w-5 h-5 mt-0.5 accent-white bg-[#0f0f0f] cursor-pointer flex-shrink-0"
              />
              <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                I confirm that all information provided above is accurate and
                truthful and I understand this is a learning-based internship
                and may not include monetary compensation.
              </span>
            </label>

            {showErrors && errors.declaration && (
              <p className="mt-2 text-sm text-red-400">
                * {errors.declaration.message}
              </p>
            )}
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <div className="mt-5 mb-8">
          <button
            type="button"
            onClick={onNext}
            disabled={isSubmitting || !declaration}
            className={`max-w-lg w-full py-4 rounded-full text-lg font-bold transition-colors duration-200
              ${
                declaration && !isSubmitting
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Step5Additional;
