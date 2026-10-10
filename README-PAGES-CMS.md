# Nora Birsan — edició amb Pages CMS

## Què inclou
- `.pages.yml`: configuració de l’editor, incloent-hi la carpeta d’imatges.
- `content/site.json`: continguts inicials de la web, extrets de l’HTML original.
- `js/cms-content.js`: carrega el JSON i actualitza la pàgina mantenint les dades originals com a reserva.
- `index.html`, `css/`, `js/`, `images/`, `contact.php`: web original adaptada.

## Publicació a GitHub Pages
1. Fes una còpia de seguretat del repositori actual o treballa en una branca de prova.
2. Puja **el contingut** d’aquesta carpeta a l’arrel del repositori (no la carpeta contenidora).
3. Comprova que `.pages.yml`, `index.html` i `content/site.json` són a l’arrel.
4. A Pages CMS, obre el repositori i la branca publicada; edita “Textos i fotografies · Nora Birsan”.
5. A **Portada · Fotografia** o **Sobre mi · Fotografia**, fes clic al selector d’imatges i usa l’opció de pujar fitxers. S’emmagatzemen a `images/`.
6. Desa, espera que GitHub Pages actualitzi la pàgina i comprova-la en una finestra privada.

## Hostinger
Si allotges la web també a Hostinger, els canvis desats a GitHub **no s’hi publiquen automàticament**. Cal desplegar els fitxers actualitzats (per exemple amb una acció de GitHub i credencials configurades com a secrets). No exposis mai contrasenyes FTP al repositori.

## Advertiments
- El formulari `contact.php` **no funciona a GitHub Pages** perquè no executa PHP. A Hostinger només funcionarà si el pla admet PHP i el servidor de correu està configurat. Cal provar-ho abans de rebre consultes reals.
- La web conserva els textos i afirmacions professionals originals, sense verificar-los. Cal revisar-los amb la titular.
- El camp de biografia admet una segona fotografia, inicialment buida; fins que se n’afegeixi una es conserva el placeholder.
- S’han mantingut els set serveis, els quatre passos, les set FAQ i cinc estudis existents; són editables però no es poden afegir o eliminar blocs des del CMS sense modificar el codi.
- Les edicions s’apliquen en carregar `content/site.json` al navegador. Si falla la lectura, es mostra el text original de l’HTML. Les metadades SEO continuen essent estàtiques.
