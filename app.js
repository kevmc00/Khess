import { Rook } from "./pieces/Rook.js";
import { Bishop } from "./pieces/Bishop.js";
import { Knight } from "./pieces/Knight.js";
import { Pawn } from "./pieces/Pawn.js";
import { Queen } from "./pieces/Queen.js";
import { King } from "./pieces/King.js";
import { Selection } from "./logic/Selection.js";

let selectedPiece = null;
let turn = "w";

const renderBoard = (pieceMatrix) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    let isDark = true;
    for(let i = 0; i < 8; i++){
        let row = document.createElement("tr")
        isDark = (i % 2 != 0)
        for(let j = 0; j < 8; j++){
            let square = document.createElement("th");
            square.classList.add(isDark ? "dark" : "light")
            let piece = pieceMatrix[i][j];
            square.id = "" + letters[j] + (8 - i);
            square.x = i;
            square.y = j;
            square.addEventListener("click", () => handlePieceClick(square, pieceMatrix))
            if(piece){
                let pieceDisplay = document.createElement("img");
                pieceDisplay.classList.add("piece");
                pieceDisplay.src = `assets/${piece.pieceCode()}.png`;
                square.appendChild(pieceDisplay);
            }
            row.appendChild(square);
            isDark = !isDark;
         
        }
        tableBody.appendChild(row);
    }
    const screen = document.querySelector("#screen");
    screen.replaceChildren(table);
}

const toggleTurn = () => {
    return turn === "w" ? "b" : "w";
}

const handlePieceClick = (square, pieceMatrix) => {
    console.log([square.x, square.y]);
    if (selectedPiece) {
        let valid = selectedPiece.piece.getValidMoves(selectedPiece.x, selectedPiece.y, pieceMatrix);
        console.log("Valid moves now" + valid)
        if(valid.some((move) => move[0] === square.x && move[1] === square.y)){
            selectedPiece.piece.pieceMoved();
            console.log(`Castle check: is King:${selectedPiece.piece.pieceTypeCode()} squarecount: ${Math.abs(selectedPiece.y - square.y)}`)
            if(isCastle(square)){
                let castledRookCoords = square.y > selectedPiece.y ? [square.x, 7] : [square.x, 0];
                console.log(`Castled rook coords: ${castledRookCoords}`)
                console.log(`Castled rook:`)
                console.log(pieceMatrix[castledRookCoords[0]][castledRookCoords[1]])
                pieceMatrix[square.x][square.y + (square.y > selectedPiece.y ? -1 : 1)] = pieceMatrix[castledRookCoords[0]][castledRookCoords[1]]
                pieceMatrix[castledRookCoords[0]][castledRookCoords[1]] = null;
                console.log("Castled!")
            }
            updateBoard(square, pieceMatrix);
        }
        else{
            console.log("move not valid: " + [square.x, square.y])
            updateSelectedPiece(square, pieceMatrix);
        }
    } else {
        updateSelectedPiece(square, pieceMatrix);
    }
}

const isCastle = (square) => {
    return selectedPiece.piece.pieceTypeCode() === "k" && Math.abs(selectedPiece.y - square.y) == 2;
}

const updateBoard = (square, pieceMatrix) => {
    pieceMatrix[selectedPiece.x][selectedPiece.y] = null;
    pieceMatrix[square.x][square.y] = selectedPiece.piece;
    turn = toggleTurn();
    renderBoard(pieceMatrix);
    selectedPiece = null;
}

const updateSelectedPiece = (square, pieceMatrix) => {    
    const clickedPiece = pieceAtSquare(square, pieceMatrix);
    if(clickedPiece && clickedPiece.color === turn){
        selectedPiece = new Selection(clickedPiece, square.x, square.y);
    }else{
        selectedPiece = null;
        console.log("Deselected piece");
    }

    if(selectedPiece){
        console.log("Valid Moves: " + selectedPiece.piece.getValidMoves(selectedPiece.x, selectedPiece.y, pieceMatrix))
    }
}

const pieceAtSquare = (square, pieceMatrix) => {
    return pieceMatrix[8-square.id[1]][square.id[0].charCodeAt(0) - 97];
}

const initialBoard = [[new Rook("b"), new Knight("b"), new Bishop("b"), new Queen("b"), new King("b"), new Bishop("b"), new Knight("b"), new Rook("b")],
                    [new Pawn("b"), new Pawn("b"), new Pawn("b"), new Pawn("b"), new Pawn("b"), new Pawn("b"), new Pawn("b"), new Pawn("b")],
                    [null, null, null, null, null , null, null, null],
                    [null, null, null, null, null , null, null, null],
                    [null, null, null, null, null , null, null, null],
                    [null, null, null, null, null , null, null, null],
                    [new Pawn("w"), new Pawn("w"), new Pawn("w"), new Pawn("w"), new Pawn("w"), new Pawn("w"), new Pawn("w"), new Pawn("w")], 
                    [new Rook("w"), new Knight("w"), new Bishop("w"), new Queen("w"), new King("w"), new Bishop("w"), new Knight("w"), new Rook("w")]]
let pieceMatrix = {...initialBoard}

const startGame = () => {
    const gameOver = false;
    let turn = "w";
    renderBoard(pieceMatrix);
}

startGame();

