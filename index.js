const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');

const TOOL_NAME = 'sonar-scanner'

const getOs = () => {
  switch(process.platform) {
    case 'win32':
      return 'windows'
    case 'darwin':
      return 'macosx'
    default:
      return 'linux'
  }
}

const makeUrl = (version) => {
  return `https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${version}-${getOs()}.zip`
}

const makeDirName = (version) => {
  return `${TOOL_NAME}-${version}-${getOs()}`
}

const download = async (version) => {
  const url = makeUrl(version);
  const toolPath = await tc.downloadTool(url);
  const toolExtractedPath = await tc.extractZip(toolPath);
  const cachedPath = await tc.cacheDir(toolExtractedPath, TOOL_NAME, version);
  const bin = path.join(cachedPath, makeDirName(version), 'bin');
  return bin;
}

const findInCache = (version) => {
  const dir = tc.find(TOOL_NAME, version);
  if (dir && dir.length > 0) {
    return dir;
  } else {
    return null;
  }
}

const run = async () => {
  try {
    const version = core.getInput('version', { required: true });
    let bin = findInCache(version);
    if (!bin) {
      bin = await download(version);
    }
    core.addPath(bin);
  } catch (err) {
    // setFailed logs the message and sets a failing exit code
    core.setFailed(`Action failed with error ${err}`);
  }
}

run();
