import Description from "../components/Description";
import GenerateBtn from "../components/GenerateBtn";
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
      <GenerateBtn />
    </div>
  );
};

export default Home;
