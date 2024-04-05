import { InvoiceType } from './types'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string)
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

export const generatePDF = (id: string) => {
    const input = document.getElementById(id) as HTMLElement
    html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            unit: 'in',
            // format: '',
            orientation: 'portrait',
        })
        pdf.addImage(imgData, 'JPEG', 0, 0.5, 8, 9, 'MEDIUM')
        pdf.save(`${id}.pdf`)
    })
}
