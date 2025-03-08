import { AcGameObject } from "../objects/zbase.js";

export default class Runner extends AcGameObject
{
    constructor(playground ,x, y, radius, color , speed)
    {   
        super();
        this.playground = playground;
        this.ctx = this.playground.runmap.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.state = "waiting";
        this.speed = speed;

        this.isSelected = false; // 新增选中状态属性
    }

    start()
    {   
       
        setTimeout(() => {
            this.state = "running";
            
        }, 2000);

        
    }

    update()
    {         
        if (this.state === "running")
        {       
            this.move();
        }
        
            this.render();
    }

    wasSelected()
    {
        console.log("Selected");
    }
    render()
    {
        this.render_runner();
        this.render_glow();
    }

    move()
    {
        let midSpeed = this.playground.runmap.getMidSpeed();
        this.x -= (this.speed - midSpeed * 0.5) * this.timedelta / 1000;
        if (this.x <= this.ctx.canvas.width * 0.2)
        {
            this.x = this.ctx.canvas.width * 0.2;
            this.state = "finished";
        }
    }

    render_runner()
    {
        this.ctx.beginPath();
		this.ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();

    }render_glow() {
        if (this.isSelected) {
            const glowRadius = this.radius * 1.3; // 光环外圆半径，可根据需要调整
            const innerRadius = this.radius * 1.2; // 光环内圆半径，可根据需要调整
            const glowColor = 'rgba(255, 255, 0, 1)'; // 光环颜色，这里使用黄色
            const glowWidth = glowRadius - innerRadius; // 圆环宽度
    
            this.ctx.beginPath();
            // 绘制外圆
            this.ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2, false);
            // 绘制内圆（反向绘制，形成一个闭合路径）
            this.ctx.arc(this.x, this.y, innerRadius, Math.PI * 2, 0, true);
            this.ctx.closePath();
    
            this.ctx.fillStyle = glowColor;
            this.ctx.fill();
        }
    }
        
}