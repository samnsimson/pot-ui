import { revalidateTag, unstable_cache } from "next/cache";

export const cached = <T>(keys: Array<string | number>, callback: (...args: any[]) => Promise<T>) => {
    const key = keys.map((k) => String(k));
    return unstable_cache(callback, [...key], { tags: [...key] });
};

export const revalidate = (...keys: Array<string | number>) => {
    keys.forEach((key) => {
        revalidateTag(String(key));
    });
};
