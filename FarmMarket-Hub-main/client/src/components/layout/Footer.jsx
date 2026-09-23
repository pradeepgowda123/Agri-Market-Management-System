import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-green-700 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>

            <h2 className="text-2xl font-bold mb-3">
              🌾 FarmMarket Hub
            </h2>

            <p className="text-green-100">
              Helping farmers access real-time vegetable market prices,
              important notices, and market information across Karnataka.
            </p>

          </div>

          <div>
  <h3 className="font-semibold text-lg mb-3">
    Quick Links
  </h3>

  <ul className="space-y-2 text-green-100">
    <li>
      <Link to="/" className="hover:text-white hover:underline">
        Home
      </Link>
    </li>

    <li>
      <Link
        to="/prices"
        className="hover:text-white hover:underline"
      >
        Today's Prices
      </Link>
    </li>

    <li>
      <Link
        to="/markets"
        className="hover:text-white hover:underline"
      >
        Markets
      </Link>
    </li>

    <li>
      <Link
        to="/notices"
        className="hover:text-white hover:underline"
      >
        Notices
      </Link>
    </li>
  </ul>
</div>

          <div>

            <h3 className="font-semibold text-lg mb-3">
              Contact
            </h3>

            <p className="text-green-100">
              FarmMarket Hub
            </p>

            <p className="text-green-100">
              Karnataka, India
            </p>

            <p className="text-green-100">
              support@farmmarkethub.com
            </p>

          </div>

        </div>

        <hr className="my-8 border-green-500" />

        <p className="text-center text-green-100">
          © 2026 FarmMarket Hub. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;