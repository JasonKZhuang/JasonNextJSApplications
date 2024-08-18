'use client';

import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function Search({placeholder}: { placeholder: string }) {
    // using useSearchParams to get the query parameter from the URL like ?param1=value1&param2=value2
    const searchParams = useSearchParams();
    // Iterating the search parameters
    for (const [key, value] of searchParams) {
        console.log(`[key:${key}]`,`[value:${value}]`);
    }

    const pathname = usePathname();
    console.log('pathname:', pathname);
    const {replace} = useRouter();

    // Inside the Search Component
    const handleSearch = useDebouncedCallback((term: string) => {
        // URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.
        // Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a
        const params = new URLSearchParams(searchParams);
        console.log(`term is ${term}`);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                // set the default value of the input to the query parameter, to ensure the input field is in sync with the URL
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
}