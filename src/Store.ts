import { Draft, produce } from 'immer';
import create from 'zustand';
import { combine } from 'zustand/middleware';

import mapData from './data/standard-variant.json'
import { AreaType } from './model/Area';
import { MapData } from './model/MapData';
import { SeasonEnum, PhaseEnum, Turn } from './model/Turn';

const initial = {
  turn: {
    year: 1901,
    season: SeasonEnum.Spring,
    phase: {
      type: PhaseEnum.Order,
      orders: [
        // {
        //   type: OrderType.Convoy,
        //   from: { id: "bud" },
        //   to: { id: "cly" },
        //   transport: { id: "tys" },
        // }
      ]
    }
  } as Turn,
  view: {
    hoveredArea: undefined as (string | undefined)
  },
  map: mapData as MapData,
  players: {} as { [name: string]: string }
}

export const useStore = create(
  combine(
    initial,
    oldSet => {
      const set = (fn: (state: Draft<typeof initial>) => void) =>
        oldSet(produce<typeof initial>(fn));

      return ({
        setHovered: (area?: string) => set(state => { state.view.hoveredArea = area; }),
        createGame: (playerNames: ReadonlyArray<string>) => set(state => {
          const setup = state.map.playerSetup[playerNames.length];

          const shuffledPlayerFactions = setup.players
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

          for (let i = 0; i < playerNames.length; i++) {
            const playerName = playerNames[i]
            const availableFactions = shuffledPlayerFactions[i];
            const firstAvailableFaction = state.map.factions[availableFactions[0]];

            state.players[playerName] = firstAvailableFaction.color;

            for (const factionName of availableFactions) {
              const faction = state.map.factions[factionName];

              for (const claimedAreaId of faction.claimedAreas) {
                const area = state.map.areas[claimedAreaId]
                if (area.areaType === AreaType.Land) {
                  area.claimedBy = playerName;
                }
              }

              for (const position of faction.areasOccupied) {
                state.map.areas[position.id].occupying = {
                  player: playerName,
                  port: position.port
                };
              }
            }
          }
        })
      })
    }
  )
)