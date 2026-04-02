import * as yup from "yup";

const phoneRegex = /^[6-9]\d{9}$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;

export default yup.object({

  // ── STEP 1 : BASIC INFORMATION ──────────────────────────────────────────────

  fullName: yup
    .string()
    .required("Full name is required"),

  gender: yup
  .string()
  .required("Please select a gender")
  .oneOf(["Male", "Female"], "Please select a valid gender"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid 10-digit phone number"),

  currentLocation: yup
    .string()
    .required("Current location is required"),

  // ── STEP 2 : ACADEMIC DETAILS ────────────────────────────────────────────────

  educationStatus: yup
    .string()
    .required("Education status is required"),

  // School fields — only required when educationStatus is "School Student"
  schoolRegNumber: yup
    .string()
    .when("educationStatus", {
      is: "School Student",
      then: (schema) =>
        schema
          .required("School registration number is required")
          .matches(alphaNumericRegex, "Only letters and numbers allowed"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  schoolGroup: yup
    .string()
    .when("educationStatus", {
      is: "School Student",
      then: (schema) => schema.required("Group is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  schoolName: yup
    .string()
    .when("educationStatus", {
      is: "School Student",
      then: (schema) => schema.required("Institution name is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  schoolAddress: yup
    .string()
    .when("educationStatus", {
      is: "School Student",
      then: (schema) => schema.required("Institution address is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  schoolGraduationYear: yup
    .number()
    .when("educationStatus", {
      is: "School Student",
      then: (schema) =>
        schema
          .typeError("Enter a valid year")
          .required("Graduation year is required")
          .min(2000, "Year must be after 2000")
          .max(2100, "Enter a valid year"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  // College / Recent Graduate fields
  collegeRegNumber: yup
    .string()
    .when("educationStatus", {
      is: (val) => val === "College Student" || val === "Recent Graduate",
      then: (schema) =>
        schema
          .required("College registration number is required")
          .matches(alphaNumericRegex, "Only letters and numbers allowed"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  courseName: yup
    .string()
    .when("educationStatus", {
      is: (val) => val === "College Student" || val === "Recent Graduate",
      then: (schema) => schema.required("Course / Degree name is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  collegeName: yup
    .string()
    .when("educationStatus", {
      is: (val) => val === "College Student" || val === "Recent Graduate",
      then: (schema) => schema.required("Institution name is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  collegeAddress: yup
    .string()
    .when("educationStatus", {
      is: (val) => val === "College Student" || val === "Recent Graduate",
      then: (schema) => schema.required("Institution address is required"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  collegeGraduationYear: yup
    .number()
    .when("educationStatus", {
      is: (val) => val === "College Student" || val === "Recent Graduate",
      then: (schema) =>
        schema
          .typeError("Enter a valid year")
          .required("Graduation year is required")
          .min(2000, "Year must be after 2000")
          .max(2100, "Enter a valid year"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  // ── STEP 3 : INTERNSHIP PREFERENCES ─────────────────────────────────────────

  internshipDomains: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one domain")
    .required("Please select at least one domain"),

  internshipDomainOther: yup
    .string()
    .when("internshipDomains", {
      is: (val) => Array.isArray(val) && val.includes("Other"),
      then: (schema) => schema.required("Please specify your domain"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  internshipType: yup
    .string()
    .required("Please select an internship type"),

  preferredStartDate: yup
    .date()
    .typeError("Please select a valid start date")
    .required("Preferred start date is required")
    .min(new Date(), "Start date must be in the future"),

  internshipDuration: yup
    .string()
    .required("Please select a preferred duration"),

  // ── STEP 4 : SKILLS & EXPERIENCE ─────────────────────────────────────────────

  technicalSkills: yup
    .string()
    .required("Please describe your technical skills")
    .min(20, "Please provide at least a brief description (20 characters)"),

  projectDetails: yup
    .string()
    .required("Please describe your projects")
    .min(20, "Please provide at least a brief description (20 characters)"),

  profileLink: yup
    .string()
    .nullable()
    .optional()
    .test("valid-url", "Enter a valid URL (e.g. https://github.com/you)", (value) => {
      if (!value || value.trim() === "") return true; // optional
      return urlRegex.test(value);
    }),

  resume: yup
    .mixed()
    .required("Please upload your resume or portfolio")
    .test("fileExists", "Please upload your resume or portfolio", (value) => {
      return value && Array.isArray(value) && value.length > 0;
    }),

  // ── STEP 5 : ADDITIONAL INFORMATION ──────────────────────────────────────────

  hearAboutUs: yup
    .string()
    .required("Please tell us how you heard about us"),

  hearAboutUsOther: yup
    .string()
    .when("hearAboutUs", {
      is: "Other",
      then: (schema) => schema.required("Please specify how you heard about us"),
      otherwise: (schema) => schema.nullable().optional(),
    }),

  expectations: yup
    .string()
    .required("Please share your expectations or goals")
    .min(20, "Please provide at least a brief description (20 characters)"),

  declaration: yup
    .boolean()
    .oneOf([true], "You must accept the acknowledgement before submitting"),
});
