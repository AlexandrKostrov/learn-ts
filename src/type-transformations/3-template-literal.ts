import { Equal, Expect } from "../type-utils";

type Route = `/${string}`;

export const goToRoute = (route: Route) => {};

// Should succeed:

goToRoute("/users");
goToRoute("/");
goToRoute("/admin/users");

// Should error:

// @ts-expect-error
goToRoute("users/1");
// @ts-expect-error
goToRoute("http://facebook.com");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";
type Routes2 = "a" | "b" | "c" | "d";

type DynamicRoutes = Extract<Routes, `/${string}/:${string}`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type BreadType = "rye" | "brown" | "white";

type Filling = "cheese" | "ham" | "salami";

type Sandwich = `${BreadType} sandwich with ${Filling}`;

type tests2 = [
  Expect<
    Equal<
      Sandwich,
      | "rye sandwich with cheese"
      | "rye sandwich with ham"
      | "rye sandwich with salami"
      | "brown sandwich with cheese"
      | "brown sandwich with ham"
      | "brown sandwich with salami"
      | "white sandwich with cheese"
      | "white sandwich with ham"
      | "white sandwich with salami"
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { S } from "ts-toolbelt";
type Path = "Users/John/Documents/notes.txt";

type SplitPath = S.Split<Path, "/">;
type PathItemsUnion = SplitPath[number];
type JoinPath = S.Join<SplitPath, "/">;

type tests3 = [
  Expect<Equal<SplitPath, ["Users", "John", "Documents", "notes.txt"]>>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

type ObjectOfKeys = Record<TemplateLiteralKey, string>;

type tests4 = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys2 = Record<Uppercase<Event>, string>;

type tests5 = [
  Expect<
    Equal<
      ObjectOfKeys2,
      {
        LOG_IN: string;
        LOG_OUT: string;
        SIGN_UP: string;
      }
    >
  >
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type UppercaseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

type Test1 = UppercaseString<"hello">;
