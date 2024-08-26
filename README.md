# Project Messenger

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/danikova/project-messenger)](https://github.com/danikova/project-messenger/stargazers)

**Project Messenger** is a messaging application developed as part of a Bachelor's thesis project. The application is designed to provide secure, efficient, and user-friendly communication through a real-time messaging platform. It is built with modern web technologies and offers various features for seamless user interaction.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

The Project Messenger was created as a part of my BSc thesis, aimed at developing a robust messaging application that emphasizes security and user experience. The application allows users to send and receive messages in real-time, supporting both individual and group chats. The project explores various aspects of software engineering, including front-end and back-end development, database management, and security practices.

## Features

- **Real-time Messaging**: Send and receive messages instantly with real-time updates.
- **User Authentication**: Secure user registration and login system.
- **Group Chats**: Create and manage group conversations with multiple users.
- **Message Encryption**: Ensure the privacy and security of messages with encryption.
- **File Sharing**: Share files with other users directly within the chat.
- **Notifications**: Get notified of new messages even when the app is minimized.
- **Responsive Design**: Accessible across various devices and screen sizes.

## Technologies Used

- **Frontend**: React, Redux, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.IO
- **File Storage**: Multer, GridFS

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/danikova/project-messenger.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd project-messenger
   ```
3. **Install the required dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables (e.g., database connection string, JWT secret).

5. **Run the application**:
   ```bash
   npm start
   ```
6. **Access the application**:
   - The app should be running at `http://localhost:3000`.

## Usage

- **Sign Up/Login**: Register a new account or log in with existing credentials.
- **Start a Chat**: Select a user to start a one-on-one conversation or create a group chat.
- **Send Messages**: Type your message in the chat window and hit enter to send it.
- **File Sharing**: Use the attachment button to share files in the chat.
- **Group Management**: Add or remove users from group chats as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- Special thanks to my mentors, professors, and fellow students who supported me throughout this project.
