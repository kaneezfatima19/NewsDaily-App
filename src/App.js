import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

const App =()=>{
  const pageSize=12

    return (
      <div>
        <BrowserRouter>
        <Navbar />
        
        <Routes>
            <Route exact path="/" element={<News key="general" pageSize={pageSize} country='in' category="general"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country='in' category="entertainment"/>}/>
            <Route exact path="/business" element={<News key="business" pageSize={pageSize} country='in' category="business"/>}/>
            <Route exact path="/general" element={<News key="general" pageSize={pageSize} country='in' category="general" />}/>
            <Route exact path="/science" element={<News key="science" pageSize={pageSize} country='in' category="science" />}/>
            <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country='in' category="sports" />}/>
            <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country='in' category="technology" />}/>
            <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  
}

export default App


