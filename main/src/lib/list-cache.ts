export class ListCache<T> {
    private cache: T[] = [];

    clear(): void {
        this.cache = [];
    }

    replace(cache: T[]): void {
        this.cache = cache;
    }

    push(entry: T): void {
        this.cache.push(entry);
    }

    empty(): boolean {
        return this.cache.length === 0;
    }

    get(index: number): T {
        return this.cache[index];
    }

    getAll(): T[] {
        return this.cache.slice();
    }
}
