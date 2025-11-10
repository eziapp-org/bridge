

class Filesystem {

    public readPickedFile(): Buffer {
        return Buffer.from('Picked file contents');
    }

    public writePickedFile(data: Buffer): void {

    }

    public readPickedDirectory(): string[] {
        return ['file1.txt', 'file2.txt', 'subdir'];
    }

    public readFile(path: string): Buffer {
        return Buffer.from(`Contents of ${path}`);
    }

    public writeFile(path: string, data: Buffer): void {

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
