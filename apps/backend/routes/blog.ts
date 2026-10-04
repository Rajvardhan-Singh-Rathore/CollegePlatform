import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
import { BlogSchema } from '../zod';
const router = express.Router();
router.use(express.json())

router.get('/',isLoggedIn,async(req,res)=>{//get all blogs
    try{
        const Blogs = await db.orm.public.Blog.all();
        return res.json({Blogs});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/',isLoggedIn,async (req,res)=>{//status hath se nhi likhna chahiye shyd ,default hona chahiye shyd
    if(req.role==="STUDENT"){return res.json('Only admins and alumni can post blog')}
    const isInputValid = BlogSchema.safeParse(req.body);
    if(!isInputValid.success){
        const message =  JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {title,description} = isInputValid.data;
    try{
        const newBlog = await db.orm.public.Blog.create({description,title,postedBy:req.id as string,});
        return res.json({newBlog});
    }catch(e:any){return res.json(e.message);}
})
router.put('/:id',isLoggedIn,async (req,res)=>{//status hath se nhi likhna chahiye shyd ,default hona chahiye shyd
    if(req.role==="STUDENT"){return res.json('Only admins and alumni can update blog')}
    const isInputValid = BlogSchema.safeParse(req.body);
    const id = req.params.id as string;
    if(!isInputValid.success){
        const message =  JSON.parse(isInputValid.error.message)[0].message;
        return res.status(411).json(message);
    }
    const {title,description} = isInputValid.data;
    try{
        const updatedBlog = await db.orm.public.Blog.where({postedBy:req.id as string,id:id}).update({description,title});
        return res.json({updatedBlog});
    }catch(e:any){return res.json(e.message);}
})
router.delete('/delete/:id',isLoggedIn,async (req,res)=>{//delete a blog
    try{
        const deletedBlog = await db.orm.public.Blog.where({id:req.params.id as string,postedBy:req.id as string}).delete();
        return res.json({deletedBlog});
    }catch(e:any){return res.json(e.message);}
})


export default router;