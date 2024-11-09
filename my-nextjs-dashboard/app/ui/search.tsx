'use client';

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from 'use-debounce';

export default function Search({placeholder}: { placeholder: string }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // console.log(searchParams);
    // console.log(pathname);
    // console.log(router);

    const handleSearch = useDebouncedCallback((argValue: string) => {
        console.log(`Searching... ${argValue}`);
        // generate a new URLSearchParams object
        const params = new URLSearchParams(searchParams);
        // deal with the query parameter
        if (argValue) {
            params.set('query', argValue);
        } else {
            params.delete('query');
        }
        // deal with the page parameter
        // every time doing a new search, reset the page no. to 1
        params.set('page', '1');
        // using useRouter() to update the URL with the new search query
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon
                className={"absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " +
                    "text-gray-500 peer-focus:text-gray-900"}/>
        </div>
    );
}