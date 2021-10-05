'use strict'
var gWin
const HEART = '💗'
const HINT = '💡'

function cellClicked(cell) {
    if (!gGame.isOn) return
    var i = cell.dataset.i
    var j = cell.dataset.j
    if (gFirstClick) {
        startTimer()
    }

    if (gBoard[i][j].isMarked || gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    gGame.shownCount++
    cell.classList.add('cellClicked')
    if (gBoard[i][j].cellValue === MINE && gFirstClick) {  //first click - the cell is mine
        firstClick(cell)
    } else if (gBoard[i][j].cellValue === MINE) { //clicked a mine    
        clickedMine(cell)
    } else if (gBoard[i][j].cellValue === 0) { //clicked 0
        clickedZero(cell)
    } else if (gBoard[i][j].cellValue !== MINE) {  // clicked a number (not 0)
        clickedNum(cell, i, j)
    }
    var boardSize = gLevel.size ** 2
    if (gGame.shownCount + gGame.markedCount === boardSize) checkWin()
    gFirstClick = false
}

function clickedNum(cell, i, j) {
    cell.innerText = gBoard[i][j].cellValue
}


function clickedMine(cell) {
    if (gGame.lives !== 1) {
        cell.innerText = MINE
    } else {  //0 lives
        stopTimer()
        cell.innerText = MINE
        cell.style.backgroundColor = 'red'
        gameOver()
    }
    gGame.lives--
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = HEART.repeat(gGame.lives)
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

var gChecked = []
function clickedZero(cell) { //recursive 
    if (gChecked.includes(cell)) return
    gChecked.push(cell)
    cell.innerText = ''
    var cellI = +cell.dataset.i
    var cellJ = +cell.dataset.j
    if (gBoard[cellI][cellJ].cellValue) return //ending term
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (!gBoard[i][j].isShown) gGame.shownCount++
            gBoard[i][j].isShown = true
            var elCell = document.querySelector(`.cell${i}-${j}`)
            if (gBoard[i][j].cellValue !== 0) elCell.innerText = gBoard[i][j].cellValue
            elCell.classList.add('cellClicked')
        }
    }
    var elRightCell = document.querySelector(`.cell${cellI}-${cellJ + 1}`)
    var elLeftCell = document.querySelector(`.cell${cellI}-${cellJ - 1}`)
    var elUpCell = document.querySelector(`.cell${cellI - 1}-${cellJ}`)
    var elDownCell = document.querySelector(`.cell${cellI + 1}-${cellJ}`)

    if (cellI - 1 > 0) {
        clickedZero(elUpCell)
    }
    if (cellJ-1>0){
        clickedZero(elLeftCell)
    } 
    if (cellJ + 1 < gBoard[0].length) {
        clickedZero(elRightCell)
    }
    if(cellI+1<gBoard.length) {
        clickedZero(elDownCell)
    }
}




// function clickedZero(cell) {  //not recursive
//     cell.innerText = ''
//     var cellI = +cell.dataset.i
//     var cellJ = +cell.dataset.j
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard[0].length) continue
//             if (i === cellI && j === cellJ) continue
//             if (!gBoard[i][j].isShown) gGame.shownCount++
//             gBoard[i][j].isShown = true
//             var elCell = document.querySelector(`.cell${i}-${j}`)
//             if (gBoard[i][j].cellValue !== 0) elCell.innerText = gBoard[i][j].cellValue
//             elCell.classList.add('cellClicked')
//         }
//     }
// }

function firstClick(cell) {
    if (gFirstClick) {
        gBoard = createBoard(gLevel.size, gLevel.size)
        setMines(gLevel.mines)
        setNums(gBoard)
        var showTable = getCellsValues()
        console.table(showTable)
        cellClicked(cell)
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
    var minesRem = gLevel.mines - gGame.markedCount
    var elMinesRem = document.querySelector('.rem-mines')
    elMinesRem.innerHTML = minesRem

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
    bestScore()
    var elBestScore = document.querySelector('.score')
    elBestScore.style.display = 'block'
    gGame.isOn = false
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = '😎'
}


