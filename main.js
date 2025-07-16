const path = require("path");
const { app, BrowserWindow } = require("electron");

process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Cat Lover",
        width: isDev ?  1229 : 650,
        height: 700,
        frame: false, // Removes the default window frame
        autoHideMenuBar: true, // Removes the window menu bar
    });

    // Open devtools if in dev env
    if(isDev) {
        mainWindow.webContents.openDevTools();
    };

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})