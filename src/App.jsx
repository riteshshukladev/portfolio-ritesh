import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ContentTree from "./components/ContentTree";
import PostPage from "./pages/PostPage";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="relative">
      <Navbar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <ContentTree isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      
      {/* Main Content */}
      <main className="min-h-screen pt-20">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/post/*" element={<PostPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
