import "../../../assets/css/style.base.css";
import React from "react";

const Notifications = () => {
  const notificationsList = [
    {
      headline: "Package Successful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      timestamp: "21 Feb - 08:53 AM",
      status: "success"
    },
    {
      headline: "Package Successful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      timestamp: "21 Feb - 08:53 AM",
    },
    {
      headline: "Package Successful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      timestamp: "21 Feb - 08:53 AM",
    },
    {
      headline: "Package Successful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo invent veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      timestamp: "21 Feb - 08:53 AM",
    },
  ];

  return (
    <div className="notifications-view">
        <div className="notifications-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', color: '#fff' }}>
            <i className="bi bi-arrow-left" style={{ fontSize: '28px', cursor: 'pointer' }}></i>
            <h2 className="notifications-title" style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>Notifications</h2>
        </div>
      {/* <div className="notifications-card"> */} 
        {/* The screenshot shows a list of cards, not one big card wrapping them. 
            The extracted code had a notifications-card wrapper. 
            However, looking at the screenshot, each notification is a card.
            The extracted code map function creates `notification-item`.
            I will trust the extracted code structure for the list but maybe adjust the header.
        */}
        
        <div className="notifications-list">
          {notificationsList.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-header">
                <h3 className="notification-headline">
                  {notification.headline}
                  {index === 0 && <span className="notification-indicator" style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#2ecc71', borderRadius: '50%', marginLeft: '10px' }}></span>}
                </h3>
              </div>
              <p className="notification-description">
                {notification.description}
              </p>
              <p className="notification-timestamp">
                {notification.timestamp}
              </p>
            </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Notifications;
