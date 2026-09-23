const LatestNoticesSection = ({ notices = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-12">

      <h2 className="text-3xl font-bold mb-6">
        📢 Latest Notices
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {notices.slice(0, 4).map((notice) => (

          <div
            key={notice._id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h3 className="font-bold text-xl mb-3">
              {notice.title}
            </h3>

            <p className="text-gray-600">
              {notice.description}
            </p>

            <p className="mt-4 text-sm text-gray-400">
              Expires :
              {" "}
              {new Date(
                notice.expiryDate
              ).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default LatestNoticesSection;