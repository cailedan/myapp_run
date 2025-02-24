export class DistanceMark extends AcGameObject {
    constructor(runmap ,x, y, speed)
    {   
        super();
        this.runmap = runmap;
        this.ctx = this.playground.runmap.ctx;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.height = this.runmap.height;
    }

    start()
    {

    }

    update()
    {
        this.render();
    }

    render()
    {

    }

    draw_distance_mark()
    {
        this.ctx.strokeStyle = rgb(147, 245, 160);
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.finishX = this.distanceOffset;
        this.ctx.moveTo(this.x + this.finishX, 0);
        this.ctx.lineTo(this.x + this.finishX, this.height);
        this.ctx.stroke();
    }

}