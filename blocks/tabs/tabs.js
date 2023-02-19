function openTabContent(evt, tabIndex) {
    // Declare all variables
    var i, tabcontent, tabButtons;
  
    console.log("in openTabContent, evt="+evt+", tabIndex="+tabIndex);
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-container");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tabButton" and remove the class "active"
    tabButtons = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" activeTabButton", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    //document.getElementById(id).style.display = "block";
    document.getElementsByClassName("tab-container")[tabIndex].style.display = "block";
    evt.currentTarget.className += " activeTabButton";
  }

  function createTabButton(index) {
    const tabButton = document.createElement("button");
    tabButton.addEventListener('click', function(e){
        openTabContent(e, index)
     });
    tabButton.className = "tabButton";
    tabButton.innerText="Button " + index;
    return tabButton;

  }
  export default function decorate(block) {
    console.log("tabs block outerHTML="+block.outerHTML);
    block.textContent="";
    const tabButton0 = createTabButton(0);
    block.append(tabButton0);
    const tabButton1 = createTabButton(1);
    block.append(tabButton1);
    const tabButton2 = createTabButton(2);
    block.append(tabButton2);
    const tabButton3 = createTabButton(3);
    block.append(tabButton3);

    tabButton0.click();

  }
