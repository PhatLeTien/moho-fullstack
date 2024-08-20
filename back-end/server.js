const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const multer = require('multer');



const app = express();
app.use(cors());
app.use(express.json())

 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "moho"
})

app.listen(3001, () => {
    console.log("Listiening...")
})


// Cấu hình multer để lưu trữ tệp tin
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../moho/public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// const upload = multer({ storage });

// Middleware để xử lý JSON body
app.use(express.json());

app.post('/create', (req, res) => {
    const { ten_sanpham, mo_ta, gia, id_loaisanpham} = req.body;
    const sql = `
        INSERT INTO sanpham (ten_sanpham, mo_ta, gia, id_loaisanpham)
        VALUES (?, ?, ?, ?, ?);
    `;
    db.query(sql, [ten_sanpham, mo_ta, gia, id_loaisanpham], (err, results) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json({ message: "Product added successfully", productId: results.insertId });
        }
    });
});





///Đăng kí tài khoản
app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO signup (name, email, password) VALUES(?,?,?)", [name, email, password],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Internal server error" });
            } else {
                res.send(result);
            }
        }
    );
});





//Đăng nhập
app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.query("SELECT * FROM signup WHERE name = ? AND password = ?", [name, password],
        (err, result) => {
            if (err) {
               req.setEncoding({err:err})
            } else {
                if(result.length >0 ){
                    res.send(result);
                }else{
                    res.send({message:"SAI MẬT KHẨU HOẶC TK"})
                }
            }
        }
    );
});

//Lấy sản phẩm
app.get('/products', (req, res) => {
    const sql = "SELECT * FROM sanpham"; // "sanpham" là tên bảng sản phẩm của bạn
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json(results);
        }
    });
});

//Lấy sản phẩm theo loại sản phẩm
app.get('/products/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const sql = `
        SELECT * 
        FROM sanpham 
        WHERE id_loaisanpham = ?;
    `;
    db.query(sql, [categoryId], (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json(results);
        }
    });
});



//Lấy chi tiết sản phẩm
// server.js
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const sql = `
        SELECT * 
        FROM sanpham 
        WHERE id = ?;
    `;
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: "Internal server error" });
        } else if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    });
});


//Thêm loại sản phẩm
app.post('/loaisp', (req, res) => {
    const ten_loaisp = req.body.ten_loaisp;

    db.query("INSERT INTO loaisp (ten_loaisp) VALUES(?)", [ten_loaisp],
        (err, result) => {
            if (err) {
                console.error('Error adding product type:', err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ id: result.insertId, ten_loaisp });
            }
        }
    );
});

//Xóa sản phẩm
// Xóa sản phẩm
app.delete('/sanpham/:id', (req, res) => {
    const idSanPham = req.params.id;

    db.query("DELETE FROM sanpham WHERE id = ?", [idSanPham],
        (err, result) => {
            if (err) {
                console.error('Error deleting product:', err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ message: "Product deleted successfully" });
                } else {
                    res.status(404).json({ error: "Product not found" });
                }
            }
        }
    );
});



// Endpoint để lấy danh sách loại sản phẩm
//Lấy sản phẩm
app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM loaisp"; // "sanpham" là tên bảng sản phẩm của bạn
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json(results);
        }
    });
});



