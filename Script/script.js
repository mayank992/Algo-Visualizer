let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: 'black', 
            hoverBackgroundColor: 'black',
        }]
    },

    options: {
        animation: {
            duration: 100
        }, 
        scales: {
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                },
                ticks: {
                    display: false,
                    min: 0
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                }, 
                ticks: {
                    display: false,
                    min: 0
                } 
            }]
        },
        options: {
            
        }
    }
});

let n = 100, speed = 1;
let dataset = chart.data.datasets[0];
let slider = document.getElementById("myRange");
slider.oninput = function() {
    speed = this.value;
}

// initialize the dataset of the chart object(Using random function
// to generate random values)
function init(){
    for (let i = 0; i < 70; i++) {
        chart.data.labels.push('Arr');
        dataset.backgroundColor.push('blue');
        dataset.data.push(Math.ceil(Math.random() * 133));
    }
    n = dataset.data.length;
    chart.update();
}

// calling init function during loading of webpage
init();

// refresh the whole webpage
function reset() {
    location.reload();
}

// sleep for ms millisecond 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// update color of chart bar at index idx with delay
async function updateBarColor(color, idx, delay) {
    dataset.backgroundColor[idx] = color;
    chart.update();
    await sleep(delay);
}

// swap the values present at index i & j with delay
async function swap(i, j, delay) {
    let temp = dataset.data[i];
    dataset.data[i] = dataset.data[j];
    dataset.data[j] = temp;
    await sleep(delay);
    chart.update();
}

// Bubble Sort Algorithm 
// Time Complexity: O(N^2)
async function BubbleSort() {
    console.log(speed);
    // console.log('In Bubble Sort.');
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            await updateBarColor('black', j, 0);
            await updateBarColor('black', j + 1, 1000 / speed);
            if (dataset.data[j] > dataset.data[j + 1]) {
                await updateBarColor('red', j, 0);
                await updateBarColor('red', j + 1, 1000 / speed);
                await swap(j, j + 1, 0);
            }
            await updateBarColor('green', j, 0);
            await updateBarColor('green', j + 1, 1000 / speed);
            await updateBarColor('blue', j, 0);
            await updateBarColor('blue', j + 1, 0);
        }
        await updateBarColor('purple', n - i - 1, 1000 / speed);
    }
}

async function updateMergedResult(result, low, high) {
    for (i = low; i <= high; i++) {
        dataset.data[i] = result[i - low];
        chart.update();
        await sleep(1000 / speed);
    }
}

async function merge(low, mid, high) {
    i = low, j = mid + 1;
    result = [];
    while (i <= mid && j <= high) {
        if (dataset.data[i] <= dataset.data[j])
            result.push(dataset.data[i++]);
        else 
            result.push(dataset.data[j++]);
    }
    while (i <= mid) {
        result.push(dataset.data[i++]);
    }
    while (j <= high) {
        result.push(dataset.data[j++]);
    }
    await updateMergedResult(result, low, high);
}

async function mergeSortHelper(low, high) {
    if (low >= high) return ;
    const mid = Math.floor((low + high) / 2);
    await mergeSortHelper(low, mid);
    await mergeSortHelper(mid + 1, high);
    await merge(low, mid, high);
}

// Merge Sort Algorithm
// Time Complexity: O(N logN)
function MergeSort() {
    //console.log('In MergeSort.');
    mergeSortHelper(0, n - 1);
}

// Quick Sort Algorithm
// Time Complexity: Average O(N logN), Worst O(N^2)
function QuickSort() {
    console.log('In QuickSort.');
}

// Haep Sort Algorithm
// Time Complexity: O(N logN)
function HeapSort() {
    console.log('In HeapSort.');
}

// on clicking the sort button this function checks all the values of 
// the radio button and call the approriate sorting algorithm function 
function sort() {
    let toCall = 4;
    let option = document.getElementsByName('choice');
    for (i = 0; i < option.length; i++) {
        if (option[i].checked) {
            toCall = i;
            break;
        }
    }
    switch(toCall) {
        case 0: BubbleSort();
            break;
        case 1: MergeSort();
            break;
        case 2: QuickSort();
            break;
        case 3: HeapSort();
            break;
        default:
            alert('Please select the Sorting Algorithm.');
    }
}