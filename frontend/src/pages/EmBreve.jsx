import Header from "../components/Header";

//PLACEHOLDER - trocar pelo componente real quando cada seção ganhar sua página
function EmBreve({ secao }) {
  return (
    <div className="min-h-screen w-full bg-base">
      <Header />
      <p className="pt-24 text-center font-display text-rank text-primary">
        {secao} em breve
      </p>
    </div>
  );
}

export default EmBreve;
