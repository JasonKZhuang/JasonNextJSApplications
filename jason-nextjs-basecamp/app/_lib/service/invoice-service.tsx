import {formatCurrency} from "@/app/_lib/utils/utils";
import {LatestInvoice} from "@/app/_lib/definitions";
import {PrismaClient} from "@prisma/client";
import {IInvoiceResponse} from "@/app/_interface/invoice-interface";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 6;

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
        const latestInvoices: LatestInvoice[] = data.map((invoice) => {
            return {
                id: invoice.id,
                amount: formatCurrency(invoice.amount),
                name: invoice.customer.name,
                image_url: invoice.customer.image_url,
                email: invoice.customer.email,
            }
        });

        return latestInvoices;

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
          ORDER BY inv.date DESC
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
        const totalPages = Math.ceil(Number((countData as CountData[])[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}


/*
export async function fetchInvoiceById(id: string) {
    try {
        const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

        const invoice = data.rows.map((invoice) => ({
            ...invoice,
            // Convert amount from cents to dollars
            amount: invoice.amount / 100,
        }));

        return invoice[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

*/
