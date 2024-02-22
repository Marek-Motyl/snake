import { BoardElementType } from "./BoardElement";
import { generatePosition } from "./generateApplePosition";
import { Snake } from "./moveSnakeOnBoard";

export function updateBoard(board: BoardElementType[][], oldSnake: Snake, newSnake: Snake, addApple: boolean) {
    oldSnake.forEach(segment => {
        board[segment.y][segment.x] = BoardElementType.EMPTY;
    });

    board[newSnake[0].y][newSnake[0].x] = BoardElementType.HEAD;
    newSnake.slice(1).forEach(segment => {
        board[segment.y][segment.x] = BoardElementType.BODY;
    });

    if (addApple) {
        const [appleX, appleY] = generatePosition(newSnake, board.length);
        board[appleX][appleY] = BoardElementType.APPLE;
    }

    return board;
}