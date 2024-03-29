export default function decorate(block) {
    const leftSideContent = block.firstElementChild.children[0];
    block.textContent = "";
    block.classList =  block.classList + " flex-row";
    const divRow = document.createElement("div");
    divRow.className = "flex-row";
    const leftDiv = document.createElement("div");
    leftDiv.innerHTML = leftSideContent.innerHTML;
    leftDiv.className = "quote-cta-left-div col-8";
    divRow.append(leftDiv);
    const rightDiv = document.createElement("div");
    const ctaHeading3 = document.createElement("h3");
    ctaHeading3.innerText = "Get a Quote";
    rightDiv.append(ctaHeading3);
    const ctaHeading5 = document.createElement("h5");
    ctaHeading5.innerText = "Select a Product";
    rightDiv.append(ctaHeading5);
    const select = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = "Auto";
    option1.label = "Auto";
    select.append(option1);
    const option2 = document.createElement("option");
    option2.value = "Fire";
    option2.label = "Fire";
    select.append(option2);
    const option3 = document.createElement("option");
    option3.value = "Pet";
    option3.label = "Pet";
    select.append(option3);
    rightDiv.append(select);
    const zipCode = document.createElement("input");
    rightDiv.append(zipCode);
    rightDiv.className = "quote-cta-right-div col-4";
    divRow.append(rightDiv);
    block.append(divRow);
  }