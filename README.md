# Typed Data Generator (TDG) for Deno

This library assumes that structured data such as JSON, CSV, etc. are kept as
TypeScript `*.ts` source files and then use this `typed-data-gen` library to
generate their final formats. 

The primary benefit is that no special JSON Schema or other schema management
is necessary, all data structures are defined in TypeScript. By sticking with
TypeScript, Visual Studio Code and other TypeScript-based editors can provide
excellent syntax highlighting and error detection support.

You can create either `*.ts` files that generate `*.json` files or, you can 
use existing `*.json` files with companion `*.ts` schema files that can
validate any existing JSON files with any structure that TypeScript natively
supports.

# Usage - TypeScript that generates JSON

To use this library to generate valid, type-safe JSON, first create any 
TypeScript file and define any arbitrary data structures. Inside the TypeScript
file, the `content` or any other variable can be generated organically or
automatically with any level of complexity. Then, just add `CliArgsEmitter`at 
the bottom of the file.

```javascript
import * as typedDataGen from "https://denopkg.com/shah/tsd-typed-data-gen/mod.ts";

export interface HomePage {
  hero: HeroContent[];
  sections: Section[];
  whyMedigyTitle: string;
  whyMedigyDescription: string;
  whyMedigyButton: string;
}

const content: HomePage = {
  hero: [...],
  sections: [...],
  whyMedigyTitle: someFunctionResult(...),
  whyMedigyDescription:  // multi-line templates are OK too
    `Medigy is crowd-sourced and peer network-based. Buyers 
     get access to rich content about the digital health products 
     they’re looking for. Influencers have a new place to build and
     engage with a community around their areas of expertise.`,
  whyMedigyButton: "Why Medigy?",
};

if (import.meta.main) {
  new typedDataGen.CliArgsEmitter(import.meta.url).emitJSON(content);
}
```

Assuming the file is called `my-data.ts` then you can do the following to emit
the typed data as JSON to STDOUT:

```
deno run -A my-data.ts 
```

It's even more powerful when the source data is at another location:

```
deno run -A https://raw.githubusercontent.com/shah/tsd-typed-data-gen/master/test-data.tdg.ts local-file.auto.json
```

Or, you can have it default it to a regular file with the same name at the same
location if it's on the local file system (note that there's a space between 
the `my-data.ts` and .json CLI argument):

```
deno run -A my-data.ts .json
```

The above will create `my-data.auto.json` to indicate that it's automatically
generated JSON and shouldn't be edited directly.


Or, you can have it default it to a regular file with a different name:

```
deno run -A my-data.ts another-name.json
```

# Usage - JSON that can use TypeScript to verify its schema

Sometimes the source JSON cannot be modified but we want to verify that JSON
content matches a TypeScript Schema. The TDG library allows for what we call
a "JSON Module".

Assume we want to verify that a JSON file matches the following interface,
in a file called `json-module.test-schema.ts`:

```typescript
export interface Expected {
  readonly text: string;
  readonly numeric: number;
}
```

Here's how we can easily validate it:

```typescript
const validJsonModule = new JsonModule(
  {
    imports: [
      {
        denoCompilerSrcKey: "/json-module.test-schema.ts",
        typeScriptImportRef:
          `import type * as mod from "./json-module.test-schema.ts"`,
        importedRefSourceCode: new mod.TextFileSourceCode(
          "./json-module.test-schema.ts",
        ),
      },
    ],
    moduleName: "invalid.auto.ts",
    jsonContentFileName: "invalid.json",
    primaryConstName: "expected",
    primaryConstTsType: "mod.Expected",
  },
);

const tsSrcDiagnostics = await validJsonModule.validate();
if(tsSrcDiagnostics) {
  // if validate returns diagnostics it means the JSON file does not
  // match our expected interface. 
  console.log(Deno.formatDiagnostics(tsSrcDiagnostics));
}
```

If you ran the above code on JSON that looks like this, in a file called
`invalid.json`:

```json
{
  "text": "text value",
  "numeric": "bad number"
}
```

You would see this error:

```bash
 TS2322 [ERROR]: Type 'string' is not assignable to type 'number'.
  numeric: 'bad number'
  ~~~~~~~
    at /test-invalid.ts:6:3

    The expected type comes from property 'numeric' which is declared here on type 'Expected'
      readonly numeric: number;
               ~~~~~~~
        at /json-module.test-schema.ts:3:12
```

The way the error is generated is that the TDG JSON Module library simply
creates a dynamic TypeScript file, compiles it, and shows the resulting
errors. Here's what the interim `*.ts` file looks like:

```typescript
import type * as mod from "./json-module.test-schema.ts";

export const expected: mod.Expected = {
  text: 'text value',
  numeric: 'bad number'
};

export default expected;
```

The JSON Modules feature allows you to use the full power of TypeScript to
validate a JSON file against a verifiable structure instead of having to rely 
on less reliable strategies such as JSON Schema.