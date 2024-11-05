import { Equal, Expect } from "../type-utils";

type ReturnWhatIPassIn<T> = T;

type TNull = Record<1, 2>;

type tests = [
  Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
  Expect<Equal<ReturnWhatIPassIn<"1">, "1">>,
  Expect<Equal<ReturnWhatIPassIn<true>, true>>,
  Expect<Equal<ReturnWhatIPassIn<false>, false>>,
  Expect<Equal<ReturnWhatIPassIn<null>, null>>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Maybe<T> = T | null | undefined;

type tests2 = [
  Expect<Equal<Maybe<string>, string | null | undefined>>,
  Expect<Equal<Maybe<number>, number | null | undefined>>,
  Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
  Expect<Equal<Maybe<null>, null | undefined>>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

type tests3 = [
  Expect<Equal<AddRoutePrefix<"">, "/">>,
  Expect<Equal<AddRoutePrefix<"about">, "/about">>,
  Expect<Equal<AddRoutePrefix<"about/team">, "/about/team">>,
  Expect<Equal<AddRoutePrefix<"blog">, "/blog">>,
  //   @ts-expect-error
  AddRoutePrefix<boolean>,
  // @ts-expect-error
  AddRoutePrefix<number>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type CreateDataShape<TData, TError> = {
  data: TData;
  error: TError;
};

type tests4 = [
  Expect<
    Equal<
      CreateDataShape<string, TypeError>,
      {
        data: string;
        error: TypeError;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<number, Error>,
      {
        data: number;
        error: Error;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type MaybeError = Error | undefined;

type CreateDataShape2<TData, TError extends MaybeError = undefined> = {
  data: TData;
  error: TError;
};

type tests5 = [
  Expect<
    Equal<
      CreateDataShape2<string>,
      {
        data: string;
        error: undefined;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type GetParametersAndReturnType<T extends (...args: any) => any> = {
  params: Parameters<T>;
  returnValue: ReturnType<T>;
};

type tests6 = [
  Expect<
    Equal<
      GetParametersAndReturnType<() => string>,
      { params: []; returnValue: string }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(s: string) => void>,
      { params: [string]; returnValue: void }
    >
  >,
  Expect<
    Equal<
      GetParametersAndReturnType<(n: number, b: boolean) => number>,
      { params: [number, boolean]; returnValue: number }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// T extends {} - set constraint on T that T should be thruthy
export type Maybe2<T extends {}> = T | null | undefined;

type tests7 = [
  // @ts-expect-error
  Maybe2<null>,
  // @ts-expect-error
  Maybe2<undefined>,

  Maybe2<string>,
  Maybe2<false>,
  Maybe2<0>,
  Maybe2<"">
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type NonEmptyArray<T> = [T, ...T[]];

export const makeEnum = (values: NonEmptyArray<string>) => {};

makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// @ts-expect-error
makeEnum([]);
