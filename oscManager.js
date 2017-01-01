/**
 * Created by Charles Toller on 12/18/2016.
 */
let instance = null;
let OSCConnection = require("./oscConnection.js");
class OSCManager {
    constructor() {
        if(!instance) {
            instance = this;
            this.connections = {};
        }
        return instance;
    }
    getConnection(ipAddress) {
        if(!this.connections[ipAddress]) {
            this.connections[ipAddress] = new OSCConnection(ipAddress);
        }
        return this.connections[ipAddress];
    }
}
module.exports = OSCManager;