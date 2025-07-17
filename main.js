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

    // Close audio window when main window is closed
    mainWindow.on('closed', () => {
        if (audioWindow) {
            audioWindow.close();
        }
    });
}

let audioWindow;

function createAudioWindow() {
    audioWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    audioWindow.loadFile(path.join(__dirname, "audio.html"));
    audioWindow.on('closed', () => { audioWindow = null; });
}

app.whenReady().then(() => { // Open a app window
  createMainWindow()
  createAudioWindow();

  app.on('activate', () => { // If now window is active, open a new one
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => { // Check if user is using Mac
  if (audioWindow) {
    audioWindow.close();
  }
  if (!isMac) {
    app.quit();
  }
});