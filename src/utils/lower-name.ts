export function lowerName(name: string): string {
    const split = name.includes('-') ? name.split('-') : [name];
    return split.map((name) => name.charAt(0).toLowerCase() + name.slice(1)).join('');
}
