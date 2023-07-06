const resolution = 576;
const gd_low = 16;
const gd_med = 32;
const gd_high = 64;

const mainContainer = document.querySelector('.sketchpad-container');
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
    mainContainer.append(gridContainer);

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
}