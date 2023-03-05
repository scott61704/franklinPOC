/* async function fetchFragments(fragmentAnchors) {
    var promises;
    promises.add(fragmentAnchors.forEach((anchor) => fetch(anchor.href+".plain.html"​)));
    
    var returnResults;
    Promise.allSettled(promises).
        then((results) => results.forEach((result) => returnResults.add(result)));

    return returnResults;
  }
*/
async function getAllUrls(urls) {
    //alert("url0 = "+ urls[0]);
    try {
        var data = await Promise.all(
            urls.map(
                url =>
                    fetch(url+".plain.html").then(
                        (response) => response.text()
                    )));

        
        return (data)

    } catch (error) {
        console.log("fetch error" + error)

        throw (error)
    }
}

export default async function decorate(block) {
    //block.textContent = '';
    // Can't use a normal like the following, because you can't have an async within it
    // [...block.querySelectorAll("a[href*='/fragment/']")].forEach(el => {
    
    const anchors = [...block.querySelectorAll("a[href*='/fragment/']")];

    var responses = await getAllUrls(anchors)
    //alert("responses.length = " + responses.length);

    //fetchFragments(block.querySelectorAll("a[href*='/fragment/']"));
    /*if (anchors.length > 0) {
           fetchMoviesAndCategories().then(([movies, categories]) => {
            movies;     // fetched movies
            categories; // fetched categories
          }).catch(error => {
            // /movies or /categories request failed
          });

        // Fetching the .plain.html version of the URL gets just the contents of the body, it seems.
        var url = anchors[0].href+".plain.html"; */
        var index = 0;
        var response = responses[index];
        var fragmentDiv;
        while (response) {
            //alert("url = " + url);
            //const resp = await fetch(url);
            //alert(response.ok);
            if (response) {
                const fragmentText = response; //await response.text();
                //alert ("fragment content = " + fragmentText);
                fragmentDiv = document.createElement("div");
                fragmentDiv.className = "fine-print-item";
                fragmentDiv.innerHTML = fragmentText;
                // Is this OK to do, which is to replace the anchor's outerHTML with what I retrieved?
                // I couldn't figure out how to remove the anchor from the block.
                anchors[index].outerHTML = fragmentDiv.outerHTML;
                anchors[index].className = "fine-print-item";                
            }
            index++;
            //alert(index);
            if (index < responses.length) {
                response = responses[index];
            } else {
                response = null;
            //}
        }

    }

/*    [...block.querySelectorAll("a[href*='/fragment/']")].forEach(el => {
        // Do something with each element
        //alert("got an a  " + el.getAttribute("href"));
       
        const href= el.getAttribute("href");
        alert ("fragment href = " + el.href);
        
        const resp = await fetch(el.href);
        if (resp.ok) {
            const html = await resp.text();
            alert ("fragment content = " + html);
        }
    });
    
  */ 
}