console.log('[xkcd enhancer js loaded]');

const comicTitle = document.getElementById('ctitle').innerText;
const comicNumber = getComicNumber();
console.log(comicNumber + ": " + comicTitle);

// function definitions
// display the comic's hover text (title attribute) below the comic
function displayComicHoverText(){
    var comic = document.getElementById('comic');
    var comicHoverText = comic.querySelectorAll('[title]')[0].title;

    //check if hover text is empty
    if (comicHoverText === ''){
        comicHoverText = '[hover text not found]';
    }

    var hoverTextElement = document.createElement('p');
    hoverTextElement.setAttribute('id', 'hoverText');
    hoverTextElement.appendChild(document.createTextNode(comicHoverText));
    comic.parentNode.insertBefore(hoverTextElement, comic.nextSibling);    
}

// get the comic number
function getComicNumber(){
    var regExp = /\d+/g;
    var prevComicURL = document.querySelectorAll("[rel=prev]")[0].href;
    
    if (prevComicURL.indexOf('#') !== -1){
        return '1';
    } else{
        var comicNumber = Number(prevComicURL.match(regExp)[0]) + 1;
        return comicNumber.toString();
    }
}

// call functions
displayComicHoverText();