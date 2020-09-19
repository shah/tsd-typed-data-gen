import { path } from "./deps.ts";

export const jsonStringifyIndentDefault = 2;

export function forceExtension(forceExtn: string, fileName: string): string {
  const fileUrlPrefix = "file://";
  if (fileName.startsWith(fileUrlPrefix)) {
    fileName = fileName.substr(fileUrlPrefix.length);
  }
  const extn = path.extname(fileName);
  if (extn && extn.length > 0) {
    return fileName.substr(0, fileName.length - extn.length) +
      forceExtn;
  }
  return fileName + forceExtn;
}

export interface EmittableContent {
  (): unknown;
}

export interface Emitter {
  emitJSON: (content: unknown | EmittableContent) => unknown;
}

export class StdOutEmitter implements Emitter {
  static readonly singleton = new StdOutEmitter();

  emitJSON(content: unknown | EmittableContent): void {
    const data = typeof content === "function" ? content() : content;
    const jsonText = typeof data === "string"
      ? data
      : JSON.stringify(data, null, jsonStringifyIndentDefault);
    console.log(jsonText);
  }
}

export class TextEmitter implements Emitter {
  static readonly singleton = new TextEmitter();

  emitJSON(content: unknown | EmittableContent): string {
    const data = typeof content === "function" ? content() : content;
    return typeof data === "string"
      ? data
      : JSON.stringify(data, null, jsonStringifyIndentDefault);
  }
}

export class FileSystemEmitter implements Emitter {
  constructor(
    readonly destFileName: string | ((fse: FileSystemEmitter) => string),
  ) {
  }

  emitJSON(content: unknown | EmittableContent): void {
    const data = typeof content === "function" ? content() : content;
    const jsonText = typeof data === "string"
      ? data
      : JSON.stringify(data, null, jsonStringifyIndentDefault);
    Deno.writeFileSync(
      typeof this.destFileName === "function"
        ? this.destFileName(this)
        : this.destFileName,
      new TextEncoder().encode(jsonText),
    );
  }
}

export class CliArgsEmitter implements Emitter {
  constructor(
    readonly fromSrcModuleURL: string,
    readonly defaultJsonExtn = ".auto.json",
  ) {
  }

  emitJSON(content: unknown | EmittableContent): void {
    if (Deno.args && Deno.args.length > 0) {
      new FileSystemEmitter(
        Deno.args[0] === ".json"
          ? forceExtension(this.defaultJsonExtn, this.fromSrcModuleURL)
          : Deno.args[0],
      ).emitJSON(content);
    } else {
      StdOutEmitter.singleton.emitJSON(content);
    }
  }
}
