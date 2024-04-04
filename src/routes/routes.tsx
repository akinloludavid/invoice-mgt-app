import React, { lazy } from 'react'
import WithSuspense from '../components/WithSuspense'
import { IAppRoute } from '../utils/types'
import {
    CREATE_INVOICE,
    EDIT_INVOICE,
    HOME,
    INVOICE_DETAILS,
} from './pathnames'

const HomePage = WithSuspense(lazy(() => import('../pages/Home')))
const InvoiceDetail = WithSuspense(lazy(() => import('../pages/InvoiceDetail')))
const CreateInvoice = WithSuspense(lazy(() => import('../pages/CreateInvoice')))
const EditInvoicePage = WithSuspense(lazy(() => import('../pages/EditInvoice')))

const NotFound = WithSuspense(lazy(() => import('../pages/NotFound')))

export const AppRoutes: IAppRoute[] = [
    { path: HOME, element: <HomePage /> },
    { path: INVOICE_DETAILS, element: <InvoiceDetail /> },
    { path: CREATE_INVOICE, element: <CreateInvoice /> },
    { path: EDIT_INVOICE, element: <EditInvoicePage /> },

    { path: '*', element: <NotFound /> },
]
