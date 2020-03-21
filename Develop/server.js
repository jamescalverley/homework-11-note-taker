const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

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
    console.log("[newNote]", req.body);
    req.body.id = Math.floor(Math.random() * 100000);
    console.log("[newNote ID]", req.body.id);
    notesObj.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj));
    console.log("[note list Length]", notesObj.length )
    console.log("[ALL NOTES]", notesObj )
    res.send({ message: "Your note was saved." })
});

app.delete('/api/notes/:id', function( req, res){
    let noteDeleteID = req.params.id;
    console.log("[DELETE noteID >>> ]", noteDeleteID);
    const notesObj = JSON.parse(fs.readFileSync('./db/db.json','utf8'));
    console.log("[before deletion]", notesObj);
    //* rewriting the forEach function
    notesObj.forEach(( note ) => {
        if( noteDeleteID == note.id){
            console.log(`delete ID:${noteDeleteID} --- notesList ID: ${note.id}`);
            console.log("this note >>>", note);
            notesObj.splice(note, 1);
        }
    });
    console.log("[after deletion]", notesObj);


    fs.writeFileSync('./db/db.json', JSON.stringify(notesObj));
    res.send({ message: "ready to delete"});
});



app.listen( PORT, function(){
    console.log(`[server] running on http://localhost:${PORT}`)
});

