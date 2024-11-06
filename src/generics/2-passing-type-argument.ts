import { expect, it } from "vitest";
import { Equal, Expect } from "../type-utils";

export const createSet = <T>() => {
  return new Set<T>();
};

const stringSet = createSet<string>();
const numberSet = createSet<number>();
const unknownSet = createSet();

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createSet2 = <T = string>() => {
  return new Set<T>();
};

const numberSet2 = createSet2<number>();
const stringSet2 = createSet2<string>();
const otherStringSet = createSet2();

type tests2 = [
  Expect<Equal<typeof numberSet2, Set<number>>>,
  Expect<Equal<typeof stringSet2, Set<string>>>,
  Expect<Equal<typeof otherStringSet, Set<string>>>
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Component<TProps> {
  private props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  getProps = () => this.props;
}

const cloneComponent = <T>(component: Component<T>) => {
  return new Component(component.getProps());
};

it("Should clone the props from a passed-in Component", () => {
  const component = new Component({ a: 1, b: 2, c: 3 });

  const clonedComponent = cloneComponent(component);

  const result = clonedComponent.getProps();

  expect(result).toEqual({ a: 1, b: 2, c: 3 });

  type tests = [
    Expect<Equal<typeof result, { a: number; b: number; c: number }>>
  ];
});
