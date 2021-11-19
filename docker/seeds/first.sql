CREATE TABLE products (
    id serial PRIMARY KEY,
    name varchar(120) UNIQUE NOT NULL,
    price numeric(15, 4) NOT NULL,
    description text
);

INSERT INTO products (name, price)
VALUES ('Bud Light', 1.10),
       ('Michelob Ultra', 1.75),
       ('Stella Artois', 0.99),
       ('Budweiser', 1.00),
       ('Heineken Lager', 1.69),
       ('La Marca Prosecco', 16.99),
       ('Apothic Red', 11.49),
       ('Whispering Angel Rosé', 23.50),
       ('Taylor Port', 7.34),
       ('Barefoot Pinot Grigio', 6.99),
       ('Smirnoff No. 21 Vodka', 18.99),
       ('Bulleit Bourbon', 41.99),
       ('Ketel One Vodka', 26.99),
       ('Jameson Irish Whiskey', 29.99),
       ('Don Julio 1942', 179.99)
;
