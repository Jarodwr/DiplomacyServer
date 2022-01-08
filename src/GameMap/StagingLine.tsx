import React from "react";
import { Box } from "@mui/material";
import { AreaPosition } from "../model/Area"
import { useStore } from "../Store";

export type StagingLineProps = {
  readonly from: AreaPosition;
  readonly to: AreaPosition;
  readonly dotted?: boolean;
  readonly color?: string;
}

export const StagingLine: React.FC<StagingLineProps> = props => {
  const areas = useStore(state => state.map.areas);

  const from = areas[props.from.id];
  const to = areas[props.to.id]

  const fromPos = (props.from.port && from.ports) ? from.ports[props.from.port].position : from.unitPosition;
  const toPos = (props.to.port && to.ports) ? to.ports[props.to.port].position : to.unitPosition;
  const rotation = Math.atan2((fromPos.x - toPos.x), (fromPos.y - toPos.y)) * 180 / Math.PI
  return (
    <React.Fragment>
      <Box component="polyline"
        points={`${fromPos.x},${fromPos.y} ${toPos.x},${toPos.y}`}
        stroke={props.color}
        pointerEvents="none"
        sx={{
          strokeWidth: 4,
          strokeDasharray: props.dotted ? "5" : undefined,
          strokeLinecap: "round"
        }} />
      <g transform={`translate(${toPos.x},${toPos.y}) rotate(${-rotation + 45}) `}>
        <Box component="polyline"
          points={`7.5,0 0,0 0,7.5`}
          stroke={props.color}
          pointerEvents="none"
          sx={{
            fill: 'transparent',
            strokeWidth: 5,
            strokeLinecap: "round"
          }} />
      </g>
    </React.Fragment>
  );
}