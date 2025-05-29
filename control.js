#!/usr/bin/env node

import { Command } from "commander";
import { cliName, cliVersion, cliDescription } from "./constants.js";
import chokidar from "chokidar";
import path from "path";
import { init } from "./index.js";
import { handleFileChange } from "./watch.js";

const program = new Command();

program
  .name(cliName)
  .version(cliVersion)
  .description(cliDescription)
  .option("-w, --watch", "Watch files for changes")
  .option("--init", "generate the docker files for the framework");

program.parse(process.argv);
const options = program.opts();

if (options.watch) {
  const fileToWatch = path.resolve(process.cwd(), ".dockerize");
  console.log(`Watching "${fileToWatch}" for changes...`);

  const watcher = chokidar.watch(fileToWatch, {
    persistent: true,
    ignoreInitial: false,
  });
  watcher
    .on("add", handleFileChange)
    .on("change", handleFileChange)
    .on("error", (error) => {
      console.error("Watcher error:", error);
    });
} else if (options.init) {
  init();
} else {
  program.help();
}
