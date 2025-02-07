import React, { Component } from 'react';
import axios from 'axios';

class HelloWorld extends Component {
    state = { 
        message:"",
     } 

     componentDidMount() {
        axios.get('http://47.99.116.100:8000/runapp/helloworld/')
          .then(response => {
            this.setState({ message: response.data.message });
          })
          .catch(error => {
            console.log(error);
          });
      }
    render() { 
        return (
            <div>
            <h1>start</h1>
            <h2>一个伟大的作品</h2>
                <br />
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}
 
export default HelloWorld;