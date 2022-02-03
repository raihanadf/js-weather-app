
const weather = (() => {

  // free api key, dont steal it hehe, you can get it 
  // for free on openweather and yea im aware that my api is exposed
  const apikey = "b1de23632e48a868c97c1046643583a8"

  // DOM
  const city = document.querySelector("#city") 
  const temp = document.querySelector("#temp") 

  async function getWeather(location = 'Jember') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`, { mode: "cors" })
    response.json().then((data) => {
      // map your data here
      _dumpData(data)
    })
  }

  // set the value to dom
  function _setDom(value, target) {
    target.textContent = value
  }

  // dump data here and calls the setDom function
  function _dumpData(data) {

    const arrayData = [data.name, Math.floor(data.main.temp) / 10]
    const arrayDOM = [city, temp]

    for (let i = 0; i < arrayData.length; i++) {
      _setDom(arrayData[i], arrayDOM[i])
    }

    console.log(data)
  }

  // returns the function to get the weather
  return { getWeather }

})()

// calls the get weather function from variable weather
weather.getWeather()
