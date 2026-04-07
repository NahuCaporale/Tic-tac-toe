export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>
        GAME OVER!
        {winner && (
          <span clasName="player">
            {" "}
            <br />
            {winner.name}
            <br />
            <img
              src={winner.pfp}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </span>
        )}
        <p>
          <button onClick={onRestart}>REMATCH</button>
        </p>
      </h2>
    </div>
  );
}
