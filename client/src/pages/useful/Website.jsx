import React, { useState } from "react";
import { Card, Col, Row, Typography, Button, Modal, Input, Form, Tag, Tooltip, Space, Divider, Avatar } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined, AppstoreOutlined, CodeOutlined, GlobalOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Website = () => {
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isWebsiteModalVisible, setWebsiteModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([
        {
            title: "UI/UX",
            color: "#722ed1",
            icon: "AppstoreOutlined",
            websites: [
                { name: "Korea Web Design", description: "Tham khảo thiết kế UI/UX", url: "https://koreawebdesign.com/" },
                { name: "Behance", description: "Showcase and discover creative work.", url: "https://www.behance.net" },
            ],
        },
        {
            title: "ITBA",
            color: "#13c2c2",
            icon: "CodeOutlined",
            websites: [
                { name: "Stack Overflow", description: "A community for developers to learn and share knowledge.", url: "https://stackoverflow.com" },
                { name: "GitHub", description: "A platform for hosting and reviewing code.", url: "https://github.com" },
            ],
        },
        {
            title: "Linh tinh",
            color: "royalblue",
            icon: "CodeOutlined",
            websites: [
                { name: "StudyFoc.us", description: "Pomodoro", url: "https://studyfoc.us./pomodoro" },
                { name: "Rổ Phim", description: "Cứ tưởng đang dùng Netflix", url: "https://www.rophim.li/phimhay" },
            ],
        },
    ]);

    const getIcon = (iconName) => {
        const icons = {
            AppstoreOutlined: <AppstoreOutlined />,
            CodeOutlined: <CodeOutlined />,
            GlobalOutlined: <GlobalOutlined />,
        };
        return icons[iconName] || <GlobalOutlined />;
    };

    const showCategoryModal = () => {
        form.resetFields();
        setCategoryModalVisible(true);
    };

    const showWebsiteModal = (category) => {
        form.resetFields();
        setCurrentCategory(category);
        setWebsiteModalVisible(true);
    };

    const handleCancel = () => {
        setCategoryModalVisible(false);
        setWebsiteModalVisible(false);
        setCurrentCategory(null);
        form.resetFields();
    };

    const handleCreateCategory = (values) => {
        const newCategory = {
            title: values.categoryName,
            color: "#1890ff",
            icon: "GlobalOutlined",
            websites: [],
        };
        setCategories([...categories, newCategory]);
        handleCancel();
    };

    const handleAddWebsite = (values) => {
        const updatedCategories = categories.map((cat) => {
            if (cat.title === currentCategory.title) {
                return {
                    ...cat,
                    websites: [
                        ...cat.websites,
                        {
                            name: values.websiteName,
                            description: values.description,
                            url: values.url,
                        },
                    ],
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
        handleCancel();
    };

    const handleDeleteWebsite = (categoryTitle, websiteIndex) => {
        const updatedCategories = categories.map((cat) => {
            if (cat.title === categoryTitle) {
                return {
                    ...cat,
                    websites: cat.websites.filter((_, idx) => idx !== websiteIndex),
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
    };

    return (
        // <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
        <Card bordered={false} style={{ maxWidth: 1400, margin: "0 auto" }}>
            {/* Header */}
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                        <Title level={2} style={{ margin: 0 }}>
                            <GlobalOutlined /> Useful Websites
                        </Title>
                        <Text type="secondary">Manage your favorite websites in one place</Text>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={showCategoryModal}
                    >
                        Create Category
                    </Button>
                </div>

                <Divider />

                {/* Categories */}
                {categories.map((category, index) => (
                    <div key={index}>
                        <Card
                            size="small"
                            style={{ marginBottom: 24, background: `${category.color}08` }}
                            bordered={false}
                        >
                            <Space style={{ width: "100%", justifyContent: "space-between", flexWrap: "wrap" }}>
                                <Space>
                                    <Avatar
                                        size={48}
                                        style={{ backgroundColor: category.color }}
                                        icon={getIcon(category.icon)}
                                    />
                                    <div>
                                        <Title level={4} style={{ margin: 0, color: category.color }}>
                                            {category.title}
                                        </Title>
                                        <Text type="secondary">{category.websites.length} websites</Text>
                                    </div>
                                </Space>
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => showWebsiteModal(category)}
                                >
                                    Add Website
                                </Button>
                            </Space>
                        </Card>

                        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
                            {category.websites.map((website, idx) => (
                                <Col key={idx} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable
                                        actions={[
                                            <Tooltip title="Edit" key="edit">
                                                <EditOutlined />
                                            </Tooltip>,
                                            <Tooltip title="Delete" key="delete">
                                                <DeleteOutlined
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteWebsite(category.title, idx);
                                                    }}
                                                />
                                            </Tooltip>,
                                            <Tooltip title="Open" key="open">
                                                <LinkOutlined
                                                    onClick={() => window.open(website.url, "_blank")}
                                                />
                                            </Tooltip>,
                                        ]}
                                        onClick={() => window.open(website.url, "_blank")}
                                    >
                                        <Card.Meta
                                            avatar={
                                                <Avatar
                                                    size={48}
                                                    style={{ backgroundColor: `${category.color}30`, color: category.color }}
                                                >
                                                    {website.name.charAt(0)}
                                                </Avatar>
                                            }
                                            title={website.name}
                                            description={
                                                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                                    <Paragraph
                                                        ellipsis={{ rows: 2 }}
                                                        style={{ margin: 0 }}
                                                    >
                                                        {website.description}
                                                    </Paragraph>
                                                    <Tag icon={<LinkOutlined />} color="blue">
                                                        {new URL(website.url).hostname.replace('www.', '')}
                                                    </Tag>
                                                </Space>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Space>

            {/* Modal for creating category */}
            <Modal
                title="Create New Category"
                open={isCategoryModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreateCategory}
                >
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[{ required: true, message: "Please input the category name!" }]}
                    >
                        <Input placeholder="Enter category name" size="medium" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal for adding website */}
            <Modal
                title={`Add Website to ${currentCategory?.title || ""}`}
                open={isWebsiteModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddWebsite}
                >
                    <Form.Item
                        label="Website Name"
                        name="websiteName"
                        rules={[{ required: true, message: "Please input the website name!" }]}
                    >
                        <Input placeholder="Enter website name" size="large" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Enter website description" rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="URL"
                        name="url"
                        rules={[
                            { required: true, message: "Please input the website URL!" },
                            { type: "url", message: "Please enter a valid URL!" }
                        ]}
                    >
                        <Input
                            placeholder="https://example.com"
                            size="large"
                            prefix={<LinkOutlined />}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Add</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
        // </div>
    );
};

export default Website;