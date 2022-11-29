const menus = document.querySelectorAll('ul li')
const main = document.querySelector('main')
const nav = document.querySelector('nav')
const hideEle = ele => ele.style.display = 'none'
const showEle = ele => ele.style.display = 'flex'

document.body.addEventListener('click', ev =>{
    
    ev.preventDefault()
    let target = ev.target
    if(target.className.includes('new-game-menu')) hide_menu('New Game')
    else if(target.className.includes('continue-menu')) hide_menu('Continue')
    else if(target.className.includes('high-score-menu')) hide_menu('High Score')
    else if(target.className.includes('select-level-menu')) hide_menu('Select Level')
    else if(target.className.includes('help-menu')) hide_menu('Help')

})

const hide_menu = section =>{
    menus.forEach(menu =>{
        menu.style.opacity = '100'
        menu.style.animationName = 'menu_out'
    })

    setTimeout(()=> sections(section), 3000)
}

const sections = item => {
    let ele = document.createElement('h1')
    ele.innerHTML = item
    main.append(ele)
    hideEle(nav)
}

const high_score = () =>{
    let section = document.createElement('section')
}