export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const random = (x) => Math.floor(Math.random() * x);