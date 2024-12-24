import HeroBanner from '../components/HeroBanner';
import FeaturedExams from '../components/FeaturedExams';
import '../styles/Homepage.css';
import Navbar from '../components/Navbar';
import LiveUpdates from '../components/LiveUpdates';

const Homepage = ({isAuthenticated}) => {
  return (
    <div className="homepage">
      <HeroBanner />
      <Navbar
        isAuthenticated={isAuthenticated}
      />
      <LiveUpdates />
    </div>
  );
};

export default Homepage;
