import { Paper, Stack, Chip, Avatar } from "@mui/material";
import { useStore } from "../Store";

export const PlayerInfo = () => {
  const players = useStore(state => state.players);

  return (
    <Paper elevation={0} square sx={{ padding: 0.5, height: '2.5em' }}>
      <Stack direction='row' spacing={0.5}>
        {Object.entries(players).map(([name, color]) => (
          <Chip
            key={name}
            label={name}
            avatar={<Avatar sx={{ bgcolor: color }}> </Avatar>} />
        ))}
      </Stack>
    </Paper>
  );
}