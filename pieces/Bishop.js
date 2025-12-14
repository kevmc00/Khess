import { Piece } from "./Piece.js";
import { iterateRepeatedShifts } from "../logic/MoveUtils.js";

export class Bishop extends Piece {
    constructor(color){
        super(color);
        this.incrementalMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
    }
    pieceTypeCode(){
        return "b";
    }


    getValidMoves(x, y, pieceMatrix){
        return iterateRepeatedShifts(this.incrementalMoves, x, y, pieceMatrix, this.color)
     }
}