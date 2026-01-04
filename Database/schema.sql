show databases;
use chatbot_db;
show tables;


CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_message TEXT,
    bot_reply TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chats(
	id int auto_increment primary key,
    created_at timestamp default current_timestamp
);

desc chats;

CREATE TABLE messages(
	id int auto_increment primary key,
    chat_id int not null,
    role enum('user','bot') not null,
    text TEXT not null,
    created_at timestamp default current_timestamp,
    foreign key(chat_id) references chats(id) on delete cascade
    
);

desc messages;
desc chat_history;
select * from chat_history;