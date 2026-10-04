import express from 'express';
import { adminSignup } from '../controllers/userController';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
const router = express.Router();
router.use(express.json());

router.get('/',(req,res)=>{
    res.send('hi form adminRouter');
})
router.post('/signup',adminSignup);

router.get('/pendingApprovals',isLoggedIn,async (req,res)=>{
    if(req.role!=="ADMIN"){return res.status(401).json('Only admins are authorised see pending approvals');}
    try{
        const pendingApprovals = await db.orm.public.PendingApproval.all();
        return res.json({pendingApprovals})
    }catch(e:any){return res.status(409).json(e.message);}
})

router.post('/approval/accept/:id',isLoggedIn,async (req,res)=>{//run when click on approve
    const id = req.params.id as string;
    try{
        await db.orm.public.PendingApproval.where({id}).update({status:"APPROVED"});
        const acceptedApproval = await db.orm.public.PendingApproval.where({id,status:"APPROVED"}).first();
        const {role,name,passwordHash,graduationYear,email} =<any> acceptedApproval;
        const deletedApproval = await db.orm.public.PendingApproval.where({id,status:"APPROVED"}).delete();
        const newUser = await db.orm.public.User.create({email,name,role,password:passwordHash,graduationYear});
        
        if(newUser.role==="ALUMNI"){await db.orm.public.Alumni.create({graduationYear,company:deletedApproval?.company as string,jobTitle:deletedApproval?.jobTitle as string,bio:deletedApproval?.bio as string,linkedinUrl:deletedApproval?.linkedinUrl as string,userId:newUser.id});}
        
        return res.json({deletedApproval,newUser});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/approval/reject/:id',isLoggedIn,async (req,res)=>{//run when click on reject
    try{
        const id = req.params.id as string;
        await db.orm.public.PendingApproval.where({id}).update({status:"REJECTED"});
        const rejectedApproval = await db.orm.public.PendingApproval.where({id,status:"REJECTED"});
        const deletedApproval = await db.orm.public.PendingApproval.where({id,status:"REJECTED"}).delete;
        return res.json({rejectedApproval,deletedApproval});
    }catch(e:any){return res.status(409).json(e.message);}
})

export default router;

//alumni id : 4ccc1fc9-897a-439a-ae3f-7972478374ef