import { useEffect, useState } from "react";
import styles from "./products.module.css";
import { List, Badge, Card, Image, Rate, Typography, Button } from "antd";
const Products = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products, "m");
        setItems(data.products);
      });
  }, []);

  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className={styles.itemCardBadge}
              text={product.discountPercentage}
              color="pink"
            >
              <Card
                className={styles.itemCard}
                title={product.title}
                key={index}
                cover={
                  <Image
                    className={styles.itemCardImage}
                    src={product.thumbnail}
                  />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCartItem />
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      price : ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};
function AddToCartItem() {
  return <Button type="link">Add to Cart</Button>;
}

export default Products;
