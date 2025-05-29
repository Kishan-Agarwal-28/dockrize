import fs from "fs/promises";
export const generateDockerize = async (
  version,
  framework,
  date,
  tags,
  runCommand
) => {
  const dockerizeConfig = {
    template: framework,
    package: "dockerize",
    version: version,
    license: "MIT",
    author: "Cosmology is fun!",
    timestamp: date.toISOString(),
    tags: tags,
    run: runCommand,
  };
  fs.writeFile(".dockerize", JSON.stringify(dockerizeConfig, null, 2), "utf8");
};
