# Typed Data Generator for Deno

This library assumes that structured data such as JSON, CSV, etc. are kept as
TypeScript `*.ts` source files and then use this `typed-data-gen` library to
generate their final formats. 

The primary benefit is that no special JSON Schema or other schema management
is necessary, all data structures are defined in TypeScript. By sticking with
TypeScript, Visual Studio Code and other TypeScript-based editors can provide
excellent syntax highlighting and error detection support.

# Usage

To use this library, first create any TypeScript file and define any arbitrary
data structures. Inside the TypeScript file, the `content` or any other 
variable can be generated organically or automatically with any level of 
complexity. Then, just `CliArgsEmitter`at the bottom of the file.

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
deno run -A https://raw.githubusercontent.com/shah/tsd-typed-data-gen/master/test-data.ts local-file.auto.json
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