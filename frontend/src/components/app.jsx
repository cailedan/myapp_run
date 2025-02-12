import React, { Component } from 'react';
import Menu from './menu/menu.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleRunner from './menu/singlemode/singlerunner.jsx';
import MultiRunner from './menu/multimode/multirunnner.jsx';

class APP extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                 <Router>
                    <Routes>
                        <Route path="/" element={<Menu />} />
                        <Route path="/singlerunner" element={<SingleRunner />} />
                        <Route path="/multirunner" element={<MultiRunner />} />
                    </Routes>
                </Router>
                        
            </React.Fragment>
        );
    }
}
 
export default APP;