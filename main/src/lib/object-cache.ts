type ObjectCacheInner<T> = {
    [key: string]: T;
};

export class ObjectCache<T> {
    private cache: ObjectCacheInner<T> = {};

    clear(): void {
        this.cache = {};
    }

    empty(): boolean {
        return Object.keys(this.cache).length === 0;
    }

    replace(cache: ObjectCacheInner<T>): void {
        this.cache = cache;
    }

    set(key: string, value: T): void {
        this.cache[key] = value;
    }

    get(key: string): T {
        return this.cache[key];
    }
}
