import { Equal, Expect } from "../type-utils";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ###Mapping over union type###

type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = { [R in Route]: R };
type RoutesObject2 = { [index in string]: string };

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": "/";
        "/about": "/about";
        "/admin": "/admin";
        "/admin/users": "/admin/users";
      }
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttrKey = keyof Attributes;

type AttributeGetters = {
  [K in keyof Attributes]: () => Attributes[K];
};

type tests2 = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters2 = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};

type tests3 = [
  Expect<
    Equal<
      AttributeGetters2,
      {
        getFirstName: () => string;
        getLastName: () => string;
        getAge: () => number;
      }
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

type FilterKeys<T> = {
  [K in keyof T]: K extends `${string}${"Id" | "id"}${string}` ? K : never;
}[keyof T];

// type OnlyIdKeys<T> = {
//   [K in FilterKeys<T>]: T[K];
// };

type OnlyIdKeys<T> = {
  [K in keyof T as K extends `${string}${"Id" | "id"}${string}`
    ? K
    : never]: T[K];
};

type TestOK = OnlyIdKeys<Example>;

type tests4 = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Route2 =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

// type RoutesObject3 = {
//   [R in Route2["route"]]: Extract<Route2, { route: R }>["search"];
// };

type RoutesObject3 = {
  [R in Route2 as R["route"]]: R["search"];
};

type tests5 = [
  Expect<
    Equal<
      RoutesObject3,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];

type tests6 = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples,
      ["email", string] | ["firstName", string] | ["lastName", string]
    >
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface FruitMap {
  apple: "red";
  banana: "yellow";
  orange: "orange";
}

type TransformedFruit = {
  [K in keyof FruitMap]: `${K}:${FruitMap[K]}`;
}[keyof FruitMap];

type tests7 = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

// type TransformedFruit2Prep = {
//   [R in Fruit as R["name"]]: `${Extract<Fruit, R>["name"]}:${Extract<
//     Fruit,
//     R
//   >["color"]}`;
// };
// type TransformedFruit2 = TransformedFruit2Prep[keyof TransformedFruit2Prep];

type TransformedFruit2 = {
  [R in Fruit as R["name"]]: `${R["name"]}:${R["color"]}`;
}[Fruit["name"]];

type tests8 = [
  Expect<
    Equal<TransformedFruit2, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
