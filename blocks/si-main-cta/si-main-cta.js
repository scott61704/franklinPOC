export default function decorate(block) {
    console.log("cta block text="+block.textContext);
    console.log("cta block innerHTML="+block.innerHTML);
    console.log("cta block outerHTML="+block.outerHTML);
/*    block.textContent = '';  << this wipes out the block's innerHTML
    console.log("cta block text="+block.textContext);
    console.log("cta block innerHTML="+block.innerHTML);
    console.log("cta block outerHTML="+block.outerHTML); */
    const row = document.createElement("div");
    row.className="si-main-cta-row";

    const leftColumn = document.createElement("div");
    leftColumn.className = "si-main-cta-column si-main-cta-column-left";

    const rightColumn = document.createElement("div");
    rightColumn.className = "si-main-cta-column si-main-cta-column-right";

    row.append(leftColumn);
    row.append(rightColumn);

    const quoteHeading = document.createElement("h3");
    quoteHeading.textContent = "Start a quote"
    
    const quoteParagraph  = document.createElement("p");
    quoteParagraph.textContent = "Select a product to start a quote."

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

    const input = document.createElement("input");
    const button = document.createElement("button");    
    button.textContent = "Start a quote";

    leftColumn.append(quoteHeading);
    leftColumn.append(quoteParagraph);
    leftColumn.append(select);
    leftColumn.append(input);
    leftColumn.append(button);

    const agentHeading = document.createElement("h3");
    agentHeading.innerHTML = "Find agents near<br>you or contact us";
    
    const agentParagraph  = document.createElement("p");
    agentParagraph.textContent = "There's one ready to offer personalized service to fit your needs."

    const agentInput = document.createElement("input");
    const agentButton = document.createElement("button");    
    agentButton.textContent = "Find an agent";

    rightColumn.append(agentHeading);
    rightColumn.append(agentHeading);
    rightColumn.append(agentParagraph);
    rightColumn.append(agentInput);
    rightColumn.append(agentButton);

    block.append(row);

    const img = document.createElement("img");
    img.src = "https://main--franklinpoc--scott61704.hlx.page/img/snowman.jpg";
    block.append(img);
}
