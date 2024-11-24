export default function Log({ gameTurns }) {
  console.log("gameturns", gameTurns);
  return (
    <ol id="log">
      {gameTurns.map((turn, turnIndex) => {
        return (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player} selected {turn.square.row} {turn.square.col}
          </li>
        );
      })}
    </ol>
  );
}