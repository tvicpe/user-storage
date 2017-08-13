export class Storage {
    static local = new Storage(localStorage);
    static session = new Storage(sessionStorage);

    constructor(private storage: any) {

    }

    set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    get(key: string): string {
        return this.storage.getItem(key);
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }

    clear(): void {
        this.storage.clear();
    }

    isSet(key: string): boolean {
        let result = true;
        if (this.get(key) === null) {
            result = false;
        }

        return result;
    }
}