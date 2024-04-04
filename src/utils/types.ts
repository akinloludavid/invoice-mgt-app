import React from 'react'

export interface IChildren {
    children: React.ReactNode
}
export interface IAppRoute {
    path: string
    element: React.ReactNode
}

export type IStatus = 'pending' | 'paid' | 'draft' | ''

export interface ICreateInvoice {
    setShowCreateInvoice: (e: boolean) => void
    id?: string
    invoice?: Record<string, any>
}

export interface IFormList {
    name: string
    quantity: string | number
    price: string | number
    total: string | number
}

export interface InvoiceType {
    id?: string
    createdAt?: string
    paymentDue: string
    description: string
    paymentTerms: 1
    clientName: string
    clientEmail: string
    status: IStatus
    senderAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    clientAddress: {
        street: string
        city: string
        postCode: string
        country: string
    }
    items: IFormList[]
    total?: string | number
}
