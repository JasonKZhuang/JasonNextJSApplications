import {setTimeout as promiseDelay} from "timers/promises";
import {PrismaClient} from "@prisma/client";

class PrismaService{
    private static prismaClient:PrismaClient;

    private constructor() {
    }

     static async getInstance() {
        if (this.prismaClient) {
            return this.prismaClient;
        }
        this.prismaClient = new PrismaClient();
        await this.prismaClient.$connect()
        return this.prismaClient;
    }
}

export default PrismaService;