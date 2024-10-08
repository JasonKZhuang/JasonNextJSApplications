"use server";

import React, {Suspense} from 'react';
import {lusitana} from "@/app/_components/fonts";
import Search from "@/app/_components/dashboard/invoices/search";
import {InvoicesTableSkeleton} from "@/app/_components/dashboard/skeletons";
import {fetchInvoicesPages} from "@/app/_lib/service/invoice-service";
import {CreateInvoiceButton} from "@/app/_components/buttons/ButtonCollection";
import InvoicesTable from "@/app/_components/dashboard/invoices/table";
import InvoicePagination from "@/app/_components/dashboard/invoices/invoicePagination";

export default async function InvoicesPage({searchParams}: {
    searchParams?: {
        query?: string,
        page?: string,
    }
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);
    // console.log(`totalPages:${totalPages}`);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoiceButton/>
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <InvoicesTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <InvoicePagination totalPages={totalPages}/>
            </div>
        </div>
    );
}