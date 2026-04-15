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

const Step5Additional = ({ onNext, shake }) => {
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
                <label key={source} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    value={source}
                    {...register("hearAboutUs", {
                      onChange: () => clearErrors("hearAboutUs"),
                    })}
                    className="w-5 h-5 accent-white bg-[#0f0f0f]"
                  />
                  <span className="text-gray-300 group-hover:text-white">
                    {source}
                  </span>

                  {source === "Other" && isOther && (
                    <input
                      {...register("hearAboutUsOther", {
                        onChange: () => clearErrors("hearAboutUsOther"),
                      })}
                      placeholder="Please specify"
                      className="flex-1 p-2 rounded-md bg-[#0f0f0f] text-white border border-gray-700"
                    />
                  )}
                </label>
              ))}
            </div>

            {showErrors && errors.hearAboutUs && (
              <p className="text-red-400 text-sm mt-2">
                * {errors.hearAboutUs.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* EXPECTATIONS */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Your expectations from this internship{" "}
              <span className="text-red-400">*</span>
            </label>

            <textarea
              {...register("expectations", {
                onChange: () => clearErrors("expectations"),
              })}
              rows={5}
              className="w-full p-3 rounded-md bg-[#0f0f0f] text-white"
            />

            {showErrors && errors.expectations && (
              <p className="text-red-400 text-sm mt-2">
                * {errors.expectations.message}
              </p>
            )}
          </div>

          <hr className="border-gray-700 mb-6" />

          {/* DECLARATION */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("declaration", {
                onChange: () => clearErrors("declaration"),
              })}
              className="w-5 h-5 mt-1"
            />
            <span className="text-gray-300 text-sm">
              I confirm all details are correct.
            </span>
          </label>

          {showErrors && errors.declaration && (
            <p className="text-red-400 text-sm mt-2">
              * {errors.declaration.message}
            </p>
          )}
        </div>

        {/* ✅ NEXT BUTTON (not submit) */}
        <div className="mt-5 mb-8">
            
            <button
  type="button"
  onClick={onNext}
  className="w-full py-4 rounded-full text-lg font-bold bg-white text-black hover:bg-gray-200"
>
  Next
</button>
        </div>
      </div>
    </div>
  );
};

export default Step5Additional;