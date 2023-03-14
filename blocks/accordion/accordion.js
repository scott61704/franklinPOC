function styleAccordion() {

    var acc = document.getElementsByClassName("accordionButton");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        console.log("In style function, classList before = " + this.classList);

        this.classList.toggle("activeAccordionButton");
        console.log("In style function, classList after = " + this.classList);

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        console.log("**** panel = " + panel.innerText);
        console.log("---- panel.style.display = " + panel.style.display);
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
}

function styleSlideDown(button) {
    //var acc = document.getElementsByClassName("accordionButton");
    //var i;

    //for (i = 0; i < acc.length; i++) {
    console.log("Inside styleSlideDown(), button.outerHTML=" + button.outerHTML);
    button.addEventListener("click", function() {
        console.log("In slidedown function, classList before = " + this.classList);
        this.classList.toggle("activeAccordionButton");
        console.log("In slidedown function, classList after = " + this.classList);
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
        console.log("!!!accordion - right before setting maxHeight to null, current = " + panel.maxHeight);
        panel.style.maxHeight = null;
        } else {
            console.log("!!!accordion - right before setting maxHeight = " + panel.scrollHeight);
        panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
export default function decorate(block) {
    console.log("Inside decorate() for accordion, block.textContent = " + block.textContent);

    //block.textContent = "";
    /*const para = document.createElement("p");
    para.innerHTML = "Howdy";
    block.append(para);*/

    
    //const wrapperDiv = document.createElement('div');
    [...block.children].forEach((row) => {
        console.log("accordion child row div=" + row.outerHTML);
        const button = document.createElement('button');
        button.className = "accordionButton";
        button.innerText = row.children[0].innerText;
        const panel = document.createElement('div');
        panel.className = "panel";
        panel.innerHTML = row.children[1].innerHTML;
        block.append(button);
        block.append(panel);
        block.removeChild(row);
        styleSlideDown(button);

    });
    //block.textContext = "";
    //block.append(wrapperDiv);
   //styleAccordion();
    //styleSlideDown();
}  