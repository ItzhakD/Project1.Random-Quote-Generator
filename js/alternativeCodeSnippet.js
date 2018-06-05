/* The order of the elements print to the screen are kept, due to quotes properties order
    quote
    source OR Wikipedia link
    citation
    year
    profession */
html += `<p class="quote"> ${randomQuote.quote} \n</p>`;// \n is for the console.log use only!
for(let propName in randomQuote) {
    switch(propName) {
        case 'source':
            if(!randomQuote.wikiLink) {
                html += `<p class="source"> ${randomQuote.source}\n`;
            }
            break;
        case 'wikiLink':
            html += `<p class="source"><a class="wikiLink" href="${randomQuote.wikiLink}" target="_blank"`;
            html += ` alt="${randomQuote.source} Wikipedia link" title ="Wikipedia link"> ${randomQuote.source} </a>\n`;
            break;
        case 'citation':
            html += `<span class="citation"> ${randomQuote.citation} </span>\n`;
            break;
        case 'year':
            html += `<span class="year"> ${randomQuote.year} </span>`;
            break;
        case 'profession':
            html += `<span class="profession"> ${randomQuote.profession} </span>\n`;
            break;
    }
}
html += `</p>`;