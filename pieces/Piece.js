export class Piece {
    constructor(color){
        this.color = color;
        this.hasMoved = false;
    }

    getValue(){
        return 0;
    }

    pieceTypeCode(){
        return "";
    }

    pieceCode(){
        return this.color + this.pieceTypeCode();
    }

    getValidMoves(x, y, pieceMatrix, passantablePawn){
        return [];
    }

    pieceMoved(){
        this.hasMoved = true;
    }
}