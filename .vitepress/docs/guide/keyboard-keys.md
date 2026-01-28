---
prev: false
next: false
---

# Keyboard Keys

## Configuration
You can configure keyboard input using either:

- [`KeyboardKeys`](/reference/Keyboard/KeyboardKeys):\
  A flat collection of individual key constants (symbols, digits, letters). 
- [`KeyboardKeyArrays`](/reference/Keyboard/KeyboardKeyArrays):\
  Grouped key collections: digits, symbols, upper and lower letters.

Choose the one that fits your use case (single key vs. groups of keys).

## Usage
Use the imported keys directly to check key inputs:
```ts [example.ts]
import { KeyboardKeys  } from "@ogs-gmbh/ngx-utils";

if (event.key === KeyboardKeys.LOWER_A) {
  console.log("Pressed A");
}
```
