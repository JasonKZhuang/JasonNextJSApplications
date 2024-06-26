import {IUser} from "@/app/interface/user-interface";

const fetchingTimeout = 3000;

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

    // Use the JavaScript Fetch() method
    // The fetch() method is a native JavaScript method.
    // You can use it without any external libraries or dependencies.
    // This makes it lightweight and efficient.
    myGetUserDataByFetch = async (): Promise<IUser[]> => {
        //
        const abortController = new AbortController();
        setTimeout(() => {
            abortController.signal
        }, fetchingTimeout);
        //
        const tmpUsers = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        });

        if (tmpUsers) {
            return await tmpUsers.json();
        }

        return [];
    }


    // Use the JavaScript Fetch() method
    basicFetching = () => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    }
}

export default UserDataService;
