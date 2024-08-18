"use server";

import React from 'react';
import Breadcrumbs from "@/app/_components/dashboard/invoices/breadcrumbs";
import {fetchCustomers, fetchInvoiceById} from "@/app/_lib/service/invoice-service";
import EditInvoiceFormZod from "@/app/_components/dashboard/invoices/edit-form-zod";

export default async function EditInvoicePage(
    {params}: { params: { id: string } }
) {
    const id = params.id;

    // using Promise.all to fetch both the invoice and customers in parallel:
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);
    console.log(`invoice:${JSON.stringify(invoice)}`);
    console.log(`customers:${JSON.stringify(customers)}`);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Invoices', href: '/dashboard/invoices'},
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditInvoiceFormZod invoice={invoice} customers={customers} />
        </main>
    );
}

