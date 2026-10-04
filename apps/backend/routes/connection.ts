import express from 'express';
import { isLoggedIn } from '../middleware/auth';
import { db } from 'db/client';
import { or,and } from 'db/client';
const router = express.Router();
router.use(express.json());

router.post('/reject/:id',isLoggedIn,async(req,res)=>{//reject connection request
    const id = req.params.id as string;
    const myId = req.id as string;
    try{
        const rejectedRequest = db.orm.public.Connection.where({id,receiverId:myId}).update({status:"REJECTED"});
        return res.json({rejectedRequest});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/accept/:id',isLoggedIn,async(req,res)=>{//accept connection request with this id
    const id = req.params.id as string;
    const myId = req.id as string;
    try{
        const acceptedRequest = db.orm.public.Connection.where({id,receiverId:myId}).update({status:"ACCEPTED"});
        return res.json({acceptedRequest});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.get('/',isLoggedIn,async(req,res)=>{//get all my connections
    //get connections where either i am the sender or i am the receiver and status = accepted
    const userId = req.id as string;
    const connections = await db.orm.public.Connection
    .where((c)=>or(c.senderId.eq(userId),c.receiverId.eq(userId))&& and(c.status.eq("ACCEPTED"))).all();
    return res.json({myConnections:connections});
})
router.get('/pending',isLoggedIn,async(req,res)=>{//get all my connection requests sent or received which are pending
    const userId = req.id as string;
    const connections = await db.orm.public.Connection.where(
        (c)=>or(c.senderId.eq(userId),c.receiverId.eq(userId))&&c.status.eq("PENDING")
    ).first();
    return res.json({pendingRequests:connections});
})
router.get('/rejected',isLoggedIn,async(req,res)=>{//get all my connection requests sent or received which are rejected
    const userId = req.id as string;
    const connections = await db.orm.public.Connection.where(
        (c)=>or(c.senderId.eq(userId),c.receiverId.eq(userId))&&c.status.eq("REJECTED")
    );
    return res.json({rejectedRequests:connections});
})
router.delete('/:id',isLoggedIn,async (req,res)=>{
    const id = req.params.id as string;
    try{
        const deletedConnection = await db.orm.public.Connection.where({id}).delete();
        return res.json({deletedConnection});
    }catch(e:any){return res.status(409).json(e.message);}
})
router.post('/:id',isLoggedIn,async (req,res)=>{//send request to this id user
    const senderId = req.id as string;
    const receiverId = req.params.id as string;
    try{
        const newConnectionRequest = await db.orm.public.Connection.create({senderId,receiverId,status:"PENDING"});
        return res.json({newConnectionRequest});
    }catch(e:any){return res.status(409).json(e.message);}
})

export default router;