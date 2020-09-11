type ReplyCB<V> = (res: V) => void;

type onMessageCallback<T, V> = (req: T, origin: string, source: Window, sendResponse: ReplyCB<V>, bridge: Messenger<T,V>) => void;

interface sendMessageOptions {
    waitForReply?: boolean;
    origin?: string;
    timeout?: number;
}

export default class Messenger<Request, Response> {
    constructor(channelName: string, onMessage?: onMessageCallback<Request,Response>);
    sendMessage(winContext: Window, message: Request, options?: sendMessageOptions): Promise<Response>;
    close(): void;
}
