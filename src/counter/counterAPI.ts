
export function fetchCount(amount = 1 ) {
    return new Promise<{data : number}>(
        (resolver) => setTimeout(() => resolver({data:amount}),1000)
    );
}