import type { Subtract } from "./math";

export type BiggerNumber<T extends number, N extends number> = Subtract<
  T,
  N
> extends never
  ? N
  : T;

export type IsEqual<T extends number, N extends number> = T extends N
  ? true
  : false;

export type IsBiggerNumber<T extends number, N extends number> = IsEqual<
  T,
  N
> extends true
  ? false
  : Subtract<T, N> extends never
    ? false
    : true;
