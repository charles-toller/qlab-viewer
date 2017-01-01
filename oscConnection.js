/**
 * Created by Charles Toller on 12/18/2016.
 */
let vmodule = require('vmodule');
vmodule('serialport',{},{global:true});
let osc = require('osc');
class OSCConnection {
    constructor(ipAddress) {
        this.ipAddress = ipAddress;
        this.connection = new osc.TCPSocketPort({
            localAddress:"0.0.0.0",
            localPort:53000,
            port:ipAddress.indexOf(":") === -1 ? 53000:ipAddress.split(":")[1],
            address:ipAddress.indexOf(":") === -1 ? ipAddress:ipAddress.split(":")[0]
        });
        this.connection.on("bundle",this.onBundle.bind(this));
        this.connection.on("message",this.onMessage.bind(this));
        this.connection.on("error",(err)=>{
            console.error(err);
        });
        this.connection.open();
        this.onBundleCb = null;
        this.onMessageCb = null;
        this.callbacks = {};
    }
    onBundle(bundle,timeTag,info) {
        if(this.onBundleCb) {
            this.onBundleCb(bundle,timeTag,info);
            return;
        }
    }
    onMessage(message,timeTag,info) {
        if(this.callbacks[message.address]) {
            this.callbacks[message.address](message,timeTag,info);
        }
        if(this.onMessageCb) {
            this.onMessageCb(message,timeTag,info);
            return;
        }
    }
    sendMsg(address,args) {
        this.connection.send({
            address,
            args
        });
    }
    sendMsgWithCallback(address,args,callbackAddress,cb) {
        this.callbacks[callbackAddress] = cb;
        this.sendMsg(address,args);
    }
}
module.exports = OSCConnection;