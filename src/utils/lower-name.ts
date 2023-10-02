export function lowerName(name: string): string {
    const split = name.includes('-') ? name.split('-') : [name];
    const firstElement = split.splice(0, 1)[0];
    return (
        firstElement.charAt(0).toLowerCase() +
        firstElement.slice(1) +
        split.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join('')
    );
}
