var expenses = JSON.parse(document.getElementById('expenses').innerText);
document.getElementById('expenses').remove();

function isMobileDevice(){
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}


var labels = [];
var dataSet = [];
expenses.forEach(function(expense) {
    dataSet.push(expense.totalExpensesAmount);
    labels.push(expense._id);
});

var overallTotal = 0;
expenses.forEach(function(expense) {
    overallTotal = overallTotal + expense.totalExpensesAmount;
    return overallTotal;
});

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [
            {
                label: 'My expenses',
                backgroundColor: [
                     '#43dde6',
                   '#00c9ff',
                    '#87a9ff',
					  '#db7bdd',
                    '#fc5185',
                    '#ff809e',
                    '#fea7b9',
                  
                    '#f9ccd4',
                    '#f0f0f0'
                ],
                borderColor: [
                     '#43dde6',
                   '#00c9ff',
                    '#87a9ff',
					  '#db7bdd',
                    '#fc5185',
                    '#ff809e',
                    '#fea7b9',
                  
                    '#f9ccd4',
                    '#f0f0f0'
                ],
                data: dataSet
            }
        ]
    },

    // Configuration options go here
    options: {
        legend: {
            labels: {
                // This more specific font property overrides the global property

                fontColor: '#ffffff',
                padding: 20
            },
            position: 'left',
			display: !isMobileDevice()
        },
        title: {
            display: false,
            text: 'Total amount ' + overallTotal,
            position: 'top',

            fontStyle: 'regular',
            fontColor: '#ffffff'
        }
    }
});

function toggleLegend() {
    if (window.innerWidth < 768) {
        console.log('I AM ON SMALL');
        chart.chart.config.options.legend.display = false;
    } else {
        console.log('IM ON MEDIUM');
        chart.chart.config.options.legend.display = true;
    }
}

toggleLegend();
window.onresize = toggleLegend;