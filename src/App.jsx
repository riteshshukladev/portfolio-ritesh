import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Hero />
      <Projects />
      <Footer />
    </>
  );
}

export default App;
