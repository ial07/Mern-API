const express = require('express');

const app = express();

app.use(()=>{
    console.log('halooo');
    console.log('bababi');
})

app.listen(4000);