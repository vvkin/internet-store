CREATE TABLE products (
    id serial PRIMARY KEY,
    external_name varchar(120) DEFAULT 'FIRST' NOT NULL,
    name varchar(120) UNIQUE NOT NULL,
    price numeric(15, 4) NOT NULL,
    description text
);

INSERT INTO products (name, price, description)
VALUES ('Bud Light', 1.10, 'Introduced in 1982, Bud Light is a premium light lager with a superior drinkability that has made it the best-selling and most popular beer in the United States.'),
       ('Michelob Ultra', 1.75, 'Michelob ULTRA is the superior light beer with no artificial colors or flavors. With just 2.6 carbs and 95 calories, you can enjoy the crisp, clean taste of Michelob ULTRA without compromising your active lifestyle.'),
       ('Stella Artois', 0.99, 'Enjoy 600 years of brewing heritage. True to the time-honored recipe, Stella Artois is crafted with three ingredients–saaz hops, malted barley, and water.'),
       ('Budweiser', 1.00, 'Budweiser beer is a medium-bodied, American-style lager beer. Brewed with high quality barley malt, a blend of premium hop varieties, fresh rice and filtered water, this American beer is crisp and full of flavor.'),
       ('Heineken Lager', 1.69, 'Smooth, nicely blended bitterness, clean finish. Wherever you go in the world, it’s always refreshing to see something you recognize. That green bottle, the red star, the smiling ‘e’… like an instant welcome from an old friend. Cold, fresh, high quality Heineken. Enjoyed near and far since 1873.'),
       ('La Marca Prosecco', 16.99, 'Our delicate La Marca Prosecco has a pale, golden straw color and sparkles with lively effervescence.'),
       ('Apothic Red', 11.49, 'Apothic Red is the bold and intriguing red blend that launched the Apothic legacy, featuring a mix of merlot, cabernet sauvignon, syrah, and zinfandel wine grapes.'),
       ('Whispering Angel Rosé', 23.50, 'Whispering Angel is today’s worldwide reference for Provence rosé. Its pale color is pleasing to the eye and draws one in.'),
       ('Taylor Port', 7.34, 'A rich, fruity taste and smooth finish that is excellent with dessert. It is a moderately sweet, ruby red port and is perfect for evening sipping.'),
       ('Barefoot Pinot Grigio', 6.99, 'Tart green apple flavors get down with a white peach undertone. Floral blossoms and citrus aromas do the tango. Barefoot’s Pinot Grigio is light-bodied with a bright finish.'),
       ('Smirnoff No. 21 Vodka', 18.99, 'Whether you sip it on the rocks or with soda and a twist, Smirnoff No. 21 is the perfect addition to a cocktail party. Our award-winning, 80 proof vodka has robust flavor with a dry finish for ultimate smoothness and clarity.'),
       ('Bulleit Bourbon', 41.99, 'Bulleit Bourbon is inspired by the whiskey that was pioneered by Augustus Bulleit over 150 years ago. Only ingredients of the very highest quality are used.'),
       ('Ketel One Vodka', 26.99, 'Experience the taste inspired by traditional distilling expertise with Ketel One Family Made Vodka'),
       ('Jameson Irish Whiskey', 29.99, 'Perhaps the most notable whiskey on earth, Jameson Irish Whiskey is a crisp, sippable drink that has stood the test of time.'),
       ('Don Julio 1942', 179.99, 'Don Julio 1942 Añejo Tequila is handcrafted in tribute to the year that Don Julio González began his tequila-making journey.')
;
