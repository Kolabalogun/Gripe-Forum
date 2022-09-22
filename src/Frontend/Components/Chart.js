import React from "react";

import {

  XAxis,
  YAxis,

  CartesianGrid,

  LineChart,
  Line,
} from "recharts";

const Chart = ({ application, response, complains }) => {
  const data1 = [
    { name: "Application", users: 2000000000 },
    { name: "Response", users: 1500000000 },
    { name: "Complain", users: 1000000000 },

  ];

  console.log(response);


  const data = [{ name: 'Application', uv: application, pv: application, amt: application }, { name: 'Complains', uv: complains, pv: complains, amt: 0 }, { name: 'Response', uv: 2, pv: 1, amt: 0 },];

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
          <Line type="monotone" dataKey="uv" stroke="rgb(65, 84, 241)" />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="rgb(255, 119, 29" />
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
