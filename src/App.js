import React from "react";
import TextList from "./components/Texts/TextList";
import TextDetail from "./components/TextDetail/TextDetail";
import EditText from "./components/Texts/EditText";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SendText from "./components/Texts/SendText";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="main_wrapper">
        <header> </header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route path="/" element={<TextList />} />
            <Route path="/posts/:id/EditText" element={<EditText />} />
            <Route path="/posts/:id" element={<TextDetail />} />
            <Route path="/SendText" element={<SendText />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
