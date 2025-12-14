import { Piece } from "./Piece.js";
import { isMoveOnBoard } from "../logic/MoveUtils.js"; 
import { isMoveObstructed } from "../logic/MoveUtils.js"; 
import { getPieceAtPosition } from "../logic/MoveUtils.js";

export class Pawn extends Piece{
    constructor(color){
        super(color);
        this.direction = this.color === "w" ? -1 : +1;
    }
    pieceTypeCode(){
        return "p";
    }
    getValidMoves(x, y, pieceMatrix){
        let moves = [];
        let diagonal1 = [x + this.direction, y + this.direction];
        let diagonal2 = [x + this.direction, y - this.direction];
        if(getPieceAtPosition(diagonal1, pieceMatrix) && getPieceAtPosition(diagonal1, pieceMatrix).color != this.color){
            moves.push(diagonal1)
        }
        if(getPieceAtPosition(diagonal2, pieceMatrix) && getPieceAtPosition(diagonal2, pieceMatrix).color != this.color){
            moves.push(diagonal2)
        }

        let moveOneSquare = [x + this.direction, y]
        if(isMoveOnBoard(moveOneSquare) && !isMoveObstructed(moveOneSquare, pieceMatrix)){
            moves.push(moveOneSquare);
        }
        let moveTwoSquares = [x + (this.direction * 2), y]
        if(!this.hasMoved && isMoveOnBoard(moveTwoSquares) && !isMoveObstructed(moveTwoSquares, pieceMatrix)){
            moves.push(moveTwoSquares);
        }
        return moves
    }

}