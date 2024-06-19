export function isDigitString(str: string): boolean {
    const regex = /^\d+$/;
    return regex.test(str);
}