const {exec} = require("child_process");
const util = require("util");
const path = require("path");
const os = require("os");

const env = {
  // APP_ROOT: '/Applications/HBuilderX.app/Contents/HBuilderX',
  // COMMAND_MODE: 'unix2003',
  // GRADLE_HOME: '',
  // HOME: '/Users/caoxm',
  HX_Version: '3.99.2023122611', // USED
  // JDK_PATH: '',
  // LOGNAME: 'caoxm',
  // LaunchInstanceID: '7EA64214-14AD-426E-AA61-35AF9B6926C4',
  NODE_ENV: 'production', // USED
  // NODE_SKIP_PLATFORM_CHECK: '1',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/HBuilderX.app/Contents/HBuilderX/plugins/node/node:/Applications/HBuilderX.app/Contents/HBuilderX/plugins/npm',
  QTWEBENGINE_CHROMIUM_FLAGS: '--disable-logging --disable-web-security',
  QTWEBENGINE_REMOTE_DEBUGGING: '9500',
  SECURITYSESSIONID: '186a4',
  SHELL: '/bin/zsh',
  SOURCEMAP: 'false',
  SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.BOx3LEkPq5/Listeners',
  TMPDIR: '/var/folders/9c/881k270x1d3gzh_2jq88dp680000gn/T/',
  UNI_CLOUD_SPACES: '[]',
  UNI_H5_BROWSER: 'builtin',
  UNI_HBUILDERX_LANGID: 'zh_CN',
  UNI_INPUT_DIR: '/Users/caoxm/Projects/hello-uniapp', // USED
  UNI_OUTPUT_DIR: '/Users/caoxm/Projects/hello-uniapp/unpackage/dist/build/h5', // USED
  UNI_PLATFORM: 'h5',
  USER: 'caoxm',
  USER_DATA_PATH: '/Users/caoxm/Library/Application Support/HBuilder X',
  VSCODE_NLS_CONFIG:
    '{\n    "_cacheRoot": "/Users/caoxm/Library/Caches/HBuilder X/hx-language-pack-zh-cn/languagaeCacheRoot",\n    "_languagePackId": "hx-language-pack-zh-cn",\n    "_languagePackSupport": true,\n    "_translationsConfigFile": "/Users/caoxm/Library/Caches/HBuilder X/hx-language-pack-zh-cn/languagaeCacheRoot/topic.json",\n    "locale": "zh_CN"\n}\n',
  XPC_FLAGS: '0x0',
  XPC_SERVICE_NAME: 'application.io.dcloud.HBuilderX.56205177.56208538',
  __CFBundleIdentifier: 'io.dcloud.HBuilderX',
  __CF_USER_TEXT_ENCODING: '0x1F5:0x0:0x0',
  VUE_CLI_SERVICE_CONFIG_PATH: '/Users/caoxm/Projects/hello-uniapp/vue.config.js',
  UNI_CLI_CONTEXT: '/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli',
  UNI_HBUILDERX_PLUGINS: '/Applications/HBuilderX.app/Contents/HBuilderX/plugins',
  UNI_COMPILER_VERSION: '3.99',
  UNI_APP_ID: '__UNI__7DE733C',
  UNI_APP_NAME: 'hello-uniapp',
  UNI_APP_VERSION_NAME: '1.0.0',
  UNI_APP_VERSION_CODE: '100',
  VUE_APP_DARK_MODE: 'false',
  VUE_APP_NAME: 'hello-uniapp',
  UNI_USING_V3_SCOPED: 'true',
  UNI_MP_PLUGIN_EXPORT: '[]',
  UNI_CLOUD_PROVIDER: '[]',
  UNI_SECURE_NETWORK_ENABLE: 'undefined',
  UNI_OUTPUT_DEFAULT_DIR: '/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/dist/build/h5',
  VUE_APP_PLATFORM: 'h5',
  UNI_UTS_PLATFORM: 'web',
  UNI_UTS_TARGET_LANGUAGE: 'javascript',
  BROWSERSLIST_CONFIG: '/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/package.json',
  RUN_BY_HBUILDERX: 'true',
  VUE_APP_INDEX_CSS_HASH: '2da1efab',
  VUE_APP_INDEX_DARK_CSS_HASH: 'e6047db7',
  UNI_USING_NVUE_COMPILER: 'true',
  SCOPED_SLOTS_COMPILER: 'auto',
  SLOT_MULTIPLE_INSTANCE: 'false',
  MERGE_VIRTUAL_HOST_ATTRIBUTES: 'false',
  UNI_STATISTICS_CONFIG: '""',
  UNI_STAT_UNI_CLOUD: '""',
  UNI_STAT_DEBUG: '""',
  BABEL_ENV: 'production',
  VUE_CLI_TRANSPILE_BABEL_RUNTIME: 'true',
  VUE_CLI_BUILD_TARGET: 'app',
  VUE_CLI_ENTRY_FILES: '["/Users/caoxm/Projects/hello-uniapp/main.js"]',
};

const execAsync = util.promisify(exec);

exports.build = (repoName) => {
  const systemTempFolderPath = os.tmpdir();
  return new Promise(async (resolve, reject) => {
    try {
      const APP_ROOT = path.resolve(__dirname, '../Contents/HBuilderX');
      const UNI_INPUT_DIR = path.join(systemTempFolderPath, repoName);
      const VITE_ROOT_DIR = UNI_INPUT_DIR;
      const UNI_HBUILDERX_PLUGINS = path.join(HBUILDER_DIR, 'plugins');
      const UNI_NPM_DIR = path.join(UNI_HBUILDERX_PLUGINS, 'npm');
      const UNI_NODE_DIR = path.join(UNI_HBUILDERX_PLUGINS, 'node');
      const NODE = path.join(UNI_NODE_DIR, 'node');
      const UNI_CLI = path.join(UNI_CLI_CONTEXT, 'node_modules', '@dcloudio', 'vite-plugin-uni', 'bin', 'uni.js');
      const PATH_ADDONS = process.env.PATH + `;${UNI_INPUT_DIR}/node_modules/.bin;`;
      const UNI_CLI_CONTEXT = path.resolve(__dirname, '../core/plugins/uniapp-cli');
      const PATH = `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/HBuilderX.app/Contents/HBuilderX/plugins/node/node:/Applications/HBuilderX.app/Contents/HBuilderX/plugins/npm`
      const childEnv = {
        ...process.env,
        PATH: PATH_ADDONS,
        APP_ROOT,
        HX_Version: env.HX_Version,
        UNI_INPUT_DIR: env.UNI_INPUT_DIR,
        UNI_OUTPUT_DIR: env.UNI_OUTPUT_DIR,
        UNI_CLI_CONTEXT: 
        UNI_HBUILDERX_PLUGINS,
        UNI_NPM_DIR,
        UNI_NODE_DIR,
        NODE_ENV: env.NODE_ENV,
        NODE_SKIP_PLATFORM_CHECK: env.NODE_SKIP_PLATFORM_CHECK,
        NODE
      };
      process.chdir(UNI_CLI_CONTEXT);
      const buildCommand = `"${NODE}" --max-old-space-size=2048 --no-warnings "${UNI_CLI}" build --platform app --outDir ${path.join(systemTempFolderPath, repoName + '-dist')}`
      const {stdout, stderr} = await execAsync(buildCommand, {env: {...childEnv}});
      console.error('stderr:', stderr);
      resolve(1)
    } catch (error) {
      console.error('Error during build:', error);
      reject(0)
    }
  })
}
