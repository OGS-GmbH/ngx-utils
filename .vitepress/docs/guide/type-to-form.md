---
prev: false
next: false
---

# Type to Form

You can create a recursive form with any common data structure. Either from `Array` to `FormArray`, `Object` to `FormGroup`, or just primitive Values to a `FormControl.

In the following example, we will convert a `Object` to a `FormGroup`.

```typescript [example.ts]
import { ToFormObject  } from "@ogs-gmbh/ngx-utils";

type User = {
  name: string;
  age?: number;
};

type UserForm = ToFormObject<User>;
/*
 * Will result in the follwing:
 * FormGroup<{
 *   name: ToForm<string>,
 *   age?: ToForm<number>
 * }>
 */
```
