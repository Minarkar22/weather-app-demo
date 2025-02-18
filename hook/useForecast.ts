import {useState} from "react";

interface WeatherData {
    name: string;
    main: {temp: number};
}
export function useForecast() {
    const [term, setTerm] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const handleSearch = async() =>{
        if (term.trim() === "") return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${term}&APPID=a81f8318707017d8d79cbd997fd62516`);
            const data = await response.json();
            setWeatherData(data);
            console.log(data);
        } catch (error) {
            console.error("Error occurred while fetching weather", error);
        } finally {
            setLoading(false);
        }
    };

    return {term,setTerm, weatherData, loading, handleSearch};

}