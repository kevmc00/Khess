
export function getPieceAtPosition(position, pieceMatrix){
    return pieceMatrix[position[0]][position[1]];
}

export function isMoveOnBoard(move){
    return move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7;
}

export function isMoveObstructed(move, pieceMatrix){
    return pieceMatrix[move[0]][move[1]];
}

export function isMoveObstructedByFriend(move, pieceMatrix, color){
    return pieceMatrix[move[0]][move[1]] && pieceMatrix[move[0]][move[1]].color === color;
}


export function isMoveObstructedByEnemy(move, pieceMatrix, color){
    return pieceMatrix[move[0]][move[1]] && !pieceMatrix[move[0]][move[1]].color === color;
}

export function shift(pos, delta){
    return [pos[0] + delta[0], pos[1] + delta[1]]
}

export function iterateRepeatedShifts(shifts, x, y, pieceMatrix, color){
    let moves = [];
    const pos = [x, y];
    for(let delta of shifts){
        let move = structuredClone(pos);
        while(isMoveOnBoard(shift(move, delta)) && !isMoveObstructedByFriend(shift(move, delta), pieceMatrix, color)){
            move = shift(move, delta);
            moves.push(move);
            if(isMoveObstructedByEnemy(move, pieceMatrix, color)){
                break;
            }
        }
    }
    return moves;
}


export function iterateShifts(shifts, x, y, pieceMatrix, color){
    let moves = [];
    const pos = [x, y];
    for(let delta of shifts){
        let move = structuredClone(pos);
        if(isMoveOnBoard(shift(move, delta)) && !isMoveObstructedByFriend(shift(move, delta), pieceMatrix, color)){
            move = shift(move, delta);
            moves.push(move);
        }
    }
    return moves;
}