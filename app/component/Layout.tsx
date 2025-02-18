"use client"
import {JSX} from "react";
import {useForecast} from "@/hook/useForecast";

export default function Layout():JSX.Element {
    const {term, setTerm, weatherData, loading, handleSearch} = useForecast();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        // console.log(term);
    }

    return <div className="flex justify-center items-center w-full h-[100vh] bg-sky-600">
        <section className="bg-white bg-opacity-20 backdrop-blur-ls drop-shadow-lg
        rounded w-full md:max-w-[500px] p-4 flex flex-col justify-center items-center
        text-center md:px-10 lg:p-24 h-full lg:h-[500px] text-zinc-700">
            <h1 className="text-3xl font-thin">Weather <span className="font-black">Forecast</span></h1>
            <p className="text-sm mt-2">Enter below a place you want to know the weather of and select an option from
                dropdown</p>
            <div className="flex mt-10 md:mt-4">
                <input type="text" value={term}
                       onChange={onInputChange}
                       placeholder="Enter city"
                       className="px-2 py-1 rounded-l-md border-2 border-white "/>
                <button className="rounded-r-md border-2 border-zinc-100
            hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1
            cursor-pointer" onClick={handleSearch}>
                    search
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}K</p>
                </div>
            )}
        </section>

    </div>
}