export function myGetRandomInt(min: number, max: number): number {
    // Ensure min is less than max
    if (min > max) {
        throw new Error("min should be less than or equal to max");
    }

    // Math.floor and Math.random logic to get a random integer between min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function myGetRandomIntBoundary(max: number): number {
    return Math.floor(Math.random() *max);
}