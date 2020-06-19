// var moment = require("moment");
const expenses = JSON.parse(document.getElementById('expenses').innerText);

const jsonHolder = document.getElementById('expenses');

//Internet explorer fix instead of .remove() which is not compatible
jsonHolder.parentNode.removeChild(jsonHolder);

function isMobileDevice() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const labels = [];
const dataSet = [];
expenses.forEach(function(expense) {
	dataSet.push(expense.totalExpensesAmount.toFixed(2));
	labels.push(expense.month);
});

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',

	// The data for our dataset
	data: {
		datasets: [
			{
				data: dataSet,
				// [{x: "10:00", y:  127},
				// {x: "11:00", y: 140},
				// {x: "12:00", y: 135},
				// {x: "13:00", y: 122}],

				borderColor: 'rgba(252,81,133,0.4)',

				pointBackgroundColor: 'rgb(252,81,133)',
				pointHoverBorderColor: 'rgb(67,221,230)'
			}
		]
	},

	// Configuration options go here
	options: {
		scales: {
			xAxes: [
				{
					type: 'category',
					labels: labels,

					// ["10:00", "11:00", "12:00", "13:00"],
					ticks: {
						fontColor: '#f0f0f0' // this here
					},
					display: !isMobileDevice()
				}
			],
			yAxes: [
				{
					ticks: {
						fontColor: '#f0f0f0',
						suggestedMin: 0
					}
				}
			]
		},

		legend: {
			display: false
			// display: !isMobileDevice()
		}
	}
});

function toggleLegend() {
	if (window.innerWidth < 768) {
		chart.chart.config.options.scales.xAxes[0].ticks.display = false;
	} else {
		chart.chart.config.options.scales.xAxes[0].ticks.display = true;
	}
}

toggleLegend();
