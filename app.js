/**
 * Created by Charles Toller on 12/18/2016.
 */
let express = require('express');
let app = express();
let async = require('async');
app.use("/dist",express.static("dist"));
app.use("/public",express.static("public"));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get('/:ipAddress/workspaces',(req,res)=>{
    if(req.params.ipAddress == "test") {
        res.send(JSON.stringify({
            args:[JSON.stringify({
                data:[{
                    displayName:"test",
                    uniqueID:"test"
                }]
            })]
        }));
        return;
    }
    let connection = new (require("./oscManager"))().getConnection(req.params.ipAddress);
    connection.sendMsgWithCallback("/workspaces",[],"/reply/workspaces",(message)=>{
        res.send(JSON.stringify(message));
    });
});
app.get('/:ipAddress/:workspace/cueData',(req,res)=> {
    if(req.params.ipAddress == "test" && req.params.workspace == "test") {
        res.send(JSON.stringify(require("./cues.json")));
        return;
    }
    let connection = new (require("./oscManager"))().getConnection(req.params.ipAddress);
    let newCues = [];
    let gCueLists = [];
    let currentCueList = 0;
    let currentCue = 0;
    function getCuesForCueList(cueArray,cb) {
        async.map(cueArray,(item,cb)=>{
            connection.sendMsgWithCallback("/workspace/"+req.params.workspace+"/cue_id/"+item.uniqueID+"/valuesForKeys",[JSON.stringify(["fileTarget","cueTargetNumber","preWait","postWait","duration","continueMode"])],"/reply/cue_id/"+item.uniqueID+"/valuesForKeys",(message)=>{
                let cueData = JSON.parse(message.args[0]).data;
                let thisCue = {
                    type:item.type.toLowerCase(),
                    number:item.number,
                    name:item.listName,
                    target:cueData.cueTargetNumber || (cueData.fileTarget ? cueData.fileTarget.split("/").reverse()[0]:" "),
                    preWait:cueData.preWait,
                    action:cueData.duration,
                    postWait:cueData.postWait,
                    continueMode:cueData.continueMode
                };
                if(item.type.toLowerCase() == "group") {
                    console.log("going 1 deeper with "+JSON.stringify(item));
                    getCuesForCueList(item.cues,(err,cues)=>{
                        thisCue.children = cues;
                        cb(null,thisCue);
                    });
                }
                else {
                    cb(null,thisCue);
                }
            });
        },cb);
    }
    console.log("sending /workspace/"+req.params.workspace+"/cueLists");
    connection.sendMsgWithCallback("/workspace/"+req.params.workspace+"/cueLists",[],"/reply/workspace/"+req.params.workspace+"/cueLists",(message)=>{
        let cues = JSON.parse(message.args[0]);
        async.map(cues.data,(list,cb)=>{
            getCuesForCueList(list.cues,cb);
        },(err,arr)=>{
            arr = arr.reduce((newArr,item,index)=>{
                newArr = newArr.concat([{
                    type:"memo",
                    number:"",
                    name:"Cue List: "+cues.data[index].name,
                    target:"",
                    preWait:0,
                    action:0,
                    postWait:0,
                    continueMode:0
                }]);
                newArr = newArr.concat(item);
                return newArr;
            });
            res.send(JSON.stringify(arr));
        })
    });
});
app.listen(3000);