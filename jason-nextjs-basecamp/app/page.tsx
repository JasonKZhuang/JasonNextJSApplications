import Link from "next/link";
import styles from '@/app/_styles/home.module.css';
import {lusitana} from "@/app/_components/fonts";
import CompanyLogo from "@/app/_components/company-logo";
import Image from "next/image";
import {FaArrowRight} from "react-icons/fa";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-gray-400 p-10">
            <h1 className={"text-2xl"}>This is home page title</h1>

            <div className={"flex flex-row justify-start items-center"}>
                {/*using CSS Modules*/}
                <div className={styles.shape}/>
                <CompanyLogo/>
            </div>

            <p
                className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
                <strong>Welcome to Jason Next Camp.</strong> This is the example for the lusitana font.
            </p>

            <div className={"flex flex-col justify-start items-center md:flex-row md:justify-center md:items-start w-full"}>
                <section className={"grid grid-cols-4 gap-3 md:grid-cols-1"}>
                    <Link href={"/login"}
                          className="flex items-center gap-3 self-start rounded-lg bg-blue-500 px-6 py-3
                                     text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span> <FaArrowRight className="w-5 md:w-6"/>
                    </Link>
                    <Link href={"/dashboard"}
                          className="flex items-center gap-3 self-start rounded-lg bg-blue-500 px-6 py-3
                                     text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Dashboard</span> <FaArrowRight className="w-5 md:w-6"/>
                    </Link>
                    <Link href={"/users"}
                          className="flex items-center gap-3 self-start rounded-lg bg-blue-500 px-6 py-3
                                     text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Users</span> <FaArrowRight className="w-5 md:w-6"/>
                    </Link>
                    <Link href={"/posts"}
                          className="flex items-center gap-3 self-start rounded-lg bg-blue-500 px-6 py-3
                                     text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Posts</span> <FaArrowRight className="w-5 md:w-6"/>
                    </Link>
                    <Link href={"/products"}
                          className="flex items-center gap-3 self-start rounded-lg bg-blue-500 px-6 py-3
                                     text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Products</span> <FaArrowRight className="w-5 md:w-6"/>
                    </Link>
                </section>
                <section className="flex flex-col items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* Add Hero Images Here */}
                    <Image
                        src="/images/hero-desktop.png"
                        width={1000}
                        height={760}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                        priority={true}
                    />
                    <Image src={"/images/hero-mobile.png"}
                           width={560}
                           height={620}
                           className="block md:hidden"
                           alt={"Screenshots of the dashboard project showing mobile version"}/>
                </section>

            </div>


        </main>
    );
}
