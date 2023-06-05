import datetime as dt
import requests
import argparse

def get_weather(city):
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
    API_KEY = open("api_key.txt", "r").read()
    CITY = city

    def kelvin_to_celsius(kelvin):
        celsius = kelvin - 273.15
        return celsius

    url = BASE_URL+"appid="+API_KEY+"&q="+CITY
    response = requests.get(url).json()
    # print(response)
    temp_kelvin = response["main"]["temp"]
    temp_celsius = kelvin_to_celsius(temp_kelvin)
    temp_feels_like_celsius = kelvin_to_celsius(response["main"]["feels_like"])
    wind_speed = response["wind"]["speed"]
    humidity = response["main"]["humidity"]
    description = response["weather"][0]["description"]
    sunrise_timestamp = dt.datetime.utcfromtimestamp(response["sys"]["sunrise"]+response["timezone"])
    sunset_timestamp = dt.datetime.utcfromtimestamp(response["sys"]["sunset"]+response["timezone"])
    print(f"Temprature: {temp_celsius:.2f}°C")
    print(f"Tempratur feels like: {temp_feels_like_celsius:.2f}°C")
    print(f"Humidity: {humidity}%")
    print(f"Wind speed: {wind_speed} m/s")
    print(f"Weather Condition: {description}")
    print(f"Sunrise at {sunrise_timestamp} local time")
    print(f"Sunset at {sunset_timestamp} local time")

try:
    parser = argparse.ArgumentParser(description="Get weather information of the city you enter")
    parser.add_argument("City", type=str, help="Enter the city name, you want to get weather information of")
    args = parser.parse_args()
    # print(args.City)
    # print(type(args.City))   
    get_weather(args.City)
except KeyError:
    print("Please enter a valid city name")
except IOError:
    print("Please enter a city")