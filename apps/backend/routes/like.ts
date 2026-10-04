import { db } from 'db/client';
import express from 'express';
import { isLoggedIn } from '../middleware/auth';
const router = express.Router();

router.get('/:blogId',isLoggedIn,async (req,res)=>{
    try{
        const likes = await db.orm.public.Like.where({blogId:req.params.blogId as string}).first();
        return res.json({likes});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/:blogId',isLoggedIn,async (req,res)=>{
    const blogId = req.params.blogId as string;
    try{
        const newLike = await db.orm.public.Like.create({blogId,userId:req.id});
        return res.json({newLike});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.delete('/:blogId',isLoggedIn,async (req,res)=>{//delete my like on this post
    const blogId = req.params.blogId as string;
    try{
        const deletedLike = await db.orm.public.Like.where({blogId,userId:req.id}).delete();
        return res.json({deletedLike});
    }catch(e:any){return res.status(409).json(e.message);}
})

export default router;