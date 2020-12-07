const Messenger = require("../lib/messenger");

const Hub = new Messenger("test", function(data, origin, source, sendResponse, bridge) {
	sendResponse({ response: "OK" });
});
