const expenses = JSON.parse(document.getElementById('expenses').innerText);
const expensesTime = JSON.parse(document.getElementById('expensesTime').innerText);

const jsonHolder = document.getElementById('expenses');
const jsonHolderTwo = document.getElementById('expensesTime');

//Internet explorer fix instead of .remove() which is not compatible
jsonHolder.parentNode.removeChild(jsonHolder);
jsonHolderTwo.parentNode.removeChild(jsonHolderTwo);

function isMobileDevice() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const label = String(expenses[0].type);
const labels = [];
const dataSet = [];
expenses.forEach((expense) => {
	dataSet.push({ x: expense.createdAt, y: expense.amount.toFixed(2) });
	labels.push(expense.description);
});

for (let i = expensesTime.length; i < 10; i++) {
	expensesTime.push('');
}

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'bar',

	// The data for our dataset
	data: {
		datasets: [
			{
				label: label,
				labels: labels,
				// ["jumno","albert","poytsa","ble"]

				data: dataSet,
				// [{x: "10:00", y:  127},
				// {x: "11:00", y: 140},
				// {x: "12:00", y: 135},
				// {x: "13:00", y: 122}],

				backgroundColor: 'rgba(252,81,133,0.7)',
				hoverBackgroundColor: 'rgb(252,81,133)',
				borderColor: '#f0f0f0',
				hoverBorderColor: '#43dde6',
				borderWidth: '1',
				borderSkipped: 'bottom'
			}
		]
	},

	// Configuration options go here
	options: {
		tooltips: {
			callbacks: {
				label: function(tooltipItem, data) {
					const dataset = data.datasets[tooltipItem.datasetIndex];
					const index = tooltipItem.index;
					return dataset.labels[index] + ': ' + dataset.data[index].y;
				}
			}
		},
		scales: {
			xAxes: [
				{
					type: 'category',
					labels: expensesTime,
					// ["10:00", "11:00", "12:00", "13:00"],
					ticks: {
						fontColor: '#f0f0f0', // this here,
						display: !isMobileDevice()
					}
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
