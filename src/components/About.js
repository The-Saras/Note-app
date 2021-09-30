import React from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext } from 'react'

function About() {
    const a=  useContext(noteContext)
    return (
        <div>
            <h1>this is about {a.name}</h1>
        </div>
    )
}

export default About
