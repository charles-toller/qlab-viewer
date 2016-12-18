/**
 * Created by Charles Toller on 12/18/2016.
 */
let express = require('express');
let app = express();
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.get('/cueTable.css',(req,res)=>{
    res.sendFile(__dirname+"/cueTable.css");
});
app.listen(3000);