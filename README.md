# EmployWise - Employee Management System

A modern employee management system built with React, Tailwind CSS, and the ReqRes API.

## Features

- 🔐 User Authentication (Login/Register)
- 👥 User Management
  - View all users
  - Add new users
  - Edit existing users
  - Delete users
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates
- 📊 Pagination Support

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/employeewise-fe.git
cd employeewise-fe
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Login Credentials

The application uses the ReqRes API for authentication. You can use the following credentials to log in:

```
Email: eve.holt@reqres.in
Password: cityslicka
```

## API Endpoints

The application uses the following ReqRes API endpoints:

- Login: `POST /api/login`
- Register: `POST /api/register`
- Get Users: `GET /api/users`
- Get User: `GET /api/users/:id`
- Create User: `POST /api/users`
- Update User: `PUT /api/users/:id`
- Delete User: `DELETE /api/users/:id`

## Project Structure

```
src/
├── components/
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── UserList.jsx
│   ├── EditUser.jsx
│   └── AddUser.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

## Technologies Used

- React 18
- React Router 6
- Tailwind CSS
- Axios
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ReqRes API](https://reqres.in/) for providing the mock API
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [React](https://reactjs.org/) for the UI framework
