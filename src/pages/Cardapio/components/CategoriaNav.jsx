const getSectionId = (categoria) => categoria.replace(/\s+/g, "-");

function CategoriaNav({ secoes, onNavigate }) {
  return (
    <nav className="categorias" aria-label="Categorias do cardápio">
      {secoes.map((secao) => (
        <button
          key={secao.categoria}
          type="button"
          onClick={() => onNavigate(getSectionId(secao.categoria))}
        >
          {secao.destaque ? "Destaques: " : ""}
          {secao.categoria}
        </button>
      ))}
    </nav>
  );
}

export default CategoriaNav;
