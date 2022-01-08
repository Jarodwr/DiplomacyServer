import { Box } from "@mui/material"
import { useStore } from "../Store"
import { AreaType } from "../model/Area";

export type MapUnitProps = {
  readonly areaId: string;
  readonly occupying: {
    readonly player: string;
    readonly port?: string;
  };
}

export const MapUnit: React.FC<MapUnitProps> = props => {
  const area = useStore(state => state.map.areas[props.areaId]);
  const playerColor = useStore(state => state.players[props.occupying.player]);

  const position = (area.areaType === AreaType.Land && props.occupying.port && area.ports && area.ports[props.occupying.port])
    ? area.ports[props.occupying.port].position
    : area.unitPosition;

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <Box component="path"
        sx={{
          fill: playerColor,
          stroke: 'black',
          strokeWidth: 0.75,
          transform: `scale(1.25, 1.25)`,
          filter: `brightness(120%)`
        }}
        pointerEvents='none'
        d={props.occupying.port
          //BOAT PATH
          ? "M5 12.883h3.65c2.685-.071 5.053-2.337 5-5H7.354V0C4.596-.066 2.808 3.93 2.808 3.93s1.855 3.895 4.546 3.953H0c.061 2.766 2.195 4.989 5 5z"
          //TANK PATH
          : "M0 3v2.5L2.5 7H10l2.5-1.5V3H8v-.5h2l-.5-.75h4v-1H9L8.5 0H3v2.5h1V3Z"} />
    </g>
  );
}