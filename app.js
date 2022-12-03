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
    if(target.className =='new-game-menu') controls('tetrimonies')
    else if(target.className =='continue-menu') controls('continue')
    else if(target.className =='high-score-menu') controls('high-score-section')
    else if(target.className =='select-level-menu') controls('select level')
    else if(target.className =='help-menu') controls('help')
    else if(target.className =='show-menu') show_menu('nav')

})


/**
 * Hide menu and display section depending on the menu that was selected
 *  *  @param section - Selected menu
 */
const controls = msg =>{
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

 const new_game = clas =>{
    
    let grid = document.createElement('div')
    grid.classList.add('grid')
   
    let new_grid = document.createElement('div')
    new_grid.classList.add('new-grid')
    
    let score_level = document.createElement('div')
    score_level.classList.add('score-level')
    
    section([_grid(grid),_new_grid(new_grid),_score_level(score_level)],clas)
    toggle_button()
    current_section = `.${clas}`
    
}

const _grid = grid =>{
    let i = 0;
    while(i < 200){
        let ele = document.createElement('div')
        grid.appendChild(ele)
        i++
    }
    return grid
}

const _new_grid = grid =>{
    let i = 0;
    while(i < 100){
        let ele = document.createElement('div')
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

const toggle_button = () =>{
    for (let i = 0; i < buttons.length; i++) {
        add_toggle(buttons[i],arrows[i])
    }
}

const add_toggle = (ele,clas) => ele.classList.toggle(clas)
