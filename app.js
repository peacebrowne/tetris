const menus = document.querySelectorAll('ul li')
const main = document.querySelector('main')
// const nav = document.querySelector('nav')
const hideEle = ele => document.querySelector(ele).style.display = 'none'
const showEle = ele => document.querySelector(ele).style.display = 'flex'
let current_section;


/**
 * Handling all clicks event on page
 *  *  @param clas - class to toggle
 */
document.body.addEventListener('click', ev =>{
    
    ev.preventDefault()
    let target = ev.target
    if(target.className =='new-game-menu') stable('tetrimonies')
    else if(target.className =='continue-menu') stable('continue')
    else if(target.className =='high-score-menu') stable('high-score-section')
    else if(target.className =='select-level-menu') stable('select level')
    else if(target.className =='help-menu') stable('help')
    else if(target.className =='show-menu') show_menu('nav')

})


/**
 * Hide menu and display section depending on the menu that was selected
 *  *  @param section - Selected menu
 */
const stable = msg =>{
    menus.forEach(menu =>{
        menu.style.opacity = '100'
        menu.style.animationName = 'menu_out'
    })

    setTimeout(()=> {
        if(msg == 'tetrimonies') new_game(msg)
        else if(msg == 'high-score-section') high_score(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)

    }, 3000)
}

/**
 * Hide current section and display menu and remove animations from control buttons
 *  *  @param section - Menu section
 */
const show_menu = section =>{

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
 *  *  @param section - newly created h1 element
 */
const display = section => {
    main.innerHTML = ''
    main.append(section)
}

/**
 * Creating new section and displaying it depending on the menu that was selected
 *  *  @param sec - newly created section
 *  *  @param item - newly created h1 element
 */
const section = (items,sec) => {

    let section = document.createElement('section')
    section.classList.add(sec)

    items.forEach(ele => section.appendChild(ele))
    
    display(section)
    hideEle('nav')
    
}

/**
 * New Game section
 *  *  @param clas - Selected menu message
 */

 let grid;
 let timeId;

 const new_game = clas =>{
    
    let grids = document.createElement('div')
    grids.classList.add('grids')
   
    let new_grids = document.createElement('div')
    new_grids.classList.add('new-grids')
    
    let score_level = document.createElement('div')
    score_level.classList.add('score-level')
    
    section([_grid(grids),_new_grid(new_grids),_score_level(score_level)],clas)
    toggle_button()
    current_section = `.${clas}`
    grid = document.querySelectorAll('.grids div')
    draw()
    timeId = setInterval(move_down,1000)

}

const _grid = grid =>{
    let i = 0;
    while(i < 200){
        let ele = document.createElement('div')
        ele.classList.add('grid')
        grid.appendChild(ele)
        i++
    }

    i = 0;
    while(i < 10){
        let ele = document.createElement('div')
        ele.classList.add('taken')
        // ele.classList.add('grid')
        grid.appendChild(ele)
        i++
    }
    return grid
}

const _new_grid = grid =>{
    let i = 0;
    while(i < 100){
        let ele = document.createElement('div')
        ele.classList.add('new-grid')
        grid.appendChild(ele)
        i++
    }
    return grid
}

const _score_level = grid =>{
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
    grid.innerHTML = ele
    return grid;
}

/**
 * High score section
 *  *  @param section - Selected menu
 */
const high_score = clas =>{

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

/**
 * Add animation to control buttons
 */
const arrows = ['up','right','down','left']
const buttons = document.querySelectorAll('.control-btn')

const toggle_button = () => {
    for (let i = 0; i < buttons.length; i++) {
        add_toggle(buttons[i],arrows[i])
    }
}

const add_toggle = (ele,clas) => ele.classList.toggle(clas)
const remove_toggle = (ele,clas) => ele.classList.remove(clas)

let width = 10;
let start_pos = 4;

const ltetrimonies = [
    [start_pos+1, start_pos, width+start_pos, width*2+start_pos],
    [start_pos+1, start_pos, start_pos-1, width+start_pos+1],
    [start_pos+1, width+start_pos+1, width*2+start_pos+1, width*2+start_pos],
    [start_pos, width+start_pos+2, width+start_pos+1, width+start_pos]
]

const tetrimonies = [ltetrimonies]

let random = Math.floor(Math.random() * tetrimonies.length)
let rotation = 0;
let target = tetrimonies[random][rotation]
let standby = target;

const draw = () =>{

    target.forEach(val => add_toggle(grid[val],'tetris'))

}

const undraw = () => {

    target.forEach( val => {
        remove_toggle(grid[val],'tetris');
    })

}


const stop_move = () =>{

    if(target.some(box => grid[box + width].className.includes('taken'))){
        target.forEach( item => grid[item].classList.add('taken'))
        random = Math.floor(Math.random() * tetrimonies.length)

        rotation = Math.floor(Math.random() * tetrimonies[random][rotation].length)
        target = tetrimonies[random][rotation]
        standby = target;
        start_pos = 4;
        draw()
    }
    
}

// handling keypress event

const control = ev =>{
    let btn = ev.key

    if(btn === 'ArrowUp'){
        console.log(btn)
        move_up()
    }
    else if(btn === 'ArrowRight'){
        console.log(btn)
        move_right()
    }
    else if(btn === 'ArrowLeft'){
        move_left()
        console.log(btn)
    }else if(btn === 'ArrowDown'){
        console.log(btn)
    }
}

const move_left = () => {
    const left = target.some(val => val % width === 0)
    if(left) return
    undraw()
    target = target.map(val => --val)
    draw()
}

const move_right = () => {
    const right = target.some(val => val % width === width -1)
    if(right) return
    undraw()
    target = target.map(val => ++val)
    draw()
}

const move_up = () =>{

    undraw()
    let current_row = []
    for(let i = 0; i < target.length; i++){
        let val = target[i]
        current_row.push(val - standby[i])
    }

    target = tetrimonies[random][++rotation]
    standby = target;
    
    if(target === undefined){
        rotation = -1;
        target = tetrimonies[random][++rotation]
    }

    let balance = []
    for(let i = 0; i < target.length; i++){
        let val = target[i]
        balance.push(val - current_row[i])
    }
    target = balance
    draw()
}

const move_down = () => { 
    undraw()
    target = target.map(val => val + width)
    draw()
    stop_move()
}


document.addEventListener('keydown',control)