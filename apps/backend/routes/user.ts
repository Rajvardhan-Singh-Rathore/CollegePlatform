import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { SignIn } from '../controllers/userController';
import { db } from 'db/client';
const router = express.Router();
router.use(express.json());

router.get('/',isLoggedIn,async (req,res)=>{
    try{
        const allUsers = await db.orm.public.User.all();
        return res.json({allUsers});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.get('/:id',isLoggedIn,async (req,res)=>{
    try{
        const searchedUser = await db.orm.public.User.where({id:req.params.id as string}).first();
        return res.json({searchedUser});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.delete('/:id',isLoggedIn,async (req,res)=>{//delete a user(temporary)
    try{
        const deletedUser = await db.orm.public.User.where({id:req.params.id as string}).delete();
        return res.json({deletedUser});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/signin',SignIn);
export default router;