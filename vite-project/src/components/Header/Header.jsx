import headerLogo from "../../assets/WTWR-logo.svg"
import getWeatherData from "../../utils/weatherApi";
import { useEffect } from "react";
import { useState } from "react";


const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
function AddClothes() {
    const handleClick = (event) => {
        console.log('Button clicked!', event);
    };

    return (
        <button onClick={handleClick}>
            +Add Clothes
        </button>
    );
}

export default function Header(props) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getWeatherData("Seattle")
            .then(data => {
                setWeather(data);
                props.weather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    return (
        <>
            <img src={headerLogo} alt="App logo" />
            {currentDate}
            <AddClothes />
            <h2>Terrence Tegegne</h2>
            {weather ? (
                <div>
                    <p>Weather: {weather.temperature}°C, {weather.description}</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </>
    );
}
