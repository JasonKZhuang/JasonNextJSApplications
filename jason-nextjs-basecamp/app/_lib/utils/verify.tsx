export function myIsDigitString(str: string): boolean {
    const regex = /^\d+$/;
    return regex.test(str);
}