import Card from './Card';

export default function Grid() {
    return (
      <div className="flex justify-center flex-wrap gap-4">
        <Card title="Sports" href="/sports" image="/static/sports.webp" />
        <Card title="ZK Games" href="/" image="/static/zkgames.webp" />
        <Card title="Slots" href="/slots" image="/static/slots.webp" />
      </div>
    );
  }