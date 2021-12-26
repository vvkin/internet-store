CREATE TABLE categories (
    id serial PRIMARY KEY,
    parent_int int REFERENCES categories,
    name varchar(120) NOT NULL UNIQUE
);

CREATE TABLE countries (
    id serial PRIMARY KEY,
    name varchar(120) NOT NULL UNIQUE
);

CREATE TABLE suppliers (
    id serial PRIMARY KEY,
    country_id int REFERENCES countries,
    company_name varchar(120) NOT NULL UNIQUE,
    contact_name varchar(30) NOT NULL,
    email varchar(255) NOT NULL UNIQUE
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    supplier_id int REFERENCES suppliers NOT NULL,
    category_id int REFERENCES categories NOT NULL,
    name varchar(120) NOT NULL UNIQUE,
    price numeric(15, 6) NOT NULL,
    volume real NOT NULL,
    degree smallint NOT NULL,
    units_in_stock int NOT NULL,
    discount real,
    description text
);

CREATE TABLE delivery_methods (
    id serial PRIMARY KEY,
    name varchar(120) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id serial PRIMARY KEY,
    delivery_method_id int REFERENCES delivery_methods NOT NULL,
    full_name varchar(255) NOT NULL,
    phone varchar(24) NOT NULL,
    address varchar(50) NOT NULL,
    required_date timestamp,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    is_confirmed boolean DEFAULT false,
    is_paid boolean DEFAULT false
);

CREATE TABLE order_details (
    id serial PRIMARY KEY,
    product_id int REFERENCES products NOT NULL,
    order_id int REFERENCES orders NOT NULL,
    quantity int DEFAULT 1
);

INSERT INTO categories (name) VALUES ('beer'), ('wine'), ('liquor');

INSERT INTO countries (name) VALUES ('Ukraine'), ('France'), ('Italy'), ('England'), ('USA');

INSERT INTO suppliers (country_id, company_name, contact_name, email)
VALUES (1, 'Obolon', 'Bogdan Kravchuk', 'bogdankravchuk@gmail.com'),
       (1, 'Nemiroff', 'Vasyl Shevchenko', 'vasylshevschenko@gmail.com'),
       (2, 'Paris', 'Rene Monet', 'renemonet@gmail.com'),
       (2, 'LaLaurent', 'Bernadette Moulin', 'bernadettemoulin@gmail.com'),
       (3, 'Dante', 'Dionigi Gastone', 'dionigigastone@gmail.com'),
       (3, 'Viva', 'Angela Giovanni', 'angelagiovanni')
;

INSERT INTO products (supplier_id, category_id, name, price, volume, degree, units_in_stock, discount, description)
VALUES (1, 1, 'Obolon Magnat', 2.79, 500, 5.2, 212, 0.0, 'A glass of Magnat beer is sure to give an atmosphere of exquisteness to any occasion. Before serving a bottle of Magnat, it has to be chilled till the word Obolon becomes visible on the bottle label.'),
       (2, 2, 'Nemiroff Honey Pepper Vodka', 18.99, 750, 40, 123, 0.0, 'Nemiroff Ukrainian Honey Pepper is a liqueur made to a 600-year-old Ukrainian recipe. It has a balanced mixture of herbs, natural honey, and chili pepper. The piquancy of the drink favorably contrasts with soft honey accents, creating an explosive wave of rich flavor from the first sip and leaving a soft tender aftertaste.'),
       (3, 2, 'Luc Belaire Luxe French Rosé', 32.99, 750.0, 12.5, 12, 0.1, 'An ideal complement to the rest of the Belaire range, Luxe Rosé is made with a perfectly-balanced blend of Syrah, Grenache, and Cinsault from France’s best terroir and crafted by hand at our historic estate on the beautiful French Riviera. '),
       (4, 3, 'Dewar''s Signature', 197.51, 750.0, 40, 3, 0.0, 'Deep golden amber. Rich, fruity and mellow with notes of rich fruits and honey with vanilla and toffee overtones. '),
       (5, 1, 'Lagunitas DayTime IPA', 2.30, 500.0, 4, 323, 0.1, '98 calories. 4% ABV. Built for the Day. Light in the things that weigh you down, yet crisp & hop-forward.'),
       (6, 3, 'Montelobos Tobala Mezcal', 105.13, 750.0, 46.9, 23, 0.1, 'Born from centuries of mezcalero craft and enlightened by the methodical pursuit of perfection, Montelobos Tobala is an unaged joven mezcal, crafted from meticulously cultivated agave, which is roasted underground, wild fermented and small batch.')
;

INSERT INTO delivery_methods (name) VALUES ('pickup'), ('courier');

CREATE INDEX idx_products_price ON products (price);

CREATE EXTENSION pg_trgm;

CREATE INDEX trgm_idx_products_name ON products USING gin (name gin_trgm_ops);

CREATE INDEX trgm_idx_products_description ON products USING gin (description gin_trgm_ops);
