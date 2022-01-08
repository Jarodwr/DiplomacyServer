import { Stack, Typography } from "@mui/material";
import React from "react";
import { useStore } from "../Store";
import { AreaType } from "../model/Area";

export const AreaInfo: React.FC = () => {
  const hoveredAreaId = useStore(state => state.view.hoveredArea);
  const area = useStore(state => state.view.hoveredArea ? state.map.areas[state.view.hoveredArea] : undefined);

  const areaTypeText = React.useMemo(
    () => {
      switch (area?.areaType) {
        case AreaType.Land: return "Land";
        case AreaType.Sea: return "Sea";
        case AreaType.Neutral: return "Neutral";
      }
    },
    [area?.areaType]
  );
  return (
    <React.Fragment>
      {area &&
        <Stack direction='column'>
          <Typography variant='subtitle1'>
            [{hoveredAreaId?.toUpperCase()}] {area.name}
          </Typography>
          <Typography variant='caption'>
            Area Type: {areaTypeText} {area.areaType === AreaType.Land && area.store &&
              ', Store'}
          </Typography>
          {area.areaType === AreaType.Land && area.claimedBy &&
            <Typography variant='caption'>
              Claimed By: {area.claimedBy}
            </Typography>
          }
          {area.occupying &&
            <Typography variant='caption'>
              Occupied By: {area.occupying.player}{area.occupying.port && ` (${area.occupying.port})`}
            </Typography>}
          {area.areaType === AreaType.Land && area.ports && Object.entries(area.ports).length > 0 &&
            <React.Fragment>
              <Typography variant='caption'>Ports: </Typography>
              {Object.entries(area.ports).map(([id, portInfo]) =>
                <Typography key={id} variant='caption'>
                  - [{id}] {portInfo.name}
                </Typography>)}
            </React.Fragment>}
        </Stack>}
    </React.Fragment>
  );
}