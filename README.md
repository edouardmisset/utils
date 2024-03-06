# Utils

Collection of utilities functions written in Typescript

## Install

### Deno

Import it in your file:

```ts
// The entire lib
import * as mod from '@edouardmisset/utils'

// Only selected function
import { capitalize } from '@edouardmisset/utils'
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
