const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.get("/notes", (req,res) => {
    const allNotes = fs.readFileSync("db/db.json");
    const parsedNote = JSON.parse(allNotes);
    res.json(parsedNote);
});

router.post("/notes", (req,res) => {
    const newNote = req.body
    newNote.id = uuidv4();
    const allNotes = fs.readFileSync("db/db.json");
    const parsedNote = JSON.parse(allNotes)
    parsedNote.push(newNote)
    fs.writeFileSync("db/db.json", JSON.stringify(parsedNote))
    res.json(parsedNote);
});

router.delete("/notes/:id", (req,res) => {
    const allNotes = fs.readFileSync('db/db.json');
    const parsedNote = JSON.parse(allNotes);
    const removedNote = parsedNote.filter((note)=>(note.id !== req.params.id))
    fs.writeFileSync("db/db.json", JSON.stringify(removedNote))
    res.json(parsedNote);
});


module.exports = router