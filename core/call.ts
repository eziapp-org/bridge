import ipc from "./ipc";

interface Callback {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
}

const callbacks = new Map<string, Callback>();

ipc.onMessage((event: any) => {
    const { id, result } = event.data;
    const callback = callbacks.get(id);
    if (!callback) {
        console.error(`Callback not found for id: ${id}`);
        return;
    }
    const { resolve, reject } = callback;
    if (result?.error) {
        reject(`Error: ${result.error}\n    at [native code]`);
    } else {
        resolve(result);
    }
    callbacks.delete(id);
});

let count = 0;

export function call(space: string, method: string, args: object) {
    return new Promise((resolve, reject) => {
        if (count >= Number.MAX_SAFE_INTEGER) count = 0;
        const func = `${space}.${method}`;
        const id = `${func}:${count++}`;
        callbacks.set(id, { resolve, reject });
        ipc.postMessage({ id, func, args });
    });
}
