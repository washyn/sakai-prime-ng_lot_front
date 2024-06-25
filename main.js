const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");


let win;
function onReady() {
    win = new BrowserWindow({
        width: 900,
        height: 700,
        title:"Sorteo de roles - Dirección de admisión",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "dist/sakai-ng/index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    win.setMenu(null);
    // win.webContents.openDevTools();

    win.on("closed", ()=> {
        win = null;
    });
}

app.on("ready", onReady);
app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", ()=>{
    if (win===null){
        onReady();
    }
});
