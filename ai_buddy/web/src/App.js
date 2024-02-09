
import "./App.css";
import { useState } from "react";
import { db } from "./config";
import axios from "axios";
function App() {
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  // const [user, setUser] = useState("");
  console.log(db)
  function askQuestion(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://f26b-185-207-249-20.ngrok-free.app/question/frontend720@gmail.com",
      data: {
        question: question
      },
    })
      .then((data) => {
        setResponse(data.data)
      })
      .catch((err) => {
        console.log(err.code);
      });
  }

  // add axios data to firestore via firebase web

  return (
    <div className="App">
     
      <form onSubmit={askQuestion}>
      <input name="title" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="question" />
      {/* <input name="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note"/> */}
      {/* <input name="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User" /> */}
      <button type="submit">Send</button>
      {response}
      </form>
    </div>
  );
}

export default App;
