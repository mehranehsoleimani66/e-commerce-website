import { Menu, Typography, Badge, Drawer, Table, InputNumber } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../API";

const Header = () => {
  const navigate = useNavigate();

  const menuOnClick = (item) => {
    navigate(`${item.key}`);
  };

  return (
    <div className={styles.container}>
      <Menu
        onClick={menuOnClick}
        className={styles.menu}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: ""
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts"
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes"
              },
              {
                label: "Men's Watches",
                key: "mens-watches"
              }
            ]
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses"
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes"
              },
              {
                label: "Women's Watches",
                key: "womens-watches"
              },
              {
                label: "Women's Bags",
                key: "womens-bags"
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery"
              }
            ]
          },
          {
            label: "Fragrances",
            key: "fragrances"
          }
        ]}
      />
      <Typography.Title>Mehii Shop</Typography.Title>
      <AppCart />
    </div>
  );
};
const AppCart = () => {
  const [openDraw, setOpenDraw] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  return (
    <div>
      <Badge
        count={9}
        className={styles.cartIcon}
        onClick={() => setOpenDraw(true)}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={openDraw}
        onClose={() => setOpenDraw(false)}
        title="your cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            { title: "Title", dataIndex: "title" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              }
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              }
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              }
            }
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((a, b) => {
              return a + b.total;
            }, 0);
            return <span>Total: ${total}</span>;
          }}
        />
      </Drawer>
    </div>
  );
};

export default Header;
