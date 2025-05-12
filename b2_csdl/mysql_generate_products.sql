-- MYSQL

USE db_ecom;

DROP TABLE IF EXISTS products

-- Bảng products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    manufacturer VARCHAR(255),
    attributes JSON
);

DELIMITER $$

CREATE PROCEDURE generate_products()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE product_name VARCHAR(255);
  DECLARE manu_name VARCHAR(255);
  DECLARE price_val DECIMAL(10,2);
  DECLARE json_attr JSON;

  WHILE i <= 5000000 DO
    SET product_name = CONCAT('Product ', i);
    SET price_val = ROUND(RAND() * 10000 + 100, 2);  -- Giá từ 100 đến 10000
    SET manu_name = ELT(FLOOR(1 + (RAND() * 5)), 'Apple', 'Samsung', 'Dell', 'HP', 'Sony');
    SET json_attr = JSON_OBJECT('color', ELT(FLOOR(1 + (RAND() * 4)), 'red', 'blue', 'green', 'black'),
                                'warranty', ELT(FLOOR(1 + (RAND() * 3)), '6m', '12m', '24m'));

    INSERT INTO products(name, price, manufacturer, attributes)
    VALUES (product_name, price_val, manu_name, json_attr);

    SET i = i + 1;
  END WHILE;
END $$

DELIMITER ;

CALL generate_products()

SELECT *
FROM products
WHERE price < 500

CREATE INDEX price_idx ON products(price)

DROP INDEX price_idx ON products