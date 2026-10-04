import 'dotenv/config'
import express, { type Request, type Response } from "express"
import { adminSignupSchema, alumniSignupSchema, SigninSchema, studentSignupSchema } from "../zod";
import { db } from "db/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_PASSWORD = process.env.JWT_PASSWORD;
console.log(JWT_PASSWORD);
export const alumniSignup = async function(req:Request,res:Response){
    const isInputValid = alumniSignupSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json({message});
    }
    const { email,password,Role,name,GraduationYear,company,jobTitle,bio,linkedInUrl } = isInputValid.data;
    const foundInPending = await db.orm.public.PendingApproval.where({email}).first();
    if(foundInPending){return res.status(409).json('you are pending to be approved by admin');}
    const foundInUser = await db.orm.public.User.where({email}).first();
    if(foundInUser){return res.status(401).json('you may login');}
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);
    const newAdminApproval = await db.orm.public.PendingApproval.create({email,passwordHash,role:Role,name,graduationYear:GraduationYear,company,bio,linkedinUrl:linkedInUrl,jobTitle});
    return res.json({newAdminApproval});
}
export const userSignup = async function(req:Request,res:Response){
    const isInputValid = studentSignupSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json({message});
    }
    const { email,password,Role,name,GraduationYear } = isInputValid.data;
    const foundInPending = await db.orm.public.PendingApproval.where({email}).first();
    if(foundInPending){return res.status(409).json('you are pending to be approved by admin');}
    const foundInUser = await db.orm.public.User.where({email}).first();
    if(foundInUser){return res.status(401).json('you may login');}
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);
    const newStudentApproval = await db.orm.public.PendingApproval.create({email,passwordHash,role:Role,name,graduationYear:GraduationYear});
    return res.json({newStudentApproval});
}
export const adminSignup = async function(req:Request,res:Response){
    console.log('reached admin signup in userController',req.body);
    const isInputValid = adminSignupSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json({message});
    }
    const { email,password,Role,name } = isInputValid.data;
    const foundInUser = await db.orm.public.User.where({email}).first();
    console.log('foundInUser : ',foundInUser);
    if(foundInUser){return res.status(403).json('you may login');}
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);
    const newAdmin = await db.orm.public.User.create({email,password:passwordHash,role:Role,name});
    const token = jwt.sign({id:newAdmin.id,role:newAdmin.role,email:newAdmin.email},"harkiratbhaiyakijai");
    const tokenString = "Bearer "+token;
    return res.json({newAdmin,token:tokenString});
}
export const SignIn = async function(req:Request,res:Response){
    // console.log('reached admin signin in userController',"password : ",req.body.password);
    const isInputValid = SigninSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json({message});
    }
    const { email,password } = isInputValid.data;
    const foundInPending = await db.orm.public.PendingApproval.where({email}).first();
    if(foundInPending){return res.status(409).json('you are pending to be approved by admin');}
    const foundInUser:any = await db.orm.public.User.where({email}).first();
    if(!foundInUser){return res.status(401).json(' you may signup ');}
    // console.log('foundInUser  : ',foundInUser);
    // console.log('foundInUser.password  : ',foundInUser.password);
    const isPasswordCorrect = bcrypt.compare(password,foundInUser.password);
    if(!isPasswordCorrect){return res.status(403).json('email or password incorrect');}
    const token = jwt.sign({id:foundInUser.id,role:foundInUser.role,email:foundInUser.email},"harkiratbhaiyakijai");
    const tokenString = "Bearer "+token;
    return res.json({token:tokenString});
}
export const getApplications = async (req:Request,res:Response)=>{
    if(req.role=="STUDENT"){return res.status(401).json('only admins and alumni can view all student applications')}
    try{
        const applications = await db.orm.public.Application.all();
        return res.json({applications})
    }catch(e:any){return res.status(409).json(e.message);}
}
export const myApplications = async (req:Request,res:Response)=>{
    try{
        const myApplications = await db.orm.public.Application.where({userId:req.id as string}).all();
        return res.json({myApplications})
    }catch(e:any){return res.status(409).json(e.message);}
}