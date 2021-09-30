const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router()
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator")


router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {

    }
})

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 4 }),
    body('description', 'Lenght is not enough').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save()
        res.json(savedNote)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }


})

//This endpoint update a particular note based on the id given

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // const note = Notes.findByIdAndUpdate
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found you idiot :D")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(404).send("Not allowed to hack :D")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }
})

//This endpoint deletes a partucular notes based on id

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found you idiot :D")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(404).send("Not allowed to hack :D")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }
})

module.exports = router