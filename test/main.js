const Messenger = require("../lib/messenger");

const client = new Messenger("test", function(data, origin, reply) {
	console.log(data, origin);
});

const frame = document.getElementById("blue");

if (frame && frame.contentWindow) {
	frame.onload = (event) => {
		client.sendMessage(frame.contentWindow, {
			hello: "world"
		}, '*', { waitForReply: true })
		.then((value) => {
			console.log(value);
		});
	};
};
