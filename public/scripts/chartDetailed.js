var moment = require("moment");
var expenses = JSON.parse(document.getElementById('expenses').innerText);
document.getElementById('expenses').remove();

function isMobileDevice(){
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

var label = String(expenses[0].type);
var xAxis = [];
var labels = [];
var dataSet = [];
expenses.forEach(function(expense) {
    dataSet.push({x: expense.createdAt, y: expense.amount});
    labels.push(expense.description);
	xAxis.push(moment(expense.createdAt).format("DD MMM"));
});

for (var i = xAxis.length; i < 10; i++) {
  xAxis.push("");
}


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        
        datasets: [
            {   label: label ,
                labels: labels, 
				// ["jumno","albert","poytsa","ble"]
               
                data:  dataSet,
				   // [{x: "10:00", y:  127},
				   // {x: "11:00", y: 140},
				   // {x: "12:00", y: 135},
				   // {x: "13:00", y: 122}],
			 
		backgroundColor: "rgba(252,81,133,0.7)",
			 hoverBackgroundColor: "rgb(252,81,133)",
			 borderColor: "#f0f0f0",
			 hoverBorderColor: "#43dde6",
			 borderWidth: "1",
			 borderSkipped: "bottom"
			
			
			
		
            }
        ]
    },

    // Configuration options go here
    options: {
		   tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var index = tooltipItem.index;
                    return dataset.labels[index] + ': ' + dataset.data[index].y;
                }
            }
        },
		 scales: {
            xAxes: [{
                type: 'category',
                labels: xAxis,
				// ["10:00", "11:00", "12:00", "13:00"],
				ticks: {
                  fontColor: "#f0f0f0", // this here,
					display: !isMobileDevice()
                }
		
			
		
            }], 
			 yAxes: [{
                ticks: {
				 fontColor: "#f0f0f0",
                 suggestedMin: 0
                }
		
            }]
        },
		
        legend: {
            
				display: false
			// display: !isMobileDevice()
        }
       
    }
});

function toggleLegend() {
    if (window.innerWidth < 768) {
        console.log('I AM ON SMALL');
        chart.chart.config.options.scales.xAxes[0].ticks.display = false;
    } else {
        console.log('IM ON MEDIUM');
        chart.chart.config.options.scales.xAxes[0].ticks.display = true;
    }
}

toggleLegend();
window.onresize = toggleLegend;