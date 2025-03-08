import React, { Component } from 'react';

import TopArea from './top_area/top_area.jsx';
import ContentArea from './content_area/content_area.jsx';
class App extends Component {
    state = {  } 
    render() { 
        return (

        <div className='bg-(--color-screen) w-(--width-screen) h-(--height-screen) box-border flex flex-col p-2'>
                <TopArea />
                <ContentArea />           
       </div>
        );
        
    
    }
}
 
export default App;