import { iterateRepeatedShifts } from "../logic/MoveUtils.js";
import { Piece } from "./Piece.js";

export class Rook extends Piece {
    constructor(color){
        super(color);
        this.incrementalMoves = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    }

    getValue(){
        return 5;
    }
    
    pieceTypeCode(){
        return "r";
    }

    getValidMoves(x, y, pieceMatrix, passantablePawn){
       return iterateRepeatedShifts(this.incrementalMoves, x, y, pieceMatrix, this.color)
    }
}