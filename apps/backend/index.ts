import express, { application } from 'express';
const app = express();
import 'temporal-polyfill/full/global';

import adminRouter from './routes/admin'
import alumniRouter from './routes/alumni'
import userRouter from './routes/user'
import jobRouter from './routes/job'
import eventRouter from './routes/event'
import groupRouter from './routes/group'
import connectionRouter from './routes/connection'
import commentRouter from './routes/comment'
import likeRouter from './routes/like'
import blogRouter from './routes/blog'
import studentRouter from './routes/student'
import applicationRouter from './routes/application'
import messageRouter from './routes/message'

app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/alumni',alumniRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/event',eventRouter);
app.use('/api/v1/comment',commentRouter);
app.use('/api/v1/connection',connectionRouter);
app.use('/api/v1/like',likeRouter);
app.use('/api/v1/student',studentRouter);
app.use('/api/v1/blog',blogRouter);
app.use('/api/v1/group',groupRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/message',messageRouter);


app.listen(3000);