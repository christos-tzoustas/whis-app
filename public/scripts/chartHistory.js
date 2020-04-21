// var moment = require("moment");
var expenses = JSON.parse(document.getElementById('expenses').innerText);
document.getElementById('expenses').remove();

// function isMobileDevice(){
//     return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
// }

var label = String(expenses[0].type);
var xAxis = [];
var labels = [];
var dataSet = [];
expenses.forEach(function(expense) {
    dataSet.push(expense.totalExpensesAmount);
    labels.push(expense.month);
	
});


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        
        datasets: [
            {   
                
                data:  dataSet,
				   // [{x: "10:00", y:  127},
				   // {x: "11:00", y: 140},
				   // {x: "12:00", y: 135},
				   // {x: "13:00", y: 122}],
			 
			 borderColor: "rgba(252,81,133,0.4)",
			
			 pointBackgroundColor: "rgb(252,81,133)",
			 pointHoverBorderColor: "rgb(67,221,230)"
			
		
            }
        ]
    },

    // Configuration options go here
    options: {
		   
		 scales: {
            xAxes: [{
                type: 'category',
				labels: labels,
                
				// ["10:00", "11:00", "12:00", "13:00"],
				ticks: {
                  fontColor: "#f0f0f0", // this here
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

// function toggleLegend() {
//     if (window.innerWidth < 768) {
//         console.log('I AM ON SMALL');
//         chart.chart.config.options.legend.display = false;
//     } else {
//         console.log('IM ON MEDIUM');
//         chart.chart.config.options.legend.display = true;
//     }
// }

// toggleLegend();
// window.onresize = toggleLegend;