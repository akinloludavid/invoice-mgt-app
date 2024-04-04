import { InvoiceType } from './types'

export const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key))
}
export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key)
}

export const setLocalStorage = (
    key: string,
    data: InvoiceType[] | InvoiceType,
) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getRandomId = () => {
    return (Math.random() * 10).toString(16).replace('.', '')
}
