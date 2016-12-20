/**
 * Created by Charles Toller on 12/18/2016.
 */
let express = require('express');
let app = express();
app.use("/dist",express.static("dist"));
app.use("/public",express.static("public"));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get('/:ipAddress/workspaces',(req,res)=>{
    let connection = new (require("./oscManager"))().getConnection(req.params.ipAddress);
    connection.onMessageCb = (message) => {
        res.send(JSON.stringify(message));
    };
    connection.sendMsg("/workspaces");
});
app.get('/:ipAddress/:workspace/cueData',(req,res)=> {
    let connection = new (require("./oscManager"))().getConnection(req.params.ipAddress);
    connection.onMessageCb = (message) => {
        console.log(message);
    };
    connection.sendMsg("/workspaces");
    res.send("nothing");
});
app.listen(3000);