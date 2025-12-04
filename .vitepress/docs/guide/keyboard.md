# Keyboard

## 1. Keyboard Configuration
You can configure keyboard input using either:
### KeyboardKeys
A flat collection of individual key constants (symbols, digits, letters). 

### KeyboardKeyArrays
Grouped key collections: digits, symbols, upper and lower letters.

Choose the one that fits your use case (single key vs. groups of keys).

## 2. Provide
Simply import the key collections you need from the library:

```typescript [example.ts]
import { KeyboardKeyArrays, KeyboardKeys } from "@ogs-gmbh/ngx-utils";
```

## 3. Usage
Use the imported keys directly to check key inputs:
```typescript [example.ts]
import { KeyboardKeys  } from "@ogs-gmbh/ngx-utils";

if (event.key === KeyboardKeys.LOWER_A) {
  console.log("Pressed A");
}
```