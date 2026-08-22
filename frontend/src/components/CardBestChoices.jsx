function CardBestChoices(props) {
  return (
    <div className="flex justify-left px-8 py-20">
      <div className="w-80 h-60 space-y-4 bg-surface shadow-xl py-5 rounded-md text-center border border-strong">
        {props.children}
      </div>
    </div>
  );
}

export default CardBestChoices;
