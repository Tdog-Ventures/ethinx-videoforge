const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');

// Keep references to prevent garbage collection
let mainWindow = null;
let tray = null;

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#000000',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    frame: true,
    titleBarStyle: 'default',
    autoHideMenuBar: true,
    show: false, // Don't show until ready
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create system tray
  createTray();
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'tray-icon.png');
  const trayIcon = nativeImage.createFromPath(iconPath);
  
  tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open ETHINX',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    {
      label: 'Dashboard',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.executeJavaScript("window.location.href = '/dashboard'");
      }
    },
    { type: 'separator' },
    {
      label: 'Status: Online',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('ETHINX Executive Portal');
  tray.setContextMenu(contextMenu);
  
  tray.on('double-click', () => {
    mainWindow.show();
    mainWindow.focus();
  });
}

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

// Security: Prevent new windows
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event) => {
    event.preventDefault();
  });
});
