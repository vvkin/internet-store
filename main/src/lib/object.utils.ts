export const makeObjectFilter =
    <T extends { [key: string]: any }>(fields: (keyof T)[]) =>
    (raw: T): Partial<T> =>
        Object.keys(raw)
            .filter((key) => fields.includes(key))
            .reduce((obj: T, key: keyof T) => {
                obj[key] = raw[key];
                return obj;
            }, {} as T);
