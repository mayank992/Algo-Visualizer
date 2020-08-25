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

let n = 70, speed = 1;
let dataset = chart.data.datasets[0];
let slider = document.getElementById("myRange");
slider.oninput = function() {
    speed = this.value;
}

//###################################################################

// initialize the dataset of the chart object(Using random function
// to generate random values)
function init(){
    chart.data.labels = []
    dataset.backgroundColor = [];
    dataset.data = [];
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
    // chart.data.labels = []
    // dataset.backgroundColor = [];
    // dataset.data = [];
    // slider.value = 1;
    // let option = document.getElementsByName('choice');
    // for (i = 0; i < option.length; i++) {
    //     option[i].checked = false;
    // }
    // init();
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

//###################################################################

// Bubble Sort Algorithm 
// Time Complexity: O(N^2)
async function BubbleSort() {
    console.log(speed);
    // console.log('In Bubble Sort.');
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            await updateBarColor('black', j, 0);
            await updateBarColor('black', j + 1, 500 / speed);
            if (dataset.data[j] > dataset.data[j + 1]) {
                await updateBarColor('red', j, 0);
                await updateBarColor('red', j + 1, 500 / speed);
                await swap(j, j + 1, 0);
            }
            await updateBarColor('green', j, 0);
            await updateBarColor('green', j + 1, 500 / speed);
            await updateBarColor('blue', j, 0);
            await updateBarColor('blue', j + 1, 0);
        }
        await updateBarColor('green', n - i - 1, 500 / speed);
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
    i = low, j = low;
    while (j < high) {
        await updateBarColor('black', i, 0);
        await updateBarColor('black', j, 1000 / speed);
        if (dataset.data[j] < pivot) {
            await updateBarColor('red', j, 0);
            await swap(i, j, 1000 / speed);   
            await updateBarColor('blue', i, 0);
            i++;
        }
        await updateBarColor('blue', j, 0);
        j++;
    }
    await swap(i, high, 1000 / speed);
    await updateBarColor('green', i, 0);
    return i;
}
    
async function QuickSortHelper(low, high) {
    if (low >= high) {
        updateBarColor('green', low, 0);
        return ;
    }
    await updateBarColor('purple', high, 0);
    const pivot = await partition(low, high);
    if (pivot != high)
        await updateBarColor('blue', high, 0);
    await QuickSortHelper(low, pivot - 1);
    await QuickSortHelper(pivot + 1, high);
}

// Quick Sort Algorithm
// Time Complexity: Average O(N logN), Worst O(N^2)
async function QuickSort() {
    // consoloe.log('In QuickSort');
    await QuickSortHelper(0, n - 1);
    for (i = 0; i < n; i++) {
        updateBarColor('green', i, 0);
    }
}

//###################################################################

async function heapify(size, i) {
    let largest = i;
    let leftChild = (2 * i) + 1;
    let rightChild = (2 * i) + 2;
    await updateBarColor('black', largest, 0);
    if (leftChild < size) await updateBarColor('yellow', leftChild, 0);
    if (rightChild < size) await updateBarColor('yellow', rightChild, 1000 / speed);
    if (leftChild < size && dataset.data[leftChild] > dataset.data[largest])
        largest = leftChild;
    if (rightChild < size && dataset.data[rightChild] > dataset.data[largest])
        largest = rightChild;
    if (largest != i) {
        if (largest != leftChild && leftChild < size) await updateBarColor('blue', leftChild, 0);
        else if (rightChild < size) await updateBarColor('blue', rightChild, 0);
        await swap(i, largest, 0);
        await updateBarColor('green', largest, 1000 / speed);
        await updateBarColor('blue', i, 0);
        await updateBarColor('blue', largest, 0);
        await heapify(size, largest);
    }
    else {
        await updateBarColor('green', largest, 1000 / speed);
        await updateBarColor('blue', largest, 0);
        if (leftChild < size) await updateBarColor('blue', leftChild, 0);
        if (rightChild < size) await updateBarColor('blue', rightChild, 0);
    }
}

// Haep Sort Algorithm
// Time Complexity: O(N logN)
async function HeapSort() {
    // console.log('In HeapSort.');
    for (i = (n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (i = n - 1; i >= 0; i--) {
        await swap(0, i, 0);
        await updateBarColor('green', i, 0);
        await heapify(i, 0);
    }
    updateBarColor('green', 0, 0);
}

//###################################################################
// on clicking the sort button this function checks all the values of 
// the radio button and call the approriate sorting algorithm function 
// the radio buttons and call the approriate sorting algorithm function 
async function sort() {
    let btn1 = document.getElementById('btn1');
    btn1.disabled = true;
    let toCall = 4;
    let option = document.getElementsByName('choice');
    for (i = 0; i < option.length; i++) {
        if (option[i].checked) {
            toCall = i;
            break;
        }
    }
    switch(toCall) {
        case 0: await BubbleSort();
            break;
        case 1: await MergeSort();
            break;
        case 2: await QuickSort();
            break;
        case 3: await HeapSort();
            break;
        default:
            alert('Please select the Sorting Algorithm.');
    }
    btn1.disabled = false;
}