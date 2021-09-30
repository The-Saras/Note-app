import React, { useContext } from 'react'
import contextValue from "../context/notes/NoteContext"

function NoteItem(props) {
    const context = useContext(contextValue)
    const { deleteNote } = context;
    const { note,updateNote } = props
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-2" style={{cursor:'pointer'}}onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2" style={{cursor:'pointer'}} onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
