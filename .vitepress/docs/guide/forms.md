# Forms

## 1. Forms Configuration
Choose how your data models should be converted into form structures (FormGroup/FormArray or plain objects).

## 2. Provide
Simply import the types you need from the library:

```typescript [example.ts]
import {
  ToFormObject,
  ToForm
} from "@ogs-gmbh/ngx-utils";
```

## 3. Usage
Use the imported types directly to create form structures:
```typescript [example.ts]
import { ToFormObject  } from "@ogs-gmbh/ngx-utils";

type User = {
  name: string;
  age?: number;
};

type UserForm = ToFormObject<User>; // => FormGroup<{ name: ToForm<string>, age?: ToForm<number> }>
```