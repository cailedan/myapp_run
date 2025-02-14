import { AcGameObject } from "../objects/zbase.js";
import Runner from "../runner/runner.js";

export default class RunMap extends AcGameObject{
    constructor(playground , $canvas) {
        super();
        this.playground = playground;
        this.$canvas = $canvas
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.canvas.width = playground.clientWidth;
        this.ctx.canvas.height = playground.clientHeight;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
      
    }

    start() {
        this.$canvas.focus();
        this.add_event_listening();
    }

    add_event_listening()
    {
        // this.$canvas.on("contextmenu", () => {
        //     return false;
        // })
    }

    update() {
        
        this.render();
    }

    // resize() {
    //     this.ctx.canvas.width = this.playground.clientWidth;
    //     this.ctx.canvas.height = this.playground.clienttHeight;
    //     this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    //     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // }


    render() {
        
        // this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw_runline();
    }

    draw_runline()
    {
        const ctx = this.ctx;
        let canvas_width = this.ctx.canvas.width;
        let canvas_height = this.ctx.canvas.height;
        
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        
        const numRaces = 10;
        const raceHeight = canvas_height / numRaces;
        
        // 绘制跑道（修改部分）
        for (let i = 0; i < numRaces; i++) {
            // 判断最上层和最下层
            ctx.fillStyle = (i === 0 || i === numRaces - 1) 
                ? '#3CB371'  // 草坪绿色
                : '#c3272b';    // 跑道红色
            
            ctx.fillRect(0, i * raceHeight, canvas_width, raceHeight);
            // if(i >= 1 && i <= 8)
            // {   
            //     let radius = raceHeight * 0.3;
            //     let x = canvas_width * 0.8 + radius;
            //     let y = i * raceHeight + radius + (raceHeight - 2 * radius)/2 
            //     this.runners.push(new Runner(this , x , y, radius, 'yellow'));
            // }
                
        }
        
        // 绘制分割线（保持原逻辑）
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // 实线
        
        for (let i = 1; i < numRaces; i++) {
            const y = i * raceHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas_width, y);
            ctx.stroke();
        }  
        // ======== 新增起跑线绘制 ========
        // 计算起跑线位置
        const startLineX = canvas_width * 0.8; // 右侧20vw位置（100vw - 20vw）
        const redTrackStartY = raceHeight;     // 第一个红色跑道顶部
        const redTrackEndY = raceHeight * (numRaces - 1); // 最后一个红色跑道底部

        // 绘制垂直起跑线
        ctx.beginPath();
        ctx.strokeStyle = 'white'; // 白色起跑线
        ctx.lineWidth = 4;        // 加粗显示
        ctx.moveTo(startLineX, redTrackStartY);
        ctx.lineTo(startLineX, redTrackEndY);
        ctx.stroke();
    }
 }