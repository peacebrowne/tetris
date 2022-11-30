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
    if(target.className =='new-game-menu') hide_menu('new game')
    else if(target.className =='continue-menu') hide_menu('continue')
    else if(target.className =='high-score-menu') hide_menu('high score')
    else if(target.className =='select-level-menu') hide_menu('select level')
    else if(target.className =='help-menu') hide_menu('help')
    else if(target.className =='show-menu') show_menu('nav')

})


/**
 * Hide menu and display section depending on the menu that was selected
 *  *  @param section - Selected menu
 */
const hide_menu = msg =>{
    menus.forEach(menu =>{
        menu.style.opacity = '100'
        menu.style.animationName = 'menu_out'
    })

    setTimeout(()=> {
        if(msg == 'new game') new_game(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)
        // else if(section == 'Continue') new_game(msg)

    }, 3000)
}

/**
 * Hide current section and display menu
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


const display = section => {
    main.innerHTML = ''
    main.append(section)
}

/**
 * Creating new section and displaying it depending on the menu that was selected
 *  *  @param section - Selected menu
 */
const section = (item,sec) => {
    let section = document.createElement('section')
    section.classList.add(sec)
    section.innerHTML = item;
    display(section)
    hideEle('nav')
}


/**
 * New Game section
 *  *  @param section - Selected menu
 */
 const new_game = msg =>{

    let ele = `<h1> ${msg} </h1>`
    section(ele,'new-game-section')
    toggle_button()
    current_section = '.new-game-section'
    
}

/**
 * High score section
 *  *  @param section - Selected menu
 */
const high_score = () =>{
    let section = document.createElement('section')
}

const arrows = ['up','right','down','left']
const buttons = document.querySelectorAll('button')

const toggle_button = () =>{
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i]
        btn.classList.toggle(arrows[i])
    }
}