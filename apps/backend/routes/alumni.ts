import express from 'express';
import { alumniSignup } from '../controllers/userController';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
const router = express.Router();
router.use(express.json());

router.get('/',isLoggedIn,async (req,res)=>{
    try{
        const alumni = await db.orm.public.Alumni.all();
        return res.json({alumni});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.put('/',isLoggedIn,async (req,res)=>{
    if(req.role!=="ALUMNI"){return res.status(401).json('Only alumni and students are authorised to update their details');}
    console.log(req.body);
    const { graduationYear,company,jobTitle,bio,linkedinUrl } = req.body;
    try{
        const updatedDetails = await db.orm.public.Alumni.where({userId:req.id}).update({graduationYear,company,jobTitle,bio,linkedinUrl});
        return res.json({updatedDetails});
    }catch(e:any){return res.status(409).json(e.message);}
});
router.post('/signup',alumniSignup);

export default router;