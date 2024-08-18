import {Metadata} from 'next';
import {fetchCustomers} from "@/app/_lib/service/invoice-service";
import Breadcrumbs from "@/app/_components/dashboard/invoices/breadcrumbs";
import CreateInvoiceFormByZod from "@/app/_components/dashboard/invoices/create-form-zod";

export const metadata: Metadata = {
    title: 'Create Invoice',
};

export default async function CreatePage() {

    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true,
                    },
                ]}
            />
            <CreateInvoiceFormByZod customers={customers} />
        </main>
    );
}