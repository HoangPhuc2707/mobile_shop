import React, { PureComponent } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { convertDataChart } from '../../utils';

const PieChartComponent = (props) => {
  const data = convertDataChart(props.data, 'paymentMethod')
  const COLORS = ['rgb(110, 186, 252)', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            color: '#1a1a1a',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent