import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <section className="cards">
        <WeatherCard weatherData={weatherData} />
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg; / You may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike} // <-- Pass directly!
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
