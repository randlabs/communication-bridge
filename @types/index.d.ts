type ReplyCB = (response: Object) => void;

type onMessageCallback = (req: any, origin: string, source: Window, sendResponse: ReplyCB, bridge: Messenger) => void;

interface SendMessageOptions {
    waitForReply: boolean;
}

export default class Messenger {
    constructor(channelName: string, onMessage: onMessageCallback);
    sendMessage(winContext: Window, message: Object, origin: string): void;
    sendMessage(winContext: Window, message: Object, origin: string, options: SendMessageOptions): Promise<void>;
    close(): void;
}
