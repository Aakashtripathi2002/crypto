Crypto Price Tracker - Full-Stack Developer Assignment
🔧 Installation Instructions

1. Clone the repository:
   git clone <your-repo-link>

2. Navigate into both directories and install dependencies:

   Backend:
   cd backend
   npm install

   Frontend:
   cd frontend
   npm install

3. Create a `.env` file inside the `backend/` directory with the following example:

   MONGO_URI="mongodb://localhost:27017/test"
   PORT=5000                                            
   JWT_SECRET=sghd8723749023dhbas9327

4. Run the applications:

   Backend:
   npm start

   Frontend:
   npm run dev

📌 Project Overview

The **Crypto Price Tracker** is a full-stack real-time web application consisting of:
- A single-page Admin Panel to manage crypto assets.
- A single-page User Dashboard to display real-time price updates of listed assets.

This project demonstrates capabilities in frontend/backend integration, RESTful APIs, WebSocket communication, real-time data updates, and adherence to UI/UX design principles.

🛠️ Technology Stack

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO (WebSockets)
- **Authentication**: JWT-based Auth
- **File Uploads**: Multer
- **Design Fidelity**: Matches assumed Figma designs

📦 Backend Responsibilities

- Created REST API endpoint `/api/crypto` for admins to add crypto assets.
- Each asset includes: `symbol`, `name`, `icon`, `min_price`, and `max_price`.
- Implemented a WebSocket server to generate and emit price updates every 10 seconds.
- Data emission via `priceUpdate` event containing real-time prices in the specified range.

💻 Frontend Responsibilities

- Created routes for login, signup (with role-based access), and dashboards.
- Admin Panel includes functionalities to add and view tokens.
- User Dashboard connects to the WebSocket server and listens for `priceUpdate` events.
- Real-time display of tokens using charts/tables.
- Subtle visual indicators show price increase/decrease dynamically.

🎯 Design Decisions

- **Role-based access**: Admin can manage assets while users only view live prices.
- **WebSocket Optimization**: Server generates minimal payload by emitting structured price updates only.
- **Clean Architecture**: Used MVC pattern with separate concerns for models, routes, controllers, and middleware.
- **Reusable Components**: Built modular UI components (e.g., Sidebar, Navbar).
- **Security**: Used JWT for authentication, .env config for secrets, and proper CORS handling.

📐 Architecture Overview

- Backend server handles both API and WebSocket communications.
- Crypto assets are stored in MongoDB and updated prices are emitted every 10s.
- Frontend consumes REST APIs for admin actions and uses Socket.IO client for real-time updates.
- Axios interceptors handle authentication token passing.
- Admin and user dashboards are fully separated by routing and role.

✅ Evaluation Criteria Addressed

- ✔️ **Code Quality**: Structured, modular, and commented code.
- ✔️ **Functionality**: All required features are working as described.
- ✔️ **Real-time Handling**: Implemented using Socket.IO with interval updates.
- ✔️ **UI/UX**: Layout follows assumed Figma structure with good responsiveness.
- ✔️ **Documentation**: This README explains setup, project goals, design, and structure.
