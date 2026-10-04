import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
import { JobSchema } from '../zod';
const router = express.Router();
router.use(express.json());

router.get('/',isLoggedIn,async(req,res)=>{//get all jobs
    try{
        const allJobs = await db.orm.public.Job.all();
        return res.json({allJobs});
    }catch(e:any){return res.json(e.message);}
})
router.get('/myJobs',isLoggedIn,async (req,res)=>{//all jobs posted by me
    if(req.role==="STUDENT"){return res.status(401).json('only admins and alumni can see their posted jobs')}
    try{
        const jobs = await db.orm.public.Job.where({postedBy:req.id}).all();
        return res.json({jobs});
    }catch(e:any){return res.json(e.message);}
})
router.post('/',isLoggedIn,async (req,res)=>{//status hath se nhi likhna chahiye shyd ,default hona chahiye shyd
    if(req.role==="STUDENT"){return res.json('Only admins and alumni can post job(s)')}
    const isInputValid = JobSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message =  JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {company,deadline,link,description,type,location,stipend,status} = isInputValid.data;
    try{
        const newJob = await db.orm.public.Job.create({company,deadline,link,description,type,postedBy:req.id as string,location,stipend,status});
        return res.json({newJob});
    }catch(e:any){return res.json(e.message);}
})
router.put('/:id',isLoggedIn,async (req,res)=>{
    if(req.role==="STUDENT"){return res.json('Only admins and alumni can post job(s)')}
    const isInputValid = JobSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message =  JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {company,deadline,link,description,type,location,stipend,status} = isInputValid.data;
    try{
        const updatedJob = await db.orm.public.Job.where({postedBy:req.id as string,id:req.params.id as string}).update({company,deadline,link,description,type,location,stipend,status});
        return res.json({updatedJob});
    }catch(e:any){return res.json(e.message);}
})
router.delete('/:id',isLoggedIn,async (req,res)=>{
    const id = req.params.id as string;
    try{
        const deletedJob = await db.orm.public.Job.where({id,postedBy:req.id}).delete();
        return res.json({deletedJob});
    }catch(e:any){return res.json(e.message);}
})


export default router;