import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize=12

  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar onSearch={this.handleSearch}/>
        
        <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country='in' category="general"/>}/>
            <Route exact path="/Entertainment" element={<News key="entertainment" pageSize={this.pageSize} country='in' category="entertainment"/>}/>
            <Route exact path="/Business" element={<News key="business" pageSize={this.pageSize} country='in' category="business"/>}/>
            <Route exact path="/General" element={<News key="general" pageSize={this.pageSize} country='in' category="general" />}/>
            <Route exact path="/Science" element={<News key="science" pageSize={this.pageSize} country='in' category="science" />}/>
            <Route exact path="/Sports" element={<News key="sports" pageSize={this.pageSize} country='in' category="sports" />}/>
            <Route exact path="/Technology" element={<News key="technology" pageSize={this.pageSize} country='in' category="technology" />}/>
          
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


