import {PrismaClient} from "@prisma/client";
import TimeoutService from "@/app/_lib/service/timeout-service";
import PrismaService from "@/app/_lib/database/prisma-service";

const prisma = new PrismaClient();
export async function fetchRevenueByPrisma() {
    try {

        // Artificially delay a response for demo purposes.
        // await TimeoutService.getInstance().newStyleDelay(1000);
        console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await prisma.revenue.findMany();
        //console.log('Data fetch completed after 3 seconds.', data);
        prisma.$disconnect();
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}