import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useStore } from "../../Store";

const range = (n: number) => Array.from(Array(n).keys());

export const BeginGameForm = () => {
  const beginGame = useStore(state => state.createGame);
  const [playerCount, setPlayerCount] = useState(7);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  return (
    <Stack direction='column' spacing={1}>
      <Typography>New Game Parameters</Typography>
      <TextField
        type='number'
        label="Player Count"
        value={playerCount}
        inputProps={{ min: 1, max: 7, step: 1 }}
        onChange={event => {
          const count = parseInt(event.target.value)
          setPlayerCount(count);
          const emptyNameArray = range(count).map(() => "");
          setPlayerNames(emptyNameArray)
        }} />
      {range(playerCount).map(n =>
        <TextField key={n}
          label={`Player ${n + 1} Name`}
          value={playerNames[n] || ""}
          onChange={event => setPlayerNames(Object.assign([], playerNames, { [n]: event.target.value as string }))}
        />)}
      <Button onClick={() => beginGame(playerNames)}>Start Game</Button>
    </Stack>
  )
}