const { app, BrowserWindow } = require('electron');
const path = require('path');
var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
    console.log(stdout)
}

const bytenode = require("bytenode");

bytenode.compileFile("src/render.js", "src/render.jsc");

var AutoLaunch = require('auto-launch');
var autoLauncher = new AutoLaunch({
    name: "MyApp"
});
const  {machineId, machineIdSync} = require('node-machine-id') ;

require("@electron/remote/main").initialize();
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
require('v8-compile-cache');
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  require("@electron/remote/main").enable(mainWindow.webContents);
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

 // exec("wmic CPU get ProcessorId", puts);
let t=machineIdSync()
 console.log("iddddd  "+ t);
 
};

async function getMachineId() {
  let id = await machineId();
  return  id
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
autoLauncher.isEnabled().then(function(isEnabled) {
  if (isEnabled) return;
   autoLauncher.enable();
}).catch(function (err) {
  throw err;
});
 
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
