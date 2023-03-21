export interface IWeather {
    city: IWeatherCity;
    list: IWeatherList[];
}

export interface IWeatherCity {
    id: number;
    name: string;
}

export interface IWeatherList {
    dt_txt: string;
    main: {
        temp: number;
        feelsLike: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: IWeatherDescription[];
}

export interface IWeatherDescription {
    icon: string;
    description: string;
}
