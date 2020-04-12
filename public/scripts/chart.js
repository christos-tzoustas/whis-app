var expenses = JSON.parse(document.getElementById('expenses').innerText);
document.getElementById('expenses').remove();

var labels = [];
var dataSet = [];
expenses.forEach(function(expense) {
    dataSet.push(expense.totalExpensesAmount + "EUR");
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
        labels: [
            'Groceries',
            'Food & Drinks',
            'Home',
            'Rent',
            'Utilities',
            'Holiday & Travelling',
            'Leisure & Entertainment',
            'Shopping',
            'Transportation'
        ],
        datasets: [
            {
                label: 'My expenses',
                backgroundColor: [
                    '#f4fa9c',
                    '#ba53de',
                    '#c5e3f6',
					  '#DABB8F',
                    '#FF554D',
                    '#5fb58a',
                    '#E7A649',
                  
                    '#7b7f88',
                    '#436555'
                ],
                borderColor: [
                    '#f4fa9c',
                    '#ba53de',
                    '#c5e3f6',
					  '#DABB8F',
                    '#FF554D',
                    '#5fb58a',
                    '#E7A649',
                  
                    '#7b7f88',
                    '#436555'
                ],
                data: [300, 444, 122, 444, 333, 222, 222, 555, 333]
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
            position: 'left'
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