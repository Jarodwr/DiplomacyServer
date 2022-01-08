import { AreaPosition } from "./Area"

export enum OrderType { Hold, Move, Support, Convoy, Retreat, Build, Disband }

export type HoldOrder = 
{
  readonly type: OrderType.Hold;
  readonly area: string;
}

export type MoveOrder =
{
  readonly type: OrderType.Move;
  readonly from: AreaPosition;
  readonly to: AreaPosition;
}

export type SupportOrder = 
{
  readonly type: OrderType.Support;
  readonly action: OrderType.Move | OrderType.Hold
  readonly from: AreaPosition;
  readonly to: AreaPosition;
}

export type ConvoyOrder = 
{
  readonly type: OrderType.Convoy;
  readonly transport: AreaPosition;
  readonly from: AreaPosition;
  readonly to: AreaPosition;
}

export type RetreatOrder = 
{
  readonly type: OrderType.Retreat;
  readonly from: AreaPosition;
  readonly to: AreaPosition;
}

export type DisbandOrder = 
{
  readonly type: OrderType.Disband;
  readonly area: string;
}

export type BuildOrder = 
{
  readonly type: OrderType.Build;
  readonly location: AreaPosition;
}