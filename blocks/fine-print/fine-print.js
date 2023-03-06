async function getAllUrls(urls) {
    try {
        //TODO - should use Promise.allSettled, instead of .all, in case some of the requests fail.
        //but couldn't figure out how to get the responses out of them.  Just shows [object Object]
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
    
    const hrElement = document.createElement("hr");
    block.prepend(hrElement);

    const anchors = [...block.querySelectorAll("a[href*='/fragment/']")];

    var responses = await getAllUrls(anchors)

        // Fetching the .plain.html version of the URL gets just the contents of the body, it seems.
        var index = 0;
        var response = responses[index];
        var fragmentDiv;
        while (response) {
            if (response) {
                const fragmentText = response; 
                fragmentDiv = document.createElement("div");
                fragmentDiv.className = "fine-print-item";
                fragmentDiv.innerHTML = fragmentText;
                // Is this OK to do, which is to replace the anchor's outerHTML with what I retrieved?
                // I couldn't figure out how to remove the anchor from the block.
                anchors[index].outerHTML = fragmentDiv.outerHTML;
                anchors[index].className = "fine-print-item";                
            }
            index++;
            if (index < responses.length) {
                response = responses[index];
            } else {
                response = null;
        }

    }

}