import {WiCloudyGusts} from "react-icons/wi";
import {lusitana} from "@/app/_components/fonts";

export default function CompanyLogo() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
            <WiCloudyGusts className="h-12 w-12 rotate-[15deg]"/>
            <p className="text-[44px]">Company Name</p>
        </div>
    );
}
