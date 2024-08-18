"use server"

import {formatCurrency} from "@/app/_lib/utils/utils";
import {CustomerField, LatestInvoice} from "@/app/_lib/definitions";
import {IInvoiceResponse} from "@/app/_interface/invoice-interface";
import {z} from 'zod';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {PrismaClient} from "@prisma/client";
import {now} from "oblivious-set";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

const FormSchema = z.object({
    id: z.string(),
    customer_id: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, {message: 'Please enter an amount greater than $0.'}),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id: false, date: true});

export type State = {
    errors?: {
        customer_id?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};


export async function fetchLatestInvoiceByPrisma(): Promise<LatestInvoice[]> {
    try {
        const data = await prisma.invoice.findMany({
                select: {
                    id: true,
                    amount: true,
                    customer: {
                        select: {
                            name: true,
                            image_url: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    date: 'desc', // Ensure 'desc' is used as a string, not an enum
                },
                take: 5, // Ensure 'take' is used for limiting results
            }
        );
        prisma.$disconnect();
        return data.map((invoice) => {
            return {
                id: invoice.id,
                amount: formatCurrency(invoice.amount),
                name: invoice.customer.name,
                image_url: invoice.customer.image_url,
                email: invoice.customer.email,
            }
        });

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchCardDataByPrisma() {
    await new Promise(r => setTimeout(r, 3000));
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        //const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const invoiceCountPromise = await prisma.invoice.aggregate({
            _count: {
                id: true
            }
        });

        // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
        const customerCountPromise = await prisma.customer.aggregate({
            _count: {
                id: true
            }
        });

        const invoiceStatusPromise = await prisma.$queryRaw`SELECT
             SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
             SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM nextjs."Invoice"`;

        // In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time.
        // For example, here, we're using Promise.all() in the fetchCardData() function:
        // By using this pattern, you can:
        //    Start executing all data fetches at the same time, which can lead to performance gains.
        //    Use a native JavaScript pattern that can be applied to any library or framework.
        // However, there is one disadvantage of relying only on this JavaScript pattern:
        // what happens if one data request is slower than all the others?
        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
        ]);
        prisma.$disconnect();

        let tmpTotalPaidInvoices = '0';
        let tmpTotalPendingInvoices = '0';
        if (data && (data as any[][])[2][0].paid) {
            tmpTotalPaidInvoices = formatCurrency(Number((data as any[][])[2][0].paid));
        }
        if (data && (data as any[][])[2][0].pending) {
            tmpTotalPendingInvoices = formatCurrency(Number((data as any[][])[2][0].pending));
        }
        const numberOfInvoices = Number(data[0]._count.id ?? '0');
        const numberOfCustomers = Number(data[1]._count.id ?? '0');
        const totalPaidInvoices = tmpTotalPaidInvoices;
        const totalPendingInvoices = tmpTotalPendingInvoices;

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

export async function fetchFilteredInvoices(query: string, currentPage: number,): Promise<IInvoiceResponse[]> {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const invoices = await prisma.$queryRaw`
          SELECT
            inv.id,
            inv.amount,
            inv.date,
            inv.status,
            cus.name,
            cus.email,
            cus.image_url
          FROM nextjs."Invoice" as inv
          JOIN nextjs."Customer" as cus ON inv."customer_id" = cus.id
          WHERE
            cus.name ILIKE ${`%${query}%`} OR
            cus.email ILIKE ${`%${query}%`} OR
            inv.amount::text ILIKE ${`%${query}%`} OR
            inv.date::text ILIKE ${`%${query}%`} OR
            inv.status ILIKE ${`%${query}%`}
          ORDER BY inv.date DESC, inv.updated_at DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        prisma.$disconnect();
        return (invoices as IInvoiceResponse[]).map((invoice) => {
            return {
                id: invoice.id,
                amount: invoice.amount,
                date: invoice.date,
                status: invoice.status,
                name: invoice.name,
                email: invoice.email,
                image_url: invoice.image_url,
            } as IInvoiceResponse
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

interface CountData {
    count: number;
}

export async function fetchInvoicesPages(query: string) {
    try {
        const countData = await prisma.$queryRaw`
        SELECT COUNT(*)
        FROM nextjs."Invoice" as inv
        JOIN nextjs."Customer" as cus ON inv."customer_id" = cus.id
        WHERE 1 = 1
          AND (
            cus.name ILIKE ${`% ${query}%`} OR
                cus.email ILIKE ${`% ${query}%`} OR
                inv.amount::text ILIKE ${`% ${query}%`} OR
                inv.date::text ILIKE ${`% ${query}%`} OR
                inv.status ILIKE ${`% ${query}%`}
            )
        `;
        prisma.$disconnect();
        return Math.ceil(Number((countData as CountData[])[0].count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchCustomers() {
    try {
        const data: CustomerField[] = await prisma.customer.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            }
        });
        prisma.$disconnect();
        return data;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function createInvoice(formData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customer_id: formData.customer_id,
        amount: formData.amount,
        status: formData.status,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const {customer_id, amount, status} = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date()
    // Insert data into the database
    // console.log(customer_id, amountInCents, status, date);
    try {
        const myInvoice = await prisma.invoice.create({
            data: {
                customer_id: customer_id,
                amount: amountInCents,
                status: status,
                date: date,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
        prisma.$disconnect();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to Create Invoice.');
    }
    // // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(formData): Promise<State | null> {
    const validatedFields = UpdateInvoice.safeParse({
        id: formData.id,
        customer_id: formData.customer_id,
        amount: formData.amount,
        status: formData.status,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const {id, customer_id, amount, status} = validatedFields.data;
    const amountInCents = amount * 100;
    const myDate = new Date()
    // console.log(id, customer_id, amountInCents, status, myDate);
    try {
        const myUpdatedInvoice = await prisma.invoice.update({
            where: {
                id: id,
            },
            data: {
                customer_id: customer_id,
                amount: amountInCents,
                status: status,
                date: myDate,
                updated_at: new Date(),
            },
        });
        prisma.$disconnect();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to Update Invoice.');
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function fetchInvoiceById(id: string) {
    try {
        const data = await prisma.invoice.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                customer_id: true,
                amount: true,
                status: true,
            },
        });
        prisma.$disconnect();
        return {
            ...data,
            amount: data.amount / 100,
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        const myDeletedObject = await prisma.invoice.delete({
            where: {
                id: id,
            },
        })
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete invoice.');
    }
    revalidatePath('/dashboard/invoices');
}
