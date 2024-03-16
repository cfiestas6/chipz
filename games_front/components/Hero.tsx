export default function Hero({ title, subtitle }: any) {
    return (
      <div className="flex items-center justify-center flex-col my-20">
        <h1 className="text-5xl courgette font-bold">{title}</h1>
        <p className="text-gray-600 mt-4">{subtitle}</p>
      </div>
    );
  }