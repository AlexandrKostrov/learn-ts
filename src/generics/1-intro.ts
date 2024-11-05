import { it, expect } from "vitest";
import { Equal, Expect } from "../type-utils";

const returnWhatIPassIn = <T>(t: T) => {
  return t;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const returnWhatIPassIn2 = <T extends string>(t: T) => t;

it("Should ONLY allow strings to be passed in", () => {
  const a = returnWhatIPassIn2("a");

  type test1 = Expect<Equal<typeof a, "a">>;

  // @ts-expect-error
  returnWhatIPassIn2(1);

  // @ts-expect-error
  returnWhatIPassIn2(true);

  // @ts-expect-error
  returnWhatIPassIn2({
    foo: "bar",
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const returnBothOfWhatIPassIn = <A extends string, B extends number>(
  a: A,
  b: B
) => {
  return {
    a,
    b,
  };
};

it("Should return an object of the arguments you pass", () => {
  const result = returnBothOfWhatIPassIn("a", 1);

  expect(result).toEqual({
    a: "a",
    b: 1,
  });

  type test1 = Expect<
    Equal<
      typeof result,
      {
        a: "a";
        b: 1;
      }
    >
  >;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const returnBothOfWhatIPassIn2 = <A, B>(params: { a: A; b: B }) => {
  return {
    first: params.a,
    second: params.b,
  };
};

it("Should return an object where a -> first and b -> second", () => {
  const result = returnBothOfWhatIPassIn2({
    a: "a",
    b: 1,
  });

  expect(result).toEqual({
    first: "a",
    second: 1,
  });

  type test2 = Expect<
    Equal<
      typeof result,
      {
        first: string;
        second: number;
      }
    >
  >;
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Component<TProps> {
  private props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  getProps = () => this.props;
}

it("Should create an object containing props", () => {
  const component = new Component({ a: 1, b: 2, c: 3 });

  const result = component.getProps();

  expect(result).toEqual({ a: 1, b: 2, c: 3 });

  type tests = [
    Expect<Equal<typeof result, { a: number; b: number; c: number }>>
  ];
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type TUser = { firstName: string; lastName: string };
export const concatenateFirstNameAndLastName = <T extends TUser>(user: T) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

it("Should add fullName to an object which only contains firstName and lastName", () => {
  const users = [
    {
      firstName: "Matt",
      lastName: "Pocock",
    },
  ];

  const newUsers = users.map(concatenateFirstNameAndLastName);

  expect(newUsers).toEqual([
    {
      firstName: "Matt",
      lastName: "Pocock",
      fullName: "Matt Pocock",
    },
  ]);

  type tests = [
    Expect<
      Equal<
        typeof newUsers,
        Array<{ firstName: string; lastName: string } & { fullName: string }>
      >
    >
  ];
});

it("Should retain other properties passed in", () => {
  const users = [
    {
      id: 1,
      firstName: "Matt",
      lastName: "Pocock",
    },
  ];

  const newUsers = users.map(concatenateFirstNameAndLastName);

  expect(newUsers).toEqual([
    {
      id: 1,
      firstName: "Matt",
      lastName: "Pocock",
      fullName: "Matt Pocock",
    },
  ]);

  type tests = [
    Expect<
      Equal<
        typeof newUsers,
        Array<
          { id: number; firstName: string; lastName: string } & {
            fullName: string;
          }
        >
      >
    >
  ];
});

it("Should fail when the object passed in does not contain firstName", () => {
  const users = [
    {
      firstName: "Matt",
    },
  ];

  const newUsers = users.map(
    // @ts-expect-error
    concatenateFirstNameAndLastName
  );
});
