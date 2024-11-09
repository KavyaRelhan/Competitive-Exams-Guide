
const announcements = [
  "JEE Main application process starts from Dec 2023.",
  "UPSC CSE Prelims scheduled for June 2, 2024.",
  "NEET results to be announced soon.",
];

const Announcements = () => {
  return (
    <div className="announcements">
      <h2>Announcements & Updates</h2>
      <div className="announcements-list">
        {announcements.map((announcement, index) => (
          <p key={index}>{announcement}</p>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
