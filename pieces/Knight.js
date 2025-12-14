import { Piece } from "./Piece.js";
import { iterateShifts } from "../logic/MoveUtils.js";

export class Knight extends Piece{
    constructor(color){
        super(color);
        this.incrementalMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1]]
    }

    getValue(){
        return 3;
    }

    pieceTypeCode(){
        return "kn";
    }

    getValidMoves(x, y, pieceMatrix, passantablePawn){
        return iterateShifts(this.incrementalMoves, x, y, pieceMatrix, this.color)
    }
}