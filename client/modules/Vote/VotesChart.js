import React from "react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	LabelList
} from "recharts";

export default ({
	answers,
	totalVotes
}) => {
	const data = answers.map(({
		answer,
		voteCount
	}) => {
		return {
			answer,
			value: voteCount,
			voteLabel: voteCount === 1 ? voteCount + " vote" : voteCount + " votes",
			percent: voteCount === 0 ? "" : Math.floor(voteCount / totalVotes * 100) + "%"
		};
	});

	return (
		<ResponsiveContainer width="100%" height="90%">
      <BarChart data={data}>
        <XAxis dataKey="answer" />
        <YAxis padding={{ top: 30 }} />
        <CartesianGrid vertical={false} stroke="#ebf3f0" />
        <Bar dataKey="value" fill="#29b6f6">
          <LabelList dataKey="voteLabel" position="top" />
          <LabelList dataKey="percent" position="insideTop" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
	);
};
