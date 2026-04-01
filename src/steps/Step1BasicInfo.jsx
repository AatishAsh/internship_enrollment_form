import { useFormContext } from "react-hook-form";
import { ChevronDown, Phone, Globe, Mail, MapPin } from "lucide-react";
import { useFormUI } from "../context/FormUIContext";
import CompanyLogo from "../../public/images/FINAL.svg";
import CompanyName from "../../public/images/LogotextwithMotto.svg";

const Step1BasicInfo = ({ onNext, shake }) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { showErrors } = useFormUI();

  return (
    <div className="min-h-screen bg-[#000001] text-white overflow-x-hidden">

      {/* HEADER BOX */}
      <div
        className="-mx-6 bg-gray-800 py-11 pb-7 px-6 bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
      >
        <div className="max-w-md sm:max-w-lg mx-auto p-5">
          <div className="flex justify-start items-center gap-3 mt-0 mb-10">
            <div>
              <img
                src={CompanyLogo}
                alt="Company Logo"
                className="h-19.75 sm:h-20 md:h-28 w-auto object-contain"
              />
            </div>
            <div>
              <img
                src={CompanyName}
                alt="Company Name"
                className="h-16 sm:h-20 md:h-20 w-auto object-contain"
              />
            </div>
          </div>

          <h1 className="text-[27px] sm:text-3xl md:text-4xl font-bold mb-4">
            Apply for an Internship
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8">
            Please fill out the form below to submit your internship application.
          </p>

          <div className="space-y-4">
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Phone /> +91 7200353789
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Mail />
              shinecrafttech@gmail.com
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <Globe />
              www.shinecrafttechnologies.com
            </div>
            <div className="text-lg sm:text-xl flex items-center gap-2">
              <MapPin />
              Puducherry
            </div>
          </div>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="max-w-md sm:max-w-lg px-4 sm:px-6 mx-auto py-8">
        <div className={`bg-[#1a1a1a] shadow-lg rounded-md p-6 ${shake ? "shake" : ""}`}>

          <h2 className="text-2xl font-semibold mb-8">Basic Information</h2>

          {/* FULL NAME WITH INITIAL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Name with Initial <span className="text-red-400">*</span>
              <span className="text-[12.8px] text-gray-400 ml-1"></span>
            </label>
            <input
              {...register("fullName", {
                onChange: (e) => {
                  // Capitalize first letter of each word
                  const val = e.target.value;
                  e.target.value = val
                    .split(" ")
                    .map((word) =>
                      word.length > 0
                        ? word[0].toUpperCase() + word.slice(1)
                        : word
                    )
                    .join(" ");
                  clearErrors("fullName");
                },
              })}
              placeholder="e.g. Rahul K"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.fullName.message}
              </p>
            )}
          </div>

          {/* GENDER */}
          <div className="mb-4 relative">
            <label className="block mb-2 font-medium">
              Gender <span className="text-red-400">*</span>
            </label>
            <select
              {...register("gender", {
                onChange: () => clearErrors("gender"),
              })}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-gray-200 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span className="absolute right-4 top-12 text-gray-400 pointer-events-none">
              <ChevronDown />
            </span>
            {showErrors && errors.gender && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.gender.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              {...register("email", {
                onChange: () => clearErrors("email"),
              })}
              placeholder="e.g. rahul@gmail.com"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.email && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.email.message}
              </p>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register("phone", {
                onChange: () => clearErrors("phone"),
              })}
              placeholder="e.g. 9876543210"
              maxLength={10}
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.phone && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.phone.message}
              </p>
            )}
          </div>

          {/* CURRENT LOCATION */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Current Location <span className="text-red-400">*</span>
              <span className="text-[12.8px] text-gray-400 ml-1">(City, State)</span>
            </label>
            <input
              {...register("currentLocation", {
                onChange: () => clearErrors("currentLocation"),
              })}
              placeholder="e.g. Chennai, Tamil Nadu"
              className="w-full p-3 sm:p-4 rounded-md bg-[#0f0f0f] text-white placeholder-gray-400 focus:outline-none"
            />
            {showErrors && errors.currentLocation && (
              <p className="mt-1 text-sm text-red-400">
                * {errors.currentLocation.message}
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

export default Step1BasicInfo;
