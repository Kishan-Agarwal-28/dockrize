import { spawn } from "child_process";
import os from "os";

let currentProcess = null;

export function openTerminalAndRun(ogcommand,tag) {
  let command;

if (ogcommand.includes("--name")) {
  // Extract the value after '--name'
  const nameMatch = ogcommand.match(/--name\s+(\S+)/);
  const name = nameMatch ? nameMatch[1] : tag; // fallback to tag

  command = `docker rm -f ${name} && ${ogcommand}`;
} else {
  const modifiedCommand = ogcommand.replace(
    /docker\s+run/,
    `docker run --name ${tag}`
  );

  command = `docker rm -f ${tag} && ${modifiedCommand}`;
}

console.log(command);

  
  console.log(`Running command: ${command}`);
  const platform = os.platform();

  // Kill existing process if it's still running
  if (currentProcess && !currentProcess.killed) {
    console.log("Stopping previous process...");
    try {
      if (platform === "win32") {
        spawn("taskkill", ["/pid", currentProcess.pid.toString(), "/f", "/t"]);
      } else {
        currentProcess.kill("SIGTERM");
      }
    } catch (err) {
      console.warn(`Failed to kill previous process: ${err.message}`);
    }
  }

  if (platform === "win32") {
    currentProcess = spawn("cmd.exe", ["/c", command], {
      detached: true,
      stdio: "inherit",
    });
  } else if (platform === "darwin" || platform === "linux") {
    currentProcess = spawn("bash", ["-c", command], {
      detached: true,
      stdio: "inherit",
    });
  } else {
    console.error(`Unsupported platform: ${platform}`);
    return;
  }

  console.log(`Started new process with PID: ${currentProcess.pid}`);
}
