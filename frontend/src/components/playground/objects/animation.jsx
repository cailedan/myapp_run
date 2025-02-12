import AC_GAME_OBJECTS from "./zbase.js";
import React, { useState, useEffect, useRef } from 'react';  

const GameAnimation = () => {
    const [isRunning, setIsRunning] = useState(true);
    const lastTimestampRef = useRef(0);    // 使用 useRef 保存时间戳
    const animationFrameIdRef = useRef();  // 保存动画帧ID
  
    useEffect(() => {
      const AC_GAME_ANIMATION = (timestamp) => {
        for (const obj of AC_GAME_OBJECTS) {
          if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
          } else {
            obj.timedelta = timestamp - lastTimestampRef.current;
            obj.update();
          }
        }
        lastTimestampRef.current = timestamp;
        if (isRunning) {
          animationFrameIdRef.current = requestAnimationFrame(AC_GAME_ANIMATION);
        }
      };
  
      animationFrameIdRef.current = requestAnimationFrame(AC_GAME_ANIMATION);
  
      // 清理函数：取消动画循环
      return () => {
        cancelAnimationFrame(animationFrameIdRef.current);
      };
    }, [isRunning]);
  
    return null;
};
  
export default GameAnimation;