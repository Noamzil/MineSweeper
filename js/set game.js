'use strict'

var gLevel = {
    size: 8,
    mines: 12
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    lives:3
}


function init() {
    gGame.isOn = true
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    var level = document.querySelector('.level2')
    level.classList.add('buttonClicked')
    var showTable = printCellsValues()
    console.table(showTable)
}



function setGameLevel(level, size, mines) {
    restartGame()
    gLevel = { size: size, mines: mines }
    var elLevels = document.querySelectorAll('.level')
    for (var i=0; i<elLevels.length; i++) {
        if (elLevels[i].classList.contains('buttonClicked')) elLevels[i].classList.remove('buttonClicked')
    }
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    level.classList.add('buttonClicked')
    var showTable = printCellsValues()
    console.table(showTable)
}

function restartGame() {
    var elRestart = document.querySelector('.restart')
    var elLives = document.querySelector('.lives')
    elRestart.innerText =  '😊'
    gGame.isOn = true
    gGame.lives = 3
    elLives.innerHTML = HEART.repeat(gGame.lives)
    stopTimer()
    resetTimer()
    gGame.markedCount = 0
    gGame.shownCount = 0
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    
}


