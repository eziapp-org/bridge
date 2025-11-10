class Ipc {
    private webview: any;
    constructor() {
        // @ts-ignore
        if (window.chrome?.webview) {
            // @ts-ignore
            this.webview = window.chrome.webview;
            // @ts-ignore
            delete window.chrome.webview;
        } else {
            document.head.innerHTML = "";
            document.body.innerHTML = "<h2>Ezi ipc not supported in this environment.</h2>";
            throw new Error("Ipc not supported");
        }
    }

    public postMessage(message: any) {
        this.webview.postMessage(message);
    }

    public onMessage(callback: (event: any) => void) {
        this.webview.addEventListener("message", callback);
    }
}

export default new Ipc();