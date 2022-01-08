export enum AreaType { Land, Sea, Neutral }

export type AreaPosition = {
  readonly id: string;
  readonly port?: string;
}

export type Area =
  {
    readonly areaType: AreaType;
    readonly name: string;
    readonly adjacent: string[];
    readonly path: string;
    readonly labelPosition: { x: number; y: number; };
    readonly unitPosition: { x: number; y: number; };
    readonly store?: { x: number; y: number; }
    readonly ports?: {
      [portId: string]: {
        readonly name: string;
        readonly position: { x: number; y: number; }
        readonly adjacent: ReadonlyArray<{ id: string; port?: string; }>;
      }
    }

    //PLAYER DATA
    readonly claimedBy?: string;
    readonly occupying?: {
      readonly player: string;
      readonly port?: string;
    };
    readonly retreating?: {
      readonly player: string;
      readonly port?: string;
    }
  };