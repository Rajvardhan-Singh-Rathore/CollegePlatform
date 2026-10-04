import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db,EventType } from 'db/client';
import { EventSchema, JobSchema } from '../zod';
const router = express.Router();
router.use(express.json());

router.get('/',isLoggedIn,async (req,res)=>{//all events
    try{
        const events = await db.orm.public.Event.all();
        return res.json({events});
    }catch(e:any){return res.status(409).json(e.message)}
})
router.get('/myEvents',isLoggedIn,async (req,res)=>{//get all events created by me
    if(req.role=="STUDENT"){return res.status(401).json("Student cannot have any event posted by them")}
    const myEvents = await db.orm.public.Event.where({createdBy:req.id}).all();
    return res.json({myEvents});
})
router.post('/',isLoggedIn,async (req,res)=>{//create a new event
    if(req.role==="STUDENT"){return res.status(401).json("Student cannot create any event")}
    const eventTypeString = req.role==="ALUMNI"?"ALUMNI":"COLLEGE";
    const isInputValid = EventSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {link,time,title,description} = isInputValid.data;
    try{
        const newEent = await db.orm.public.Event.create({createdBy:req.id as string,type:eventTypeString,title,description,time,Link:link});
        return res.json({newEent});
    }catch(e:any){return res.json(e.message)}
})
router.put('/:Id',isLoggedIn,async (req,res)=>{//create a new event
    if(req.role=="STUDENT"){return res.status(401).json("Student cannot create any event")}
    const isInputValid = EventSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message = JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {link,time,title,description} = isInputValid.data;
    try{
        const updatedEvent = await db.orm.public.Event.where({createdBy:req.id as string,id:req.params.Id as string}).update({createdBy:req.id as string,title,description,time,Link:link});
        return res.json({updatedEvent});
    }catch(e:any){return res.json(e.message)}
})
router.delete('/:Id',isLoggedIn,async (req,res)=>{//delete an event
    if(req.role==="STUDENT"){return res.status(401).json('only admins and alumni can delete events');}
    try{
        const deletedEvent = await db.orm.public.Event.where({createdBy:req.id as string,id:req.params.Id as string}).delete();
        return res.json({deletedEvent});
    }catch(e:any){return res.json(e.message)}
})
router.get('/:Id',isLoggedIn,async (req,res)=>{//get a particular event
    if(req.role==="STUDENT"){return res.status(401).json('only admins and alumni can delete events');}
    try{
        const searchedEvent = await db.orm.public.Event.where({createdBy:req.id as string,id:req.params.Id as string}).first();
        return res.json({searchedEvent});
    }catch(e:any){return res.json(e.message)}
})

export default router;