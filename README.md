# Utils

🚀 Powerful TypeScript utility toolkit for modern web developers

## Install

### Deno

In Deno you can either import code inside a file directly or go through an
import map.

#### Using imports (import map)

Add it to your imports:

```sh
deno add @edouardmisset/utils
```

Then import it in you files:

```ts
// The entire lib
import * as mod from '@edouardmisset/utils'

// Only selected function
import { capitalize } from '@edouardmisset/utils'
```

#### Directly in file

Import it in your file:

```ts
// The entire lib
import * as mod from 'jsr:@edouardmisset/utils'

// Or fix a specific version
import * as mod from 'jsr:@edouardmisset/utils@1.0.0'

// Only selected function
import { capitalize } from 'jsr:@edouardmisset/utils@1.0.0'
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

Feel free to report any issues on
[GitHub](https://github.com/edouardmisset/utils/issues) 🐛

[PR](https://github.com/edouardmisset/utils/pulls) welcome 🙂

## License

[MIT](./LICENSE)

## Credits

This project draws inspiration and learns from various resources and projects
that have contributed to the JavaScript and TypeScript developer community.

- [30 Seconds of Code](https://www.30secondsofcode.org/)
- [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)
- [TotalTypeScript](https://www.totaltypescript.com)
- [Deno standard library](https://jsr.io/@std)
- And many others...

I am indebted to these projects and communities for their insights, code
examples, and continuous support, which have shaped the development of this
utility package.

Thank you ⭐️
