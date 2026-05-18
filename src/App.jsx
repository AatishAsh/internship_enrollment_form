import { useState } from "react";
import { FormProvider } from "react-hook-form";
import useEnrollmentForm from "./form/useEnrollmentForm";

import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2AcademicDetails from "./steps/Step2AcademicDetails";
import Step3InternshipPreferences from "./steps/Step3InternshipPreferences";
import Step4SkillsExperience from "./steps/Step4SkillsExperience";
import Step5Additional from "./steps/Step5Additional";
import Step6TermsAndConditions from "./steps/Step6TermsAndConditions";
import SuccessCompletion from "./steps/SuccessCompletion";

import TopBar from "./components/navigations/TopBar";
import ProgressBar from "./components/navigations/ProgressBar";
import { FormUIContext } from "./context/FormUIContext";
import BackgroundFileUploader from "./components/fileupload/BackgroundFileUploader";
import { Toaster } from "./components/ui/toaster";
import { useNoCopy } from "./hooks/useNoCopy";

const stepFields = {
  1: ["fullName", "gender", "email", "phone", "currentLocation"],

  2: (values) => {
    const base = ["educationStatus"];

    if (values.educationStatus === "School Student") {
      return [
        ...base,
        "schoolRegNumber",
        "schoolGroup",
        "schoolName",
        "schoolAddress",
        "schoolGraduationYear",
      ];
    }

    if (
      values.educationStatus === "College Student" ||
      values.educationStatus === "Recent Graduate"
    ) {
      return [
        ...base,
        "collegeRegNumber",
        "courseName",
        "yearOfStudy",
        "collegeName",
        "collegeAddress",
        "collegeGraduationYear",
      ];
    }

    return base;
  },

  3: (values) => {
    const base = [
      "internshipDomains",
      "internshipType",
      "preferredStartDate",
      "internshipDuration",
    ];

    if ((values.internshipDomains || []).includes("Other")) {
      return [...base, "internshipDomainOther"];
    }

    return base;
  },

  4: ["technicalSkills", "projectDetails", "resume"],

  5: (values) => {
    const base = ["hearAboutUs", "expectations", "declaration"];

    if (values.hearAboutUs === "Other") {
      return [...base, "hearAboutUsOther"];
    }

    return base;
  },

  6: ["acceptTerms"], // ✅ final submit step
};

function App() {
  const [step, setStep] = useState(1);
  const [shakeForm, setShakeForm] = useState(false);

  const form = useEnrollmentForm(setStep);

  useNoCopy(step);

  const nextStep = async () => {
    form.setShowErrors(true);

    const fieldsToValidate =
      typeof stepFields[step] === "function"
        ? stepFields[step](form.getValues())
        : stepFields[step];

    const isValid = await form.trigger(fieldsToValidate, {
      shouldFocus: false,
    });

    if (!isValid) {
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 400);
      return;
    }

    form.setShowErrors(false);

    // ✅ FINAL SUBMIT happens at Step 6
    if (step === 6) {
      const success = await form.onSubmit(form.getValues());
      if (success) setStep(7);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      <FormUIContext.Provider value={{ showErrors: form.showErrors }}>
        <FormProvider {...form}>

          {/* TOP BAR */}
          {step > 1 && step < 7 && (
            <TopBar onBack={() => setStep((prev) => prev - 1)} />
          )}

          {/* PROGRESS BAR */}
          {step > 1 && step < 7 && (
            <ProgressBar currentStep={step} setStep={setStep} totalSteps={6} />
          )}

          <BackgroundFileUploader currentStep={step} />

          {/* FORM */}
          <form onSubmit={form.handleSubmit(form.onSubmit)}>

            {step === 1 && (
              <Step1BasicInfo onNext={nextStep} shake={shakeForm} />
            )}

            {step === 2 && (
              <Step2AcademicDetails onNext={nextStep} shake={shakeForm} />
            )}

            {step === 3 && (
              <Step3InternshipPreferences onNext={nextStep} shake={shakeForm} />
            )}

            {step === 4 && (
              <Step4SkillsExperience onNext={nextStep} shake={shakeForm} />
            )}

            {/* ✅ Step5 → only NEXT */}
            {step === 5 && (
              <Step5Additional
                onNext={nextStep}
                shake={shakeForm}
              />
            )}

            {step === 6 && (
              <Step6TermsAndConditions
                onNext={nextStep}
                shake={shakeForm}
                isSubmitting={form.isSubmitting}
              />
            )}

            {/* SUCCESS */}
            {step === 7 && <SuccessCompletion />}

          </form>
        </FormProvider>
      </FormUIContext.Provider>

      <Toaster />
    </div>
  );
}

export default App;