import React from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  LineChart,
  Line,
} from "recharts";

const Chart = () => {
  const data1 = [
    { name: "Application", users: 2000000000 },
    { name: "Response", users: 1500000000 },
    { name: "Complain", users: 1000000000 },

  ];


  const data = [{ name: 'Application', uv: 3, pv: 3, amt: 0 }, { name: 'Complains', uv: 3, pv: 2, amt: 0 }, { name: 'Response', uv: 1, pv: 2, amt: 0 },];

  return (
    <div style={{ textAlign: "center" }}>

      <div className="App">
        {/* <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart> */}

        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
        </LineChart>


        {/* <BarChart
          width={500}
          height={300}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart> */}
      </div>
    </div>
  );
};

export default Chart;
