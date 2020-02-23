import React from 'react'
import {Route,BrowserRouter as Router, } from 'react-router-dom'
import { Quiz } from '../Components/index.js'



function Navigations() {
    return (
        
        <Router >
            

                <Route       path="/" component={Quiz} />
            
            
                <div className={'rdiv'} >
              
               
                  </div>
                
                
        </Router>
    );
}

export default Navigations;