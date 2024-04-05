import "./App.css";
import {useState, useEffect} from "react"
import { app } from "./config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PeriodicTable from "./PeriodicTable";
import AuthScreen from "./AuthScreen";


function App() {
  const auth = getAuth(app)
  const [authObj, setAuthObj] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj)
    })
  },[])

  console.log(app) 
  return (
    <div className="App">
      {authObj === null ? <AuthScreen /> : <PeriodicTable /> }
    </div>
  );
}

export default App;
