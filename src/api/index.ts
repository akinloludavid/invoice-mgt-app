import { INVOICES_KEY } from '../utils/data'
import { getLocalStorage, getRandomId, setLocalStorage } from '../utils/helper'
import { InvoiceType, IStatus } from '../utils/types'

export const getInvoiceById = (id: string) => {
    const allInvoices = getLocalStorage(INVOICES_KEY) as InvoiceType[]
    const invoice = allInvoices.filter(invoice => invoice.id === id)[0]
    return invoice
}

export const getAllInvoices = (status: IStatus = '') => {
    const allInvoices = (getLocalStorage(INVOICES_KEY) as InvoiceType[]) || []
    console.log(allInvoices)
    if (status) {
        return allInvoices.filter(invoice => invoice.status === status)
    }
    return allInvoices
}

export const deleteInvoice = (id: string) => {
    const allInvoices = getLocalStorage(INVOICES_KEY) as InvoiceType[]
    const invoice = allInvoices.find(invoice => invoice.id === id)
    const remainingInvoices = allInvoices.filter(invoice => invoice.id !== id)
    setLocalStorage(INVOICES_KEY, remainingInvoices)
    return invoice
}

export const markAsPaid = (body: InvoiceType) => {
    const allInvoices = getLocalStorage(INVOICES_KEY) as InvoiceType[]

    const updatedInvoices = allInvoices.map((invoice: InvoiceType) =>
        invoice.id === body.id ? { ...invoice, status: 'paid' } : invoice,
    ) as InvoiceType[]

    const invoice = allInvoices.find(invoice => invoice.id === body.id)
    console.log({ invoice })
    setLocalStorage(INVOICES_KEY, updatedInvoices)
    return invoice
}

export const updateInvoice = async (body: InvoiceType) => {
    const allInvoices = getLocalStorage(INVOICES_KEY) as InvoiceType[]

    const updatedInvoices = allInvoices.map((invoice: InvoiceType) =>
        invoice.id === body.id ? body : invoice,
    ) as InvoiceType[]

    const invoice = allInvoices.find(invoice => invoice.id === body.id)
    setLocalStorage(INVOICES_KEY, updatedInvoices)
    return invoice
}

export const createInvoice = async (body: InvoiceType) => {
    const allInvoices = [
        ...getAllInvoices(),
        {
            ...body,
            createdAt: new Date().toLocaleDateString(),
            id: getRandomId(),
        },
    ]
    setLocalStorage(INVOICES_KEY, allInvoices)
    const invoice = allInvoices.find(invoice => invoice.id === body.id)

    return invoice
}
