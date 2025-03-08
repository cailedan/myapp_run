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
        this.clickHandler = null;
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

        this.clickHandler = (event) => {
            this.handleCanvasClick(event);
        }

        this.ctx.canvas.addEventListener("click", this.clickHandler);
    }
    stopListening() {
        if (this.clickHandler) {
            this.ctx.canvas.removeEventListener('click', this.clickHandler);
            this.clickHandler = null; // 清空引用
        }
    }

    handleCanvasClick(event) {
        const rect = this.$canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // 处理点击事件
        // ...
        for (let runner of this.playground.runners)
        {
            const distance = Math.sqrt((x - runner.x) ** 2 + (y - runner.y) ** 2);
            if (distance <= runner.radius) {
                runner.isSelected = true;
                runner.wasSelected();
            } else {
                runner.isSelected = false;
            }
        }
    }

    update() {
        
        this.render();
        this.updateLines();
        // console.log(this.state);
    }

    // resize() {
    //     this.ctx.canvas.width = this.playground.clientWidth;
    //     this.ctx.canvas.height = this.playground.clienttHeight;
    //     this.ctx.fillStyle = "rgb(32, 154, 154)";
    //     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // }

    updateLines() {
        // 根据跑者平均速度移动起跑线
        const midSpeed = this.getMidSpeed();
        this.startLineOffset += midSpeed * 0.5*this.timedelta/1000;
        
        // 当有跑者接近终点时显示终点线
        if (!this.showFinishLine && this.anyRunnerNearFinish()) {
            this.showFinishLine = true;
        }
        
        // 移动终点线
        if (this.showFinishLine) {
            let runners = this.playground.runners;
            for (let i = 0; i < runners.length; i++) {
                let speed = runners[i].speed;
            }
            if (this.state === "fighting") {
                if (this.get_winner() ) {
                    this.state === "get_winner";
                }
                else {

                    if(midSpeed * 0.5 > 0)
                    {
                        let finish_line_position = midSpeed * 0.5*this.timedelta/1000;
                        this.finishLineOffset += finish_line_position;
                    }

                }
            } 

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
            if (faster.x - this.finishX <= 0)
            {
                winner = faster;
                return winner;
            }
        }

        return null;
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
    getMidSpeed() {
        // 步骤1：过滤出状态为 "running" 的跑者
        const runningRunners = this.playground.runners.filter(r => r.state === "running");

        // 步骤2：提取所有跑者的速度并排序
        const sortedSpeeds = runningRunners
        .map(r => r.speed)
        .sort((a, b) => a - b); // 升序排序

        // 步骤3：计算中位数
        function calculateMedian(speeds) {
        if (speeds.length === 0) return null; // 处理空数组
        
        const mid = Math.floor(speeds.length / 2);
        // 数组长度为奇数：取中间值
        // 数组长度为偶数：取中间两数平均值
        return speeds.length % 2 !== 0 
            ? speeds[mid] 
            : (speeds[mid - 1] + speeds[mid]) / 2;
        }

        const medianSpeed = calculateMedian(sortedSpeeds);
        // return runners.reduce((sum, r) => sum + r.speed, 0) / runners.length || 0;
        return medianSpeed;
    }

    anyRunnerNearFinish() {
        return this.playground.runners.some(r => 
            r.x < this.width * 0.3 && r.state === "running"
 
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
        this.startLineX = canvas_width * 0.8; // 右侧20vw位置（100vw - 20vw）
        const redTrackStartY = raceHeight;     // 第一个红色跑道顶部
        const redTrackEndY = raceHeight * (numRaces - 1); // 最后一个红色跑道底部

        // 绘制垂直起跑线
        ctx.beginPath();
        ctx.strokeStyle = 'white'; // 白色起跑线
        ctx.lineWidth = 4;        // 加粗显示
        this.startLineX += this.startLineOffset;
        let visualX = Math.round(this.startLineX);
        ctx.moveTo(visualX , redTrackStartY);
        ctx.lineTo(visualX, redTrackEndY);
        ctx.stroke();
    }

    draw_finishline()
    {
      
            this.ctx.strokeStyle = '#ff0000';
            this.ctx.setLineDash([]);
            this.ctx.beginPath();
            this.finishX = this.finishLineOffset;
            this.ctx.moveTo(this.finishX, 0);
            this.ctx.lineTo(this.finishX, this.height);
            this.ctx.stroke();
        
        // 绘制跑道（修改部分）
    }
    
 }