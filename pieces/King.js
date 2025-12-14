import { iterateShifts } from "../logic/MoveUtils.js";
import { Piece } from "./Piece.js";

export class King extends Piece{
    constructor(color){
        super(color);
        this.incrementalMoves = [[1, 1], [-1, -1], [1, -1], [-1, 1],[1, 0], [-1, 0], [0, 1], [0, -1]]
        this.rookCoords = this.color === "w" ? [[7, 0], [7, 7]] :  [[0, 0], [0, 7]]
    }
    pieceTypeCode(){
        return "k";
    }
    getValidMoves(x, y, pieceMatrix){
        let moves =  iterateShifts(this.incrementalMoves, x, y, pieceMatrix, this.color);
        let castles = this.getCastles(x, y, pieceMatrix);
        return moves.concat(castles);
    }
    getCastles(x, y, pieceMatrix){
        let castles = []
        console.log("rook coords: "+ this.rookCoords)
        for(let rookCoord of this.rookCoords){
            console.log("Rook coord: " + rookCoord)
            let rook = pieceMatrix[rookCoord[0]][rookCoord[1]]
            console.log(rook)
            if(rook && !rook.hasMoved && !this.isPiecesInBetween([x,y], rookCoord, pieceMatrix)){
                console.log("rook placement: " + rookCoord[1])
                castles.push([x, y + (rookCoord[1] == 0 ? -2 : 2)])
            }
        }
        return castles;
    }

    isPiecesInBetween(kingCoords, rookCoords, pieceMatrix){
        let first = structuredClone(kingCoords[1] < rookCoords[1] ? kingCoords : rookCoords);
        let second = structuredClone(kingCoords[1] < rookCoords[1] ? rookCoords : kingCoords);
        first[1] += 1
        while(first[1] !== second[1]){
            if(pieceMatrix[first[0]][first[1]]){
                return true;
            }
            first[1] += 1;
        }
        return false;
    }
}