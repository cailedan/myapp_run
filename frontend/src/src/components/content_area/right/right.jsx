import React, { Component } from 'react';
import { DataTable } from './datatable/datatable';
class Right extends Component {
    state = {  } 
    render() { 
        return (
            <div className="w-1/4 h-full md:basis-1/4 bg-white">
                <div className='w-full h-full overflow-auto scrollbar p-1'>
                   <DataTable />
                </div>
            </div>
        );
    }
}
 
export default Right;