
import React, { Component } from 'react';


class DataInput extends Component {
    state = {
        input: '',
        result: '',
        isLoading: false,
    }
    
    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true }); 
        try {
            const response = await fetch('http://localhost:8000/api/ask-ai/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: this.state.input })
            });

            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态码: ${response.status}`);
            }

            const data = await response.json();
            if (data.result) {
                this.setState({ result: data.result });
            } else if (data.error) {
                this.setState({ result: data.error });
            } else {
                this.setState({ result: '未知响应格式' });
            }
        } catch (error) {
            this.setState({ result: `请求失败: ${error.message}` });
        } finally {
            this.setState({ isLoading: false }); 
        }
    }

    render() { 
        return (
            <div className='data-input'>
                <h1 class="text-3xl font-bold underline">
                    Hello world!
                </h1>
                <div className='data-input-result'>{this.state.result}</div>
                <form className='data-input-text' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        placeholder="输入你的问题"
                    />
                    <button type="submit" disabled={this.state.isLoading}>
                        {this.state.isLoading ? '正在发送...' : '发送'}
                    </button>
                </form>
                <div className='data-input-result'>{this.state.result}</div>
            </div>
        );
    }
}
 
export default DataInput;
