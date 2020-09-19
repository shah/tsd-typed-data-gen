import { path } from "./deps.ts";
import { testingAsserts as ta } from "./deps-test.ts";
import * as mod from "./mod.ts";

import testData from "./test-data.ts";

const testPath = path.relative(
  Deno.cwd(),
  path.dirname(import.meta.url).substr("file://".length),
);

const emitFileName = path.join(testPath, "mod_test.auto.json");

Deno.test(`./test-data.ts emits ${emitFileName}`, async () => {
  const generator = new mod.FileSystemEmitter(
    mod.forceExtension(".auto.json", import.meta.url),
  );
  generator.emitJSON(testData);

  ta.assertEquals(
    Deno.readTextFileSync(`${emitFileName}.golden`),
    Deno.readTextFileSync(emitFileName),
  );
});
