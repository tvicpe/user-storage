// Type definitions for Storage
// Project: UserStorage
// Definitions by: tomsa.md


/*~ If this module is a UMD module that exposes a global variable 'myClassLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */

// export as namespace Storage;

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */

declare class Storage {
    public static local: Storage;
    public static session: Storage;

    constructor(storage: any);

    public set(key: string, value: string): void;

    public get(key: string): string;

    public remove(key: string): void;

    public clear(): void;

    public isSet(key: string): boolean;
}

export {Storage};
