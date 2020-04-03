console.log('[xkcd enhancer js loaded]');

// display the comic's title attribute below the comic
var comicDiv = document.getElementById('comic');
var comicTitle = document.querySelectorAll('#comic img')[0].title;
var titleElement = document.createElement('p');
titleElement.setAttribute('id', 'comicTitle');
titleElement.innerHTML = comicTitle;
comicDiv.appendChild(titleElement);
