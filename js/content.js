const replaceTextByContent = (searchText, toReplace = "", type = 0, isHeader = false) => {
  let element;
  if (isHeader) {
    element = $("#navbarSupportedContent :contains('" + searchText + "')").filter(function () {
      return $(this).children(":contains('" + searchText + "')").length == 0;
    });
  } else {
    element = $(":contains('" + searchText + "')").filter(function () {
      return $(this).children(":contains('" + searchText + "')").length == 0;
    }).not("#navbarSupportedContent *");
  }
  if (type) {
    element.text(toReplace);
  } else {
    element.first().text(toReplace);
  }
}

const translationWrapper = (cb) => {
  window.addEventListener('load', cb);
}

const replaceTextBatch = (dictList, isHeader) => {
  dictList.forEach(obj => {
    replaceTextByContent(obj.key, obj.value, obj.type, isHeader)
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  translationWrapper(() => {
    try {
      replaceTextBatch(publicList, true);
    } catch (e) {
      console.log(e)
    }
  });
  const dict = {
    "translateWelcome": welcomeDict,
    "translatePin": pinDict,
    "translateHome": homeDict,
    "translateApps": appDict,
    "translateConfig": configDict,
    "translatePassword": pwdDict,
    "translateTroubleshooting": troubleshootingDict
  };
  const dictList = dict[message.action];
  if (dictList) {
    translationWrapper(() => {
      try {
        replaceTextBatch(dictList);
        const targetNode = document.querySelector('#app');
        const observer = new MutationObserver((mutationsList, observer) => {
          for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
              replaceTextBatch(dictList);
            }
          }
        });
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(targetNode, config);
      } catch (e) {
        console.log(e)
      }
    });
  }
});

const publicList = [
  { key: `Home`, value: `首页` },
  { key: `PIN`, value: `PIN配对` },
  { key: `Applications`, value: `应用管理` },
  { key: `Configuration`, value: `设置` },
  { key: `Change Password`, value: `修改密码` },
  { key: `Troubleshooting`, value: `故障排除` },
]

const welcomeDict = [
  { key: `Welcome to Sunshine`, value: `欢迎使用Sunshine！` },
  { key: `Before Getting Started, we need you to make a new username and password for accessing the Web UI`, value: `在开始之前，我们需要你设置一组新的用户名和密码以访问Web UI。` },
  { key: `The credentials below are needed to access Sunshine's Web UI`, value: `下面的凭据是访问Sunshine Web UI所必须的。` },
  { key: `Keep them safe, since`, value: `请妥善保管这些凭据，因为您将永远不会再见到它们！` },
  { key: `Username`, value: `用户名` },
  { key: `Password`, value: `密码` },
  { key: `Password (confirm)`, value: `确认密码` },
  { key: `Login`, value: `登录` },
  { key: `Success`, value: `成功！` },
  { key: `This page will reload soon`, value: `此页面即将刷新，您的浏览器将要求您输入新的凭据。` }
];

const homeDict = [
  { key: `Hello, Sunshine`, value: `欢迎使用Sunshine` },
  { key: `Sunshine is a self-hosted game stream host for Moonlight`, value: `Sunshine是一个适用于Moonlight的自托管的游戏串流服务。` },
  { key: `Loading Latest Release`, value: `正在获取最新版本...` },
  { key: `You're running the latest version of Sunshine`, value: `你正在运行的是最新版本的Sunshine` },
  { key: `Thank you for helping to make Sunshine a better software!`, value: `感谢您帮助Sunshine变得更好！` },
  { key: `Resources`, value: `相关资源` },
  { key: `Resources for Sunshine`, value: `Sunshine的一些资源！` },
  { key: `LizardByte Website`, value: `LizardByte 官网` },
  { key: `Legal`, value: `合规性` },
  { key: `By continuing to use this software you agree to the terms and conditions in the following documents`, value: `继续使用该软件即表示您同意以下文件中的条款和条件。` },
  { key: `License`, value: `协议` },
  { key: `Third Party Notice`, value: `第三方通知` },
]

const pinDict = [
  { key: `PIN Pairing`, value: `PIN配对` },
  { key: `Send`, value: `发送` },
  { key: `Make sure you have access to the client`, value: `警告！请确保您可以访问您要配对的客户端。此软件可以完全控制您的计算机，因此请小心！`, type: 1 },
  { key: `Pairing Failed`, value: `配对失败：请检查PIN输入是否正确` },
  { key: `Success! Please check Moonlight to continue`, value: `成功！请检查Moonlight以继续` },
]

const appDict = [
  { key: `Applications`, value: `应用管理` },
  { key: `Applications are refreshed only when Client is restarted`, value: `只有当客户端重启时，应用列表才会刷新` },
  { key: `Name`, value: `名称` },
  { key: `Actions`, value: `操作` },
  { key: `Add New`, value: `新增` },
  { key: `Edit`, value: `编辑` },
  { key: `Delete`, value: `删除` },
  { key: `Application Name`, value: `应用名称` },
  { key: `Application Name, as shown on Moonlight`, value: `应用名称，在Moonlight中显示` },
  { key: `The file where the output of the command is stored`, value: `命令输出结果的存储文件。如果没有指定，输出结果将被忽略` },
  { key: `Output`, value: `输出` },
  { key: `Enable/Disable the execution of Global Prep`, value: `启用/禁用此应用程序的全局预处理命令的执行` },
  { key: `Global Prep Commands`, value: `全局预处理命令` },
  { key: `Enabled`, value: `启用` },
  { key: `Disabled`, value: `禁用` },
  { key: `A list of commands to be run before/after this application`, value: `一组在此应用程序运行之前/之后运行的命令列表。` },
  { key: `If any of the prep-commands fail, starting`, value: `如果任何预处理命令失败，则应用程序启动将被中止。` },
  { key: `Command Preparations`, value: `命令预处理` },
  { key: `Add Commands`, value: `新增命令` },
  { key: `Run as Admin`, value: `以管理员权限执行` },
  { key: `Elevated`, value: `提权` },
  { key: `Detached Commands`, value: `后台命令` },
  { key: `A list of commands to be run and forgotten about`, value: `需要运行但不需要监视的命令列表` },
  { key: `main application, if it is not specified, a processs`, value: `主程序，如果没有指定，则启动一个永久休眠的进程。` },
  { key: `The working directory that should be passed to the process.`, value: `传递给进程的工作目录。例如，一些应用程序使用工作目录来搜索配置文件。如果没有设置，则Sunshine将默认设置为命令的父目录` },
  { key: `Working Directory`, value: `工作目录` },
  { key: `Run as administrator`, value: `以管理员权限运行` },
  { key: `This can be necessary for some applications that require administrator`, value: `这对于一些需要管理员权限才能正常运行的应用程序来说是必要的。` },
  { key: `Application icon/picture/image path that will be sent to client.`, value: `将在客户端显示的应用程序图标/图片/图像路径。图像必须是PNG文件。如果没有设置，则Sunshine将发送默认的图片。` },
  { key: `Find Cover`, value: `查找封面` },
  { key: `Image`, value: `封面` },
  { key: `Cancel`, value: `取消` },
  { key: `Save`, value: `保存` },
  { key: `Command`, value: `命令` },
]

const pwdDict = [
  { key: `Password Change`, value: `修改密码` },
  { key: `Current Credentials`, value: `当前凭据` },
  { key: `New Credentials`, value: `新凭据` },
  { key: `If not specified, the username will not change`, value: `留空则用户名不变` },
  { key: `Confirm Password`, value: `确认密码` },
  { key: `New Username`, value: `新用户名` },
  { key: `Username`, value: `用户名` },
  { key: `Password`, value: `密码` },
  { key: `Save`, value: `保存` },
  { key: `This page will reload soon`, value: `此页面即将刷新，您的浏览器将要求您输入新的凭据。` },
]

const troubleshootingDict = [
  { key: `Troubleshooting`, value: `故障排除` },
  { key: `Force Close`, value: `强制关闭` },
  { key: `If Moonlight complains about an app currently running`, value: `如果Moonlight报告当前有应用程序正在运行，强制关闭该应用程序可能有助于解决此问题。` },
  { key: `Restart Sunshine`, value: `重启Sunshine` },
  { key: `will terminate any running sessions`, value: `如果Sunshine无法正确运行，你可以尝试重启。这将终止所有正在运行的会话。` },
  { key: `Unpair All Clients`, value: `与所有客户端解除配对` },
  { key: `Remove all your paired devices`, value: `移除你的全部已配对设备` },
  { key: `See the logs uploaded by Sunshine`, value: `查看Sunshine的日志` },
  { key: `Logs`, value: `日志` },
]

const configDict = [
  { key: ``, value: `` },
  { key: ``, value: `` },
]



