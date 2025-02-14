import Runner from "./runner.js";
let pushrunner = (playground,width, height) => {
    let n = 10;
    let raceHeight = height / n;
    let runners = [];
    for (let i = 1; i <= 8; i++)
    {
        let radius = raceHeight * 0.3;
        let x = width * 0.8 + radius;
        let y = i * raceHeight + radius + (raceHeight - 2 * radius) / 2;
        runners.push(new Runner( playground ,x , y, radius, 'yellow'));
    }
    return runners;
}

export default pushrunner;