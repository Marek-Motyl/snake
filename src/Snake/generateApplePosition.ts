
/**
 * Function to get position based on available space
 *
 * @param {number} size
 * @return {[number,number]}  {[x, y]}
 */
export function generatePosition(occupied: { x: number, y: number }[], gridSize: number): [number, number] {
    const getRandomCoordinate = () => Math.floor(Math.random() * gridSize);

    let newPosition: [number, number] | undefined;

    do {
        const x = getRandomCoordinate();
        const y = getRandomCoordinate();

        const isOccupied = occupied.some((segment) => segment.x === x && segment.y === y);

        if (!isOccupied) {
            newPosition = [x, y];
        }
    } while (!newPosition);

    return newPosition;
}