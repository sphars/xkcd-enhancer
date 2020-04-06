console.log('[xkcd enhancer js loaded]');

let comicJson = {};
let comicNumber = getComicNumber();

// get the comic number from current URL
function getComicNumber(){
    var regExp = /\d+/g;
    var comicURL = document.URL;
    return (comicURL.match(regExp) ? comicURL.match(regExp)[0] : '0');
}

// get json url
function getJsonUrl(comicNumber){
    if(comicNumber != '0'){
        return `https://xkcd.com/${comicNumber}/info.0.json`;
    } else {
        return `https://xkcd.com/info.0.json`;
    }
}

// fetch comic data
async function getComicJson(url){
    let response = await fetch(url);
    if(response.ok){
        comicJson = await response.json();
        processComicJson(comicJson);
    } else{
        console.error(`error fetching comic ${getComicNumber()} json: ${response.status}`);
    }
}

// process the comic data
function processComicJson(json){
    displayComicHoverText(json.alt);
}

// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(hoverText){
    var comic = document.getElementById('comic');
    var hoverTextElement = document.createElement('p');
    
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.appendChild(document.createTextNode(hoverText));
    comic.parentNode.insertBefore(hoverTextElement, comic.nextSibling);    
}

// call functions
getComicJson(getJsonUrl(comicNumber));
