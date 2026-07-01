import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ContentTree from "./components/ContentTree";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <div className="relative">
      {/* Global Sidebar spanning left */}
      <ContentTree />
      
      {/* Main Content Pane adjusted to sit adjacent to fixed desktop sidebar (w-72 = 288px) */}
      <main className="md:ml-72 min-h-screen">
        <Routes>
          <Route path="/" element={<><Navbar /><Hero /></>} />
          <Route path="/post/*" element={<PostPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
