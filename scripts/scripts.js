import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    console.log("before section.append for buildBlock(hero)");
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    console.log("before main.prepend for section with hero");
    main.prepend(section);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    console.log("in buildAutoBlocks");
    console.log("before buildHeroBlock");
    buildHeroBlock(main);
    console.log("before buildEmbeds");
    buildEmbeds(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function buildEmbeds() {
  const embeds = [...document.querySelectorAll('a[href^="https://www.youtube.com"], a[href^="https://gist.github.com"]')];
  console.log("embeds #=" + embeds.length);
  embeds.forEach((embed) => {
    embed.replaceWith(buildBlock('embed', embed.outerHTML));
    console.log("After embed processing");
  });
}


/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  console.log("before decorateButtons");
  decorateButtons(main);
  console.log("before decorateIcons");
  decorateIcons(main);
  console.log("before buildAutoBlocks");
  buildAutoBlocks(main);
  console.log("before decorateSections");
  decorateSections(main);
  console.log("before decorateBlocks");
  decorateBlocks(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  console.log("before decorateTemplateAndTheme");
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    console.log("before decorateMain");
    decorateMain(main);
    console.log("beforeAwaitForLCP");
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  console.log("before loadEager");
  await loadEager(document);
  console.log("before loadLazy");
  await loadLazy(document);
  console.log("before loadDelayed");
  loadDelayed();
}

loadPage();
