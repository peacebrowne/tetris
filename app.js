const menus = document.querySelectorAll('ul li')
const main = document.querySelector('main')
let main_section;
// const nav = document.querySelector('nav')
const hideEle = ele => document.querySelector(ele).style.display = 'none'
const showEle = ele => document.querySelector(ele).style.display = 'flex'
let current_section;


/**
 * Handling all clicks event on game
 *  *  @param clas - class to toggle
 */
document.body.addEventListener('click', ev =>{
    
    ev.preventDefault()
    let target = ev.target
    if(target.className =='new-game-menu') stable('tetriminoes')
    else if(target.className =='continue-menu') stable('continue')
    else if(target.className =='high-score-menu') stable('high-score-section')
    else if(target.className =='select-level-menu') stable('select level')
    else if(target.className =='help-menu') stable('help')
    else if(target.className =='show-menu') show_menu('nav')
    else if(target.className.includes('ArrowUp')) switch_tetrimino()
    else if(target.className.includes('ArrowRight')) move_right()
    else if(target.className.includes('ArrowLeft')) move_left()
    else if(target.className.includes('ArrowDown')) dropdown()


})

/**
 * Engine of the game, controls the entire game
 *  *  @param msg - Selected menu
 */
const stable = msg =>{

    // changes the animation name of each menu to menu_out.
    menus.forEach(menu =>{
        menu.style.opacity = '100'
        menu.style.animationName = 'menu_out'
    })

    // Game starts after 3secs
    setTimeout(()=> {
        if(msg == 'tetriminoes') new_game(msg)
        else if(msg == 'high-score-section') reset_score_caution(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)

    }, 3000)
}

/**
 * Show menu for user to select next option
 *  *  @param section - Menu section
 */
const show_menu = section =>{

    // changes the animation name of each menu to menu_in.
    clearInterval(timeId)
    menus.forEach(menu =>{
        menu.style.opacity = '0'
        menu.style.animationName = 'menu_in'
    })

    showEle(section)
    hideEle(current_section)
    toggle_button()
}

/**
 *  Displaying sections on page depending on the menu that was selected
 *  *  @param section - newly created section and sub components
 */
const display = section => {

    main.innerHTML = ''
    main.append(section)

}

/**
 * Creating new section and displaying it depending on the menu that was selected
 *  *  @param sec - newly created section
 *  *  @param items - newly created contents inside each section.
 */
const section = (items,sec) => {

    let section = document.createElement('section')
    section.classList.add(sec)

    items.forEach(ele => section.appendChild(ele))
    
    display(section)
    hideEle('nav')
    
}

/**
 * Generate new grid of contents for the new game section.
 * And when the game starts, after every one second the tetrimino glides
 * down.
 *  *  @param clas - Selected menu message
 */
let grid;
let timeId;

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
    
    section([_grid(grids),_new_grid(new_grids),_score_level(score_level)],clas)
    toggle_button()
    current_section = `.${clas}`
    grid = document.querySelectorAll('.grids div')
    main_section = document.querySelector('.grids')
    current_tetrimino = tetriminoes[random][0]
    draw()
    timeId = setInterval(move_down,1000)

}

/**
 * Generate 210 new square grid for the new game section
 *  *  @param section - Newly created section for gliding tetrimino
 *  * @returns section - After adding 210 square grids
 */
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
            <h1>10</h1>
        </div>
        <div class="level">
            <h3>Level</h3>
            <h1>10</h1>
        </div>
    `
    section.innerHTML = ele
    return section;
}

/**
 * High score section
 *  *  @param clas - Selected menu
 */
const reset_score_caution = clas =>{

    let ele = `
    <h4>high score</h4>
    <h4>1000</h4>
    <div class="high-score-btn">
        <button>reset</button>
        <button>back</button>
    </div>
    `
    // high-score-section
    section(ele,clas)
    current_section = `.${clas}`
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
 * Toggle or add a class name to an element to change the element 
 * behavior.
 *  *  @param ele - selected element to toggle
 *  *  @param clas - class name to toggle on element 
 */
const add_toggle = (ele,clas) => ele.classList.toggle(clas)

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
const ltetriminoes = [
    [start_pos,start_pos+1,width+start_pos, width*2+start_pos],
    [start_pos-1,start_pos, start_pos+1,width+start_pos+1],
    [start_pos+1, width+start_pos+1,width*2+start_pos, width*2+start_pos+1],
    [start_pos,width+start_pos , width+start_pos+1,width+start_pos+2 ]
]

// ALL TETRIMINOES
const tetriminoes = [ltetriminoes]

let random = Math.floor(Math.random() * tetriminoes.length)
let rotation = 0;
let current_tetrimino = tetriminoes[random][rotation]
let previous_tetrimino = current_tetrimino;
let new_tetrimino;

// Draw selected tetrimino on grid square 
const draw = () => current_tetrimino.forEach(val => add_toggle(grid[val],'tetris'));

// Undraw selected tetrimino from grid square 
const undraw = () => current_tetrimino.forEach( val => remove_toggle(grid[val],'tetris'))

/**
 * Each time tetrimino reaches at the bottom of the square it stops and
 * new tetrimino gets drawn at the top of the square and begin to glide.
 */
const stop_move = () =>{

    if(current_tetrimino.some(box => grid[box + width].className.includes('taken'))){
        current_tetrimino.forEach( item => grid[item].classList.add('taken'))
        cut_tetrimino(current_tetrimino)
        random = Math.floor(Math.random() * tetriminoes.length)
        rotation = Math.floor(Math.random() * tetriminoes[random][rotation].length)
        current_tetrimino = tetriminoes[random][rotation]
        previous_tetrimino = current_tetrimino;
        start_pos = 4;
        draw()
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

// Move gliding tetrimino left each time left control button is clicked
const move_left = () =>{

    if(current_tetrimino.some(val => val % width === 0) || current_tetrimino.some(val => grid[--val].className.includes('taken'))) return;
    undraw()
    current_tetrimino = current_tetrimino.map(val => --val)
    draw()

}

// Move gliding tetrimino right each time right control button is clicked
const move_right = () =>{

    if(current_tetrimino.some(val => val % width === width-1) || current_tetrimino.some(val => grid[++val].className.includes('taken'))) return
    undraw()
    current_tetrimino = current_tetrimino.map(val => ++val)
    draw()
    
}

// Switch to next tetrimino each the up control button is clicked
const switch_tetrimino = () =>{

    undraw()
    rotation++

    // return to first tetrimino if current tetrimino is undefined
    if(tetriminoes[random][rotation] === undefined) rotation = 0;

    new_tetrimino = tetriminoes[random][rotation]
    
    // Entire switching take place below.
    for(let i = 0; i < current_tetrimino.length; i++){
        current_tetrimino[i] = (current_tetrimino[i] - previous_tetrimino[i]) + new_tetrimino[i]
    }

    if(current_tetrimino[0] % width === width-1 && current_tetrimino.some(val => val % width === 0)){
        current_tetrimino = current_tetrimino.map(val => val + 1)
    }

    if(current_tetrimino[current_tetrimino.length-1] % width === 0 && current_tetrimino.some(val => val % width === width-1)){
        current_tetrimino = current_tetrimino.map(val => val - 1)
    }

    previous_tetrimino = new_tetrimino;
    // cut_tetrimino(current_tetrimino[current_tetrimino.length-1])
    draw()
}

// Move current tetrimino down after every one second.
const move_down = () =>{ 

    undraw()
    current_tetrimino = current_tetrimino.map(val => val + width)
    draw()
    stop_move()
    
}

//  Move gliding tetrimino down as fast as one second whent the down control button is clicked.
let dropTimeId;
const dropdown = () => dropTimeId = setInterval(move_down,10)

const cut_tetrimino = tetris =>{
    
    let cut = tetris.flatMap(val => {
       let x =`${val}`.split('')
       x[x.length-1] = 0
       return Number(x.flat().join(''))
    })
    
    for(const val of cut){
        let start = val, end = val + width;
        let taken = Array.from(grid).slice(start,end)
        if(taken.every(box => box.className.includes('taken'))){
            taken.forEach(box => {
                box.remove();
                taken.splice(box)
            })

            for(let i = 0; i < 10; i++){
                let ele = document.createElement('div')
                ele.classList.add('grid')
                main_section.insertAdjacentElement('afterbegin',ele)
            }
        }
        // console.log(taken)

    }

}
document.addEventListener('keydown',control)