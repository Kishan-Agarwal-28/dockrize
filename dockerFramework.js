import fs from "fs/promises";
import path from "path";
import yaml from "yaml";

export const getDockerFramework = async () => {
  try {
    const dockerVersion = await fs.readFile(
      path.resolve(process.cwd(), "docker-compose.yml"),
      "utf8"
    );
    const dockerCompose = yaml.parse(dockerVersion);
    const dockerFramework = Object.keys(dockerCompose.services)[0] || "unknown";
    return dockerFramework;
  } catch (err) {
    throw new Error(`Failed to read .dockerversion file: ${err.message}`);
  }
};
