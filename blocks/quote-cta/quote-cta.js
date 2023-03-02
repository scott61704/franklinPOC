export default function decorate(block) {
    const leftSideContent = block.firstElementChild.children[0];
    block.textContent = "";
    block.classList =  block.classList + " flex-row";
    const leftDiv = document.createElement("div");
    leftDiv.innerHTML = leftSideContent.innerHTML;
    leftDiv.className = "quote-cta-left-div col-8";
    block.append(leftDiv);
    const rightDiv = document.createElement("div");
    const ctaHeading3 = document.createElement("h3");
    ctaHeading3.innerText = "Get a Quote";
    rightDiv.append(ctaHeading3);
    const ctaHeading5 = document.createElement("h5");
    ctaHeading5.innerText = "Select a Product";
    rightDiv.append(ctaHeading5);
    rightDiv.className = "quote-cta-right-div col-4";
    block.append(rightDiv);
  }