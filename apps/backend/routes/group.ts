import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db, or } from 'db/client';
const router = express.Router();
router.use(express.json())

router.get('/',isLoggedIn,async (req,res)=>{
    //groups where either i am admin or i am a member
    try{
        const myGroups = await db.orm.public.GroupMember.where({userId:req.id as string}).all();
        //const myGroups = await db.orm.public.Group.all();
        return res.json({myGroups});
    }catch(e:any){return res.json(e.message)}
})
router.get('/:id',isLoggedIn,async (req,res)=>{//get group with id
    try{
        const searchedGroup = await db.orm.public.Group.where({id:req.params.id as string}).first();
        return res.json({searchedGroup});
    }catch(e:any){return res.json(e.message)}
})
router.post('/',isLoggedIn,async (req,res)=>{
    const { name,members } = req.body;
    try{
        const newGroup = await db.orm.public.Group.create({createdBy:req.id as string,name});
        await db.orm.public.GroupMember.create({userId:req.id as string,groupId:newGroup.id});

        for(let i=0;i<members.length;i++){
            await db.orm.public.GroupMember.create({userId:members[i].id as string,groupId:newGroup.id});
        }
        return res.json({newGroup});
    }catch(e:any){return res.json(e.message)}
})
router.put('/:id',isLoggedIn,async (req,res)=>{
    const { name } = req.body;
    try{
        const updatedGroup = await db.orm.public.Group.where({id:req.params.id as string,createdBy:req.id as string}).update({name});
        return res.json({updatedGroup});
    }catch(e:any){return res.json(e.message)}
})
router.delete('/:id',isLoggedIn,async (req,res)=>{
    try{
        const deletedGroup = await db.orm.public.Group.where({id:req.params.id as string,createdBy:req.id as string}).delete();
        return res.json({deletedGroup});
    }catch(e:any){return res.json(e.message)}
})
export default router;