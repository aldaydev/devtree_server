import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hola con TypeSript')
});

export default app;