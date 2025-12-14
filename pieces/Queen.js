import { Piece } from "./Piece.js";
import { iterateRepeatedShifts } from "../logic/MoveUtils.js";

export class Queen extends Piece{
    constructor(color){
        super(color);
        this.incrementalMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1],[1, 0], [-1, 0], [0, 1], [0, -1]]
    }

    getValue(){
        return 9;
    }

    pieceTypeCode(){
        return "q";
    }

    getValidMoves(x, y, pieceMatrix, passantablePawn){
        return iterateRepeatedShifts(this.incrementalMoves, x, y, pieceMatrix, this.color)
     }
}