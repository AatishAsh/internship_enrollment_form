import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import useEnrollmentForm from "./form/useEnrollmentForm";

import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2AcademicDetails from "./steps/Step2AcademicDetails";
import Step3InternshipPreferences from "./steps/Step3InternshipPreferences";
import Step4SkillsExperience from "./steps/Step4SkillsExperience";
import Step5Additional from "./steps/Step5Additional";
import SuccessCompletion from "./steps/SuccessCompletion";
import TopBar from "./components/navigations/TopBar";
import ProgressBar from "./components/navigations/ProgressBar";
import { FormUIContext } from "./context/FormUIContext";
import BackgroundFileUploader from "./components/fileupload/BackgroundFileUploader";
import { Toaster } from "./components/ui/toaster";

const stepFields = {
  1: [
    "fullName",
    "gender",
    "email",
    "phone",
    "currentLocation",
  ],


  2: (values) => {
  const base = ["educationStatus"];

  if (values.educationStatus === "School Student") {
    return [...base, "schoolRegNumber", "schoolGroup", "schoolName", "schoolAddress", "schoolGraduationYear"];
  }

  if (values.educationStatus === "College Student" || values.educationStatus === "Recent Graduate") {
    return [...base, "collegeRegNumber", "courseName", "collegeName", "collegeAddress", "collegeGraduationYear"];
  }

  return base; // Self-Learner
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

4: [
  "technicalSkills",
  "projectDetails",
  "resume",
  // profileLink is optional, skip validation
],

  5: (values) => {
  const base = ["hearAboutUs", "expectations", "declaration"];

  if (values.hearAboutUs === "Other") {
    return [...base, "hearAboutUsOther"];
  }

  return base;
},

};

function App() {
  const [step, setStep] = useState(1);
  const form = useEnrollmentForm(setStep);
  const [shakeForm, setShakeForm] = useState(false);

  const nextStep = async () => {
    form.setShowErrors(true);

    const fieldsToValidate =
      typeof stepFields[step] === "function"
        ? stepFields[step](form.getValues())
        : stepFields[step];

    const valid = await form.trigger(fieldsToValidate, {
      shouldFocus: false,
    });

    if (!valid) {
      //  trigger shake
      setShakeForm(true);

      // remove shake class after animation
      setTimeout(() => setShakeForm(false), 400);
      return;
    }

    form.setShowErrors(false);

    if (step === 5) {
      await form.onSubmit(form.getValues());
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div>
      <FormUIContext.Provider value={{ showErrors: form.showErrors }}>
        <FormProvider {...form}>
          {/* TOP BAR */}
          {step > 1 && step < 6 && <TopBar onBack={() => setStep(step - 1)} />}

          {/* PROGRESS BAR */}
          {step > 1 && step < 6 && (
            <ProgressBar currentStep={step} setStep={setStep} />
          )}

          <BackgroundFileUploader currentStep={step} />

          {/* STEP CONTENT */}
          <form onSubmit={form.handleSubmit(form.onSubmit)}>
            {step === 1 && (
              <Step1BasicInfo onNext={nextStep} shake={shakeForm} />
            )}
            {step === 2 && (
              <Step2AcademicDetails onNext={nextStep} shake={shakeForm} />
            )}
            {step === 3 && <Step3InternshipPreferences onNext={nextStep} shake={shakeForm} />}
            {step === 4 && (<Step4SkillsExperience onNext={nextStep} shake={shakeForm} />
            )}
            {step === 5 && (
              <Step5Additional
                onNext={nextStep}
                shake={shakeForm}
                isSubmitting={form.isSubmitting}
              />
            )}
            {step === 6 && <SuccessCompletion />}
          </form>
        </FormProvider>
      </FormUIContext.Provider>
      <Toaster />
    </div>
  );
}

export default App;
