'use strict'

var gLevel = {
    size: 8,
    mines: 12
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function init() {
    gGame.isOn = true
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    var showTable = printCellsValues()
    console.table(showTable)
}



function setGameLevel(size, mines) {
    gLevel = { size: size, mines: mines }
    var elLevels = document.querySelectorAll('.level')
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
}

function restartGame() {
    gGame.isOn = true
    gBoard = createBoard(gLevel.size)
    renderBoard()
    makeMines(gLevel.mines)
    setNums(gBoard)
    var showTable = printCellsValues()
    console.table(showTable)
}


