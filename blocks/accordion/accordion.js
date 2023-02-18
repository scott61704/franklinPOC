function styleAccordion() {

    var acc = document.getElementsByClassName("accordionButton");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        console.log("**** panel = " + panel.innerText);
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
}

function styleSlideDown() {
    var acc = document.getElementsByClassName("accordionButton");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
    }
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

    });
    //block.textContext = "";
    //block.append(wrapperDiv);
    styleAccordion();
    styleSlideDown();
}  