var arr=[65,87,67,70,56,90,54,69,60,89,87,67,70,56,61,76,45,91,59,78,92,51,43,76,90];

let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['A[0]', 'A[1]', 'A[2]', 'A[3]', 'A[4]', 'A[5]', 'A[6]', 'A[7]', 'A[8]', 'A[9]', 'A[10]', 'A[11]', 'A[12]', 'A[13]', 'A[14]', 'A[15]', 'A[16]', 'A[17]', 'A[18]', 'A[19]', 'A[20]', 'A[21]', 'A[22]', 'A[23]', 'A[24]'],
        datasets: [{
            label: 'Element',
            data: arr,
            backgroundColor: ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
            borderColor: 'black', 
            hoverBackgroundColor: 'red',
            borderWidth: 0
        }]
    },
    options: {
        animation: {
            duration: 0.5,
        }, 
        scales: {
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                }, 
                ticks: {
                    min: 0,
                } 
            }]
        }
    }
});

let n = 25, speed = 1;
let dataset = chart.data.datasets[0];
let slider = document.getElementById('speed');
slider.oninput = function() {
    speed = this.value;
}

function updateChartColor(color, index, delay) {
    setTimeout(function() {
        dataset.backgroundColor[index] = color;
        chart.update();
    }, delay);
}

function compare(i, j) {
    setTimeout(function() {
        if(dataset.data[j] > dataset.data[j+1]) {
            let temp = dataset.data[j];
            dataset.data[j] = dataset.data[j+1];
            dataset.data[j+1] = temp;
            updateChartColor('red', j, 0);
            updateChartColor('red', j+1, 0);
        }
        else {
            updateChartColor('green', j, 0);
            updateChartColor('green', j+1, 0);
        }
        chart.update();
        // console output for testing
        console.log('In Compare Function');
    }, 1000 / speed);
}

function toloop(i, j) {
    setTimeout(function () {
        updateChartColor('black', j, 0);
        updateChartColor('black', j+1, 0);
        compare(i, j);
        updateChartColor('blue', j, 2000 / speed);    
        updateChartColor('blue', j+1, 2000 / speed)
        // console output for testing
        console.log("In Inside Loop" + j);
        if(++j < n-i-1)
            toloop(i, j);
    }, 3000 / speed);
}

function loop(i) {
    setTimeout(function () {
        // console output for testing 
        console.log("In Outside Loop: " + i);
        toloop(i, 0);
        // update the color of already sorted bar
        updateChartColor('purple', n-i-1, (3000 * (n - i)) / speed);
        if(i == n-2)
            updateChartColor('purple', 0, (3000 * (n - i)) / speed);
        if(++i < n-1)
            loop(i);
    }, (i == 0)? 0: (3000 * (n - i)) / speed);
}

function sort() {
    loop(0);
}
