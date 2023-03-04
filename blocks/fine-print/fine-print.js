export default async function decorate(block) {
    //block.textContent = '';
    // Can't use a normal like the following, because you can't have an async within it
    // [...block.querySelectorAll("a[href*='/fragment/']")].forEach(el => {
    
    const anchors = block.querySelectorAll("a[href*='/fragment/']");
    if (anchors.length > 0) {
        // Fetching the .plain.html version of the URL gets just the contents of the body, it seems.
        var url = anchors[0].href+".plain.html";
        var index = 0;
        var fragmentDiv;
        while (url) {
            //alert("url = " + url);
            const resp = await fetch(url);
            if (resp.ok) {
                const fragmentText = await resp.text();
                //alert ("fragment content = " + fragmentText);
                fragmentDiv = document.createElement("div");
                fragmentDiv.innerHTML = fragmentText;
                // Is this OK to do, which is to replace the anchor's outerHTML with what I retrieved?
                // I couldn't figure out how to remove the anchor from the block.
                anchors[index].outerHTML = fragmentText;
            }
            index++;
            if (index < anchors.length) {
                var url = anchors[index].href+".plain.html";
            } else {
                url = null;
            }
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