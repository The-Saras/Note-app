import React from 'react'
import { useContext, useRef,useEffect,useState } from 'react'
import contextValue from "../context/notes/NoteContext"
import NoteItems from "./NoteItem"
import Form from './Form'
import { useHistory } from 'react-router'


function Notes() {
    const context = useContext(contextValue)
    const { notes, fetchallNOtes,editNote } = context;

    let history = useHistory()

    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchallNOtes();
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [Notes, setNotes] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    
    const updatenote = (note) => {
        ref.current.click()

        setNotes({id:note._id,etitle:note.title,edescription:note.description})
    }


    const handleClick = (e)=>{
        
        editNote(Notes.id,Notes.etitle,Notes.edescription,Notes.etag);
        refClose.current.click()
    }
    const onchange=(e)=>{
        setNotes({...Notes,[e.target.name]:e.target.value})
    }

    return (
        <>
            <Form  />


            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalLong">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Note Heading</label>
                                        <input type="text" name="etitle" className="form-control" value={Notes.etitle} minLength={5}  required id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Note Description</label>
                                        <input type="text" name="edescription" value={Notes.edescription} minLength={5} required className="form-control" id="description" onChange={onchange} />
                                    </div>

                                    
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={Notes.etitle.length < 4 || Notes.edescription.length <5} onClick={handleClick} className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 container">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItems key={note._id} updateNote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
