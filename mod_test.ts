import { testingAsserts as ta } from "./deps-test.ts";
import { path } from "./deps.ts";
import type { JsonModuleOptions } from "./json-module.ts";
import * as mod from "./mod.ts";
import tdgTestData from "./typed-data-gen.test.tdg.ts";

const testPath = path.relative(
  Deno.cwd(),
  path.dirname(import.meta.url).substr("file://".length),
);

const expectedTdgJsonFileName = "typed-data-gen.test.auto.json.golden";

const emitFileName = path.join(testPath, "mod_test.auto.json");
Deno.test(`./typed-data-gen.test.tdg.ts emits ${emitFileName}`, async () => {
  const generator = new mod.FileSystemEmitter(
    mod.forceExtension(".auto.json", import.meta.url),
  );
  const writtenToFile = generator.emitJSON(tdgTestData);
  ta.assertEquals(
    Deno.readTextFileSync(expectedTdgJsonFileName),
    Deno.readTextFileSync(emitFileName),
  );
  // if we get to here, the assertion passed so remove the generated file
  Deno.removeSync(writtenToFile);
});

Deno.test(`./typed-data-gen.test.tdg.ts emits text`, async () => {
  const generator = new mod.TextEmitter();
  const emittedSrcText = generator.emitJSON(tdgTestData);

  ta.assertEquals(
    Deno.readTextFileSync(expectedTdgJsonFileName),
    emittedSrcText,
  );
});

const testJsonModuleOptionsDefault = {
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
  primaryConstName: "expected",
  primaryConstTsType: "mod.Expected",
};

Deno.test("./json-module.test-valid.json.golden matches test schema", async () => {
  const validJsonModule = new mod.JsonModule(
    {
      ...testJsonModuleOptionsDefault,
      moduleName: "test-valid.ts",
      jsonContentFileName: "json-module.test-valid.json.golden",
    },
  );

  const tsSrcDiagnostics = await validJsonModule.validate();
  ta.assertEquals(
    undefined,
    tsSrcDiagnostics,
    "This a valid JSON file, no diagnostics should be produced",
  );
});

Deno.test("./json-module.test-invalid.json.golden generates diagnostics", async () => {
  const invalidJsonModule = new mod.JsonModule(
    {
      ...testJsonModuleOptionsDefault,
      moduleName: "test-invalid.ts",
      jsonContentFileName: "json-module.test-invalid.json.golden",
    },
  );

  const tsSrcDiagnostics = await invalidJsonModule.validate();
  ta.assert(
    tsSrcDiagnostics,
    "Diagonistics should be produced for invalid JSON Schema",
  );
  const error = tsSrcDiagnostics[0];
  ta.assertEquals(5, error.start!.line);
  ta.assertEquals(
    "Type 'string' is not assignable to type 'number'.",
    error.messageText,
  );
});
