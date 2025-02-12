import React, { Component } from "react";

import RunMap from "../runmap/runmap.js";
import GameAnimation from "../objects/animation.jsx";

class PlaygroundJsx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            players: [],
            gameMap: null,
            noticeBoard: null,
            endField: null,
            mps: null,
            playerCount: 0,
        };
        this.playgroundRef = React.createRef(); // 创建一个 ref 引用
        this.canvasRef = React.createRef();
       
    }

    componentDidMount() {
        
        const width = this.playgroundRef.current.clientWidth;
        const height = this.playgroundRef.current.clientHeight;
        const playground = this.playgroundRef.current;
        const $canvas = this.canvasRef.current;
        if ($canvas)
        {
            this.runmap = new RunMap(playground, $canvas);
            $canvas.addEventListener('contextmenu', (e) => {
                e.preventDefault();  // 阻止右键菜单
              });  
        }
        
    }


    render() {
        return (
            
            <div
                className="ac-game-playground"
                ref={this.playgroundRef}
                
            >
                <GameAnimation/>
                <canvas tabIndex='0' ref={this.canvasRef}></canvas>
            </div>
        );
    }
}

export default PlaygroundJsx;
