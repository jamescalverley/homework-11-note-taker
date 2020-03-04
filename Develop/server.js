const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use( express.urlencoded({ extended: false }) );









app.listen( PORT, function(){
    console.log(`[server] running on http://localhost:${PORT}`)
});
