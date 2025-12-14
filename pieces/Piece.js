export class Piece {
    constructor(color){
        this.color = color;
        this.hasMoved = false;
    }

    pieceTypeCode(){
        return "";
    }

    pieceCode(){
        return this.color + this.pieceTypeCode();
    }

    getValidMoves(x, y, pieceMatrix){
        return [];
    }

    pieceMoved(){
        this.hasMoved = true;
    }
}