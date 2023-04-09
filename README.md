[![Minified size][npm-size]][npm-url]&nbsp;&nbsp;
[![Version][npm-version]][npm-url]&nbsp;&nbsp;
[![Typescript][npm-typescript]][npm-url]&nbsp;&nbsp;
[![License][github-license]][github-license-url]&nbsp;&nbsp;

**Easy to use React.js useLocalStorage hook for updating and subscribing to localStorage keys**

Value for the given key will be in sync across different hook calls, components and tabs. Thats all.

![Q1Qnv1xaUj](https://user-images.githubusercontent.com/39832865/230778477-5480378a-5f89-451b-bafe-b4e1e34bb00f.gif)

```ts
import useLocalStorage from "use-loc-storage";

// Signature
type useLocalStorageFn = (key: string, initialValue?: string) => [string | null, (newValue: string) => void, () => void];

const [
  value,  // value of the given key
  setValue, // set the value
  clear // remove the key from localStorage
] = useLocalStorage('key','optional initial value');
```

[npm-url]: https://www.npmjs.com/package/use-loc-storage
[npm-version]: https://img.shields.io/npm/v/use-loc-storage
[github-license]: https://img.shields.io/npm/l/use-loc-storage
[github-license-url]: https://github.com/doganhekimoglu/uselocalstorage/blob/master/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/use-loc-storage
[npm-size]: https://img.shields.io/bundlephobia/min/use-loc-storage