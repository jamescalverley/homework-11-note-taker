const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use( express.urlencoded({ extended: true }) );

app.get('/notes', function( req, res ){
    let notesHTML = fs.readFileSync('./public/notes.html');
    res.end(notesHTML);    
});

app.get('/api/notes', function( req, res){
    console.log("[server-API GET] getting all notes from json")
    let notesObj =  JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    res.json(notesObj);
    console.log("[API GET] notes object sent");
});

app.post('/api/notes', function( req, res ){
    const notesObj = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    req.body.id = Math.floor(Math.random() * 100000);
    notesObj.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj));
    res.send({ message: "Your note was saved." })
});

app.delete('/api/notes/:id', function( req, res){
    let noteDeleteID = req.params.id;
    const notesObj = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    notesObj.forEach(( note ) => {
        if( noteDeleteID == note.id){
            const deleteIndex = notesObj.indexOf(note);
            notesObj.splice(deleteIndex, 1);
        }
    });
    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj));
    res.send({ message: "ready to delete"});
});

app.listen( PORT, function(){
    console.log(`[server] running on http://localhost:${PORT}`)
});

