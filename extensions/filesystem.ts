

class Filesystem {

    public readPickedFile(): Uint8Array {
        return new TextEncoder().encode('Picked file contents');
    }

    public writePickedFile(data: Uint8Array): void {

    }

    public readPickedDirectory(): string[] {
        return ['file1.txt', 'file2.txt', 'subdir'];
    }

    public readFile(path: string): Uint8Array {
        return new TextEncoder().encode(`Contents of ${path}`);
    }

    public writeFile(path: string, data: Uint8Array): void {

    }

    public deleteFile(path: string): void {

    }

    public isExists(path: string): boolean {
        return true;
    }

    public readFileStats(path: string): { size: number; modifiedTime: Date } {
        return { size: 1024, modifiedTime: new Date() };
    }

}

type FileHandler = {
    error: "string" | null,
    stat: () => void,
    read: () => void,
    write: () => void,
    delete: () => void,
    close: () => void,
}

type DirectoryHandler = {
    error: "string" | null,
    readEntries: () => void,
    close: () => void,
}

class Fs {
    public pick() {

    }
    public open() {

    }
}
