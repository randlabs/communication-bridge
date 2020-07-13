const Messenger = require("../lib/messenger");

const Hub = new Messenger("test", function(data, origin, sendResponse) {
	sendResponse({ response: "OK" });
});
