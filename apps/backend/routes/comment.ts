import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
import e from 'express';
const router = express.Router();
router.use(express.json())

router.get('/:blogId',async(req,res)=>{
    const blogId = req.params.blogId;
    try{
        const Comments = await db.orm.public.Comment.where({blogId}).all();
        return res.json({Comments});
    }catch(e:any){return res.json(409).json(e.message)}
})
router.post('/:blogId',isLoggedIn,async (req,res)=>{
    //inputs:{blogId,userId,commentedAt,text}
    const blogId = req.params.blogId as string;
    const text = req.body.text;
    const userId = req.id;
    try{
        const newComment = await db.orm.public.Comment.create({text,blogId,userId});
        return res.json({newComment});
    }catch(error:any){return res.status(409).json(error.message)}
})
router.delete('/:blogId/:commentId',async(req,res)=>{
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    try{
        const deletedCmment = await db.orm.public.Comment.where({blogId,id:commentId}).delete();
        return res.json({deletedCmment});
    }catch(e:any){return res.json(409).json(e.message)}
})

export default router;