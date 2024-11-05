const calc = () => {
  return "";
};

const multiply = (a: number, b: number) => {
  return a * b;
};

const getRandomData = () => {
  return Promise.resolve({ a: 1, b: 2, c: "text" });
};

type AppFunction = (...args: any) => any;

type PromiseReturnType<T> = T extends AppFunction
  ? Awaited<ReturnType<T>>
  : never;

type ReturnFunctionType = ReturnType<typeof calc>;
type FunctionParameters = Parameters<typeof multiply>;
type RandomDataReturnType = Awaited<ReturnType<typeof getRandomData>>;

//Get Object keys

const testingFrameworks = {
  vitest: {
    label: "Vitest",
  },
  jest: {
    label: "Jest",
  },
  mocha: {
    label: "Mocha",
  },
};

type ObjectKeys = keyof typeof testingFrameworks;
