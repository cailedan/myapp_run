import React, { Component } from 'react';
import { Calendar } from '@/components/ui/calendar';

class Left extends Component {
    state = {  } 
    render() { 
        return (
            <div className="w-1/4 md:basis-1/4 bg-white mr-1 items-center">
                <Calendar className=" opacity-75 inset-shadow-sm inset-shadow-rose-300/50 shadow-lg shadow-amber-200/50 w-4/5 ml-7 bg-amber-200 mt-1 rounded-2xl md:block hidden"/>
            </div>
        );
    }
}
 
export default Left;