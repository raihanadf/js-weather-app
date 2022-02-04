'use strict';

const weather = (() => {

  // free api key, dont steal it hehe, you can get it 
  // for free on openweather and yea i'm fully aware that my api is exposed
  const apikey = "b1de23632e48a868c97c1046643583a8"

  // DOM
  const container = document.querySelector(".container") 
  const desc = document.querySelector("#desc") 
  const city = document.querySelector("#city") 
  const temp = document.querySelector("#temp") 
  const feelslike = document.querySelector("#feelslike") 
  const todayshigh = document.querySelector("#todayshigh") 
  const humidity = document.querySelector("#humidity") 
  const formSearch = document.querySelector("#searchForm") 
  const inputSearch = document.querySelector("#cityName") 
  const weatherImg = document.querySelector("#weatherImg") 
  const loading = document.querySelector(".loading") 
  // thats too much i guess

  // gets the weather api from openweather
  async function getWeather(location = 'Jember') {
    DOMLoading(true)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`, { mode: "cors" })
    response.json().then((data) => {
      // map your data here
      _dumpData(data)
      _getImage(data.weather[0].main)
    })
    .catch(() => alert(`Not found`))
    .finally(() => DOMLoading(false))
  }

  // gets the image gifs from giphy
  async function _getImage(params) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ryWz9ONOQhAlVyDWxamzGF3NUWFR9Z3F&s=${params}`, { mode: "cors"})
    response.json().then((data) => {
      // map your data here
      _setImg(data.data.images['480w_still'].url, weatherImg)
    })
    .catch(() => alert(`Not found`))
  }

  // set image source to dom
  function _setImg(value, target) {
    target.src = value
  }

  // set the value to dom
  function _setDom(value, target) {
    target.textContent = value
  }

  // dump data here and calls the setDom function
  function _dumpData(data) {

    const flTemp = Math.floor(data.main.feels_like) / 10 + "*C"
    const maxTemp = Math.floor(data.main.temp_max) / 10 + "*C"
    const hTemp = Math.floor(data.main.humidity) + "%" 

    const arrayData = [data.weather[0].description, data.name, Math.floor(data.main.temp) / 10 + "*C", flTemp, maxTemp, hTemp]
    const arrayDOM = [desc, city, temp, feelslike, todayshigh, humidity]

    // loop both array and assign them to existing dom
    for (let i = 0; i < arrayData.length; i++) {
      _setDom(arrayData[i], arrayDOM[i])
    }

  }

  // apply the event listener to the dom
  function DOMSearch() {
    formSearch.addEventListener('submit', (e) => {
      e.preventDefault()
      getWeather(inputSearch.value)
    })
  }

  // dom loading stuff
  function DOMLoading(bool) {
    if(bool) { 
      loading.style.display = "block" 
      container.style.display = "none" 
    } else {
      loading.style.display = "none" 
      container.style.display = "flex"
    }
  }

  // returns the function to get the weather
  return { getWeather, DOMSearch }

})()

// calls the get weather function from variable weather
weather.getWeather()
weather.DOMSearch()
