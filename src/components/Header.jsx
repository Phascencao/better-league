import logo from "../assets/better-league-logo.png";

function Header() {
  return (
    <header className="bg-surface-raised raised shadow-md border-b border-strong py-4 px-6 flex">
      <h1>
        <img src={logo} alt="logo" style={{ height: 45, width: "auto" }} />
      </h1>
      <div className="flex gap-8 px-10 mr-auto">
        <button className="text-accent hover:underline underline-offset-8 hover:text-[#17223A]">
          Início
        </button>
        <button className="text-accent hover:underline underline-offset-8 hover:text-[#17223A]">
          Tier list
        </button>
        <button className="text-accent hover:underline underline-offset-8 hover:text-[#17223A]">
          Campeões
        </button>
        <button className="text-accent hover:underline underline-offset-8 hover:text-[#17223A]">
          Ao vivo
        </button>
        <button className="text-accent hover:underline underline-offset-8 hover:text-[#17223A]">
          Ranking
        </button>
      </div>
    </header>
  );
}

export default Header;
