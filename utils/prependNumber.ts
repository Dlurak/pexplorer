import type { Add, Subtract } from "../types/math";
import type { IsBiggerNumber, IsEqual } from "../types/compare";

type NumberAsString<T extends number> = `${T}`;

type AppendString<T extends string, S extends string> = `${T}${S}`;

type RepeatString<
  S extends string,
  N extends number,
  Counter extends number = 0,
  TotalString extends string = "",
> = Counter extends N
  ? TotalString
  : RepeatString<S, N, Add<Counter, 1>, AppendString<TotalString, S>>;

type LengthOfString<
  T extends string,
  N extends number = 0,
> = T extends `${infer R}${infer L}` ? LengthOfString<L, Add<N, 1>> : N;

type PrependNumber<N extends number, MD extends number> = IsBiggerNumber<
  LengthOfString<NumberAsString<N>>,
  MD
> extends true
  ? NumberAsString<N>
  : IsEqual<LengthOfString<NumberAsString<N>>, MD> extends true
    ? NumberAsString<N>
    : AppendString<
        RepeatString<"0", Subtract<MD, LengthOfString<NumberAsString<N>>>>,
        NumberAsString<N>
      >;

export const prependNumber = <N extends number, MD extends number>(
  number: N,
  minDigits: MD,
) => {
  const numString = number.toString();
  const leadingZeros = Math.max(0, minDigits - numString.length);

  return `${"0".repeat(leadingZeros)}${numString}` as PrependNumber<N, MD>;
};

