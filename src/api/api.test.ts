import { createInvoice, getAllInvoices, getInvoiceById } from '.'
import { testInvoice } from './testdata'

jest.spyOn(Storage.prototype, 'setItem')
jest.spyOn(Storage.prototype, 'getItem')
jest.spyOn(Storage.prototype, 'removeItem')

Storage.prototype.setItem = jest.fn()
Storage.prototype.getItem = jest.fn()
Storage.prototype.removeItem = jest.fn()
/**
 * @jest-environment jsdom
 */
describe('test local storage api functions', () => {
    it('creates new invoice and saves to local storage', () => {
        const newInvoice = createInvoice(testInvoice)
        expect(newInvoice).not.toBe(null)
    })
    it('gets all the invoices from local storage', () => {
        const invoices = getAllInvoices()
        expect(invoices.length).toBe(1)
    })
    it('gets invoice from local storage by id', () => {
        const invoice = getInvoiceById('1')
        expect(invoice).not.toBe(null)
    })
})
