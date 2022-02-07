import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';


const HomePage = () => {

  const [notes, setNotes] = useState([]);
  const { authToken, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authToken.access)
      }
    })

    let data = await response.json()

    if(response.status == 200) {
      setNotes(data)
    } else if(response.statusText === "Unauthorized") {
      logoutUser()
    }
  }

  return (
    <div>
      <p>You are logged in to HomePage</p>

      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>

    </div>
  )
};

export default HomePage;
