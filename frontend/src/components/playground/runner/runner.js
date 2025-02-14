import { AcGameObject } from "../objects/zbase.js";

export default class Runner extends AcGameObject
{
    constructor(playground ,x, y, radius, color)
    {   
        super();
        this.playground = playground;
        this.ctx = this.playground.runmap.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.state = "waiting";
        this.speed = this.radius * 2;
    }

    start()
    {

    }

    update()
    {   
        if (this.state === "waiting")
        {
            setTimeout(() => {
                this.state = "run";
                this.move();
            }, 3000);
        }
        this.render();
    }

    render()
    {
        this.render_runner();
    }

    move()
    {
        this.x -= this.speed;
        if (this.x <= this.ctx.canvas.width * 0.4)
        {
            this.x = this.ctx.canvas.width * 0.4;
        }
    }

    render_runner()
    {
        this.ctx.beginPath();
		this.ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();

    }
        
}