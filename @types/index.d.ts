type ReplyCB = (response: Object) => void;

type onMessageCallback = (req: any, origin: string, source: Window, sendResponse: ReplyCB, bridge: Messenger) => void;

interface SendMessageOptions {
    waitForReply?: boolean;
    origin?: string;
    timeout?: number;
}

export default class Messenger {
    constructor(channelName: string, onMessage?: onMessageCallback);
    sendMessage(winContext: Window, message: any, options?: SendMessageOptions): Promise<any>;
    close(): void;
}
