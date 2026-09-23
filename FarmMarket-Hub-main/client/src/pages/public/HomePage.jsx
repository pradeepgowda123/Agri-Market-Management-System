import { useEffect, useState } from "react";

import HeroSection from "../../components/public/HeroSection";
import HighlightsSection from "../../components/public/HighlightsSection";
import LatestPricesSection from "../../components/public/LatestPricesSection";
import LatestNoticesSection from "../../components/public/LatestNoticesSection";
import MarketsSection from "../../components/public/MarketsSection";

import { getLatestPrices } from "../../services/publicPriceService";
import { getLatestNotices } from "../../services/publicNoticeService";
import { getMarkets } from "../../services/publicMarketService";
import { getAllVegetables } from "../../services/vegetableService";

const HomePage = () => {
  const [prices, setPrices] = useState([]);
  const [notices, setNotices] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [
        priceRes,
        noticeRes,
        marketRes,
        vegetableRes,
      ] = await Promise.all([
        getLatestPrices(),
        getLatestNotices(),
        getMarkets(),
        getAllVegetables(),
      ]);

      setPrices(priceRes.data);
      setNotices(noticeRes.data);
      setMarkets(marketRes.data);
      setVegetables(vegetableRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading FarmMarket Hub...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <HeroSection />

      <HighlightsSection
        vegetables={vegetables.length}
        markets={markets.length}
        prices={prices.length}
        notices={notices.length}
      />

      <LatestPricesSection prices={prices} />

      <LatestNoticesSection notices={notices} />

      <MarketsSection markets={markets} />

    </div>
  );
};

export default HomePage;