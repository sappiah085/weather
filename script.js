const API_KEY = "880d93b3d928162c3e5f836e0a40e477";
var input = document.querySelector(".input");
document.querySelector(".toggle").addEventListener("click", () => {
  input.classList.toggle("active");
});


class Api {
  constructor(city) {
    this.city = city;
  }
  async call() {
    try {
      this.result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${API_KEY}`
      );
      this.data = await this.result.json();
    } catch (err) {
      console.log(err);
    }
  }

  display(){
    document.querySelector('.data').textContent = '';
    var date, day, month, dayArr, dayDa, monthArr, time, greeting;
    dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    date = new Date();
    day = date.getDate();
    dayDa = date.getDay();
    month = date.getMonth()
    time = date.getHours();
    if(time < 12 && time >= 6){
      greeting = "Good <br> morning"
    }else if(time >= 12 && time < 18){
      greeting = "Good <br> Afternoon"
    }else if(time > 18 && time <= 24){
      greeting = "Good <br> Evening"
    }else{
      greeting = "Good <br> Night"
    }
    var temp = `<div class="greeting">${greeting}</div>
        <div class="date">${day} ${monthArr[month]}, ${dayArr[dayDa]}</div>
        <div class="imag">
          <img src="http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png" alt="weather">
        </div>
        <div class="temp">${Math.floor(this.data.main.temp)}<sup>o</sup><span>C</span></div>
        <h4 class="weather">${this.data.weather[0].main}</h4>
        <div class="locat">${this.data.name}</div>
        <div class="summary">
          <div class="cloudiness">
            <div><i class="fas fa-cloud-rain"></i></div>
            <div class="detail">
              ${Math.floor(this.data.clouds.all)}&percnt;
            </div>
          </div>
          <div class="wind">
            <div><i class="fas fa-wind"></i></div>
            <div class="detail">
              ${Math.floor(this.data.wind.speed)}Km/h
            </div>
          </div>
          <div class="humidity">
            <div><i class="fas fa-cloud"></i></div>
            <div class="detail">
              ${Math.floor(this.data.main.humidity)}&percnt;
            </div>
          </div>
        </div>`;
        document.querySelector('.data').insertAdjacentHTML('afterbegin', temp)
  }



}
async function disp(val){
  var requests = new Api(val)
  await requests.call()
  requests.display()
}
setInterval(disp('accra'), 10000)
disp('Accra');

input.addEventListener('change', ()=>{
  var value = input.value;
  disp(value)
  input.value = ''
})
