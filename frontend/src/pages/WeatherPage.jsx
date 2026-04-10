import GlassCard from "../ui/GlassCard";

const WeatherPage = () => {
  const weather = [
    { day: "Today", condition: "Sunny", temp: "29C", humidity: "52%" },
    { day: "Tomorrow", condition: "Cloudy", temp: "27C", humidity: "60%" },
    { day: "Saturday", condition: "Light Rain", temp: "25C", humidity: "72%" },
  ];

  return (
    <GlassCard>
      <h3 className="mb-4 text-xl font-semibold">Weather Forecast (Placeholder)</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {weather.map((item) => (
          <div key={item.day} className="rounded-xl bg-white/5 p-4">
            <p className="font-semibold">{item.day}</p>
            <p className="text-emerald-100/75">{item.condition}</p>
            <p className="mt-2 text-2xl">{item.temp}</p>
            <p className="text-sm text-emerald-100/70">Humidity: {item.humidity}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default WeatherPage;
