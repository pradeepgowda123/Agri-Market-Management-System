const HighlightsSection = ({
  vegetables,
  markets,
  prices,
  notices,
}) => {
  const cards = [
    {
      title: "Vegetables",
      value: vegetables,
    },
    {
      title: "Markets",
      value: markets,
    },
    {
      title: "Today's Entries",
      value: prices,
    },
    {
      title: "Active Notices",
      value: notices,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-10">

      <div className="grid md:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-xl shadow-md p-6"
          >

            <h3 className="text-gray-500">
              {card.title}
            </h3>

            <p className="text-4xl font-bold mt-3 text-green-700">
              {card.value}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default HighlightsSection;