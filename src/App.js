import React from "react";
import YaziListesi from "./components/YaziListesi";
import YaziDetayi from "./components/YaziDetayi";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="main_wrapper">
        <header> </header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route path="/" element={<YaziListesi />} />
            <Route path="/posts/:id" element={<YaziDetayi />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
