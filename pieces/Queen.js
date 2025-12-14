import { Piece } from "./Piece.js";
import { iterateRepeatedShifts } from "../logic/MoveUtils.js";

export class Queen extends Piece{
    constructor(color){
        super(color);
        this.incrementalMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1],[1, 0], [-1, 0], [0, 1], [0, -1]]
    }
    pieceTypeCode(){
        return "q";
    }

    getValidMoves(x, y, pieceMatrix){
        return iterateRepeatedShifts(this.incrementalMoves, x, y, pieceMatrix, this.color)
     }
}