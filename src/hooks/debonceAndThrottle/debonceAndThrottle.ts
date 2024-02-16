export const debonce = (func: Function, wait: number) => {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args);
        }, wait);
    }
}

export const throttle = (func: Function, wait: number) => {
    let timer;
    return (...args: any[]) => {
        timer = setTimeout(() => {
            func(...args)
            timer = null
        }, wait);
    }
}