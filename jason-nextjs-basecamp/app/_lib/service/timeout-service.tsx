import {setTimeout as promiseDelay} from "timers/promises";

class TimeoutService{

    private static instance: TimeoutService;

    private constructor() {
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new TimeoutService();
        return this.instance;
    }

    oldStyleMethod = () => {
        console.log('It will be printed 1-st');
        function oldStyleMethod() {
            setTimeout(() => {
                console.log('It will be printed 3-rd with delay');
            }, 5000);
        }
        oldStyleMethod();
        console.log('It will be printed 2-nd');
    }

    wrappedPromiseTimeout = async () => {
        // or wrapping timer in Promises
        console.log('It will be printed 1-st');
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('It will be printed 2-st after 3 seconds');

    }

    newStyleDelay = async () =>{
        await promiseDelay(5000);
        console.log('It will be printed 3-rd with delay');
    }

}

export default TimeoutService;