import express from 'express';

const app = express();

// Routing

app.get('/', (req, res) => {
    res.send('Hola con TypeSript')
});

const PORT = process.env.PORT || 4000;

//Listen the server

app.listen(PORT, () => {
    console.log('Server running');
})