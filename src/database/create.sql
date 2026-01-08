
CREATE DATABASE task_manager;
USE task_manager;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL
)

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description TEXT,
    status DEFAULT "pending",
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
)