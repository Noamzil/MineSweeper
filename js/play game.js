'use strict'
var gWin

function cellClicked(cell) {

    if (!gGame.isOn) return
    if (!gGame.shownCount && !gGame.markedCount && gStoptime) startTimer()
    gGame.shownCount++
    var i = cell.dataset.i
    var j = cell.dataset.j
    if (gBoard[i][j].isMarked) return
    cell.classList.add('cellClicked')
    gBoard[i][j].isShown = true
    if (gBoard[i][j].cellValue === MINE && gGame.shownCount === 1) {
        //first click - the cell is mine
    } else if (gBoard[i][j].cellValue === MINE) {
        //clicked a mine
        clickedMine(cell)
    } else if (gBoard[i][j].cellValue === 0) {
        //clicked 0
        clickedZero(cell)
    } else if (gBoard[i][j].cellValue !== MINE) {
        // clicked a number (not 0)
        clickedNum(cell, i, j)
    }
    var boardSize = gLevel.size ** 2
    if (gGame.shownCount + gGame.markedCount === boardSize) checkWin()
}

function clickedNum(cell, i, j) {
    cell.innerText = gBoard[i][j].cellValue
}


function clickedMine(cell) {
    stopTimer()
    cell.innerText = MINE
    cell.style.backgroundColor = 'red'
    gameOver()

}

function gameOver() {
    gGame.isOn = false
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = '😭'
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].cellValue === MINE) {
                var cellLocation = { i: i, j: j }
                var elCell = document.querySelector(`.cell${i}-${j}`)
                elCell.innerText = MINE
                elCell.classList.add('cellClicked')
            }
        }
    }
}

function clickedZero(cell) {
    cell.innerText = ''
    //neighboors loop 
    var cellI = +cell.dataset.i
    var cellJ = +cell.dataset.j
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellI && j === cellJ) continue
            gBoard[i][j].isShown = true
            gGame.shownCount++
            var elCell = document.querySelector(`.cell${i}-${j}`)
            if (gBoard[i][j].cellValue !== 0) elCell.innerText = gBoard[i][j].cellValue
            elCell.classList.add('cellClicked')
        }
    }
}



function rightClick(cell, ev) {
    if (!gGame.shownCount && !gGame.markedCount && gStoptime) startTimer()
    var currCell = gBoard[cell.dataset.i][cell.dataset.j]
    if (cell.classList.contains('cellClicked')) return
    if (!currCell.isMarked) {
        gGame.markedCount++
        cell.innerText = FLAG
        currCell.isMarked = true
    } else {
        gGame.markedCount--
        cell.innerText = ''
        currCell.isMarked = false
    }
    var boardSize = gLevel.size ** 2
    if (gGame.shownCount + gGame.markedCount === boardSize) checkWin()
}

function checkWin() {
    stopTimer()
    var mines = gLevel.mines
    if (gGame.markedCount !== mines) gWin = false
    gWin = true
    if (!gWin) gameOver()
    if (gWin) gameWon()
}

function gameWon() {
    gGame.isOn = false
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = '😎'
}
