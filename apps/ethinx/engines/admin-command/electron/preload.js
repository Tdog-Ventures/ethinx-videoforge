const { contextBridge, ipcRenderer } = require('electron');

// Expose protected APIs to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getVersion: () => ipcRenderer.invoke('get-version'),
  getPlatform: () => process.platform,
  
  // Window controls
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  
  // Notifications
  showNotification: (title, body) => {
    new Notification(title, { body });
  },
  
  // System
  isOnline: () => navigator.onLine,
  
  // Secure storage (placeholder for future implementation)
  secureStore: {
    set: (key, value) => ipcRenderer.invoke('secure-store-set', key, value),
    get: (key) => ipcRenderer.invoke('secure-store-get', key),
    delete: (key) => ipcRenderer.invoke('secure-store-delete', key)
  }
});

// Indicate Electron environment
window.isElectron = true;
