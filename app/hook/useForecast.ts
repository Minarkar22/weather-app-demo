import {useState} from "react";

export interface WeatherData {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    list: [{
        dt: number
        main: {
            feels_like: number
            humidity: number
            pressure: number
            temp: number
            temp_max: number
            temp_min: number
        }
        weather: [{
            main: string
            icon: string
            description: string
        }]
        wind: {
            speed: number
            gust: number
            deg: number
        }
        clouds: {
            all:number
        }
        pop: number
        visibility: number
    }]
}
export function useForecast() {
    const [term, setTerm] = useState<string>('');
    const [weatherData, setWeatherData] = useState< WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const handleSearch = async() =>{
        if (term.trim() === "") return;
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${term}&units=metric&APPID=a81f8318707017d8d79cbd997fd62516`);
            const data = await response.json();
            // setWeatherData(data);
            const forecastData = {
                ...data.city,
                list: data.list.slice(0, 16),
            }
            console.log(forecastData);
            setWeatherData(forecastData);
        } catch (error) {
            console.error("Error occurred while fetching weather", error);
        } finally {
            setLoading(false);
        }
    };

    return {term,setTerm, weatherData, loading, handleSearch};

}