"use client"

import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export interface IBarChart {
	male: number[];
	female: number[];
}

interface IProps {
	dataChart: IBarChart;
}

export const BarChart: React.FC<IProps> = ({ dataChart }) => {

	const data = {
		labels: ['0-20', '20-30', '30-40', '40-50', '50-60', '60-70'],
		datasets: [
			{
				label: 'Mulheres',
				data: dataChart.female,
				backgroundColor: 'rgba(248, 40, 90, 0.8)',
			},
			{
				label: 'Homens',
				data: dataChart.male,
				backgroundColor: 'rgba(27, 132, 255,  0.8)',
			},
		],
	};

	const options = {
		scales: {
			y: {
				title: {
					display: true,
					text: 'Quantidade de Funcionários',
				},
				beginAtZero: true,
				max: Math.max(...[...data.datasets[0].data, ...data.datasets[1].data]) + 1,
				ticks: {
					stepSize: 1,
				},
			},
			x: {
				title: {
					display: true,
					text: 'Faixa Etária',
				},
			},
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'right' as const,
			},
		},
	};

	return (
		<>
			<Bar options={options} data={data} />
		</>
	)
};