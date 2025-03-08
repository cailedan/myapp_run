"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,

} from "@/components/ui/chart";


const ChartTooltipContent = ({ active, payload, label, selectedDataKey }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        let formattedValue;

        if (selectedDataKey === 'runtime') {
            const secondsToTime = (seconds) => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            };
            formattedValue = secondsToTime(value);
        } else if (selectedDataKey === 'distance') {
            formattedValue = `${value} 公里`;
        } else {
            const secondsToTime = (seconds) => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            };
            formattedValue = secondsToTime(value);
        }

        return (
            <div className="bg-white p-2 border border-gray-300 rounded">
                <p>{`时间: ${label}`}</p>
                <p>{`${selectedDataKey === 'distance' ? '距离' : selectedDataKey === 'runtime' ? '运动时间' : '配速'}: ${formattedValue}`}</p>
            </div>
        );
    }

};



const originalChartData = [
  { time: "2025.2.1",runtime:"00:31:21",distance: "6.1公里", speed: "5'30''", heartRate: "120", step: "8000" },
  { time: "2025.2.2", runtime:"00:20:31",distance: "6.2公里", speed: "5'31''", heartRate: "121", step: "8100" },
  { time: "2025.2.3", runtime:"00:30:31",distance: "6.3公里", speed: "5'32''", heartRate: "122", step: "8200" },
  { time: "2025.2.4",runtime:"00:35:31", distance: "6.4公里", speed: "5'33''", heartRate: "123", step: "8300" },
  { time: "2025.2.5",runtime:"00:35:31", distance: "6.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
  { time: "2025.2.7", runtime:"00:12:31",distance: "6.0公里", speed: "5'31''", heartRate: "124", step: "8400" },
    { time: "2025.2.8",runtime:"00:43:31", distance: "6.0公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.10",runtime:"01:33:31", distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.11", runtime:"01:30:31",distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.12",runtime:"02:35:31", distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.13",runtime:"00:31:31", distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.14",runtime:"00:32:31", distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
    { time: "2025.2.15",runtime:"00:30:44", distance: "5.5公里", speed: "5'34''", heartRate: "124", step: "8400" },
];

// 将时间字符串转换为秒数
const RuntimeToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

    const SpeedtimeToSeconds = (timeStr) => {
        const [minutes, seconds] = timeStr.split("'").map(Number);
        return minutes * 60 + seconds;
    };

// 将秒数转换为时间字符串
const secondsToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const scaleFactor = 10;
const processedChartData = (data) => {
    return data.map(item => ({
        ...item,
        distance: parseFloat(item.distance.replace("公里", "")),
        speed: SpeedtimeToSeconds(item.speed),
        runtime: RuntimeToSeconds(item.runtime),
      }));
};

const chartConfig = {
  distance: {
    label: "距离" ,
    color: "rgb(34 197 94)",
  },
  speed: {
    label: "配速",
    color: "rgb(225 29 72)",
  },
  runtime: {
    label: "运动时间",
    color: "orange",
  },
};

export function Component(props) {
  const [currentData, setCurrentData] = useState(processedChartData(originalChartData));
  const [selectedDataKey, setSelectedDataKey] = useState("distance");

  const handleButtonClick = (dataKey) => {
    setSelectedDataKey(dataKey);
    // 可以根据需要对数据进行进一步处理，这里简单地使用原始处理后的数据
    setCurrentData(processedChartData(originalChartData));
  };
    
    const getTickFormatter = () => {
        if (selectedDataKey === 'runtime') {
            return (value) => secondsToTime(value);
        } else if (selectedDataKey === 'distance') {
            return (value) => `${value} 公里`;
        } else if (selectedDataKey === 'speed') {
            return (value) => secondsToTime(value);
        }
        return (value) => value;
    };
      // 获取当前数据的最小值和最大值
      const getMinMax = () => {
        const values = currentData.map(item => item[selectedDataKey]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return [min, max];
    };

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <Card className="flex flex-col h-full flex-1">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Area Chart - Gradient</CardTitle>
          <CardDescription>
            展示运动数据
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={currentData}
              margin={{
                left: 3,
                right: 3,
              }}
              width="100%"
              height="100%"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={getTickFormatter()}
                domain={() => {
                    const [min, max] = getMinMax();
                    // 调整刻度范围，让数据分布更均匀
                    return [Math.floor(min * 0.9), Math.ceil(max * 1.1)];
                }}
                              
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent selectedDataKey={selectedDataKey} />}
              />
              <defs>
                <linearGradient id="fillDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(34 197 94)"
                    stopOpacity={0.8}
                   />
                   <stop
                    offset="45%"
                    stopColor="rgb(94 234 212)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="green"
                    stopOpacity={0.1}
                  />
                 </linearGradient>
                 <linearGradient id="fillRuntime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="5%"
                        stopColor="orange"
                        stopOpacity={0.8}
                    />
                    <stop
                      offset="45%"
                      stopColor="rgb(190 242 100)"
                      stopOpacity={0.2}
                    />
                    <stop
                        offset="95%"
                        stopColor="orange"
                        stopOpacity={0.1}
                    />
                </linearGradient>              
                <linearGradient id="fillSpeed" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(225 29 72)"
                    stopOpacity={0.98}
                  />
                 <stop
                    offset="15%"
                    stopColor="yellow"
                    stopOpacity={0.02}
                  />
                  <stop
                    offset="95%"
                    stopColor="green"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey={selectedDataKey}
                type="natural"
                fill={`url(#fill${selectedDataKey === "distance"? "Distance" : selectedDataKey === "speed"? "Speed" : "Runtime"})`}
                fillOpacity={0.4}
                stroke={`var(--color-${selectedDataKey})`}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-shrink-0">
          <div className="flex flex-1 w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {/* <div className="flex items-center gap-2 font-medium leading-none">
                数据趋势上升 <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                2025.2.1 - 2025.2.5
              </div> */}
            </div>
            <div className="flex  items-center gap-2 ml-auto">
              <button
                onClick={() => handleButtonClick("distance")}
                className="bg-green-400 text-white px-2 py-1 rounded"
              >
                距离
              </button>
              <button
                 onClick={() => handleButtonClick("runtime")}
                 className="bg-amber-400 text-white px-2 py-1 rounded ml-2"
      >
                运动时间
              </button>
              <button
                onClick={() => handleButtonClick("speed")}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                配速
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}