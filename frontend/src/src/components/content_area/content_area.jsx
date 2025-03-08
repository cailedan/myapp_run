import React, { Component } from 'react';
import Left from './left/left';
import Middle from './middle/middle';
import Right from './right/right';

class ContentArea extends Component {
    state = {  } 
    render() { 
        return (
        <div className='bg-amber-300 w-full h-9/10 rounded-md flex flex-none flex-row p-2'>
                <Left />
                <Middle />
                <Right/>            
        </div>
        );
    }
}
 
export default ContentArea;