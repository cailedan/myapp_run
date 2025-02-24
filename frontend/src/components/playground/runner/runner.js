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

    render()
    {
        this.render_runner();
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

    }
        
}