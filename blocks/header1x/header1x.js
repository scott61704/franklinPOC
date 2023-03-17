export default async function decorate(block) {
    console.log("HEADER1X - Begin");
    block.textContent = '';

    // fetch nav content
//    const navPath = config.nav || '/nav';
    const resp = await fetch("https://static1.st8fm.com/en_US/dxl-1x/prod/template/header/1x-header-unauth.mustache");
  
    if (resp.ok) {
        var html = await resp.text();
        //alert ("nav plain html = " + html);
        const div = document.createElement("div");
        html = html.replaceAll("{{#locales.languageLinks}}", "");
        html = html.replaceAll("{{/locales.languageLinks}}", "");

        html = html.replaceAll("{{#nonCrossSellHeader}}", "");
        html = html.replaceAll('<script src="https://cdn-pci.optimizely.com/js/8421581994.js"></script>', "");
        html = html.replaceAll("{{/nonCrossSellHeader}}", "");
        html = html.replaceAll("{{^nonCrossSellHeader}}","");


        div.innerHTML = html;
        block.append(div);
    }
    console.log("HEADER1X - End");
}
  