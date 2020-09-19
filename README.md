# Typed Data Generator for Deno

This library assumes that structured data such as JSON, CSV, etc. are kept as
TypeScript `*.ts` source files and then use this `typed-data-gen` library to
generate their final formats. 

The primary benefit is that no special JSON Schema or other schema management
is necessary, all data structures are defined in TypeScript. By sticking with
TypeScript, Visual Studio Code and other TypeScript-based editors can provide
excellent syntax highlighting and error detection support.