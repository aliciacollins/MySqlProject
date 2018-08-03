drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
	item_id int(3) zerofill not null auto_increment,
    product_name varchar(40) not null,
    department_name varchar(40),
    price decimal(6,2) not null,
    stock integer not null,
    primary key (item_id)
    );

insert into products(product_name, department_name, price, stock)
values
("Yeti Tumbler", "Sporting Goods", 35.99, 25),
("Canon Camera", "Electronics", 199.99, 5),
("Kate Spade bag", "Fashion", 64.99, 15),
("Tory Burch bag", "Fashion", 125.99, 9),
("Yeti Roadie", "Sporting Goods", 199.99, 15),
("HP Labtop", "Electronics", 1299.99, 17),
("Golf Clubs", "Sporting Goods", 599.99, 35),
("Hudson Jeans", "Fashion", 145.99, 6),
("Xbox One X", "Electronics", 499.02, 47),
("Golf Shoes", "Sporting Goods", 54.55, 18)