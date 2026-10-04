import express from 'express';
import { db, or } from 'db/client';
import { isLoggedIn } from '../middleware/auth';

const router = express.Router();
router.use(express.json());

router.get('/group/:id',isLoggedIn,async(req,res)=>{
    try{
        const groupMessages = await db.orm.public.GroupMessage.where({groupId:req.params.id as string}).all();
        return res.json({groupMessages});
    }catch(e:any){return res.status(409).json(e.message)}
})
router.get('/user/:id',isLoggedIn,async(req,res)=>{
    try{
        const directMessages = await db.orm.public.Message.where(
            (m)=>or(m.senderId.eq(req.id)&&m.receiverId.eq(req.params.id as string) , m.receiverId.eq(req.id)&&m.senderId.eq(req.params.id as string))
        ).all();
        return res.json({directMessages});
    }catch(e:any){return res.status(409).json(e.message)}
})

export default router;