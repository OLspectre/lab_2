
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
    status ENUM("pending", "completed") DEFAULT "pending",
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password) VALUES
("Yoman1964", "example1"),
("BurntPeanut", "example2"),
("Patapim77", "example2");

INSERT INTO tasks (title, description, status, user_id) VALUES
("The SQL Initiation", "Write a query to fetch your first user from the shadows of the database.", "completed", 1),
("Sanitize the Input", "Implement a validation layer to prevent the 'Little Bobby Tables' disaster.", "pending", 1),
("Async Awakening", "Refactor a blocking function to embrace the non-blocking power of Async/Await.", "completed", 3),
("The CRUD Ritual", "Complete the cycle of creation, reading, updating, and ultimate destruction.", "pending", 3),
("Complete the cycle of creation, reading, updating, and ultimate destruction.", "Forge a secure token to allow passage through the protected API gates.", "pending", 3);