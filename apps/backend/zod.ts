import z, { minLength } from 'zod';

export const alumniSignupSchema = z.object({
    email : z.string(),
    Role  : z.enum(["ADMIN","ALUMNI","STUDENT"]),
    password : z.string().min(6),
    name     : z.string(),
    company  : z.string(),
    jobTitle : z.string(),
    bio      : z.string(),
    linkedInUrl : z.string(),
    GraduationYear  : z.number().positive()
})
export const adminSignupSchema = z.object({
    email : z.string(),
    Role  : z.enum(["ADMIN","ALUMNI","STUDENT"]),
    password : z.string().min(6),
    name     : z.string(),
})
export const SigninSchema = z.object({
    email : z.string(),
    password : z.string().min(6),
})
export const studentSignupSchema = z.object({
    email : z.string(),
    Role  : z.enum(["ADMIN","ALUMNI","STUDENT"]),
    password : z.string().min(6),
    name     : z.string(),
    GraduationYear  : z.number().positive()
})
export const JobSchema = z.object({
    company      : z.string(),
    deadline     : z.iso.datetime().transform((val)=>Temporal.Instant.from(val)),
    link         : z.string(),
    description  : z.string(),
    type         : z.enum(["PARTTIME","FULLTIME"]),
    location     : z.string(),
    stipend      : z.string(),
    status       : z.enum(["OPEN","CLOSED"])  
})
export const EventSchema = z.object({
    title        : z.string(),
    time         : z.iso.datetime().transform((val)=>Temporal.Instant.from(val)),
    link         : z.string(),
    description  : z.string(),
})
export const BlogSchema = z.object({
    title        : z.string(),
    description  : z.string(),
})
