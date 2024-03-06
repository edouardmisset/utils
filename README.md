# Utils

This package offers a collection of utility functions written in Typescript

## Install

### Deno

Import it in your file:

```ts
// The entire lib
import * as mod from 'jsr:@edouardmisset/utils@^$MODULE_VERSION'

// Only selected function
import { capitalize } from 'jsr:@edouardmisset/utils@^$MODULE_VERSION'
```

### npm / yarn / pnpm / bun

```sh
# npm
npx jsr add @edouardmisset/utils

# yarn
yarn dlx jsr add @edouardmisset/utils

# pnpm
pnpm dlx jsr add @edouardmisset/utils

# bun
bunx jsr add @edouardmisset/utils
```

### Usage

```ts
capitalize('hello') // returns "Hello"
```

## Issues

Please report any issues on
[GitHub](https://github.com/edouardmisset/utils/issues)

[PR](https://github.com/edouardmisset/utils/pulls) welcome

## License

[MIT](./LICENSE)
