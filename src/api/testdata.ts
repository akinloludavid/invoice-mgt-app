import { InvoiceType } from '../utils/types'

export const testInvoice: InvoiceType = {
    id: '1',
    paymentDue: '2024-04-06',
    description: 'Web design',
    paymentTerms: 1,
    clientName: 'PZ Consulting',
    clientEmail: 'client@pz.com',
    createdAt: new Date().toLocaleDateString(),

    status: 'pending',
    senderAddress: {
        street: '5, Ayomikun Abass, ',
        city: 'Yaba',
        postCode: '223322',
        country: 'Nigeria',
    },
    clientAddress: {
        street: '22, Ajayi Cresent',
        city: 'Osapa',
        postCode: '224433',
        country: 'Nigeria',
    },
    paymentDetails: {
        bankAccountNumber: '9034224432',
        bankName: 'Sterling Bank',
        accountName: 'Richard Cypher',
    },
    items: [{ name: 'string', quantity: 2, price: 2000, total: 4000 }],
}
