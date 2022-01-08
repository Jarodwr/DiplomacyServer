import { Area } from "./Area";
import { PlayerSetup } from "./PlayerSetup";

export type MapData = {
  readonly areas: { [areaId: string]: Area };
  readonly factions: {
    [factionName: string]: {
      readonly color: string;
      readonly claimedAreas: ReadonlyArray<string>,
      readonly areasOccupied: ReadonlyArray<{
        readonly id: string;
        readonly port?: string;
      }>
    }
  };
  readonly playerSetup: { [playerCount: number]: PlayerSetup };
}