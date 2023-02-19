export default function decorate(block) {
    console.log("Inside decorate() for resources, block.textContent = " + block.textContent);

    //block.textContent = "";
    /*const para = document.createElement("p");
    para.innerHTML = "Howdy";
    block.append(para);*/

    
    const resourceList = document.createElement('ul');
    [...block.children].forEach((row) => {
        console.log("resources child row div=" + row.outerHTML);
        const li = document.createElement('li');
        li.innerHTML = row.innerHTML;
        li.getElementsByTagName("a")[0].className = "";
        resourceList.append(li);
        block.removeChild(row);
    });
    block.append(resourceList);
}  