import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
const server = new WebSocketServer({port:3001})

const USERS = <any>{
    1:"3234",
    2:"3234",
    3:"3234",
    4:"3234",
}
const GROUPS = <any>{
    1:[{id:3943,socket:91233},{id:3943,socket:91233}],
    2:[{id:3943,socket:91233},{id:3943,socket:91233}],
    3:[{id:3943,socket:91233},{id:3943,socket:91233}]
}

server.on('connection',(socket,req)=>{
    const tokenString = req.headers.authorization;
    const token = tokenString?.split("Bearer ")[1];
    const decoded = jwt.verify(token!,'harkiratbhaiyakijai');
    const joinedUserId = decoded.id;
    socket.on('message',(data)=>{
        let groupId;
        let userToMessageId;
        const parsedData = JSON.parse(data);
        if(parsedData.type==="join"){
            USERS.push({id:joinedUserId,socket});
        }
        if(parsedData.type==="chat"){
            const text = parsedData.text;
            if(parsedData.groupId){
                groupId=parsedData.groupId;
                //add in db message table senderId me
                GROUPS[groupId].forEach((member:any)=>member.socket.send(JSON.stringify({type:'directMessage',text})))
            }
            else if(parsedData.userToMessageId){
                userToMessageId=parsedData.userToMessageId;
                //add in db message table senderId me and receiverId userToMessageId
                USERS[userToMessageId].send(JSON.stringify({type:'groupMessage',text}));
            }
        }
    })
    socket.on('close',()=>{
        //do nothing
    })
})