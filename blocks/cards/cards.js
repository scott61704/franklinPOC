import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  console.log("before cards block text="+block.textContext);
  console.log("before cards block innerHTML="+block.innerHTML);
  console.log("before cards block outerHTML="+block.outerHTML);

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  console.log("after cards block text="+block.textContext);
  block.textContent = '';
  block.append(ul);
  console.log("after cards block innerHTML="+block.innerHTML);
  console.log("after cards block outerHTML="+block.outerHTML);
}
