import {
  Menu,
  Typography,
  Badge,
  Form,
  Drawer,
  Input,
  Checkbox,
  message,
  Image,
  Button,
  Table,
  InputNumber
} from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const menuOnClick = (item) => {
    navigate(`${item.key}`);
  };

  return (
    <div className={styles.container}>
      <Image width={200} src="../images/logo.png" />

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

      <AppCart />
    </div>
  );
};
const AppCart = () => {
  const [openDraw, setOpenDraw] = useState(false);
  const [checkOutDrawer, setCheckOutDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const getCart = () => {
    return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
  };

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const confirmOrders = (values) => {
    console.log({ values });
    setOpenDraw(false);
    setCheckOutDrawer(false);
    message.success("Your order has been placed successfully.");
  };

  return (
    <div>
      <Badge
        count={cartItems.length}
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
        <Button onClick={() => setCheckOutDrawer(true)} type="primary">
          checkout your cart
        </Button>
      </Drawer>
      <Drawer open={checkOutDrawer} onClose={() => setCheckOutDrawer(false)}>
        <Form onFinish={confirmOrders}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please Enter Your Full Name..."
              }
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please Enter Your Email..."
              }
            ]}
          >
            <Input placeholder="Enter your Valid Email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please Enter Your Address."
              }
            ]}
          >
            <Input placeholder="Enter Your Address" />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            {" "}
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Your Orders
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Header;
