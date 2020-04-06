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
    addComicDateAndNum(json.year, json.month, json.day, json.num);
    displayComicHoverText(json.alt);
    addExplainLink(json.num);
}

// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(hoverText){
    var comic = document.getElementById('comic');
    var hoverTextElement = document.createElement('p');
    
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.appendChild(document.createTextNode(hoverText));
    comic.parentNode.insertBefore(hoverTextElement, comic.nextSibling);    
}

// add an explain link to the comic navigation
function addExplainLink(comicNumber){
    var explainURL = `https://www.explainxkcd.com/${comicNumber}/`;

    var explainLink = document.createElement('a');
    explainLink.href = explainURL;
    explainLink.target = "_blank";
    explainLink.accessKey = 'e';
    explainLink.innerText = "Explain";
    
    var explainNav = document.createElement('li');
    explainNav.append(explainLink);

    var navs = document.querySelectorAll('.comicNav');

    for (var nav of navs) {
        nav.insertBefore(explainNav.cloneNode(true), nav.children[3]);
    }
}

// add date to comic title
function addComicDateAndNum(year, month, day, num){
    var ctitle = document.getElementById('ctitle');
    var comicDate = new Date(Number(year), Number(month) - 1, Number(day));
    
    var comicDateElement = document.createElement('div');
    comicDateElement.id = "cdate";

    var dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};

    comicDateElement.innerText = `#${num} | ${comicDate.toLocaleDateString("en-US", dateOptions)}`;

    ctitle.parentNode.insertBefore(comicDateElement, ctitle.nextSibling);
}

// call functions
getComicJson(getJsonUrl(comicNumber));
