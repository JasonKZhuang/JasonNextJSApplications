import {IUser} from "@/app/_interface/user-interface";
import axios, {AxiosRequestConfig} from "axios";

const fetchingTimeout = 2000;

class UserDataService {

    private static instance: UserDataService;

    private constructor() {
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
        const endpoint ="https://jsonplaceholder.typicode.com/users";
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




}

export default UserDataService;
