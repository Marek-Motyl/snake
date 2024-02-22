import { SnakeGame } from "./Snake/SnakeGame";

export default function App() {
  return (
    <SnakeGame  dimension={10} frameRate={60} refreshRate={1.5}  />
  );
}
