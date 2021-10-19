export default function isPageSearchable(title) {
  return (!title.includes('Explorar Comida')
  && !title.includes('Explorar Ingredientes')
  && !title.includes('Perfil')
  && !title.includes('Receitas')
  && !title.includes('Explorar')) || title.includes('Explorar Origem');
}
