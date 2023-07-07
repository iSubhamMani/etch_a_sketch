const resolution = 576;
const gd_low = 16;
const gd_med = 32;
const gd_high = 64;

let mouseDown = false;

const sketchPadContainer = document.querySelector('.sketchpad-container');
const gdLowBtn = document.querySelector('.gd-low');
const gdMedBtn = document.querySelector('.gd-medium');
const gdHighBtn = document.querySelector('.gd-high');

// Create Grid at start
createGrids(gd_low, gd_low);

gdLowBtn.addEventListener('click', () => {
    removeGridContainer();
    createGrids(gd_low, gd_low);
});

gdMedBtn.addEventListener('click', () => {
    removeGridContainer();
    createGrids(gd_med, gd_med);
});

gdHighBtn.addEventListener('click', () => {
    removeGridContainer();
    createGrids(gd_high, gd_high);
});

// Add event listeners to all the grids

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

    addGridEvents();
}

function addGridEvents(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        grid.addEventListener('mousedown', (e) =>{
            const currentGrid = e.target;
            currentGrid.style.backgroundColor = 'black';
            mouseDown = true;

            document.addEventListener('mouseup', () => {
                mouseDown = false;
            })
        })
    
        grid.addEventListener('mouseover', (e) => {
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