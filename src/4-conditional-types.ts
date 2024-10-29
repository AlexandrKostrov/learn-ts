////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Equal, Expect, isNever } from "./type-utils";

type Hello = "hello";
type Goodbye = "goodbye";
type HiOrBye = Hello | Goodbye;

type YouSayGoodbyeAndISayHello<T> = T extends Hello | Goodbye
  ? T extends Hello
    ? Goodbye
    : Hello
  : never;

type Excercise = YouSayGoodbyeAndISayHello<"blalblabla">;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *** isNever typeguard usage example ***

function checkNeverTypeGuard(arg: HiOrBye) {
  if (typeof arg === "number") return true;
  if (typeof arg === "string") return false;

  isNever(arg);
}

type tests = [
  Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
  Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// ***Instead of This*** :

// function createLabel(id: number): IdLabel;
// function createLabel(name: string): NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }

// ***Use This*** :

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
}

const a = createLabel("Wayzio");
const b = createLabel(3.17);
const c = createLabel(Math.random() ? "Wayzio" : 3.12);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type GetDataValue<T> = T extends { data: any } ? T["data"] : never;
type GetDataValue2<T> = T extends { data: infer TData } ? TData : never; // Better solution

type tests2 = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValue<string>, never>>
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type Example = MyComplexInterface<
  "click",
  "window",
  "my-event",
  { x: 12; y: 14 }
>;

type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer TGetPoint>
  ? TGetPoint
  : never;

type TEst = GetPoint<Example>;

type tests3 = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { S } from "ts-toolbelt";

type Names = [
  "Matt Pocock",
  "Jimi Hendrix",
  "Eric Clapton",
  "John Mayer",
  "BB King"
];

// type GetSurname<T extends string> = S.Split<T, " ">[1];
type GetSurname<T> = T extends `${string} ${infer Surname}` ? Surname : never;

type Pocock = GetSurname<Names[0]>;

type tests4 = [
  Expect<Equal<GetSurname<Names[0]>, "Pocock">>,
  Expect<Equal<GetSurname<Names[1]>, "Hendrix">>,
  Expect<Equal<GetSurname<Names[2]>, "Clapton">>,
  Expect<Equal<GetSurname<Names[3]>, "Mayer">>,
  Expect<Equal<GetSurname<Names[4]>, "King">>
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// type InferPropsFromServerSideFunction<T extends (...args: any) => any> =
//   Awaited<ReturnType<T>>["props"];
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer TProps;
}>
  ? TProps
  : never;

type TEST = InferPropsFromServerSideFunction<typeof getServerSideProps>;

type tests5 = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

type F = typeof parser3;

// type GetParserResult<T> = T extends (args: any) => infer FunctionReturnType
//   ? FunctionReturnType
//   : T extends { parse: (args: any) => infer RParse }
//   ? RParse
//   : T extends { extract: (args: any) => infer RExtract }
//   ? RExtract
//   : never;

type GetParserResult<T> = T extends
  | (() => infer RType)
  | { parse: () => infer RType }
  | { extract: () => infer RType }
  ? RType
  : never;

type tests6 = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ###Distributive Conditional Types###

type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Fruit = "apple" | "banana" | "orange";

type InferFruit = Fruit extends infer T ? T : never;

type AppleOrBanana = Fruit extends infer T
  ? T extends "apple" | "banana"
    ? T
    : never
  : never;

type tests7 = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
