import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Text, Cell } from 'recharts';

const data = [
  { name: '30 Days', value: 2, color: '#E08414' },
  { name: '60 Days', value: 6, color: '#1CD1D5' },
  { name: '90 Days', value: 10, color: '#7086FD' },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius) * cos;
  const sy = cy + (outerRadius) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g >
      <Text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={20} fill="#333">{18}</Text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey - 10} textAnchor={textAnchor} fontSize={12} fill="#333">{`${payload.value} Renewals Due in`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 10} textAnchor={textAnchor} fontSize={14} fill={fill}>
        {payload.name}
      </text>
    </g>
  );
};

const RenewalPieChart = () => {
  const [activeIndex, setActiveIndex] = useState('');

  const getAllIndexes = () => {
    return data.map((_, index) => index);
  }
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const onPieLeave = () => {
    const activeIndexes = getAllIndexes();
    setActiveIndex(activeIndexes);
  }

  useEffect(() => {
    onPieLeave()

  }, [data])
  return (
    <PieChart width={500} height={252}  >
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={30}
        outerRadius={70}
        dataKey="value"
        // onMouseEnter={onPieEnter}
        // onMouseLeave={onPieLeave}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: "none" }} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default RenewalPieChart;
