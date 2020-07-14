type ReplyCB = (response: Object) => void;

type onMessageCallback = (req: any, origin: string, sendResponse: ReplyCB) => void;

interface SendMessageOptions {
    waitForReply: boolean;
}

export class Messenger {
    constructor(channelName: string, onMessage: onMessageCallback);
    sendMessage(winContext: Window, message: Object, origin: string): void;
    sendMessage(winContext: Window, message: Object, origin: string, options: SendMessageOptions): Promise<void>;
}
