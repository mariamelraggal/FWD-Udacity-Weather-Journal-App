/* Global Variables */
const urlApi = "https://api.openweathermap.org/data/2.5/weather?zip=";
//use &units=metric to convert temp to celsius
const apiKey  = "&appid=0865d7ebe7264ff14155a0e1d35841d1&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//get data from api
const getData = async (urlApi, apiKey, zipCodeInput) => {
  //fetch data from api (await the fetch)
  const request = await fetch(urlApi + zipCodeInput + apiKey);
  try {
    //convert json data to javascript object and return the object
    const responseData = await request.json();
    console.log("get data function");
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};
//function that call when button was clicked
function submitData() {
  //get the zip code input value by id
  const zipCodeInput = document.getElementById('zip').value;
  //get the feelings text input value by id
  const feelingsInput = document.getElementById('feelings').value;
  getData(urlApi, apiKey, zipCodeInput).then(function (responseData) {
    console.log(responseData);
    postData('/add',{date:newDate,temp:responseData.main.temp,feel:feelingsInput});
  }).then(function () {
    updateUi();
  });
};
//get button by id and set action to it
document.getElementById('generate').addEventListener("click",submitData);
//post specific data
const postData = async (url = "", data = {}) => {
  console.log("post data function");
  console.log(data);
  const response = await fetch (url,{
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
  });
  try {
    return;
  } catch (error) {
    console.log(error);
  }
};
//Update UI function
const updateUi = async () => {
  const request = await fetch('/all');
  try {
    //convert json data to javascript object
    const responseData = await request.json();
    console.log("update Ui function");
    console.log(responseData);
    //get elements by id and update their inner text data
    document.getElementById('date').innerHTML = "Date: " + responseData.date;
    //&degC add the degree celicus shape to the text
    document.getElementById('temp').innerHTML = "Tempreature: " + responseData.temp + "&degC";
    document.getElementById('content').innerHTML = "Feelings: " + responseData.feel;
  } catch (error) {
    console.log(error);
  }
};
