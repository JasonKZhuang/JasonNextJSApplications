import {IUser} from "@/app/_interface/user-interface";
import axios, {AxiosRequestConfig} from "axios";
import {Prisma, PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';
import {User} from "@/app/_lib/definitions";

const fetchingTimeout = 2000;

class UserDataService {

    private static instance: UserDataService;
    prisma;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new UserDataService();
        return this.instance;
    }

    /**
     * Use the JavaScript Fetch() basic method
     */
    public myBasicFetching = () => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            }).catch((error) => {
            throw new Error("Failed to fetch user data");
        });
    }


    /**
     * Use the JavaScript Fetch() method
     * The fetch() method is a native JavaScript method.
     * You can use it without any external libraries or dependencies.
     * This makes it lightweight and efficient.
     *
     * using Fetch API with AbortController signal and revalidate option
     */
    public myGetUsersByFetch = async (): Promise<IUser[]> => {
        console.log("Fetching user data at " + new Date().toLocaleTimeString());
        const endpoint = "https://jsonplaceholder.typicode.com/users";
        //
        const abortController = new AbortController();
        setTimeout(() => {
            abortController.signal
        }, fetchingTimeout);
        //
        const tmpUsersRes = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache", // this is default
            // next: {
            //     revalidate: 60
            // }, // seconds
            signal: abortController.signal
        });

        if (!tmpUsersRes.ok) {
            throw new Error("Failed to fetch user data");
        }

        await new Promise((resolve) => setTimeout(resolve, fetchingTimeout));

        if (tmpUsersRes) {
            return await tmpUsersRes.json();
        }

        return [];
    }

    /**
     * using Axios to fetch data
     * @param argUserId
     */
    public myGetSingleUsersById = async (argUserId: number): Promise<IUser | null> => {
        const endpoint = `https://jsonplaceholder.typicode.com/users/${argUserId}`;

        const axiosClient = axios.create({
            baseURL: endpoint,
        });

        const config: AxiosRequestConfig = {
            headers: {
                'Accept': 'application/json',
            },
            timeout: fetchingTimeout,
        };

        try {
            const res = await axiosClient.get(endpoint, config);
            return res.data;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch single user data" + error);
        }
    }


    // ==============================================================================================================//
    // ================ Using Prisma ================================================================================//
    // ==============================================================================================================//
    /**
     * create a new user
     * @param argUser
     */
    public createUser = async (argUser: User): Promise<any> => {
        const hashedPassword = await bcrypt.hash(argUser.password, 10);
        const myUser = await this.prisma.user.create({
            data: {
                email: argUser.email,
                name: argUser.name,
                password: hashedPassword,
            },
        })
        return myUser;
    }

    /**
     * Fetch all users with their profiles
     */
    public fetchAllUsersWithProfiles = async (): Promise<any> => {
        try {
            const data = await this.prisma.user.findMany({
                include: {
                    profile: true
                }
            });
            return data;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch all users with profiles.');
        }
    }

    /**
     * Fetch user by ID which is UUID
     * @param argId
     */
    public fetchUserById = async (argId: string): Promise<any> => {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: argId,
                },
            })
            return user;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch the user by id' + argId);
        }
    }

    /**
     * Fetch user by email
     * @param argEmail
     */
    public fetchUserByEmail = async (argEmail: string): Promise<any> => {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: argEmail,
                },
            })
            return user;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch the user by email ' + argEmail);
        }
    }

    /**
     * Order users by descending ID (largest first) - the largest ID is the most recent
     * Return the first user in descending order with at least one post that has more than 100 likes
     */
    /*
    public fetchFirstUserByCondition = async (): Promise<any> => {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    posts: {
                        some: {
                            likes: {
                                gt: 100,
                            },
                        },
                    }
                },
                orderBy: {
                    id: 'desc',
                }
            })
            return user;
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch the user ');
        }
    }
    */
    /*
    public fetchUserEmailAndNameById = async (argId:string): Promise<any> => {
        const user = await this.prisma.user.findUnique({
            where: {
                id: argId,
            },
            select: {
                email: true,
                name: true,
            },
        })
    }
    */
    /*
    public updateUserNameByEmail = async (argEmail: string, argName:string): Promise<any> => {
        const updatedUser = await this.prisma.user.update({
            where: {
                email: argEmail,
            },
            data: {
                name: argName,
            },
        })
        return updatedUser;
    }
    */

    /*
    public updateMultipleUsers = async (argEmailDomain: string): Promise<any> => {
        const updatedUsers = await this.prisma.user.update({
            where: {
                email: {
                    contains: argEmailDomain,
                }
            },
            data: {
                name: 'Anonymous',
            },
        })
        return updatedUsers;
    }
    */

    /*
    public deleteUserById = async (argId: string): Promise<any> => {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id: argId,
            },
        })
        return deletedUser;
    }
    */

    /*
    public deleteUsersByContainsEmail = async (argEmailDomain: string): Promise<any> => {

        const deletedUsers = await this.prisma.user.deleteMany({
            where: {
                email: {
                    contains: argEmailDomain,
                }
            }
        })
        return deletedUsers
    }
    */

}

export default UserDataService;
