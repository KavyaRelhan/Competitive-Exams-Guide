import HeroBanner from '../components/HeroBanner';
import FeaturedExams from '../components/FeaturedExams';
import '../styles/Homepage.css';
import Navbar from '../components/Navbar';
import LiveUpdates from '../components/LiveUpdates';

const Homepage = ({isAuthenticated, setIsAuthenticated}) => {
  return (
    <div className="homepage">
      <HeroBanner />
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <LiveUpdates />
    </div>
  );
};

export default Homepage;
