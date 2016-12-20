/**
 * Created by Charles Toller on 12/18/2016.
 */
let osc = require('osc');
class OSCConnection {
    constructor(ipAddress) {
        this.ipAddress = ipAddress;
        this.connection = new osc.UDPPort({
            localAddress:"0.0.0.0",
            localPort:53001,
            remotePort:ipAddress.indexOf(":") === -1 ? 53000:ipAddress.split(":")[1],
            remoteAddress:ipAddress.indexOf(":") === -1 ? ipAddress:ipAddress.split(":")[0]
        });
        this.connection.on("bundle",this.onBundle.bind(this));
        this.connection.on("message",this.onMessage.bind(this));
        this.connection.open();
        this.onBundleCb = null;
        this.onMessageCb = null;
    }
    onBundle(bundle,timeTag,info) {
        if(this.onBundleCb) {
            this.onBundleCb(bundle,timeTag,info);
            return;
        }
    }
    onMessage(message,timeTag,info) {
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
}
module.exports = OSCConnection;