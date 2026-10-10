/* Pages CMS: injecta exclusivament text pla o rutes d’imatge (mai HTML). */
(async function () {
  try {
    const response = await fetch('content/site.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('No s’ha pogut llegir site.json');
    const data = await response.json();
    document.querySelectorAll('[data-cms]').forEach(node => {
      const key = node.dataset.cms;
      if (!Object.prototype.hasOwnProperty.call(data,key)) return;
      const value = data[key];
      if (typeof value !== 'string') return;
      if (key === 'about_photo') {
        if (!value) return;
        const url = safeImage(value);
        if (!url) return;
        const old = node.querySelector('.photo-placeholder');
        const image = document.createElement('img');
        image.src = url;
        image.alt = 'Retrat de Nora Birsan';
        image.className = 'about-photo';
        image.loading = 'lazy';
        if (old) old.replaceWith(image);
        return;
      }
      const attr = node.dataset.cmsAttr;
      if (attr === 'src') {
        const url = safeImage(value);
        if (url) node.setAttribute('src',url);
      } else {
        node.textContent=value;
        if (key === 'contact_email') node.setAttribute('href','mailto:'+value.trim());
      }
    });
  } catch (error) {
    console.warn('No es poden carregar els continguts del CMS; es mostren els textos inicials.', error);
  }
  function safeImage(path) {
    if (typeof path !== 'string') return null;
    const normalized = path.replace(/^\/+/, '');
    if (!/^images\/[a-zA-Z0-9_.\/-]+$/.test(normalized) || normalized.includes('..')) return null;
    return normalized;
  }
})();
