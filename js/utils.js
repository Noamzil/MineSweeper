'use strict'
var gElBoard = document.querySelector('.gameBoard')
gElBoard.addEventListener("contextmenu", e => e.preventDefault());

var gBoard
var gMines
const MINE = '🐱‍👤'
const FLAG = '🚩'

var gElTimer = document.querySelector('.stopwatch span');
var gMin = 0;
var gSec = 0;
var gStoptime = false;


function createBoard(num) {
    var board = [];
    for (var i = 0; i <num; i++) {
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
    var elBoard = document.querySelector('.gameBoard')
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j].cellValue
            strHTML += `<td class= " cell cell${i}-${j}"" data-i="${i}" data-j="${j}"  onclick="cellClicked(this)" oncontextmenu = "rightClick(this, event)" > ${currCell} </td>`
        }
    }
    elBoard.innerHTML = strHTML
}

function printCellsValues() {
    var newBoard = []
    for (var i=0; i<gBoard.length; i++) {
        newBoard[i] = []
        for (var j=0; j<gBoard.length; j++) {
            newBoard[i][j] = gBoard[i][j].cellValue
        }
    } 
    return newBoard
} 


function makeMines(num) {
    gMines = num
    var cnt = 0
    while (cnt < num) {
        var randRow = getRandomInt(0, gBoard.length)
        var randCol = getRandomInt(0, gBoard[0].length)
        if (!gBoard[randRow][randCol].cellValue) {
            gBoard[randRow][randCol].cellValue = MINE
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
        gSec = parseInt(gSec);
        gMin = parseInt(gMin);
        gSec++
        if (gSec == 60) {
            gMin++
            gSec = 0;
        }
        if (gSec < 10 || gSec == 0) gSec = '0' + gSec
        if (gMin < 10 || gMin == 0) gMin = '0' + gMin
        gElTimer.innerHTML = gMin + ':' + gSec;
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
}




