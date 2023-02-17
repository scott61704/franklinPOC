
export default function decorate(block) {
    console.log("In tab block");
    console.log("tab outerHTML = " + block.outerHTML);
    console.log("Document title = " + document.title);
    console.log("Tab's parent = " + block.parentElement.getAttribute("class"));
    console.log("Tab's grandparent = " + block.parentElement.parentElement.getAttribute("class"));
    /*const tabText = document.createElement("p");
    tabText.innerHTML=tabTextString;
    block.append(tabText);*/

    const tabTextString = block.children[0].children[1].innerHTML;
    block.textContent='';
    var allTabContainers = document.getElementsByClassName("tab-container");
    console.log("# of tab containers = " + allTabContainers.length);
    //const tabIndex = allTabContainers.indexOf(block.parentElement.parentElement);
    /*const tabIndex = allTabContainers.findIndex(function (tabContainer) {
        return tabContainer === block.parentElement.parentElement;
    });*/
    const tabIndex = [...allTabContainers].indexOf(block.parentElement.parentElement);
    console.log("tabIndex = " + tabIndex);
    const allTabButtons = document.getElementsByClassName("tabButton")[tabIndex].innerHTML = tabTextString;


}