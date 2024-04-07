import logo from "./logo.svg";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import "./App.css";

function App() {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: [container] });
  
  const down = contextSafe(() => {
    gsap.to(".button", { background: "#ffffff75", color: "#444444" });
  });

  const up = contextSafe(() => {
    gsap.to(".button", {background: "#444444", color: "#ffffff75"})
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div ref={container}>
         
        <button onMouseDown={down} onMouseUp={up} className="button">
          Press Me
        </button>
        </div>
        <div></div>
      </header>
    </div>
  );
}

export default App;
