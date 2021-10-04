'use strict'

var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
}


function init() {
    gGame.isOn = true
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    var level = document.querySelector('.level1')
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
    elRestart.innerText =  '😊'
    gGame.isOn = true
    stopTimer()
    resetTimer()
    gGame.markedCount = 0
    gGame.shownCount = 0
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    
}


