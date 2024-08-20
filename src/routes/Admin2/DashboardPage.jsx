import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Typography, theme, Table, Modal, Form, Input, Button, Select, Upload, message } from 'antd';

import AdminImage from '../../images/logo-moho.webp';
import '../Admin2/DashboardPage.css';


const { Option } = Select;



const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
// const items1 = ['1', '2', '3'].map((key) => ({
//     key,
//     label: `nav ${key}`,
//   }));


const items2 = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Người Dùng',

    },
    {
        key: 'sub2',
        icon: <LaptopOutlined />,
        label: 'Sản Phẩm',
        children: [
            { key: 'sub2-1', label: 'Quản lý sản phẩm' },
            { key: 'sub2-2', label: 'Loại sản phẩm' },
        ],
    },
    {
        key: 'sub3',
        icon: <NotificationOutlined />,
        label: 'Đơn Hàng',

    },
];

// Sample data and columns for each subnav item
const userData = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
        phoneNumber: '1234567890'
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
        phoneNumber: '0987654321'
    },
];



const orderData = [
    {
        key: '1',
        orderId: '1234',
        customer: 'Mike',
        total: '$1200'
    },
    {
        key: '2',
        orderId: '5678',
        customer: 'John',
        total: '$800'
    },
];


const DashboardPage = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedMenuKey, setSelectedMenuKey] = useState('sub1');
    const [dataSource, setDataSource] = useState([]);
    const [form] = Form.useForm();

    const [products, setProducts] = useState([]);
    const [category, setCategories] = useState([]);













    const handleSelectChange = (value) => {
        console.log('Selected value:', value); // Kiểm tra giá trị được chọn
        form.setFieldsValue({ loaisanpham: value });
    };

    useEffect(() => {
        axios.get('http://localhost:3001/products') // Gọi API để chỉ lấy sản phẩm 
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);




    // Lấy loại sản phẩm
    useEffect(() => {
        axios.get('http://localhost:3001/categories') // Gọi API để chỉ lấy sản phẩm có id_loaisanpham = 1
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching kitchen products:', error);
            });
    }, []);


    //Thêm loại sản phẩm

    const addCategory = (categoryName) => {
        axios.post('http://localhost:3001/loaisp', { ten_loaisp: categoryName })
            .then(response => {
                // Xử lý khi request thành công
                console.log('Thêm loại sản phẩm thành công:', response.data);
                // Cập nhật state hoặc thực hiện các hành động khác sau khi thêm thành công
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Lỗi khi thêm loại sản phẩm:', error);
            });
    };

    //Thêm sản phẩm
    //Thêm sản phẩm
    const addProduct = (productData) => {
        const formData = new FormData();
        formData.append('ten_sanpham', productData.ten_sanpham);
        formData.append('mo_ta', productData.mo_ta);
        formData.append('gia', productData.gia);
        formData.append('id_loaisanpham', productData.id_loaisanpham);
        // formData.append('file', productData.file); // Thêm tệp ảnh vào FormData

        axios.post('http://localhost:3001/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Cần set header Content-Type là multipart/form-data khi gửi FormData
            }
        })
            .then(response => {
                // Xử lý khi thêm sản phẩm thành công
                console.log('Product added successfully:', response.data);
                // Cập nhật danh sách sản phẩm hoặc thực hiện các hành động khác sau khi thêm sản phẩm thành công
            })
            .catch(error => {
                // Xử lý khi có lỗi xảy ra
                console.error('Error adding product:', error);
            });
    };



 

    const handleAddModalOk = () => {
        form.validateFields().then(values => {
            if (selectedMenuKey === 'sub2-1') {
                const productData = {
                    ten_sanpham: values.ten_sanpham,
                    mo_ta: values.mo_ta,
                    gia: values.gia,
                    id_loaisanpham: values.id_loaisanpham,
                    file: values.file // Đảm bảo rằng bạn đã có giá trị của file từ form
                };
                addProduct(productData);
            } else if (selectedMenuKey === 'sub2-2') {
                const categoryName = values.ten_loaisp;
                addCategory(categoryName);
            }
            setAddModalVisible(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleEdit = (record) => {
        setRecordToEdit(record);
        form.setFieldsValue(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setRecordToDelete(record);
        setDeleteModalVisible(true);
    };

    const handleEditModalOk = () => {
        form.validateFields().then(values => {
            setDataSource(dataSource.map(item => item.key === recordToEdit.key ? { ...item, ...values } : item));
            setEditModalVisible(false);
            setRecordToEdit(null);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleDeleteModalOk = () => {
        setDataSource(dataSource.filter(item => item.key !== recordToDelete.key));
        setDeleteModalVisible(false);
        setRecordToDelete(null);
    };
    const handleModalCancel = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
    };

    const handleMenuClick = ({ key }) => {
        setSelectedMenuKey(key);
        switch (key) {
            case 'sub1':
                setDataSource(userData);
                break;
            case 'sub2-1':
                setDataSource(products);
                break;
            case 'sub2-2':
                setDataSource(category);
                break;
            case 'sub3':
                setDataSource(orderData);
                break;
            default:
                break;
        }
    };

    const handleAddNewRecord = () => {
        setAddModalVisible(true);
        form.resetFields();
    };





    // const handleAddModalOk = () => {
    //     form.validateFields().then(values => {
    //         const categoryName = values.ten_loaisp; // Lấy giá trị của trường nhập liệu loại sản phẩm
    //         addCategory(categoryName); // Gọi hàm để thêm loại sản phẩm
    //         setAddModalVisible(false); // Ẩn modal sau khi thêm thành công
    //     }).catch(info => {
    //         console.log('Validate Failed:', info);
    //     });
    // };

    const userColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const productColumns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'ten_sanpham',
            key: 'ten_sanpham',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            key: 'mo_ta',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'ID Loại sản phẩm',
            dataIndex: 'id_loaisanpham',
            key: 'id_loaisanpham',
        },
        {
            title: 'Ảnh',
            dataIndex: 'anh',
            key: 'anh',
            render: (text, record) => (
                <img src={`/images/${record.anh}`} alt={record.ten_sanpham} style={{ maxWidth: '100px' }} />
                
            ),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const CategoryColumns = [
        {
            title: 'ID',
            dataIndex: 'id_loaisanpham',
            key: 'id_loaisanpham',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'ten_loaisp',
            key: 'ten_loaisp',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const orderColumns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" icon={<EditOutlined />} style={{ marginRight: 16 }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const getColumns = () => {
        switch (selectedMenuKey) {
            case 'sub1':
                return userColumns;
            case 'sub2-1':
                return productColumns;
            case 'sub2-2':
                return CategoryColumns;
            case 'sub3':
                return orderColumns;

            default:
                return [];
        }
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo">
                    <img src={AdminImage} alt="Logo" style={{ width: '200px', marginTop: '20px' }} />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size="default" icon={<UserOutlined />} alt="User Avatar" style={{ marginRight: 16 }} />
                    <Text style={{ color: '#fff' }}>Lê Tiến Phát</Text>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} />
                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['sub1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                            onClick={handleMenuClick} // Handle menu click
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: '77vh' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNewRecord} style={{ marginBottom: 16 }}>
                            Add New
                        </Button>
                        <Table
                            dataSource={dataSource}
                            columns={getColumns()}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox',
                                onSelectAll: (selected, selectedRows, changeRows) => {
                                    console.log(selected, selectedRows, changeRows);
                                },
                            }}
                        />

                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                PTGAMING ©{new Date().getFullYear()} Created by Ant UED
            </Footer>

            <Modal
                title="Chỉnh Sửa"
                visible={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub1' && (
                        <>
                            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="ten_sanpham" label="Tên sản phẩm" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true, message: 'Please input the price!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="id_loaisanpham" label="Loại sản phẩm" rules={[{ required: true, message: 'Please input the stock!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="anh" label="anh" rules={[{ required: true, message: 'Please input the stock!' }]}>
                            <Upload
                                  
                                  >
                                      <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                  </Upload>
                            </Form.Item>
                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <Form.Item name="ten_loaisanpham" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                            <Input />
                        </Form.Item>
                    )}

                    {selectedMenuKey === 'sub3' && (
                        <>
                            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Please input the order ID!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="customer" label="Customer" rules={[{ required: true, message: 'Please input the customer!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="total" label="Total" rules={[{ required: true, message: 'Please input the total!' }]}>
                                <Input />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            <Modal
                title="Xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleModalCancel}
            >
                <p>Bạn có chắc chắn muốn xóa bản ghi này không?</p>
            </Modal>

            <Modal
                title="Thêm Mới"
                visible={addModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {selectedMenuKey === 'sub2-1' && (
                        <>
                            <Form.Item name="ten_sanpham" label="Tên sản phẩm" rules={[{ required: true, message: 'Please input the name!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="mo_ta" label="Mô tả" rules={[{ required: true, message: 'Please input the description!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="gia" label="Giá" rules={[{ required: true, message: 'Please input the price!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="id_loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    placeholder="Chọn loại sản phẩm"
                                    onChange={handleSelectChange}
                                >
                                    {category.map((category) => (
                                        <Option key={category.id_loaisanpham} value={category.id_loaisanpham}>
                                            {category.ten_loaisp}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="file" label="Ảnh" rules={[{ required: true, message: 'Vui lòng tải lên một hình ảnh!' }]}>
                                <Upload
                                  
                                >
                                    <Button icon={<UploadOutlined />}>Click để tải lên</Button>
                                </Upload>
                            </Form.Item>



                        </>
                    )}
                    {selectedMenuKey === 'sub2-2' && (
                        <Form.Item name="ten_loaisp" label="Tên loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}>
                            <Input />
                        </Form.Item>
                    )}
                </Form>
            </Modal>

        </Layout>
    );
};

export default DashboardPage;