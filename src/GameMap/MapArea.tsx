import React from "react";
import { Box } from "@mui/material";
import { useStore } from "../Store";
import { AreaType } from "../model/Area";

export type MapAreaProps = {
  readonly id: string;
  readonly onMouseEnter?: () => void;
  readonly onMouseLeave?: () => void;
}

export const MapArea: React.FC<MapAreaProps> = props => {
  const area = useStore(state => state.map.areas[props.id])
  const players = useStore(state => state.players)

  const fill = React.useMemo(
    () => {
      switch (area.areaType) {
        case AreaType.Land:
          return area.claimedBy
            ? players[area.claimedBy]
            : '#ffd';
        case AreaType.Sea:
          return '#9cf';
        case AreaType.Neutral:
          return 'transparent';
      }
    },
    [area, players]
  );

  return (
    <Box component='path'
      sx={{
        fill, stroke: 'black',
        ':hover': { filter: 'brightness(90%)' }
      }}
      d={area.path}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave} />
  );
}