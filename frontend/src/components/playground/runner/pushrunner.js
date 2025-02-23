import Runner from "./runner.js";
let pushrunner = (playground, width, height, speed, i) => {
    let n = 10;
    let raceHeight = height / n;
    // let runners = [];
    let randomspeed = (Math.random() * 0.5 + 0.5)*speed;
    let radius = raceHeight * 0.3;
    let x = width * 0.8 + radius;
    let y = i * raceHeight + radius + (raceHeight - 2 * radius) / 2;
    return new Runner(playground, x, y, radius, 'yellow', randomspeed);
  
    
}
export default pushrunner;