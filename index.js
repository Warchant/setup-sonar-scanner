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

const needArchSuffix = (version) => {
  const [major, minor] = version.split('.').map(Number);
  return major > 6 || (major === 6 && minor >= 1);
}

const makeUrl = (version, arch) => {
  const archSuffix = needArchSuffix(version) ? `-${arch}` : '';
  return `https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${version}-${getOs()}${archSuffix}.zip`
}

const makeDirName = (version, arch) => {
  const archSuffix = needArchSuffix(version) ? `-${arch}` : '';
  return `${TOOL_NAME}-${version}-${getOs()}${archSuffix}`
}

const download = async (version, arch) => {
  const url = makeUrl(version, arch);
  const toolPath = await tc.downloadTool(url);
  const toolExtractedPath = await tc.extractZip(toolPath);
  const cachedPath = await tc.cacheDir(toolExtractedPath, TOOL_NAME, version);
  return path.join(cachedPath, makeDirName(version, arch), 'bin');
}

const findInCache = (version, arch) => {
  const archParam = needArchSuffix(version) ? arch : undefined;
  const dir = tc.find(TOOL_NAME, version, archParam);
  if (dir && dir.length > 0) {
    return dir;
  } else {
    return null;
  }
}

const run = async () => {
  try {
    const version = core.getInput('version', { required: true });
    const arch = core.getInput('arch', { required: true });
    let bin = findInCache(version, arch);
    if (!bin) {
      bin = await download(version, arch);
    }
    core.addPath(bin);
  } catch (err) {
    // setFailed logs the message and sets a failing exit code
    core.setFailed(`Action failed with error ${err}`);
  }
}

run();
