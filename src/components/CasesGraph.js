import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

const options = {
    plugins: { 
        legend: {
            display: false,
        }
    }
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  if(data.cases){
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  }else{
    for(let dateInTime in data.timeline.cases){
      if (lastDataPoint) {
        let newDataPoint = {
          x: dateInTime,
          y: data.timeline[casesType][dateInTime] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data.timeline[casesType][dateInTime];
    }
  }
  return chartData;
};

function LineGraph({ casesType, country}) {
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");

 
    useEffect(
      () => {
      const temp = country === "worldwide" ? "all" : "poland"
      const newUrl = `https://disease.sh/v3/covid-19/historical/${temp}?lastdays=30`
      setUrl(newUrl)
      },
      [country, url],
    )
      

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, url]);


  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                borderColor: "#f48fb1",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
