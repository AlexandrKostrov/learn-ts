// import { Equal, Expect } from "../helpers/type-utils";

import { Equal, Expect } from "./type-utils";

//Extract from discriminated union

export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type ClickEvent = Extract<Event, { type: "click" }>;

//Exclude from discriminated union

export type Event2 =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type NonKeyDownEvents = Exclude<Event2, { type: "keydown" }>;

export const fakeDataDefaults = {
  String: "Default string",
  Int: 1,
  Float: 1.14,
  Boolean: true,
  ID: "id",
  obj: { String: "Default string" },
};

type FakeData = typeof fakeDataDefaults;

export type StringType = FakeData["String"];
export type IntType = FakeData["Int"];
export type FloatType = FakeData["Float"];
export type BooleanType = FakeData["Boolean"];
export type IDType = FakeData["ID"];
export type ObjStringType = FakeData["obj"]["String"];

export type Event3 =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type EventType = Event3["type"];

type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Equal, Expect } from "../helpers/type-utils";

/**
 * Some docs that might help!
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
  coolThing: { cool: "cool" },
} as const;

// you can't reasign properties of object that is declared with "as const"
programModeEnumMap.coolThing.cool = 1;
programModeEnumMap.GROUP = "PYP";

export type GroupProgram = (typeof programModeEnumMap)["GROUP"];
export type AnnouncementProgram = (typeof programModeEnumMap)["ANNOUNCEMENT"];
export type OneOnOneProgram = (typeof programModeEnumMap)["ONE_ON_ONE"];
export type SelfDirectedProgram = (typeof programModeEnumMap)["SELF_DIRECTED"];
export type PlannedOneOnOneProgram =
  (typeof programModeEnumMap)["PLANNED_ONE_ON_ONE"];
export type PlannedSelfDirectedProgram =
  (typeof programModeEnumMap)["PLANNED_SELF_DIRECTED"];

type tests2 = [
  Expect<Equal<GroupProgram, "group">>,
  Expect<Equal<AnnouncementProgram, "announcement">>,
  Expect<Equal<OneOnOneProgram, "1on1">>,
  Expect<Equal<SelfDirectedProgram, "selfDirected">>,
  Expect<Equal<PlannedOneOnOneProgram, "planned1on1">>,
  Expect<Equal<PlannedSelfDirectedProgram, "plannedSelfDirected">>
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const programModeEnumMap2 = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const;

type TProgramModeEnum = typeof programModeEnumMap2;

// export type IndividualProgram = Exclude<
//   TProgramModeEnum[keyof TProgramModeEnum],
//   "group" | "announcement"
// >;

// export type IndividualProgram = TProgramModeEnum[
//   | "ONE_ON_ONE"
//   | "SELF_DIRECTED"
//   | "PLANNED_ONE_ON_ONE"
//   | "PLANNED_SELF_DIRECTED"];

// export type IndividualProgram = TProgramModeEnum[Exclude<
//   keyof TProgramModeEnum,
//   "GROUP" | "ANNOUNCEMENT"
// >];

export type IndividualProgram = (typeof programModeEnumMap2)[Exclude<
  keyof typeof programModeEnumMap2,
  "GROUP" | "ANNOUNCEMENT"
>];

type tests3 = [
  Expect<
    Equal<
      IndividualProgram,
      "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected"
    >
  >
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const frontendToBackendEnumMap = {
  singleModule: "SINGLE_MODULE",
  multiModule: "MULTI_MODULE",
  sharedModule: "SHARED_MODULE",
} as const;

type TFrontendToBackendEnumMap = typeof frontendToBackendEnumMap;

// good solution
type BackendModuleEnum =
  TFrontendToBackendEnumMap[keyof TFrontendToBackendEnumMap];

//bad solution
// type BackendModuleEnum = TFrontendToBackendEnumMap[
//   | "multiModule"
//   | "sharedModule"
//   | "singleModule"];

type tests4 = [
  Expect<
    Equal<BackendModuleEnum, "SINGLE_MODULE" | "MULTI_MODULE" | "SHARED_MODULE">
  >
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fruits = ["apple", "banana", "orange"] as const;

type TFruits = typeof fruits;

type AppleOrBanana = TFruits[0 | 1];
type Fruit = TFruits[number];

type test5 = [
  Expect<Equal<AppleOrBanana, "apple" | "banana">>,
  Expect<Equal<Fruit, "apple" | "banana" | "orange">>
];
