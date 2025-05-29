import {
  intro,
  outro,
  isCancel,
  cancel,
  select,
  confirm,
  text,
} from "@clack/prompts";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ora from "ora";
import { exec } from "child_process";
import { generateDockerize } from "./generateDockerize.js";
import { openTerminalAndRun } from "./spawnTerminal.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fcpy = async (framework, dest) => {
  try {
    const src = path.resolve(__dirname, "templates", framework);
    const files = await fs.readdir(src);
    for (const file of files) {
      const from = path.resolve(src, file);
      const to = path.resolve(dest, file);
      await fs.copyFile(from, to);
    }
    return true;
  } catch (error) {
    throw new Error(`Failed to copy files: ${error.message}`);
  }
};

export const build = async (tag, spinner,needRun,run) => {
  return new Promise((resolve, reject) => {
    exec(`docker --version`, (err) => {
      if (err) {
        spinner.fail("Docker is not installed or not running ❌");
        return reject(new Error(err.message));
      }
      spinner.text = `Building Docker image with tag "${tag}"...`;
      exec(`docker build -t ${tag} .`, (err, stdout, stderr) => {
        if (err) {
          spinner.fail("Docker build failed ❌");
          return reject(new Error(err.message));
        }
        spinner.succeed("Docker build completed successfully ✅");
        if(needRun){
          if(run){
          openTerminalAndRun(run,tag);
        }
        }
        console.log(stdout);
        resolve();
      });
    });
  });
};

export const init = async () => {
  intro(`dockerize`);

  const framework = await select({
    message: "Choose your framework",
    options: [
      { value: "angular", label: "Angular" },
      { value: "express", label: "Express" },
      { value: "nextjs", label: "Next.js" },
      { value: "nuxt", label: "Nuxt" },
      { value: "preact", label: "Preact" },
      { value: "react", label: "React" },
      { value: "remix", label: "Remix" },
      { value: "solid", label: "Solid" },
      { value: "svelte", label: "Svelte" },
      { value: "vue", label: "Vue" },
    ],
  });

  const needBuild = await confirm({
    message: "Do you want us to build the image?",
  });

  let tag;
  if (needBuild) {
    tag = await text({
      message: "Enter the tag name for the image:",
    });
  }
  const needRun = await confirm({
    message: "Do you want us to run the image for you on each change?",
  });
  const runCommand = await text({
    message: "Enter the command to run the image:",
  });
  if (
    isCancel(framework) ||
    isCancel(tag) ||
    isCancel(needBuild) ||
    isCancel(needRun) ||
    isCancel(runCommand)
  ) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  outro(`You're all set!`);

  const spinner = ora("Initializing...").start();
  spinner.color = "yellow";

  try {
    await fcpy(framework, process.cwd());
    await generateDockerize("1.0.0", framework, new Date(), tag, runCommand);
    if (needBuild && tag) {
      spinner.start();
      await build(tag.toString(), spinner,needRun,runCommand);
    }
    spinner.succeed("Initialization complete ✅");
  } catch (err) {
    spinner.fail("Initialization failed ❌");
    console.error("Error:", err.message || err);
    process.exit(1);
  }
};
