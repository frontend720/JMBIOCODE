import logo from "./logo.svg";
import gsap, { Power1 } from "gsap";
import { useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry, DirectionalLightHelper } from "three";
import { OrbitControls, useHelper } from "@react-three/drei";
import randomcolor from "randomcolor";
import { useControls } from "leva";

// Includes basic example of gsap, react-three-fiber, Drei, and Leva
// Drei adds functionality such as obit controls and extra mesh options and helpers
// GSAP integration with a helper function

function Cube({ position, color, dimensions }) {
  // let ref = useRef();
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += 0.002365;
  //   ref.current.rotation.y += 0.002365;
  // });

  return (
    <mesh position={position}>
      <boxGeometry args={[...dimensions]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function App() {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const [menuContainerIsVisible, setMenuContainerIsVisible] = useState(false);

  const Scene = () => {
    const directionalLightRef = useRef();

    const { lightColor, lightIntensity } = useControls({
      lightColor: "white",
      lightIntensity: {
        value: 0.5,
        min: 0,
        max: 4,
      },
    });

    const { boxColor } = useControls({
      boxColor: "yellow",
      dimension: [1, 1, 1],
    });

    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "blue");

    return (
      <>
        <group>
          <ambientLight intensity={0.25} />
          <directionalLight
            position={[1, 2, 2]}
            intensity={lightIntensity}
            ref={directionalLightRef}
            color={lightColor}
          />
          <Cube
            position={[0, 0, 0]}
            color={boxColor}
            dimensions={[0.25, 3, 5]}
          />
          <Cube
            position={[7.5, 0, 2.375]}
            color={boxColor}
            dimensions={[15, 3, 0.25]}
          />
          <Cube
            position={[7.5, 0, -2.375]}
            color={boxColor}
            dimensions={[15, 3, 0.25]}
          />
          <Cube position={[0.5, -1, 0]} dimensions={[1, 1, 5]} />

          <OrbitControls />
        </group>
      </>
    );
  };

  function menuToggle() {
    setMenuContainerIsVisible((prev) => !prev);
  }

  const down = contextSafe(() => {
    gsap.to(".button", {
      background: "#ffffff75",
      color: "#444444",
      height: 200,
      rotate: 360,
    });
    gsap.to(".text", {
      fontSize: 20,
    });
  });
  const up = contextSafe(() => {
    gsap.to(".button", {
      background: "#444444",
      color: "#ffffff75",
      height: "auto",
      rotate: 0,
    });
    gsap.to(".text", {
      fontSize: 16,
    });
  });
  function onDown() {
    down();
    menuToggle();
  }


  function onUp() {
    up();
    menuToggle();
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div ref={container}>
            <button onMouseDown={onDown} onMouseUp={onUp} className="button">
              <label className="text" htmlFor="">
                Menu
              </label>
            </button>
          </div>
        </header>
        /
      </div>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
