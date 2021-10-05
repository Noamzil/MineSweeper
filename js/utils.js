'use strict'
var gElBoard = document.querySelector('.game-board')
gElBoard.addEventListener("contextmenu", e => e.preventDefault());

var gBoard
var gMines
const MINE = '💣'
const FLAG = '🚩'

var gElTimer = document.querySelector('.stopwatch span');
var gTime = {
    min: 0,
    sec: 0
}
var gStoptime = true;


function createBoard(num) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board[i] = []
        for (var j = 0; j < num; j++) {
            board[i][j] = createCell()
        }
    }
    return board;
}


function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        cellValue: ''
    }
    return cell
}


function renderBoard() {
    var strHTML = ''
    var elBoard = document.querySelector('.game-board')
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j].cellValue
            strHTML += `<td class= " cell cell${i}-${j}"" data-i="${i}" data-j="${j}"  onclick="cellClicked(this)" oncontextmenu = "rightClick(this, event)" > ${currCell} </td>`
        }
    }
    elBoard.innerHTML = strHTML
}


function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

function getCellsValues() {
    var newBoard = []
    for (var i = 0; i < gBoard.length; i++) {
        newBoard[i] = []
        for (var j = 0; j < gBoard.length; j++) {
            newBoard[i][j] = gBoard[i][j].cellValue
        }
    }
    return newBoard
}


function setMines(num) {
    gMines = num
    var cnt = 0
    while (cnt < num) {
        var randRow = getRandomInt(0, gBoard.length)
        var randCol = getRandomInt(0, gBoard[0].length)
        if (!gBoard[randRow][randCol].cellValue) {
            gBoard[randRow][randCol].cellValue = MINE
            gBoard[randRow][randCol].isMine = true
            cnt++
        }
    }
}

function setNums(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].cellValue === MINE) continue
            var currNeighborsNums = countNeighbors(i, j, board)
            var elCell = document.querySelector(`.cell${i}-${j}`)
            board[i][j].cellValue = currNeighborsNums
            elCell.classList.add(`neighbors-${currNeighborsNums}`)
        }
    }
}


function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].cellValue === MINE) neighborsCount++;
        }
    }
    return neighborsCount;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}




function timerCycle() {
    if (!gStoptime) {
        gTime.sec = parseInt(gTime.sec);
        gTime.min = parseInt(gTime.min);
        gTime.sec++
        if (gTime.sec == 60) {
            gTime.min++
            gTime.sec = 0;
        }
        if (gTime.sec < 10 || gTime.sec == 0) gTime.sec = '0' + gTime.sec
        if (gTime.min < 10 || gTime.min == 0) gTime.min = '0' + gTime.min
        gElTimer.innerHTML = gTime.min + ':' + gTime.sec;
        setTimeout("timerCycle()", 1000);
    }
}


function startTimer() {
    if (gStoptime) {
        gStoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (!gStoptime) gStoptime = true;
}

function resetTimer() {
    gElTimer.innerHTML = '00:00';
    gTime.min = 0;
    gTime.sec = 0;
}




