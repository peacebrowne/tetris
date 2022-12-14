const menus = document.querySelectorAll('ul li')

/**
 * Query the specified html element from the html document
 * if it's available.
 *  *  @param ele - html element
 *  * @returns - html element
 */
const element = ele => {
    return document.querySelector(`${ele}`)
}

const main = element('main')
const nav = element('nav')

/**
 * Hides the specified html element from the html document
 * if it's available.
 *  *  @param ele - html element
 */
const hideEle = ele => element(ele).style.display = 'none'


/**
 * Display the specified html element from the html document
 * if it's available.
 *  *  @param ele - html element
 *  * @param dis - display value
 */
const showEle = (ele,dis) => element(ele).style.display = dis;

let current_section = '.newGame-section';
let main_section;



/**
 * Handling all clicks event on game
 *  *  @param clas - class to toggle
 */

const all_clicks = ev =>{

    ev.preventDefault()
    let target = ev.target.className;
    if(['newGame-menu','continue-menu','highScore-menu','selectLevel-menu','help-menu'].indexOf(target) > -1){
        stable(target)
    }
    // else if(target.includes('ArrowUp')) switch_tetrimino()
    // else if(target.includes('ArrowRight')) move_right()
    // else if(target.includes('ArrowLeft')) move_left()
    // else if(target.includes('ArrowDown')) dropdown()
    else if(target.includes('reset-score')) reset_highest_score()

}

document.body.addEventListener('click', all_clicks)


/**
 * hide menu after selecting menu
 *  *  @param section - Menu section
 */
const hide_menu = () =>{

    // changes the animation name of each menu to menu_out.
    menus.forEach(menu =>{
        menu.style.opacity = '100'
        menu.style.animationName = 'menu_out'
    })
    
}

/**
 * Show menu for user to select next option
 *  *  @param section - Menu section
 */
const show_menu = () =>{

    // changes the animation name of each menu to menu_in.
    clearInterval(timeId)
    menus.forEach(menu =>{
        menu.style.opacity = '0'
        menu.style.animationName = 'menu_in'
    })

    hideEle(current_section)
    showEle('nav','flex')
    toggle_button()
    document.addEventListener('keydown',control)
    ArrowDown.addEventListener('click',dropdown);
    ArrowUp.addEventListener('click',switch_tetrimino);
    ArrowRight.addEventListener('click',move_right);
    ArrowLeft.addEventListener('click',move_left);
    
}
const menu = element('.show-menu')
menu.addEventListener('click',show_menu)


/**
 * Engine of the game, controls the entire game
 *  *  @param section - Selected menu
 */
const stable = section =>{

    // replacing 'menu' with 'section'.
    hide_menu()

    section = section.replace('menu','section')

    // Game starts after 3 seconds
    setTimeout(()=> {

        if(section.includes('newGame')) new_game(section)
        else if(section.includes('continue')) continue_game(section = 'newGame-section')
        else if(section.includes('highScore')) high_score(section)
        else if(section.includes('selectLevel')) select_level(section)
        else if(section.includes('help')) help(section)

    }, 3000)

}

/**
 * Generate new grid of contents for the new game section.
 * And when the game starts, after every one second the tetrimino glides
 * down.
 *  *  @param clas - Selected menu message
*/
let grid;
let new_grid;
let timeId;
let normal_speed;
let dropdown_speed = 10;

const new_game = clas =>{
    
    // gliding tetrimino grids
    let grids = document.createElement('div')
    grids.classList.add('grids')
   
    // next gliding tetrimino grids
    let new_grids = document.createElement('div')
    new_grids.classList.add('new-grids')
    
    // score and level box
    let score_level = document.createElement('div')
    score_level.classList.add('score-level')
    
    section([_grid(grids),_new_grid(new_grids),_score_level(score_level)],clas,'grid')
    showEle('.buttons', 'block')
    toggle_button()

    grid = element('.grids').children
    new_grid = element('.new-grids').children
    main_section = element('.grids')

    current_tetrimino = tetriminoes[random][rotation]
    previous_tetrimino = current_tetrimino;
    previous_random = random
    draw(current_tetrimino,grid,0)
    next_tetriminoes()
    normal_speed = levels()
    timeId = setInterval(move_down,normal_speed)

}


/**
 *  Displaying sections on page depending on the menu that was selected
 *  *  @param section - newly created section and sub components
 */
const display = (clas,dis) => {
    showEle(clas,dis)
}

/**
 * Toggle or add a class name to an element to change the element 
 * behavior.
 *  *  @param ele - selected element to toggle
 *  *  @param clas - class name to toggle on element 
 */
const add_toggle = (ele,clas) => ele.classList.toggle(clas)


// /**
//  * Creating new section and displaying it depending on the menu that was selected
//  *  *  @param sec - newly created section
//  *  *  @param items - newly created contents inside each section.
//  */
const section = (items,clas,dis) => {

    let section = element(`.${clas}`)
    section.innerHTML = ''

    items.forEach(ele => section.appendChild(ele))

    hideEle(current_section)
    current_section = `.${clas}`
    
    display(current_section,dis)
    hideEle('nav')
    
}

// /**
//  * Generate 210 new square grid for the new game section
//  *  *  @param section - Newly created section for gliding tetrimino
//  *  * @returns section - After adding 210 square grids
//  */
const _grid = section => {

    let i = 0;
    while(i < 200){
        let ele = document.createElement('div')
        ele.classList.add('grid')
        section.appendChild(ele)
        i++
    }

    i = 0;
    while(i < 10){
        let ele = document.createElement('div')
        ele.classList.add('taken')
        section.appendChild(ele)
        i++
    }
    return section
}

/**
 * Generate 100 new square grid to display the next tetrimino to glide
 *  *  @param section - Newly created section for gliding tetrimino
 * * @returns section - After adding 100 square grids
 */
const _new_grid = section =>{
    let i = 0;
    while(i < 100){
        let ele = document.createElement('div')
        ele.classList.add('new-grid')
        section.appendChild(ele)
        i++
    }
    return section
}

/**
 * Generate 100 new square grid to display the next tetrimino to glide
 *  *  @param section - Newly created section for user score and level
 */
const _score_level = section =>{
    let ele = `
        <div class="score">
            <h3>Score</h3>
            <h1>0</h1>
        </div>
        <div class="level">
            <h3>Level</h3>
            <h1>1</h1>
        </div>
    `
    section.innerHTML = ele
    return section;
}


/**
 * Continue the game from the previous stage after 2seconds
 *  *  @param section - Selected menu
 */
const continue_game = section =>{

    let ele = element(`.${section}`);

    if(ele.innerHTML == '') new_game(section)
    else{
        
        hideEle('nav')
        hideEle(current_section)
        showEle(`.${section}`,'grid')
        showEle('.buttons', 'block')
        toggle_button()
        counter()
       
    }
    current_section = `.${section}`

}


// Promts the user a counter to wait after three counts before use can resume play.
const counter = () => {

    let ele = element('.counter')
    showEle('.counter','flex')
    ele.innerHTML = '';
    let n = 1

    // increase number of counter a one and half seconds
    let counterId = setInterval(()=> {
        ele.innerHTML = `<h1>${n}</h1>`
        
        if(n > 3){

            clearInterval(counterId)
            hideEle('.counter')
            normal_speed = levels()
            timeId = setInterval(move_down,normal_speed)
            
        }
        ++n;

    },1500)
    
}


/**
 * High score section
 *  *  @param sec - Selected menu
 */
const high_score = sec =>{

    let ele = document.createElement('div')
    ele.classList.add('high-score')
    ele.innerHTML = `
    <h3>high score:</h3>
    <h1></h1>
    <div class="high-score-btn">
            <button class="reset-score">reset</button>
    </div>
    `    
    section([ele],sec,'flex')
    hideEle('.buttons')
    current_section = `.${sec}`
    highest_score()

}

// Display highest score if exist else set highest score to 0
const highest_score = () =>{
    
    // if score does not exist set highest score to 0
    if (localStorage.getItem('highest-score') === null){
        localStorage.setItem('highest-score',1)
    }

    // display highest score
    let highest = localStorage.getItem('highest-score');
    let ele = element('.high-score h1')
    ele.textContent = highest;

}

const reset_highest_score = () => {

    localStorage.setItem('highest-score',0)
    highest_score()

}

const change_highest_score = current_score =>{
    let highest = localStorage.getItem('highest-score');
    if(+current_score > +highest) localStorage.setItem('highest-score', current_score)
}

/**
 * Game level
 *  *  @param sec - Selected menu
 */


const select_level = sec => {

    let ele = document.createElement('select');
    ele.innerHTML = `
        <option selected disable>Select Level</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
    `
    hideEle('nav')
    hideEle('.buttons')
    ele.addEventListener('change', select)
    section([ele],sec,'block')

}

const select = ev =>localStorage.setItem('level',ev.target.value)

const levels = () =>{
    // if score does not exist set highest score to 0
    if (localStorage.getItem('level') === null){
        localStorage.setItem('level',1)
    }

    // display highest score
    let current_level = localStorage.getItem('level');
    let ele = element('.level h1')
    ele.textContent = current_level;

    return current_level != 1 ? 1000 - Number(`${current_level}00`): 1000;

}

/**
 * Game level
 *  *  @param sec - Selected menu
 */
const help = sec => {

    let ele = document.createElement('div');
    ele.innerHTML = `
    <p>
        Complete the line to scorepoints. Use the "UP", "LEFT", "RIGHT" and "DOWN"
        button for rolling movements respectively.
    </p>
    `
    hideEle('nav')
    section([ele],sec,'block')

}

//  Each time new game starts add animation to control buttons
const arrows = ['up','right','down','left']
const buttons = document.querySelectorAll('.control-btn')

const toggle_button = () => {
    for (let i = 0; i < buttons.length; i++) {
        add_toggle(buttons[i],arrows[i])
    }
}

/**
 * Removes a class name from an element 
 * behavior.
 *  *  @param ele - selected element to remove class name from
 *  *  @param clas - class name to be removed from element
 */
const remove_toggle = (ele,clas) => ele.classList.remove(clas)

let width = 10;
let start_pos = 4;

// L-TETRIMINOES DESIGNS
const jTetriminoes = [
    [start_pos,start_pos+1,width+start_pos, width*2+start_pos],
    [start_pos-1,start_pos, start_pos+1,width+start_pos+1],
    [start_pos+1, width+start_pos+1,width*2+start_pos, width*2+start_pos+1],
    [start_pos,width+start_pos , width+start_pos+1,width+start_pos+2 ]
]

// S-TETRIMIOES DESIGNS
const sTetriminoes = [
    [start_pos+1,start_pos+2,width+start_pos, width+start_pos+1],
    [start_pos,width+start_pos, width+start_pos+1,width*2+start_pos+1],
    [start_pos+1,start_pos+2,width+start_pos, width+start_pos+1],
    [start_pos,width+start_pos, width+start_pos+1,width*2+start_pos+1],
]

// Z-TETRIMIOES DESIGNS
const zTetriminoes = [
    [start_pos-1,start_pos,width+start_pos, width+start_pos+1],
    [start_pos+1,width+start_pos,width+start_pos+1,width*2+start_pos],
    [start_pos-1,start_pos,width+start_pos, width+start_pos+1],
    [start_pos+1,width+start_pos,width+start_pos+1,width*2+start_pos],
]

// T-TETRIMIOES DESIGNS
const tTetriminoes = [
    [start_pos+1,width+start_pos,width+start_pos+1,width+start_pos+2],
    [start_pos,width+start_pos, width+start_pos+1,width*2+start_pos],
    [start_pos,start_pos+1,start_pos+2,width+start_pos+1],
    [start_pos+1,width+start_pos,width+start_pos+1,width*2+start_pos+1],
]


// O-TETRIMIOES DESIGNS
const oTetriminoes = [
    [ start_pos,start_pos+1,width+start_pos,width+start_pos+1],
    [ start_pos,start_pos+1,width+start_pos,width+start_pos+1],
    [ start_pos,start_pos+1,width+start_pos,width+start_pos+1],
    [ start_pos,start_pos+1,width+start_pos,width+start_pos+1],
]

// I-TETRIMIOES DESIGNS
const iTetriminoes = [
    [ start_pos,width+start_pos,width*2+start_pos,width*3+start_pos],
    [ width+start_pos-1,width+start_pos,width+start_pos+1,width+start_pos+2],
    [ start_pos,width+start_pos,width*2+start_pos,width*3+start_pos],
    [ width+start_pos-1, width+start_pos, width+start_pos+1, width+start_pos+2],
]

// J-TETRIMINOES DESIGNS
const lTetriminoes = [
    [start_pos,start_pos+1,width+start_pos+1, width*2+start_pos+1],
    [start_pos+1,width+start_pos-1,width+start_pos, width+start_pos+1],
    [start_pos, width+start_pos,width*2+start_pos, width*2+start_pos+1],
    [start_pos-1,start_pos, start_pos+1,width+3],
]

// ALL TETRIMINOES
const tetriminoes = [
    sTetriminoes,
    zTetriminoes,
    tTetriminoes,
    oTetriminoes,
    iTetriminoes,
    jTetriminoes,
    lTetriminoes,

]

let random = Math.floor(Math.random() * tetriminoes.length)
let previous_random;
let rotation = 0;
let current_tetrimino
let previous_tetrimino;
let new_tetrimino;

/**
 *  Draw selected tetrimino on grid square
 *  *  @param tetris [array of numbers] - numbers to draw current tetrimino
 *  *  @param boxes - [html collection of divs] - div to draw current tetrimino
 *  *  @param n - any number | optional
 */
const draw = (tetris,boxes,n) => tetris.forEach(val => add_toggle(boxes[val+n],'tetris'));

/**
 * Undraw selected tetrimino from grid square 
 *  *  @param tetris [array of numbers] - numbers to undraw current tetrimino
 *  *  @param boxes - [html collection of divs] - div to undraw current tetrimino
 */
const undraw = (tetris,boxes,n) => tetris.forEach( val => remove_toggle(boxes[val+n],'tetris'))


let current_rotation;
const next_tetriminoes = () => {
    
    previous_random = random
    random = Math.floor(Math.random() * tetriminoes.length)
    current_rotation = Math.floor(Math.random() * tetriminoes[random].length)
    new_tetrimino = tetriminoes[random][current_rotation]
    draw(new_tetrimino,new_grid,30)
    
}

/**
 * Each time tetrimino reaches at the bottom of the square it stops and
 * new tetrimino gets drawn at the top of the square and begin to glide.
 */
const stop_move = () =>{

    if(current_tetrimino.some(box => grid[box + width].className.includes('taken'))){
        game_over()
        current_tetrimino.forEach( item => grid[item].classList.add('taken'))
        cut_tetrimino(current_tetrimino)

        // starts new tetrimino
        current_tetrimino = new_tetrimino
        previous_tetrimino = current_tetrimino;
        rotation = current_rotation;
        draw(current_tetrimino, grid,0)
        undraw(new_tetrimino,new_grid,30)
        next_tetriminoes()
        clearInterval(dropTimeId)
    }
    
}

/**
 * Handles keypress events on the keyboard control buttons.
 * Each control button determines the direction of the gliding tetrimino
 * * @param ev - clicked control button
 */
const control = ev =>{

    let btn = ev.key
    if(btn === 'ArrowUp') switch_tetrimino()
    else if(btn === 'ArrowRight') move_right()
    else if(btn === 'ArrowLeft') move_left()
    else if(btn === 'ArrowDown') dropdown()

}

// Move current tetrimino down after every one second.
const move_down = () =>{ 

    stop_move()
    undraw(current_tetrimino, grid,0)
    current_tetrimino = current_tetrimino.map(val => val + width)
    draw(current_tetrimino, grid,0)
}

// Move gliding tetrimino left each time left control button is clicked
const ArrowLeft = element('.ArrowLeft')
const move_left = () =>{

    if(current_tetrimino.some(val => val % width === 0) || current_tetrimino.some(val => grid[--val].className.includes('taken'))) return;
    undraw(current_tetrimino, grid,0)
    current_tetrimino = current_tetrimino.map(val => --val)
    draw(current_tetrimino, grid,0)

}
ArrowLeft.addEventListener('click',move_left);

// Move gliding tetrimino right each time right control button is clicked
const ArrowRight = element('.ArrowRight')
const move_right = () =>{

    if(current_tetrimino.some(val => val % width === width-1) || current_tetrimino.some(val => grid[++val].className.includes('taken'))) return
    undraw(current_tetrimino, grid,0)
    current_tetrimino = current_tetrimino.map(val => ++val)
    draw(current_tetrimino, grid,0)
    
}
ArrowRight.addEventListener('click',move_right);


// Switching to next tetrimino each time the up control button is clicked
const ArrowUp = element('.ArrowUp')
const switch_tetrimino = () =>{

    if(current_tetrimino.some(val => val % width === width-1))return
    else if(current_tetrimino.some(val => val % width === 0)) return
    undraw(current_tetrimino, grid,0)
    
    // return to first tetrimino if current tetrimino is undefined
    if(tetriminoes[previous_random][rotation+1] !== undefined) rotation++
    else if (tetriminoes[previous_random][rotation+1] === undefined) rotation = 0

    let sibling_tetrimino = tetriminoes[previous_random][rotation]

    // Entire switching of tetrimino take place below.
    let tetris = []
    for(let i = 0; i < current_tetrimino.length; i++){
        tetris.push((current_tetrimino[i] - previous_tetrimino[i]) + sibling_tetrimino[i])
    }
    current_tetrimino = tetris
    previous_tetrimino = sibling_tetrimino;

    draw(current_tetrimino, grid,0)  
}
ArrowUp.addEventListener('click',switch_tetrimino);



//  Move gliding tetrimino down as fast as one second whent the down control button is clicked.
const ArrowDown = element('.ArrowDown')
let dropTimeId;
const dropdown = () => dropTimeId = setInterval(move_down,dropdown_speed)
ArrowDown.addEventListener('click',dropdown);

const cut_tetrimino = tetris =>{
    
    let cut = tetris.flatMap(val => {
       let n =`${val}`.split('')
       n[n.length-1] = 0
       return Number(n.flat().join(''))
    })

    for(const val of cut){

        const start = val, end = val + width;
        grid = element('.grids').children
        const taken = Array.from(grid).slice(start,end)
        const status = taken.every(box => box.className.includes('tetris'))
        if(status){
            taken.forEach(box => {
                // remove box
                box.remove();

                // create new grid div and add at the top of the grid square
                let ele = document.createElement('div')
                ele.classList.add('grid')
                main_section.insertAdjacentElement('afterbegin',ele)

            })

            let ele = element('.score h1');
            ele.textContent = Number(ele.textContent) + 4
            change_highest_score(ele.textContent)

        }

    }

}

const game_over = () => {
    if(current_tetrimino.some(val => grid[val].className.includes('taken'))){
        clearInterval(timeId)
        document.removeEventListener('keydown',control)
        ArrowDown.removeEventListener('click',dropdown);
        ArrowUp.removeEventListener('click',switch_tetrimino);
        ArrowRight.removeEventListener('click',move_right);
        ArrowLeft.removeEventListener('click',move_left);
    }
}

document.addEventListener('keydown',control)

