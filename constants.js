import pkg from './package.json' with { type: 'json' };
const cliName = "dockerize";
const cliVersion = pkg.version;
const cliDescription = "A command line tool to auto generate Dockerfiles for popular frameworks.";
export { cliName, cliVersion, cliDescription };