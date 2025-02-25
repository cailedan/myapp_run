import React, { Component } from 'react';
import HelloWorld from '../../helloworld.jsx';

class MultiRunner extends Component {
    state = {  } 
    render() { 
        return (
            
            <div>
                <h1>多人模式--记录比拼</h1>
                 <HelloWorld/>
            </div>
        );
    }
}
 
export default MultiRunner;