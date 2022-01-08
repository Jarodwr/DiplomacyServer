import {
  BuildOrder,
  ConvoyOrder,
  DisbandOrder,
  HoldOrder,
  MoveOrder,
  RetreatOrder,
  SupportOrder
} from "./Order"

export enum SeasonEnum { Spring = 'Spring', Fall = 'Fall' }
export enum PhaseEnum { Order, Resolve, Retreat, Disband, Build }

export type OrderPhase = {
  readonly type: PhaseEnum.Order;
  readonly orders: (HoldOrder | MoveOrder | SupportOrder | ConvoyOrder)[]
}

export type ResolvePhase = {
  readonly type: PhaseEnum.Resolve;
}

export type RetreatPhase = {
  readonly type: PhaseEnum.Retreat;
  readonly orders: RetreatOrder[]

}
export type DisbandPhase = {
  readonly type: PhaseEnum.Disband;
  readonly orders: DisbandOrder[]
}

export type BuildPhase = {
  readonly type: PhaseEnum.Build;
  readonly orders: BuildOrder[];
}

export type SpringTurn = {
  readonly year: number
  readonly season: SeasonEnum.Spring,
  readonly phase: OrderPhase | ResolvePhase | RetreatPhase | DisbandPhase
}

export type FallTurn =
  {
    readonly year: number
    readonly season: SeasonEnum.Fall,
    readonly phase: OrderPhase | ResolvePhase | RetreatPhase | DisbandPhase | BuildPhase
  }

export type Turn = SpringTurn | FallTurn