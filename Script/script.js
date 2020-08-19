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

//###################################################################

let n = 100, speed = 1;
let dataset = chart.data.datasets[0];
let slider = document.getElementById("myRange");
slider.oninput = function() {
    speed = this.value;
}

//###################################################################

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

function reset() {
    chart.data.labels = []
    chart.backgroundColor = [];
    dataset.data = [];
    slider.value = 1;
    let option = document.getElementsByName('choice');
    for (i = 0; i < option.length; i++) {
        option[i].checked = false;
    }
    init();
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

//###################################################################

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
    for (i = 0; i < n; i++) {
        updateBarColor('green', i, 0);
    }
}

//###################################################################

async function merge(low, mid, high) {
    i = low, j = mid + 1;
    while (i < j && i <= high && j <= high) {
        await updateBarColor('black', i, 0);
        await updateBarColor('black', j, 1000 / speed);
        if (dataset.data[i] > dataset.data[j]) {
            await updateBarColor('red', j, 1000 / speed);
            const temp = dataset.data[j];
            for (k = j - 1; k >= i; k--) {
                dataset.data[k + 1] = dataset.data[k];
            }
            dataset.data[i] = temp;
            chart.update();
            await updateBarColor('black', j, 0);
            await updateBarColor('green', i, 1000 / speed);
            await updateBarColor('purple', j, 0);
            j++;
        }
        else {
            await updateBarColor('green', i, 1000 / speed);
            await updateBarColor('purple', j, 0);
        }
        i++;
    }
    while (i <= high) {
        await updateBarColor('green', i, 1000 / speed);
        i++;
    }
}

async function mergeSortHelper(low, high) {
    if (low >= high) return ;
    const mid = Math.floor((low + high) / 2);
    await mergeSortHelper(low, mid);
    await mergeSortHelper(mid + 1, high);
    for (i = low; i <= high; i++) {
        updateBarColor('purple', i, 0);
    }
    await sleep(1000 / speed);
    await merge(low, mid, high);
    for (i = low; i <= high; i++) {
        updateBarColor('blue', i, 0);
    }
    await sleep(1000 / speed);
}

// Merge Sort Algorithm
// Time Complexity: O(N logN)
async function MergeSort() {
    //console.log('In MergeSort.');
    await mergeSortHelper(0, n - 1);
    for (i = 0; i < n; i++) {
        updateBarColor('green', i, 0);
    }
}

//###################################################################

// partition the segment [low, high] into two parts
// by placing the pivot element on itss corrent position
async function partition(low, high) {
    pivot = dataset.data[high];
    i = low - 1, j = low;
    while (j < high) {
        if (dataset.data[j] < pivot) {
            await swap(++i, j, 1000 / speed);
        }
        j++;
    }
    await swap(i + 1, high, 1000 / speed);
    return i + 1;
}

async function QuickSortHelper(low, high) {
    if (low >= high) return ;
    const pivot = await partition(low, high);
    await QuickSortHelper(low, pivot - 1);
    await QuickSortHelper(pivot + 1, high);
}

// Quick Sort Algorithm
// Time Complexity: Average O(N logN), Worst O(N^2)
function QuickSort() {
    QuickSortHelper(0, n - 1);
}

//###################################################################

// Haep Sort Algorithm
// Time Complexity: O(N logN)
function HeapSort() {
    console.log('In HeapSort.');
}

//###################################################################
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
