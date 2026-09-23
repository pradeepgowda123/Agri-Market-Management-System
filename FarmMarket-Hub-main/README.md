# FarmMarket Hub

FarmMarket Hub is a full-stack web application designed to provide a centralized platform for managing and accessing agricultural market information. The application enables administrators to manage vegetables, agricultural markets, daily commodity prices, and public notices, while allowing farmers and other users to easily access current market information.

## Features

### Public Portal

- View daily vegetable prices across different markets
- Search prices by vegetable name
- Filter market prices by district and market
- Browse available agricultural markets
- View important market notices and announcements
- Responsive public-facing interface

### Admin Portal

- Secure admin authentication
- Dashboard with real-time system statistics
- Manage vegetables
- Manage agricultural markets
- Add, update, and delete daily market prices
- Create and manage public notices
- View recent price updates and latest notices
- Quick navigation for common administrative actions

## Technology Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Project Structure

```text
FarmMarket-Hub/
│
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── public/
│   │   ├── services/
│   │   ├── routes/
│   │   └── ...
│   │
│   └── package.json
│
├── server/                     # Node.js and Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   └── ...
│
└── README.md
```

## Key Functionality

FarmMarket Hub separates administrative operations from public access to provide a clear and organized user experience.

- **Administrators** manage vegetables, markets, daily prices, and notices through a dedicated admin portal.
- **Public users** can access current market prices, browse markets, and view important notices without requiring administrative access.
- The application uses RESTful APIs to connect the React frontend with the Express.js and MongoDB backend.

## Future Enhancements

- Historical price analysis and trend visualization
- Advanced filtering and sorting options
- Improved mobile responsiveness
- Data export functionality
- Cloud deployment
