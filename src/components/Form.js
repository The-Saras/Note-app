
import contextValue from "../context/notes/NoteContext"
import { useContext,useState } from "react"

function Form() {
    const context = useContext(contextValue)
    const { addNote } = context;

    const [Notes, setNotes] = useState({title:"",description:"",tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(Notes.title,Notes.description,Notes.tag)
        setNotes({title: "", description: "", tag: ""})
    }
    const onchange=(e)=>{
        setNotes({...Notes,[e.target.name]:e.target.value})
    }
    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Note Heading</label>
                    <input type="text"  name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={Notes.title} onChange={onchange} minLength={5}  required />
                    <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Note Description</label>
                    <input type="text" name="description" className="form-control" id="description" value={Notes.description} onChange={onchange} minLength={5}  required/>
                </div>
                
                <button type="submit" disabled={Notes.title.length < 4 || Notes.description.length <5} className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>

        </div>
    )
}

export default Form
