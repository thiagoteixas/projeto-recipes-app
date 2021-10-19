export default function createHeaderTitle(history) {
  switch (history.location.pathname) {
  case '/perfil': return 'Perfil';

  case '/comidas': return 'Comidas';
  case '/bebidas': return 'Bebidas';
  case '/explorar': return 'Explorar';

  case '/explorar/comidas': return 'Explorar Comidas';
  case '/explorar/bebidas': return 'Explorar Bebidas';

  case '/explorar/comidas/area': return 'Explorar Origem';

  case '/explorar/comidas/ingredientes': return 'Explorar Ingredientes';
  case '/explorar/bebidas/ingredientes': return 'Explorar Ingredientes';

  case '/receitas-feitas': return 'Receitas Feitas';
  case '/receitas-favoritas': return 'Receitas Favoritas';

  default: return 'Receitas';
  }
}
