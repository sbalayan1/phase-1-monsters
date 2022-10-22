let pageCount = 1

document.addEventListener("DOMContentLoaded", () => {
    createForm()
    fetchMonsters()
    addNavEvent()
})

function createForm() {
    let createMonsterContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    const nameInput = document.createElement('input')
    const ageInput = document.createElement('input')
    const descriptionInput = document.createElement('input')
    const button = document.createElement('button')
    nameInput.name = "name"
    ageInput.name = 'age'
    descriptionInput.name = "description"
    nameInput.style.margin = '5px'
    ageInput.style.margin = '5px'
    descriptionInput.style.margin = '5px'
    button.textContent = 'Submit'

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('hello world')
    })

    form.append(nameInput, ageInput, descriptionInput, button)
    createMonsterContainer.append(form)
}

function addNavEvent() {
    const forwardButton = document.getElementById('forward')
    const backButton = document.getElementById('back')

    forwardButton.addEventListener('click', () => {
        clearMonsters()
        pageCount ++
        fetchMonsters()
    })

    backButton.addEventListener('click', () => {
        if (pageCount - 1 !== 0) {
            clearMonsters()
            pageCount --
            fetchMonsters()
        }
    })
}


function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCount}`)
    .then(res => res.json())
    .then(data => {data.forEach(monster => renderMonsters(monster))})
}

function renderMonsters(monster) {
    let monstersContainer = document.getElementById('monster-container')
    let monsterContainer = document.createElement('div')
    let h2 = document.createElement('h2')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')
    h2.textContent = monster.name
    h4.textContent = monster.age
    p.textContent = monster.description
    monsterContainer.append(h2, h4, p)
    monstersContainer.append(monsterContainer)
}

function clearMonsters() {
    let monstersContainer = document.getElementById('monster-container')
    while (monstersContainer.firstChild) {
        monstersContainer.removeChild(monstersContainer.firstChild)
    }
}