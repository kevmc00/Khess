import { Rook } from "./pieces/Rook.js";
import { Bishop } from "./pieces/Bishop.js";
import { Knight } from "./pieces/Knight.js";
import { Pawn } from "./pieces/Pawn.js";
import { Queen } from "./pieces/Queen.js";
import { King } from "./pieces/King.js";
import { Selection } from "./logic/Selection.js";

let selectedPiece = null;
let turn = "w";
let passantablePawn = null;
let passantedPawn = null;
let whiteTakenMaterial = 0;
let blackTakenMaterial = 0;
let whiteScore = document.querySelector("#w-score");
let blackScore = document.querySelector("#b-score");

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
                let pieceDisplay = buildPiece(piece);
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

const buildPiece = (piece) => {
    let pieceDisplay = document.createElement("img");
    pieceDisplay.classList.add("piece");
    pieceDisplay.classList.add(piece.pieceCode());
    pieceDisplay.src = `assets/${piece.pieceCode()}.png`;
    return pieceDisplay;
}

const renderMove = (pieceMatrix) => {
    const tableBody = document.querySelector("tbody")
    for(let i = 0; i < 8; i++){
        let row = tableBody.rows[i]
        for(let j = 0; j < 8; j++){
            let square = row.children[j];
            let newPiece = pieceMatrix[i][j]
            let oldPiece = square.querySelector("img");
            if(!oldPiece && newPiece){
                square.appendChild(buildPiece(newPiece))
            }
            if(oldPiece && !newPiece){
                square.replaceChildren();
            }
            if(oldPiece && newPiece && !oldPiece.classList.contains(newPiece.pieceCode())){  
                square.replaceChildren(buildPiece(newPiece))
            }
        }
    }
}

const toggleTurn = () => {
    return turn === "w" ? "b" : "w";
}

const handlePieceClick = (square, pieceMatrix) => {
    if (selectedPiece) {
        let valid = selectedPiece.piece.getValidMoves(selectedPiece.x, selectedPiece.y, pieceMatrix, passantablePawn);
        if(valid.some((move) => move[0] === square.x && move[1] === square.y)){
            selectedPiece.piece.pieceMoved();
            if(isCastle(square)){
                let castledRookCoords = square.y > selectedPiece.y ? [square.x, 7] : [square.x, 0];
                pieceMatrix[square.x][square.y + (square.y > selectedPiece.y ? -1 : 1)] = pieceMatrix[castledRookCoords[0]][castledRookCoords[1]]
                pieceMatrix[castledRookCoords[0]][castledRookCoords[1]] = null;
            }
            if(isEnPassant(square)){
                console.log("En Passant!")
                passantedPawn = pieceMatrix[passantablePawn.x][passantablePawn.y];
                pieceMatrix[passantablePawn.x][passantablePawn.y] = null;
            }
            if(selectedPiece.piece.pieceTypeCode() === "p" && Math.abs(square.x - selectedPiece.x) == 2){
                passantablePawn = square;
            } else {
                passantablePawn = null;
            }
            updateBoard(square, pieceMatrix);
        }
        else{
            updateSelectedPiece(square, pieceMatrix);
        }
    } else {
        updateSelectedPiece(square, pieceMatrix);
    }
}

const isCastle = (square) => {
    return selectedPiece.piece.pieceTypeCode() === "k" && Math.abs(selectedPiece.y - square.y) == 2;
}

const isEnPassant = (square) => {
    const relX = selectedPiece.piece.color === "w" ? -1 : 1;
    return passantablePawn && selectedPiece.piece.pieceTypeCode() === "p" && square.x - passantablePawn.x === relX && square.y === passantablePawn.y;
}

const updateBoard = (square, pieceMatrix) => {
    const pieceInSquare = pieceMatrix[square.x][square.y];
    if(pieceInSquare || passantedPawn){
        let takenPiece = pieceInSquare ? pieceInSquare : passantedPawn;
        console.log(takenPiece);
        turn === "w" ? blackTakenMaterial += takenPiece.getValue() : whiteTakenMaterial += takenPiece.getValue();
        whiteScore.innerHTML = blackTakenMaterial;
        blackScore.innerHTML = whiteTakenMaterial;
        console.log(`Scores: white ${blackTakenMaterial}, black ${whiteTakenMaterial}`)
    }
    pieceMatrix[selectedPiece.x][selectedPiece.y] = null;
    pieceMatrix[square.x][square.y] = selectedPiece.piece;
    turn = toggleTurn();

    renderMove(pieceMatrix)
    selectedPiece = null;
    passantedPawn = null;
}

const updateSelectedPiece = (square, pieceMatrix) => {    
    const clickedPiece = pieceAtSquare(square, pieceMatrix);
    if(clickedPiece && clickedPiece.color === turn){
        selectedPiece = new Selection(clickedPiece, square.x, square.y);
    }else{
        selectedPiece = null;
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

