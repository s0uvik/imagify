import Description from "../components/Description";
import HeroSection from "../components/HeroSection";
import StepsToCreate from "../components/StepsToCreate";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StepsToCreate />
      <Description />
      <Testimonials />
    </div>
  );
};

export default Home;
