// import modules
import express from 'express'
import cors from 'cors';
import router from './src/modules/product/product.router.js';
//create server
const app = express()
const port = 3000

app.use(cors());

app.use(express.json());

app.use(router);

//listen on port
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 