"use server";

import React from 'react';
import {IMovie} from "@/app/_interface/movietype";
import Image from "next/image";

const imgBaseUrl ="https://image.tmdb.org/t/p/w500";

export async function getMovies(): Promise<IMovie[]> {
    const endpoint = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=9fb3bc9c879d32261412661fde3cc5dc"

    const requestOptions = {
        "method": "GET",
        "header": {
            "Content-Type": "application/json"
        },
        signal: AbortSignal.timeout(5000)
    };

    //
    const res = await fetch(endpoint, requestOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch movies.")
    }

    const data = await res.json();

    return data.results as IMovie[];

}


export default async function Page() {

    const movieData = await getMovies();
    return (
        <div className={"grid lg:grid-cols-4 sm:grid-cols-2 gap-3 m-2"}>
            {
                movieData && movieData.length > 0 && movieData.map((ele) => {
                    return (
                        <div key={`movie-${ele.id}`}
                            className={"flex flex-col justify-center items-center bg-gray-400 p-4"}
                        >
                            <span>{ele.title}</span>
                            <span>{ele.overview}</span>
                            <span>{ele.poster_path}</span>
                            <Image src={`${imgBaseUrl}${ele.poster_path}`}
                                   alt={ele.title} width={500} height={500}/>
                        </div>
                    )
                })
            }

        </div>
    );
}

