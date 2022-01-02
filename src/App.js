import React from "react";
import TextList from "./components/Texts/TextList";
import TextDetail from "./components/TextDetail/TextDetail";
import EditText from "./components/Texts/EditText";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SendText from "./components/Texts/SendText";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="main_wrapper">
        <header> </header>
        <Box
          sx={{
            boxShadow: 3,
            maxWidth: "80%",
            m: "3rem auto 0",
            p:6
          }}
        >
          <Routes>
            <Route path="/" element={<TextList />} />
            <Route path="/posts/:id/EditText" element={<EditText />} />
            <Route path="/posts/:id" element={<TextDetail />} />
            <Route path="/SendText" element={<SendText />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
