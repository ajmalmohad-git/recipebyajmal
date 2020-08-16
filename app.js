let sec0 = document.querySelector('#sec0')
let sec1 = document.querySelector('#sec1')
let sec2 = document.querySelector('#sec2')
let sec3 = document.querySelector('#sec3')
let sec4 = document.querySelector('#sec4')

let api = {
    baseUrl:"https://api.edamam.com/search?q=",
    apikey: "&app_key=97574a1695f369a61a45946e580c0d34",
    appid: "&app_id=55fd3fee",
    Ingredient:'',
    resultNeed:'&from=0&to=',
    resultCount: 5,
    maxCalorie: null,
};

let readJson = async (url) => {
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayOutput(data);
    } catch (err) {
        console.log(err);
    }
};


let submitBtn = document.querySelector('.submitbtn');
let userQuery = document.querySelector('.ingridient');
submitBtn.addEventListener('click',()=>{
    api.Ingredient = userQuery.value;
    let url = api.baseUrl + api.Ingredient + api.appid + api.apikey + api.resultNeed + api.resultCount;
    userQuery.value="";
    readJson(url);
})

let displayOutput = (result)=>{
    let output = result.hits;
    
    output.forEach((element,i) => {
        let ingridientsgiven = output[i].recipe.ingredientLines;
        let display = `
    <div class="gencontainer">
    <div class="geninfo">
    <h1 class="genhead">${output[i].recipe.label}</h1>
    <p class="genpara">${output[i].recipe.healthLabels[0]} ${output[i].recipe.healthLabels[1]}</p>
    <button class="genbtn2">Ingredients</button>
    <a href="${output[i].recipe.url}" target="_blank"><button class="genbtn">Preperation</button></a>
    </div>
    <img class="genimg" src="${output[i].recipe.image}">
    </div>

    
    `;
    eval(`sec${i}`).innerHTML = display;
    });
}

