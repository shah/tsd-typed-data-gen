import {
  serializeJS as sjs,
  serializeJsStringify as sjss,
  serializeJsTypes as sjst,
} from "./deps.ts";

// deno-lint-ignore no-explicit-any
export function isNumeric(val: any): val is number | string {
  // from: https://github.com/ReactiveX/rxjs/blob/master/src/internal/util/isNumeric.ts
  return !Array.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}

/**
 * We want JSON to look as hand-written as possible so we clean incoming
 * JSON such that strings that look like numbers are converted to non-quoted
 * numbers, etc.
 * @param value The original value in the JSON object
 * @param space Whether we want indentation
 * @param next The next object in the list
 * @param key The propery name
 */
export function cleanJS(
  value: unknown,
  space: string,
  next: sjst.Next,
  key: PropertyKey | undefined,
): string | undefined {
  if (isNumeric(value)) {
    // return unquoted numbers if a string is a number
    return value.toString();
  }
  return sjss.toString(value, space, next, key);
}

export interface SourceCode {
  readonly provenance: string | URL;
  readonly content: string;
}

export class TextFileSourceCode implements SourceCode {
  readonly content: string;

  constructor(readonly provenance: string | URL) {
    this.content = Deno.readTextFileSync(provenance);
  }
}

export interface JsonModuleImport {
  readonly denoCompilerSrcKey: string;
  readonly typeScriptImportRef: string;
  readonly importedRefSourceCode: SourceCode;
}

export interface JsonModuleOptions {
  readonly moduleName: string;
  readonly imports: JsonModuleImport[];
  readonly jsonContentFileName: string;
  readonly primaryConstName: string;
  readonly primaryConstTsType: string;
}

export class JsonModule {
  readonly jsonValue: unknown;
  readonly generatedTypeScript: string;

  constructor(
    readonly options: JsonModuleOptions,
  ) {
    this.jsonValue = JSON.parse(
      Deno.readTextFileSync(this.options.jsonContentFileName),
    );
    const sourceCode = `
    ${this.options.imports.map((i) => i.typeScriptImportRef).join("\n")};

    export const ${this.options.primaryConstName}: ${this.options.primaryConstTsType} = ${
      sjs.stringify(this.jsonValue, cleanJS, 2)
    };

    export default ${this.options.primaryConstName};`;

    // TODO: the built-in deno fmt should be used to pretty-up generated code
    this.generatedTypeScript = sourceCode;
  }

  async validate(): Promise<Deno.Diagnostic[] | undefined> {
    const moduleURL = "/" + this.options.moduleName;
    const sources: Record<string, string> = {};
    sources[moduleURL] = this.generatedTypeScript;
    for (const i of this.options.imports) {
      sources[i.denoCompilerSrcKey] = i.importedRefSourceCode.content;
    }

    const [diagnostics] = await Deno.compile(moduleURL, sources);
    return diagnostics;
  }

  persistGeneratedSrcCode(asFileName?: string): void {
    Deno.writeTextFileSync(
      asFileName || this.options.moduleName,
      this.generatedTypeScript,
    );
  }
}
