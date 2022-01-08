import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useStore } from "../Store";
import { AreaType } from "../model/Area";
import { MapArea } from "./MapArea";
import { MapUnit } from "./MapUnit";
import { RetreatingMapUnit } from "./RetreatingMapUnit";
import { PhaseEnum } from "../model/Turn";
import { OrderType } from "../model/Order";
import { StagingLine } from "./StagingLine";

const viewBox = { a: { x: 0, y: 0 }, b: { x: 610, y: 560 } }

export type MapDisplayProps = {
  readonly onAreaEnter?: (id: string) => void;
  readonly onAreaLeave?: (id: string) => void;
}

export const MapDisplay: React.FC<MapDisplayProps> = props => {
  const areas = useStore(state => state.map.areas);
  const areaEntries = useMemo(() => Object.entries(areas), [areas]);
  const phase = useStore(state => state.turn.phase);

  return (
    <svg viewBox={`${viewBox.a.x} ${viewBox.a.y} ${viewBox.b.x} ${viewBox.b.y}`}>
      {/* SHAPES */}
      {areaEntries.map(([id]) =>
        <MapArea key={id}
          id={id}
          onMouseEnter={props.onAreaEnter?.bind(null, id)}
          onMouseLeave={props.onAreaLeave?.bind(null, id)} />
      )}
      {/* RETREATING UNITS */}
      {areaEntries.map(([id, area]) =>
        <React.Fragment key={id}>
          {area.retreating &&
            <RetreatingMapUnit areaId={id} retreating={area.retreating} />}
        </React.Fragment>)}
      {/* OCCUPYING UNITS */}
      {areaEntries.map(([id, area]) =>
        <React.Fragment key={id}>
          {area.occupying &&
            <MapUnit areaId={id} occupying={area.occupying} />}
        </React.Fragment>)}
      {/* STORE */}
      {areaEntries.map(([id, area]) =>
        <React.Fragment key={id}>
          {(area.areaType === AreaType.Land || area.areaType === AreaType.Sea) &&
            area.store &&
            <Box component='circle'
              sx={{
                pointerEvents: 'none',
                fontSize: '0.5em',
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2,
              }}
              cx={area.store.x} cy={area.store.y} r={3} />}
        </React.Fragment>)}
      {/* TEXT */}
      {areaEntries.map(([id, item]) =>
        <Box component='text'
          key={id}
          sx={{ pointerEvents: 'none', fontSize: '0.5em' }}
          x={item.labelPosition.x} y={item.labelPosition.y}>
          {id}
        </Box>)}
      {/* ORDER LINES */}
      {phase.type === PhaseEnum.Order && phase.orders.map((order, index) => {
        switch (order.type) {
          case OrderType.Move: return (
            <StagingLine key={index}
              from={order.from}
              to={order.to}
              color='red'/>
          );
          case OrderType.Support: return (
            <StagingLine key={index}
              from={order.from}
              to={order.to}
              color='red'
              dotted />
          );
          case OrderType.Convoy: return (
            <React.Fragment key={index}>
              <StagingLine
                from={order.from}
                to={order.transport}
                color='green'
                dotted />
              <StagingLine
                from={order.transport}
                to={order.to}
                color='green'
                dotted />
            </React.Fragment>
          )
          default: return <React.Fragment key={index} />;
        }
      })}
    </svg>
  );
}