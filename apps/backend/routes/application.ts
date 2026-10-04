import express from 'express';
import { alumniSignupSchema, studentSignupSchema } from '../zod';
import { db } from 'db/client';
import bcrypt from 'bcrypt'
import { isLoggedIn } from '../middleware/auth';
import { getApplications, myApplications, userSignup } from '../controllers/userController';
const router = express.Router();

router.post('job/:id',async(req,res)=>{//apply for a job posted
    try{
        const newJobApplication = await db.orm.public.Application.create({userId:req.id as string,jobId:req.params.id as string,status:"PENDING"});
        return res.json({newJobApplication});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('event/:id',async(req,res)=>{//apply for a job posted
    try{
        const newEventApplication = await db.orm.public.Event_Member.create({userId:req.id as string,eventId:req.params.id as string});
        return res.json({newEventApplication});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.get('/',isLoggedIn,getApplications)//get all applications

router.get('/myApplications',isLoggedIn,myApplications);//student's applications


export default router;