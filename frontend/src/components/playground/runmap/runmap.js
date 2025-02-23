import { AcGameObject } from "../objects/zbase.js";
import Runner from "../runner/runner.js";

export default class RunMap extends AcGameObject{
    constructor(playground , $canvas) {
        super();
        this.playground = playground;
        this.$canvas = $canvas
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.canvas.width = this.playground.playgroundRef.current.clientWidth;
        this.ctx.canvas.height = this.playground.playgroundRef.current.clientHeight;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
         // 起跑线/终点线控制参数
         this.startLineOffset = 0;  // 起跑线偏移量
        this.finishLineOffset = 0; // 终点线偏移量
        this.finishX = 0; //终点线x坐标
        this.showFinishLine = false;
        this.state = "fighting";
        
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
        this.updateLines();
        // console.log(this.state);
    }

    // resize() {
    //     this.ctx.canvas.width = this.playground.clientWidth;
    //     this.ctx.canvas.height = this.playground.clienttHeight;
    //     this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    //     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // }

    updateLines() {
        // 根据跑者平均速度移动起跑线
        const avgSpeed = this.getAverageSpeed();
        this.startLineOffset += avgSpeed * 0.8;
        
        // 当有跑者接近终点时显示终点线
        if (!this.showFinishLine && this.anyRunnerNearFinish()) {
            this.showFinishLine = true;
        }
        
        // 移动终点线
        if (this.showFinishLine) {
            if (this.state === "fighting") {
                if (this.get_winner() ) {
                    this.finishLineOffset = 0;
                    this.state === "get_winner";
                }
                else {
                    // console.log(this.finishLineOffset);
                    this.finishLineOffset = avgSpeed * 0.05;
                    // console.log(avgSpeed);
                }
            } 
            // this.finishLineOffset = 0;
        }
    }

    get_winner() {
        let winner = null;
        let runners = this.playground.runners;
        if (runners.length === 0) {
            return null;
        }
        if(this.state === "fighting")
        {
            let faster = this.get_faster();
            // console.log(faster.x - this.finishX);
            // console.log(this.finishX);
            if (faster.x - this.finishX <= 0)
            {
                winner = faster;
                return winner;
            }
        }

        
    }

    get_faster()
    {
        let faster = null;
        for (let i = 0; i < this.playground.runners.length; i++) {
            if (this.state === "fighting" ) {
                if (faster === null || this.playground.runners[i].x < faster.x) {
                    faster = this.playground.runners[i];
                }
            }
        }
        return faster;
    }
    getAverageSpeed() {
        const runners = this.playground.runners.filter(r => r.state === "running");
        return runners.reduce((sum, r) => sum + r.speed, 0) / runners.length || 0;
    }

    anyRunnerNearFinish() {
        return this.playground.runners.some(r => 
            r.x < this.width * 0.6 && r.state === "running"
                && r.x > this.width * 0.6 - r.radius
        );
    }

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
        this.draw_startline(ctx , canvas_width , raceHeight , numRaces);
        if(this.showFinishLine) this.draw_finishline();
    }
    draw_startline(ctx , canvas_width , raceHeight , numRaces)
    {
        const startLineX = canvas_width * 0.8; // 右侧20vw位置（100vw - 20vw）
        const redTrackStartY = raceHeight;     // 第一个红色跑道顶部
        const redTrackEndY = raceHeight * (numRaces - 1); // 最后一个红色跑道底部

        // 绘制垂直起跑线
        ctx.beginPath();
        ctx.strokeStyle = 'white'; // 白色起跑线
        ctx.lineWidth = 4;        // 加粗显示
        ctx.moveTo(startLineX + this.startLineOffset, redTrackStartY);
        ctx.lineTo(startLineX + this.startLineOffset, redTrackEndY);
        ctx.stroke();
    }

    draw_finishline()
    {
      
            this.ctx.strokeStyle = '#ff0000';
            this.ctx.setLineDash([]);
            this.ctx.beginPath();
            this.finishX += this.finishLineOffset;
            this.ctx.moveTo(this.finishX, 0);
            this.ctx.lineTo(this.finishX, this.height);
            this.ctx.stroke();
        
        // 绘制跑道（修改部分）
    }
 }