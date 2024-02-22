import clsx from "clsx";
import { Direction } from "./moveSnakeOnBoard";

export type { Direction };

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  direction: Direction;
}

const directionSign: Record<Direction, number> = {
  UP: 8593,
  DOWN: 8595,
  LEFT: 8592,
  RIGHT: 8594,
}

export function SnakeHead({ className, direction = "UP", ...rest }: React.PropsWithChildren<Props>) {
  return <div className={clsx('flex justify-center items-center border border-solid w-8 h-8 border-black', className)} {...rest}>{
    String.fromCharCode(directionSign[direction])
  }</div>

}