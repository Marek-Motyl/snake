import { BoardElementBlank } from "./BoardElementBlank";
import { Direction, SnakeHead } from "./SnakeHead";

export enum BoardElementType {
  "HEAD",
  "BODY",
  "APPLE",
  "EMPTY"
}

interface Props {
  type: BoardElementType;
  direction: Direction;
}


export function BoardElement({ type, direction }: Props) {
  switch (type) {
    case BoardElementType.HEAD:
      return <BoardElementBlank className="text-red-700"><SnakeHead direction={direction} /></BoardElementBlank>
    case BoardElementType.BODY:
      return <BoardElementBlank >*</BoardElementBlank>
    case BoardElementType.APPLE:
      return <BoardElementBlank className="text-green-600">@</BoardElementBlank>
    default:
      return <BoardElementBlank>&nbsp;</BoardElementBlank>
  }
}