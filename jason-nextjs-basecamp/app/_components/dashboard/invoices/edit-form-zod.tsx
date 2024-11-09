'use client';

import React from 'react';
import {CustomerField, InvoiceFormType} from "@/app/_lib/definitions";
import {z} from "zod";
import {updateInvoice} from "@/app/_lib/service/invoice-service";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {HtmlButton} from "@/app/_components/buttons/ButtonCollection";

const scheme = z.object({
    id:z.string(),
    customer_id: z.string().min(3, "customer id must be at least 3 characters long"),
    amount: z.number().min(0.01, "The minimal amount is 0.01").max(100000, "The max amount is 100000"),
    status: z.enum(["pending", "paid"])
});


type FormFields = z.infer<typeof scheme>;


export default function EditInvoiceFormZod({
                                               invoice,
                                               customers,
                                           }: {
                                               invoice: InvoiceFormType;
                                               customers: CustomerField[];
                                           }
) {
    // console.log(invoice);
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<FormFields>({
        defaultValues: {
            id: invoice.id,
            customer_id: invoice.customer_id,
            amount: invoice.amount,
            status: invoice.status
        },
        resolver: zodResolver(scheme), // connect zod schema to react-hook-form
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(data);
            const res = await updateInvoice(data);
            if (res?.errors) {
                throw new Error(res.message);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            setError("root", {
                type: "manual",
                message: error.message
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Invoice id */}
                <input type={"hidden"} {...register("id")}/>
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            {...register("customer_id")}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
                    </div>
                    <div id="customer-error" aria-live="polite" aria-atomic="true">
                        {errors?.customer_id &&
                            <p className="mt-2 text-sm text-red-500">
                                {errors.customer_id?.message}
                            </p>
                        }
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                {...register("amount", {
                                    required: "Please enter an amount",
                                    min: 0.01,
                                    max: 100000,
                                    valueAsNumber: true
                                })}
                                type="number"
                                step="0.01"
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="amount-error"
                            />
                            <CurrencyDollarIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div id="amount-error" aria-live="polite" aria-atomic="true">
                        {errors?.amount &&
                            <p className="mt-2 text-sm text-red-500">
                                {errors.amount?.message}
                            </p>
                        }
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    {...register("status")}
                                    type="radio"
                                    value="pending"
                                    className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Pending <ClockIcon className="h-4 w-4"/>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    {...register("status")}
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Paid <CheckIcon className="h-4 w-4"/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="status-error" aria-live="polite" aria-atomic="true">
                        {errors?.status &&
                            <p className="mt-2 text-sm text-red-500">
                                {errors.status?.message}
                            </p>
                        }
                    </div>
                </fieldset>

                <div aria-live="polite" aria-atomic="true">
                    {errors.root ? (
                        <p className="mt-2 text-sm text-red-500">{errors.root.message}</p>
                    ) : null}
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href={"/dashboard/invoices"}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <HtmlButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating ...' : 'Update Invoice'}
                </HtmlButton>
            </div>
        </form>
    );
}
