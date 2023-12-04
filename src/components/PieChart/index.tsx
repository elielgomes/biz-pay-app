"use client";

import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export interface Chart {
	active: number,
	inactive: number,
}

interface IProps {
	data: Chart | null;
}

export const PieChart: React.FC<IProps> = ({ data }) => {

	ChartJS.register(ArcElement, Tooltip, Legend);

	return (
		<>
			<Doughnut data={{
				labels: ["Ativos", "Inativos"],
				datasets: [
					{
						label: ' ',
						data: [data?.active, data?.inactive],
						backgroundColor: [
							'#FF9B44',
							'#FC6075',
						],
						borderColor: [
							'#FF9B44',
							'#FC6075',
						],
						borderWidth: 1,
					},
				],
			}}
				options={{
					maintainAspectRatio: false,
					// aspectRatio: 2 / 1,
					responsive: true,
					plugins: {
						legend: {
							position: "right",
						},
					}
				}}
			/>
		</>
	)
} 