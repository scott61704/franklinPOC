import { loadBlocks } from '../../scripts/lib-franklin.js';
import { decorateMain } from '../../scripts/scripts.js';

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

async function loadFragmentUsingTempMain(fragmentText, fragmentAnchor) {

    var tempMain;
    var parentPTag;
    var fragmentContent;

    tempMain = document.createElement("main");
    //sectionDiv = document.createElement("div");

    //fragmentDiv = document.createElement("div");
    //fragmentDiv.outerHTML = fragmentText;
    //fragmentDiv.innerHTML = fragmentText;
    tempMain.innerHTML = fragmentText;
    //tempMain.append(sectionDiv);
    //tempMain.append(fragmentDiv);
    //sectionDiv.append(fragmentDiv);
    console.log("BEFORE tempMain.outerHTML = " + tempMain.outerHTML);
    decorateMain(tempMain);
    await loadBlocks(tempMain);
    console.log("AFTER tempMain.outerHTML = " + tempMain.outerHTML);
    //block.append(fragmentDiv);

    // Is this OK to do, which is to replace the anchor's outerHTML with what I retrieved?
    // I couldn't figure out how to remove the anchor from the block.
    //fragmentDiv.className = "fine-print-item";
    //anchors[index].className = "fine-print-item";    
    //anchors[index].outerHTML = fragmentDiv.outerHTML;
    //anchors[index].className = "fine-print-item";    
    /*const defaultContentWrapper = anchors[index].closest(".default-content-wrapper");
    if (defaultContentWrapper) {
        console.log("Found defaultContentWrapper");
        defaultContentWrapper.classList = defaultContentWrapper.classList + " fine-print-item";
    }*/

    //anchors[index].outerHTML = tempMain.querySelector(".section").innerHTML;
    
    //Couldn't do the following, because the onEventListeners would be lost from the accordion buttons.
    //So had to do a replaceChild using real DOM elements, not just a string for innerHTML.
    //anchors[index].outerHTML = tempMain.querySelector(".section").innerHTML;
    parentPTag = fragmentAnchor.closest("p");
    fragmentContent = tempMain.querySelector(".section>div");
    parentPTag.replaceChild(fragmentContent, fragmentAnchor);

}
async function loadFragmentAsString(fragmentText, fragmentAnchor) {
    const fragmentDiv = document.createElement("div");
    // I'm using the .default-content-wrapper class here because it is used in the loadFragmentUsingTempMain()
    // method to provide the inline-block style.
    fragmentDiv.className = "default-content-wrapper";
    fragmentDiv.innerHTML = fragmentText;

    fragmentAnchor.outerHTML = fragmentDiv.outerHTML;
}

export default async function decorate(block) {
    
    const hrElement = document.createElement("hr");
    block.prepend(hrElement);

    const anchors = [...block.querySelectorAll("a[href*='/fragment/']")];

    var responses = await getAllUrls(anchors)

        // Fetching the .plain.html version of the URL gets just the contents of the body, it seems.
        var index = 0;
        var response = responses[index];
        while (response) {
            if (response) {
                const fragmentText = response; 


                 // The following removes the "buttonContainer" class from the <p>
                 // Also, I had to do this before replacing the outerHTML of the <a>
                 // otherwise it wouldn't find the parent .button-container
                 const buttonContainer = anchors[index].closest(".button-container");
                 if (buttonContainer) {
                     buttonContainer.removeAttribute("class");
                 }

                 if (fragmentText.includes("class=")) {
                    loadFragmentUsingTempMain(fragmentText, anchors[index]);
                 } else {
                    loadFragmentAsString(fragmentText, anchors[index]);
                 }
            }
            index++;
            if (index < responses.length) {
                response = responses[index];
            } else {
                response = null;
        }

    }

/*    const tempMain = document.createElement("main");
    tempMain.append(block);
    decorateMain(tempMain);
    await loadBlocks(tempMain);
    console.log("tempMain.outerHTML = " + tempMain.outerHTML);
    block.outerHTML = tempMain.querySelector("main>div"); */
}