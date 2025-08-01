import { z, ZodType } from "zod";

// Common validation patterns
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const emailSchema = z.string().email("Please enter a valid email address");
const phoneSchema = z
  .string()
  .regex(phoneRegex, "Please enter a valid phone number");
const requiredString = z.string().min(1, "This field is required");

// Staff/Faculty validation schema
export const staffSchema = z.object({
  firstName: requiredString.min(2, "First name must be at least 2 characters"),
  lastName: requiredString.min(2, "Last name must be at least 2 characters"),
  email: emailSchema,
  phone: phoneSchema,
  role: requiredString,
  department: requiredString,
  location: requiredString,
  joinDate: requiredString,
  employeeId: requiredString,
  specialization: z.string().optional(),
  experience: z.string().optional(),
  qualifications: z.string().optional(),
  notes: z.string().optional(),
  coursesAssigned: z.array(z.string()).optional().default([]),
  permissions: z.array(z.string()).optional().default(["basic_access"]),
});

// Student validation schema
export const studentSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  dob: z.string(),
  email: z.string().email(),
  emergency_contact: z.object({
    name: z.string(),
    phone: z.string(),
  }),
  is_active: z.boolean(),
  phone: z.string(),
});

// Course validation schema
export const courseSchema = z.object({
  title: z.string().nonempty("Title is required"),
  shortDescription: z.string().nonempty("Short description is required"),
  fullDescription: z.string().nonempty("Full description is required"),
  category: z.string().nonempty("Category is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  status: z.enum(["draft", "active", "archived"]),
  language: z.string().nonempty("Language is required"),
  price: z.string().nonempty("Price is required"),
  currency: z.string().nonempty("Currency is required"),
  duration: z.string().nonempty("Duration is required"),
  durationUnit: z.enum(["weeks", "months", "hours"]),
  maxStudents: z.string().nonempty("Max students is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  format: z.string().nonempty("Format is required"),
  instructor: z.string().nonempty("Instructor is required"),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).optional(),
  enrollmentDeadline: z.string().optional(),
});

// Course module validation schema
export const courseModuleSchema = z.object({
  id: z.string(),
  title: requiredString,
  description: z.string().optional(),
  duration: z.string().optional(),
  resources: z.array(z.string()).optional().default([]),
});

// Learning objective validation schema
export const learningObjectiveSchema = z.object({
  id: z.string(),
  objective: requiredString,
});

// Prerequisite validation schema
export const prerequisiteSchema = z.object({
  id: z.string(),
  prerequisite: requiredString,
});

// Institute validation schema
export const instituteSchema = z.object({
  name: requiredString.min(3, "Institute name must be at least 3 characters"),
  email: emailSchema,
  phone: phoneSchema,
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  address: requiredString,
  city: requiredString,
  state: requiredString,
  country: requiredString,
  postalCode: requiredString,
  establishedYear: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  accreditation: z.string().optional(),
  description: requiredString.min(
    50,
    "Description must be at least 50 characters"
  ),
  specializations: z.array(z.string()).optional().default([]),
  contactPersonName: requiredString,
  contactPersonEmail: emailSchema,
  contactPersonPhone: phoneSchema,
  contactPersonPosition: requiredString,
});

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "partner", "institute", "student"]),
});

// Permission assignment schema
export const permissionAssignmentSchema = z.object({
  userId: requiredString,
  permissions: z
    .array(z.string())
    .min(1, "At least one permission must be selected"),
});

// Email template schema
export const emailTemplateSchema = z.object({
  name: requiredString.min(3, "Template name must be at least 3 characters"),
  subject: requiredString.min(5, "Subject must be at least 5 characters"),
  content: requiredString.min(20, "Content must be at least 20 characters"),
  category: requiredString,
  isActive: z.boolean().default(true),
});

// Export types for TypeScript
export type StaffFormData = z.infer<typeof staffSchema>;
export type CourseModuleData = z.infer<typeof courseModuleSchema>;
export type LearningObjectiveData = z.infer<typeof learningObjectiveSchema>;
export type PrerequisiteData = z.infer<typeof prerequisiteSchema>;
export type InstituteFormData = z.infer<typeof instituteSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type PermissionAssignmentData = z.infer<
  typeof permissionAssignmentSchema
>;
export type StudentFormData = z.infer<typeof studentSchema>;
export type EmailTemplateData = z.infer<typeof emailTemplateSchema>;
