import HeroBanner from '../components/HeroBanner';
import FeaturedExams from '../components/FeaturedExams';
import Announcements from '../components/Announcements';
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
      <Announcements />
    </div>
  );
};

export default Homepage;
