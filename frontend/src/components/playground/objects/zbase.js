// AcGameObject.js
let AC_GAME_OBJECTS = [];

export class AcGameObject {
  constructor() {
    AC_GAME_OBJECTS.push(this);
    this.has_called_start = false;
    this.timedelta = 0; // ms ,距离上一帧的时间间隔
    this.uuid = this.create_uuid(); //创建每个对象的唯一id
    
  }

  // 创建唯一的 UUID
  create_uuid() {
    let res = "";
    for (let i = 0; i < 8; i++) {
      let x = parseInt(Math.floor(Math.random() * 10));
      res += x;
    }
    return res;
  }

  // 对象的初始化方法
  start() {}

  // 更新方法
  update() {}

  // 销毁方法
  on_destroy() {
    // 销毁时的逻辑，可以在这里写入游戏结束等操作
  }

  destroy() {
    this.on_destroy();
    for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {
      if (AC_GAME_OBJECTS[i] === this) {
        AC_GAME_OBJECTS.splice(i, 1);
        break;
      }
    }
  }
}

export default AC_GAME_OBJECTS;
