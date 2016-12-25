/**
 * Created by Charles on 12/24/2016.
 */
//Start the servers
require("./app.js");
const {app, BrowserWindow} = require('electron');
let win = null;
app.on('ready',()=>{
    win = new BrowserWindow();
    win.loadURL("http://localhost:3000");
});