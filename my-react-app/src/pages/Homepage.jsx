import HeroBanner from '../components/HeroBanner';
import FeaturedExams from '../components/FeaturedExams';
import Announcements from '../components/Announcements';
import '../styles/Homepage.css';
import Navbar from '../components/Navbar';

const Homepage = () => {
  return (
    <div className="homepage">
      <HeroBanner />
      <Navbar/>
      <FeaturedExams />
      <Announcements />
    </div>
  );
};

export default Homepage;
