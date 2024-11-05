import { S } from "ts-toolbelt";
import { Equal, Expect } from "../type-utils";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

type ExtractPathParams<T extends string> = {
  [K in S.Split<T, "/">[number] as K extends `:${infer P}` ? P : never]: string;
};

type Test = ExtractPathParams<UserOrganisationPath>;

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface Attributes {
  id: string;
  email: string;
  username: string;
}

/**
 * How do we create a type helper that represents a union
 * of all possible combinations of Attributes?
 */
// type MutuallyExclusive<T> = {
//   [K in keyof T]: { [K2 in K]: T[K] };
// }[keyof T];

type MutuallyExclusive<T> = {
  [K in keyof T]: Record<K, T[K]>;
}[keyof T];

type ExclusiveAttributes = MutuallyExclusive<Attributes>;

type tests2 = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };

// type RoutesObject = {
//   [R in Route["route"]]: Extract<Route, { route: R }> extends {
//     search: infer S;
//   }
//     ? S
//     : never;
// };

type RoutesObject = {
  [R in Route as R["route"]]: R extends { search: infer S } ? S : never;
};

type tests3 = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": never;
        "/admin": never;
        "/admin/users": never;
      }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Partial<T> = { [K in keyof T]?: T[K] };
type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : {
      [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
    };

type MyType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: string;
        i: string;
      }[];
    };
  };
};

type Result = DeepPartial<MyType>;

const result: Result = {
  c: { d: "string", e: { f: "string", g: [undefined] } },
};

type tests4 = [
  Expect<
    Equal<
      Result,
      {
        a?: string;
        b?: number;
        c?: {
          d?: string;
          e?: {
            f?: string;
            g?: {
              h?: string;
              i?: string;
            }[];
          };
        };
      }
    >
  >
];
