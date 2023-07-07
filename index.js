const resolution = 576;
const gd_low = 16;
const gd_med = 32;
const gd_high = 64;

let mouseDown = false;
let eraserActive = false;
let currentPixelDensity = 'low';

const sketchPadContainer = document.querySelector('.sketchpad-container');
const gdLowBtn = document.querySelector('.gd-low');
const gdMedBtn = document.querySelector('.gd-medium');
const gdHighBtn = document.querySelector('.gd-high');
const clearBtn = document.querySelector('.clear-btn');
const eraserBtn = document.querySelector('.eraser-btn');

// default settings at startup
defaultSettings();

gdLowBtn.addEventListener('click', () => {
    // check for current density
    if(currentPixelDensity === 'low') return;
    currentPixelDensity = 'low';

    removeGridContainer();
    createGrids(gd_low, gd_low);
    gdLowBtn.style.backgroundColor = '#99ffcc';
    gdMedBtn.style.backgroundColor = '#ef5353';
    gdHighBtn.style.backgroundColor = '#ef5353';
});

gdMedBtn.addEventListener('click', () => {
    if(currentPixelDensity === 'med') return;
    currentPixelDensity = 'med';

    removeGridContainer();
    createGrids(gd_med, gd_med);
    gdLowBtn.style.backgroundColor = '#ef5353';
    gdMedBtn.style.backgroundColor = '#99ffcc';
    gdHighBtn.style.backgroundColor = '#ef5353';
});

gdHighBtn.addEventListener('click', () => {
    if(currentPixelDensity === 'high') return;
    currentPixelDensity = 'high';

    removeGridContainer();
    createGrids(gd_high, gd_high);
    gdLowBtn.style.backgroundColor = '#ef5353';
    gdMedBtn.style.backgroundColor = '#ef5353';
    gdHighBtn.style.backgroundColor = '#99ffcc';
});

clearBtn.addEventListener('click', () => {
    clearGrid();
});

eraserBtn.addEventListener('click', () => {
    if(eraserActive === false){
        eraserActive = true;
        eraserBtn.style.backgroundColor = '#99ffcc';
        eraserBtn.style.transition = '0.3s';
        eraseGrids();
    }
    else{
        eraserBtn.style.backgroundColor = '#ef5353';
        eraserActive = false;
    }
});

function defaultSettings(){
    createGrids(gd_low, gd_low);
    gdLowBtn.style.backgroundColor = '#99ffcc';
}

function getGridContainer(){
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    return gridContainer;
}

function removeGridContainer(){
    const gridContainer = document.querySelector('.grid-container');
    if(gridContainer === null) return;

    gridContainer.remove();
}

function createGrids(gridDensityWidth, gridDensityHeight){

    // create grid container first
    const gridContainer = getGridContainer();
    sketchPadContainer.append(gridContainer);

    // create the grids
    for(let row = 0; row < gridDensityHeight; row++){
        for(let column = 0; column < gridDensityWidth; column++){
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.style.width = `${resolution/gridDensityWidth}px`;
            grid.style.height = `${resolution/gridDensityHeight}px`;

            gridContainer.append(grid);
        }
    }

    addGridDrawEvents();
}

function addGridDrawEvents(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        grid.addEventListener('mousedown', (e) =>{
            if(eraserActive) return;
            const currentGrid = e.target;
            currentGrid.style.backgroundColor = 'black';
            mouseDown = true;

            document.addEventListener('mouseup', () => {
                mouseDown = false;
            })
        })
    
        grid.addEventListener('mouseover', (e) => {
            if(eraserActive) return;
            if(mouseDown === false) return;
            
            const currentGrid = e.target;
            currentGrid.style.backgroundColor = 'red';
        })

        grid.addEventListener('dragstart', (e) => {
            e.preventDefault();
        })

        grid.addEventListener('dragend', (e) => {
            e.preventDefault();
        })

        grid.addEventListener('drop', (e) => {
            e.preventDefault();
        })
    })
}

function eraseGrids(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        grid.addEventListener('mousedown', (e) =>{
            if(eraserActive === false) return;
            const currentGrid = e.target;
            currentGrid.style.backgroundColor = 'white';
            mouseDown = true;

            document.addEventListener('mouseup', () => {
                mouseDown = false;
            })
        })
    
        grid.addEventListener('mouseover', (e) => {
            if(eraserActive === false) return;
            if(mouseDown === false) return;
            
            const currentGrid = e.target;
            currentGrid.style.backgroundColor = 'white';
        })

        grid.addEventListener('dragstart', (e) => {
            e.preventDefault();
        })

        grid.addEventListener('dragend', (e) => {
            e.preventDefault();
        })

        grid.addEventListener('drop', (e) => {
            e.preventDefault();
        })
    })
}


function clearGrid(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        grid.style.backgroundColor = 'white';
    })
}