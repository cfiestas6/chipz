import GameCard from './GameCard';

export default function Grid() {
    return (
      <div className="flex justify-center flex-wrap gap-4">
        <GameCard sport="Football" teamA="Real Madrid" date="00/00/00" teamB="FC Barcelona" a={1.2} b={3.2} x= {4.5} />
       <GameCard sport="Basketball" teamA="Real Madrid" date="00/00/00" teamB="FC Barcelona" a={1.2} b={3.2} x= {4.5} />
        <GameCard sport="Football" teamA="Real Madrid" date="00/00/00" teamB="FC Barcelona" a={1.2} b={3.2} x= {4.5} />
      </div>
    );
  }