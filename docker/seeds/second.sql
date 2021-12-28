CREATE TABLE products (
    id serial PRIMARY KEY,
    external_name varchar(120) DEFAULT 'SECOND' NOT NULL,
    name varchar(120) UNIQUE NOT NULL,
    price numeric(15, 4) NOT NULL,
    description text
);

INSERT INTO products (name, price, description)
VALUES ('Sierra Nevada Pale Ale', 1.99, 'Pale Ale sparked the American craft beer revolution. Bold and complex with pine and citrus notes from whole-cone Cascade hops.'),
       ('Yuengling Traditional Lager', 2.49, 'Yuengling Lager is an iconic American lager famous for its rich amber color and medium-bodied flavor. Roasted caramel malt adds subtle sweetness, while a combination of cluster and cascade hops round out this well-balanced beer. Drink this classic lager chilled, either in a beer mug or straight from the bottle.'),
       ('Lagunitas Maximus', 8.99, 'Kinda like our IPA on steroids… Flavor so hoppy it threatens to remove the enamel from one''s teeth.'),
       ('Corona Hard Seltzer Gluten', 10.99, 'A tasty spiked seltzer water with a splash of natural flavor, Corona Hard Seltzer is a zero carb, alcoholic seltzer water with Corona''s chill attitude and premium quality'),
       ('Corona Light Mexican Lager Light Beer', 3.38, 'Corona Premier Mexican Lager Beer is the light beer experience you desire, offering an exceptionally smooth taste with fewer calories than both Corona Extra and Corona Light'),
       ('Matua Marlborough Sauvignon Blanc', 12.09, 'Perfect for a fun, uplifting get-together. Explore the pioneer in New Zealand Sauvignon Blanc,a balanced mouthfeel packed with crisp citrus notes and a hint of vibrant passionfruit and basil.'),
       ('19 Crimes Snoop Cali Rosé', 12.99, 'Ripe strawberry notes along with delicate floral and rose petal aromas. Fruit-forward notes of fresh raspberry, strawberry, and red cherry. Pleasant mouthfeel with balanced acidity and sweetness.'),
       ('La Crema Sonoma Coast Chardonnay', 19.99, 'A round, light, and balanced Chardonnay from Califorina''s cool Sonoma Coast. Apricot, lemon, Gala apple, subtle oak and spice aromas. Lemon drop, white stonefruit yellow plum and honeydew melon on the palate. Richly textured and concentrated with balanced acidity that drives a lingering finish.'),
       ('Veuve Clicquot Brut Yellow Label Champagne', 60.00, 'Veuve Clicquot Yellow Label is the signature champagne of the House. Dominated by Pinot Noir, it offers a perfect balance of structure and finesse.'),
       ('Carpano Antica Formula Vermouth', 36.99, 'Carpano''s Antica Formula, from the original recipe developed by Antonio Benedetto Carpano in 1786, is a sweet vermouth of the highest quality.'),
       ('Ketel One Vodka', 26.99, 'Experience the taste inspired by traditional distilling expertise with Ketel One Family Made Vodka. Our 80 proofvodka is carefully crafted using exclusively 100% non-GMO European wheat for smoothness and neutrality.'),
       ('Captain Morgan Original Spiced Rum', 25.19, 'Captain Morgan is the original party spirit, a spiced rum that was born and blended to have agood time. So grab a bottle of Captain Morgan Spiced Rum, raise a leg, and toast to the adventure to be had. Captain’s orders!'),
       ('Jack Daniel''s Tennessee Honey', 37.99, 'ack Daniel’s Tennessee Honey is a blend of Jack Daniel’s Tennessee Whiskey and a unique honey liqueur of our own making, for a taste that’s one-of-a-kind and unmistakably Jack. With hints of honey and a finish that’s naturally smooth, Jack Daniel’s Tennessee Honey is something special.'),
       ('Jameson Black Barrel', 49.49, 'A bright amber hue in the glass, Jameson Black Barrel offers butterscotch and maple notes in the perfume. Flavors of green apple, butterscotch and mineral are evoked on the palate, with a salt caramel finish.'),
       ('Fireball Cinnamon Whisky', 21.46, 'Fireball Cinnamon Whisky needs no introduction. Just imagine what it feels like to stand face-to-face with a fire-breathing dragon who just ate a whisky barrel full of spicy cinnamon. Tastes like heaven, burns like hell. What happens next is up to you.')
;