import HeroBanner from "../components/HeroBanner";
import Features from "../components/Features";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Features />
      <Categories />
      <HowItWorks />
      <Footer />
    </>
  );
}