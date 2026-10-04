import express from 'express';
import { db } from 'db/client';
import { isLoggedIn } from '../middleware/auth';
import { userSignup } from '../controllers/userController';
const router = express.Router();
router.use(express.json());

router.get('/',isLoggedIn,async(req,res)=>{
    try{
        const students = await db.orm.public.User.where({role:"STUDENT"}).all();
        return res.json({students});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/signup',userSignup);

router.get('/',isLoggedIn,async (req,res)=>{
    if(req.role == "STUDENT"){return res.status(401).json('Only admins and alumni are authorised for this!')}
    const students = await db.orm.public.User.where({
        role : "STUDENT"
    }).all();
    return res.json({students});
})
router.put('/',isLoggedIn,async (req,res)=>{
    if(req.role!=="STUDENT"){return res.status(401).json('Only alumni and students are authorised to update their details');}
    const { graduationYear,name,email} = req.body;
    try{
        const updatedDetails = await db.orm.public.User.where({id:req.id,role:"STUDENT"}).update({graduationYear,name,email});
        return res.json({updatedDetails})
    }catch(e:any){return res.status(409).json(e.message);}
});

export default router;