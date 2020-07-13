class Messenger {

	/**
	 * @callback onMessage
	 * @param {error} err
	 * @param {Object} result
	 */

	/**
	 * @typedef {Object} Request
	 * @property {Object} request Request
	 * @property {string} id Operation ID
	 * @property {string} channel Channel name
	 */

	/**
     * @callback onMessageCallback
     * @param {Request} json
	 * @param {string} origin
     * @param {sendResponse} cb
     */

	/**
     * @param {string} channelName  Channel Name
     * @param {onMessageCallback} onMessageCallback Callback function
     */

	constructor(channelName, onMessageCallback) {
		this.channelName = channelName;
		this.onMessage = onMessageCallback;

		this._installListener();

		/**
		 * @access private
		 * @typedef {Object.<string, onMessage>} RequestObject Request objects
		 * @type {RequestObject} _requests Mapping of request ids to callbacks
		 */
		this._requests = new Map();

		/**
		 * @access private
		 * @type {number} Next request id
		 */
		this._nextId = 0;

		/**
		 * @access private
		 * @type {number} Time to wait for the message response
		 */
		this._defaultTimeout = 4000;

		/**
		 * @access private
		 * @type {boolean} Its closed the listener
		 */
		this._close = false;
	}

	_installListener() {
		const that = this;

		/**
		 * @param {Window} this
		 * @param {MessageEvent} event
		 */

		this._listener = function (event) {
			// Ignore invalid messages or those after the client has closed
			if (that._closed || !event.data || typeof event.data !== 'string') {
				return;
			}

			let json;

			try {
				json = JSON.parse(event.data);
				if (!json.channel || json.channel !== that.channelName) {
					return; //invalid channel
				}
				if (typeof json.message !== 'object') {
					return; //invalid message
				}
			}
			catch (err) {
				return; //ignore malformed messages or not targetting us
			}

			// Add request callback
			if (typeof json.replyId !== 'undefined') {

				if (typeof json.replyId !== 'number' || (json.replyId % 1) !== 0) {
					return; //invalid message reply id
				}

				// if we have a message waiting for a reply, process it, else ignore
				const req = that._requests.get(json.replyId);
				if (req) {
					clearTimeout(req.timeout);

					that._requests.delete(json.replyId);

					req.resolve(json.message);
				}
			}
			else {
				if (typeof json.id !== 'number' || (json.id % 1) !== 0) {
					return; //invalid message id
				}

				// We received a message

				const channel = that.channelName;
				const replyId = json.id;
				const origin = event.origin;

				const replyMessage = function (message) {
					const request = {
						channel,
						replyId,
						message: message,
					};

					window.parent.postMessage(
						JSON.stringify(request),
						origin
					);
				};

				that.onMessage(json.message, event.origin, replyMessage);
			}
		};

		window.addEventListener("message", this._listener);
	}

	/**
	 *
	 * @param {Window} win Window context destination
	 * @param {Object} message Object Message
	 * @param {string} origin Origin
	 * @param {Object} options Object Message
	 * @returns {Promise<any>} Returns
	 */
	sendMessage(win, message, origin, options) {
		// Prepare message
		const request = {
			channel: this.channelName,
			id: this.getNextId(),
			message: message,
		};

		if (options && options.waitForReply && !this._close) {
			const that = this;

			return new Promise(function (resolve, reject) {
				//set a timeout if a response is not received
				const timeout = setTimeout(function() {
					const req = that._requests.get(request.id);
					if (req) {
						that._requests.delete(request.id);

						reject(new Error('Timeout expired for the message response'));
					}
				}, options && options.timeout ? options.timeout : that._defaultTimeout);

				that._requests.set(request.id, {
					timeout,
					resolve
				});

				win.postMessage(
					JSON.stringify(request),
					origin
				);
			});

		}
		win.postMessage(
			JSON.stringify(request),
			origin
		);
	}

	/**
	 * @description Close client connection
	 */

	close() {
		window.removeEventListener('message', this._listener);
		this._close = true;
	}

	/**
	 * @access private
	 */

	getNextId() {
		this._nextId += 1;
		return this._nextId;
	}
}

module.exports = Messenger;
