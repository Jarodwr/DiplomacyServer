import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { PlayerInfo } from "./PlayerInfo";
import { PhaseInfoBar } from "./PhaseInfoBar";
import { AreaInfo } from "./AreaInfo";
import { MapDisplay } from "./MapDisplay";
import { SidePanel } from "./SidePanel";
import { useStore } from "../Store";

export const GameMap = () => {
  const setHovered = useStore(state => state.setHovered)

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Stack direction='column'>
        <PhaseInfoBar />
        <PlayerInfo />
        <Stack direction='row' sx={{ overflow: 'hidden' }}>
          <MapDisplay
            onAreaEnter={setHovered}
            onAreaLeave={() => setHovered(undefined)} />
          <Stack direction='column' spacing={1} alignItems='stretch' sx={{ padding: 1, width: '25em' }} >
            <Paper elevation={0} sx={{ flexGrow: 1 }}>
              <SidePanel/>
            </Paper>
            <Paper elevation={0} sx={{ paddingTop: '60%', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, margin: 1 }}>
                <AreaInfo />
              </Box>
            </Paper>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}