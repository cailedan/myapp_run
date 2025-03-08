import React, { Component } from 'react';
import { Component as AreaChartComponent } from "../../ui/areachart";

class Middle extends Component {
    state = {  } 
    render() { 
        return (
            <div className="w-1/2 md:basis-1/2 bg-emerald-200 mr-1">
                <AreaChartComponent/>
            </div>
        );
    }
}
 
export default Middle;