'use strict'

var gLevel = {
    level: 2,
    size: 8,
    mines: 12
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    lives: 3,
    hints: 3,
    safeClick: 3
}

var gFirstClick = true

function init() {
    localStorage.clear()
    gGame.isOn = true
    gBoard = createBoard(gLevel.size)
    renderBoard()
    setMines(gLevel.mines)
    setNums(gBoard)
    var elMinesRem = document.querySelector('.rem-mines')
    elMinesRem.innerHTML = gLevel.mines
    var showTable = getCellsValues()
    console.table(showTable)
}

function setGameLevel(elBtn, level, size, mines) {
    restartGame()
    gLevel = { level: level, size: size, mines: mines }
    var elMinesRem = document.querySelector('.rem-mines')
    elMinesRem.innerHTML = gLevel.mines
    var elLevels = document.querySelectorAll('.level')
    for (var i = 0; i < elLevels.length; i++) {
        if (elLevels[i].classList.contains('buttonClicked')) elLevels[i].classList.remove('buttonClicked')
    }
    gBoard = createBoard(gLevel.size)
    renderBoard()
    setMines(gLevel.mines)
    setNums(gBoard)
    elBtn.classList.add('buttonClicked')
    var showTable = getCellsValues()
    console.table(showTable)
}


function customLevel(elBtn) {
    var size = +prompt('Board size?')
    var mines = +prompt('How many mines?')
    if (mines > size ** 2) {
        alert('Too many mines! ')
        return
    }
    setGameLevel(elBtn, 'custom', size, mines)
}

function restartGame() {
    gGame.markedCount = 0
    gGame.shownCount = 0
    gGame.hints = 3
    gGame.safeClick = 3
    gGame.isOn = true
    gGame.lives = 3
    gFirstClick = true
    var elMinesRem = document.querySelector('.rem-mines')
    elMinesRem.innerHTML = gLevel.mines
    var elRestart = document.querySelector('.restart')
    var elLives = document.querySelector('.lives')
    var elHints = document.querySelector('.hints')
    var elHint = document.querySelector('.hint')
    var elSafeClick = document.querySelector('.safeClick-num')
    elRestart.innerText = '😊'
    elLives.innerHTML = HEART.repeat(gGame.lives)
    elHints.innerHTML = HINT.repeat(gGame.hints)
    elHint.style.display = 'inline-block'
    elSafeClick.innerHTML = '(' + gGame.safeClick + ')'
    stopTimer()
    resetTimer()
    gBoard = createBoard(gLevel.size)
    renderBoard()
    setMines(gLevel.mines)
    setNums(gBoard)
    var elBestScore = document.querySelector('.score')
    elBestScore.style.display = 'none'

}


function safeClick() {   //problem with design after clicking
    if (!gGame.isOn) return
    var cnt = 0
    while (cnt < 1 && gGame.safeClick) {
        var i = getRandomInt(0, gBoard.length)
        var j = getRandomInt(0, gBoard[0].length)
        if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
            var elCell = document.querySelector(`.cell${i}-${j}`)
            elCell.classList.add('clicked-safe')
            setTimeout(function () {
                elCell.classList.remove('clicked-safe')
            }, 2000);
            cnt++
            var elSafeClickNum = document.querySelector('.safeClick-num')
            gGame.safeClick--
            elSafeClickNum.innerHTML = '(' + gGame.safeClick + ')'
        }
    }
}

function hint() {
    if (!gGame.isOn) return
    var cnt = 0
    var hintCells = []
    while (cnt < 1) {
        var cellI = getRandomInt(0, gBoard.length)
        var cellJ = getRandomInt(0, gBoard[0].length)
        var elCell = document.querySelector(`.cell${cellI}-${cellJ}`)
        if (!gBoard[cellI][cellJ].isMine && !gBoard[cellI][cellJ].isShown) {
            hintCells.push(elCell)
            for (var i = cellI - 1; i <= cellI + 1; i++) {
                if (i < 0 || i >= gBoard.length) continue;
                for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                    if (j < 0 || j >= gBoard[i].length) continue;
                    if (i === cellI && j === cellJ) continue;
                    hintCells.push(document.querySelector(`.cell${i}-${j}`))
                }
            }
            for (var i = 0; i < hintCells.length; i++) {
                var elCurrCell = hintCells[i]
                var currRow = elCurrCell.dataset.i
                var currCol = elCurrCell.dataset.j
                elCurrCell.classList.add('on-hint')
                elCurrCell.innerText = gBoard[currRow][currCol].cellValue
                if (gBoard[currRow][currCol].cellValue === 0) elCurrCell.innerText = ''
                setTimeout(function () {
                    for (var i = 0; i < hintCells.length; i++) {
                        var elCurrCell = hintCells[i]
                        elCurrCell.innerText = '';
                        elCurrCell.classList.remove('on-hint')
                    }
                }, 1000);
            }
            cnt++
            gGame.hints--
            var elHints = document.querySelector('.hints')
            var elHint = document.querySelector('.hint')
            elHints.innerHTML = HINT.repeat(gGame.hints)
            if (!gGame.hints) elHint.style.display = 'none'
        }
    }
}



function bestScore() {
    var gameTime = gElTimer.innerText
    if (gLevel.level === 1) {
        if (!localStorage.bestScore1) localStorage.bestScore1 = gameTime
        if (gameTime < localStorage.bestScore1) localStorage.bestScore1 = gameTime
        var elBestScore1 = document.querySelector('.beginner')
        elBestScore1.innerText = localStorage.bestScore1
    }
    else if (gLevel.level === 2) {
        if (!localStorage.bestScore2) localStorage.bestScore2 = gameTime
        if (gameTime < localStorage.bestScoe2) localStorage.bestScore2 = gameTime
        var elBestScore2 = document.querySelector('.medium')
        elBestScore2.innerText = localStorage.bestScore2
    }
    else if (gLevel.level === 3) {
        if (!localStorage.bestScore3) localStorage.bestScore3 = gameTime
        if (gameTime < localStorage.bestScore3) localStorage.bestScore3 = gameTime
        var elBestScore3 = document.querySelector('.expert')
        elBestScore3.innerText = localStorage.bestScore3
    }
}
