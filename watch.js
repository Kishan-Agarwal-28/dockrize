import fs from "fs/promises";
import { getDockerFramework } from './dockerFramework.js';
import { generateDockerize } from './generateDockerize.js';
import debounce from 'lodash.debounce';
import path from "path";
import { exec } from "child_process";
import { build } from "./index.js";
import ora from "ora";
import { openTerminalAndRun } from "./spawnTerminal.js";

let previousVersion = null;

const getDockerize = async () => {
  const dockerversion=await fs.readFile(path.resolve(process.cwd(),".dockerize"))
  const dockerConfig=JSON.parse(dockerversion);
  return dockerConfig;
}

const handleFileChangeInternal = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const dockerizeConfig = JSON.parse(fileContent);

    const currentVersion = dockerizeConfig.version;

    if (currentVersion !== previousVersion) {
      if (previousVersion !== null) {
        console.log(`Version changed from ${previousVersion} to ${currentVersion}`);
        const dockerize=await getDockerize();
        const tag=dockerize.tags;
        const run=dockerize.run;
        const spinner = ora("").start();
        spinner.color = "yellow";
        await build(tag,spinner)
        if(run){

          openTerminalAndRun(run,tag);
        }
      } else {
        console.log(`Initial version: ${currentVersion}`);
      }
      previousVersion = currentVersion;
    }
  } catch (err) {
    console.warn(`⚠️ Failed to read or parse ${filePath}: ${err.message}`);
    console.log(`🔧 Attempting to generate a valid .dockerize file...`);

    try {
      const dockerFramework = await getDockerFramework();
      await generateDockerize("1.0.0", dockerFramework, new Date());
      console.log(`✅ .dockerize file generated.`);
    } catch (genErr) {
      console.error(`❌ Failed to generate .dockerize file: ${genErr.message}`);
    }
  }
};

// Debounced version: waits 5 seconds after last call
export const handleFileChange = debounce(handleFileChangeInternal, 2000);
