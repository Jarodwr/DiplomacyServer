import { Box } from "@mui/material"
import { useStore } from "../Store"
import { AreaType } from "../model/Area";

export type RetreatingMapUnitProps = {
  readonly areaId: string;
  readonly retreating: {
    readonly player: string;
    readonly port?: string;
  };
}

const offset = { x: 5, y: -5 }

export const RetreatingMapUnit: React.FC<RetreatingMapUnitProps> = props => {
  const area = useStore(state => state.map.areas[props.areaId]);
  const playerColor = useStore(state => state.players[props.retreating.player]);

  const position = (area.areaType === AreaType.Land && props.retreating.port && area.ports && area.ports[props.retreating.port])
    ? area.ports[props.retreating.port].position
    : area.unitPosition;

  return (
    <g transform={`translate(${position.x + offset.x},${position.y + offset.y})`}>
      <Box component="path"
        sx={{
          fill: playerColor,
          stroke: 'black',
          strokeWidth: 1,
          transform: `scale(1.25, 1.25)`,
          filter: `brightness(80%)`
        }}
        pointerEvents='none'
        d={props.retreating.port
          //BOAT PATH
          ? "M5 12.883h3.65c2.685-.071 5.053-2.337 5-5H7.354V0C4.596-.066 2.808 3.93 2.808 3.93s1.855 3.895 4.546 3.953H0c.061 2.766 2.195 4.989 5 5z"
          //TANK PATH
          : "M0 3v2.5L2.5 7H10l2.5-1.5V3H8v-.5h2l-.5-.75h4v-1H9L8.5 0H3v2.5h1V3Z"} />
    </g>
  );
}