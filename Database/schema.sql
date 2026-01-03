show databases;
use chatbot_db;
show tables;


CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_message TEXT,
    bot_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

desc chat_history;
select * from chat_history;