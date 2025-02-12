import { AcGameObject } from "../objects/zbase.js";

export default class RunMap extends AcGameObject{
    constructor(playground , $canvas) {
        super();
        this.playground = playground;
        this.$canvas = $canvas
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.canvas.width = playground.clientWidth;
        this.ctx.canvas.height = playground.clientHeight;
      
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
        
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }
}