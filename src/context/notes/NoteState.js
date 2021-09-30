
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const url = "http://localhost:5000"
  const Noteinitial = [
   
  ]
  const [notes, setnotes] = useState(Noteinitial)

  //Show all notes
  const fetchallNOtes = async () => {
    const response = await fetch (`${url}/api/notes/fetchallnotes`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
      
    })
    const json = await response.json()
    
    setnotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch (`${url}/api/notes/addnote`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    })
    
    
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  //Edit a note
  const editNote = async(id,title,description,tag) => {

    //API Call 
    const response = await fetch (`${url}/api/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const json = await response.json();
    console.log(json);


    let UpdatedNote = JSON.parse(JSON.stringify(notes))

    for (let i = 0; i < UpdatedNote.length; i++) {
      const element = UpdatedNote[i];
      if (element._id === id) {
        UpdatedNote[i].title = title
        UpdatedNote[i].description = description
        UpdatedNote[i].tag = tag
        break;
      }
    }
    setnotes(UpdatedNote)
  }
  

  //Delete a Note
  const deleteNote =async (id) => {
    const response = await fetch (`${url}/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
      
    })
    const json = await response.json()
    console.log(json);
    
   
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setnotes(newNotes)
  }
  return (

    <noteContext.Provider value={{ notes, setnotes, addNote, deleteNote,fetchallNOtes,editNote }}>
      {props.children};
    </noteContext.Provider>
  )
}

export default NoteState;