const resolution = 576;
const gd_low = 16;
const gd_med = 32;
const gd_high = 64;
const defaultPenColor = 'rgba(89, 193, 241, 1)';

let mouseDown = false;
let eraserActive = false;
let currentPixelDensity = 'low';

const sketchPadContainer = document.querySelector('.sketchpad-container');
const gdLowBtn = document.querySelector('.gd-low');
const gdMedBtn = document.querySelector('.gd-medium');
const gdHighBtn = document.querySelector('.gd-high');
const clearBtn = document.querySelector('.clear-btn');
const eraserBtn = document.querySelector('.eraser-btn');

// Color picker
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'monolith', // or 'monolith', or 'nano'
    comparison: false,
    default: 'rgba(89, 193, 241, 1)',

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    }
});

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

    addGridEvents();
    drawGrids();
}

function addGridEvents(){
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
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

function drawGrids(){
    const grids = document.querySelectorAll('.grid');

    pickr.on('show', (color) => {
        let selectedColor = color.toRGBA();
        setGridListeners(grids, `rgba(${selectedColor[0]}, ${selectedColor[1]}, 
            ${selectedColor[2]}, ${selectedColor[3]})`);
    });

    pickr.on('change', (color) => {
        let selectedColor = color.toRGBA();
        setGridListeners(grids, `rgba(${selectedColor[0]}, ${selectedColor[1]}, 
            ${selectedColor[2]}, ${selectedColor[3]})`);
    });
}

function setGridListeners(grids, penColor){
    grids.forEach(grid => {
        grid.addEventListener('mousedown', (e) =>{
            if(eraserActive) return;
            const currentGrid = e.target;
                
            currentGrid.style.backgroundColor = penColor;
    
            mouseDown = true;
    
            document.addEventListener('mouseup', () => {
                mouseDown = false;
            })
        })
        
        grid.addEventListener('mouseover', (e) => {
            if(eraserActive) return;
            if(mouseDown === false) return;
                
            const currentGrid = e.target;
    
            currentGrid.style.backgroundColor = penColor;
        })
    })
}