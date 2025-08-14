export function roundUpDecimals(value: number) {
    return +value.toFixed(8)
}

export function formatResult(num: number) {
    const str = String(num)
    if (str.length > 9) {
        return num.toExponential(4)
    }
}