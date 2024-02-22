import { BoardElementType } from "./BoardElement";

export type Snake = Array<{ x: number, y: number }>;
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export function moveSnakeOnBoard(board: BoardElementType[][], snake: Snake, direction: Direction) {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
    }
    newSnake.unshift(head);

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= board[0].length ||
        head.y >= board.length ||
        board[head.y][head.x] === BoardElementType.BODY
    ) {
        throw new Error("Game Over!")
    }

    let wasAppleEaten = false;
    if (board[head.y][head.x] === BoardElementType.APPLE) {
        wasAppleEaten = true;
    } else {
        newSnake.pop();
    }

    return { snake: newSnake, wasAppleEaten }
}