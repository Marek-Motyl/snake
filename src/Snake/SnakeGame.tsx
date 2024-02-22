import { useEffect, useRef, useState } from "react";
import { BoardElement, BoardElementType } from "./BoardElement";
import { useLastKeyPressed } from "../hooks/useKeybord";
import { Direction } from "./SnakeHead";
import { useRenderLoop } from "../hooks/useRenderLoop";
import { Snake, moveSnakeOnBoard } from "./moveSnakeOnBoard";
import { updateBoard } from "./updateBoard";

type ArrowKeys = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';
const matchingKeys: ArrowKeys[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const mapKeyToSnakeDirection: Record<ArrowKeys, Direction> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
}

interface Props {
  frameRate: number;
  dimension: number;
  refreshRate: number;
}

export function SnakeGame({ dimension = 10, frameRate, refreshRate }: Props) {
  const { refresh } = useRenderLoop(frameRate, refreshRate);
  const lastKeyPress = useLastKeyPressed(matchingKeys, "ArrowUp");
  const direction = mapKeyToSnakeDirection[lastKeyPress];

  const [gameOver, setGameOver] = useState(false);
  const snake = useRef<Snake>([{ x: Math.floor(dimension / 2), y: Math.floor(dimension / 2) }]);
  const board = useRef<BoardElementType[][]>(Array(dimension).fill(0).map(() => Array(dimension).fill(BoardElementType.EMPTY)));

  useEffect(() => {
    board.current = updateBoard(board.current, [], snake.current, true);
  }, [])

  useEffect(() => {
    if (gameOver || !refresh) {
      return;
    }

    try {
      const { snake: newSnake, wasAppleEaten } = moveSnakeOnBoard(board.current, snake.current, direction);
      board.current = updateBoard(board.current, snake.current, newSnake, wasAppleEaten);
      snake.current = newSnake;
    } catch (error) {
      setGameOver(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {gameOver && <div className="mb-5 text-xl">Game Over!</div>}
      <div className="flex flex-col gap-1">
        {board.current.map((dimensions, dimensionIndex) => {
          return <div className="flex flex-row gap-1" key={dimensionIndex}>
            {dimensions.map((element, elementIndex) => {
              return <BoardElement key={`${elementIndex}-${element}`} type={element} direction={direction} />
            })}
          </div>
        })
        }
      </div>
    </div>
  );
}
