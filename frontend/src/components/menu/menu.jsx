import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataInput from './datainput/datainput.jsx';

class Menu extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="ac-game-menu">
                
                    <div className="ac-game-menu-field">
                        <div className="ac-game-menu-field-item ac-game-menu-field-item-single">
                            <Link className='menu-link' to="/singlerunner">个人历史对比</Link> {/* 使用 Link 标签进行导航 */}
                        </div>
                        <br></br>
                        <div className="ac-game-menu-field-item ac-game-menu-field-item-multiplayer">
                            <Link className='menu-link' to="/multirunner">多人成绩比拼</Link> {/* 使用 Link 标签进行导航 */}
                        </div>
                        <br></br>
                        <div className="ac-game-menu-field-item ac-game-menu-field-item-settings">
                            <Link className='menu-link' to="/">退出</Link> {/* 使用 Link 标签进行导航 */}
                        </div>                
                    </div>
                    <DataInput />
                </div>   
                
            </React.Fragment>
        );
    }
}
 
export default Menu;