import express from 'express';

const app = express();

const PORT = 3000;

app.get('/ping', ()=>{
    console.log('pong');
})

app.listen(PORT,()=>{
    console.log(`Server is running at https://localhost:${PORT}`);
})