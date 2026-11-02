# MODUL PRAKTIKUM 3
## Praktik Rekayasa Sistem Basis Data: Persistensi MySQL, Connection Pooling, Prepared Statements, dan Arsitektur CRUD Aman

### Identitas Mahasiswa

| Keterangan | Informasi |
|---|---|
| Nama | I Gede Dika Mahendra Putra |
| NIM | 42530027 |
| Fakultas | Fakultas Teknik dan Informatika (FTI) |
| Program Studi | Teknologi Informasi |
| Universitas | Universitas Pendidikan Nasional (UNDIKNAS) |
| Mata Kuliah | Pemrograman Web MK11 |
| Tahun Akademik | Ganjil 2026–2027 |

---

## 1. Deskripsi Praktikum

Praktikum ini membahas penerapan persistensi data menggunakan MySQL pada aplikasi web berbasis Node.js dan Express.js. Aplikasi dikembangkan menggunakan arsitektur Model-View-Controller (MVC) dengan fitur CRUD (Create, Read, Update, Delete).

Selain itu, praktikum ini menerapkan Connection Pooling untuk mengelola koneksi database, Prepared Statements untuk mencegah SQL Injection, serta pengujian beberapa kondisi kesalahan koneksi dan parameter database.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- MySQL
- MySQL2
- EJS (Embedded JavaScript Templates)
- Dotenv
- Nodemon
- HTML dan CSS

## 3. Struktur Folder Project

```text
express-mysql-lab/
├── config/
│   └── database.js
├── controllers/
│   └── produk.controller.js
├── docs/
│   └── screenshots/
├── models/
│   └── produk.model.js
├── public/
│   └── css/
│       └── style.css
├── routes/
│   └── produk.routes.js
├── views/
│   ├── pages/
│   │   ├── produk-list.ejs
│   │   ├── produk-form-tambah.ejs
│   │   └── produk-form-edit.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
```

## 4. Konfigurasi Database

Database yang digunakan bernama `db_lab_web` dengan tabel `produk`.

### Struktur Tabel

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | INT | Primary Key, Auto Increment |
| nama_produk | VARCHAR(100) | Nama produk |
| kategori | VARCHAR(50) | Kategori produk |
| harga | DECIMAL(10,2) | Harga produk |
| stok | INT | Jumlah stok |
| created_at | TIMESTAMP | Waktu data dibuat |

### SQL Pembuatan Database dan Tabel

```sql
CREATE DATABASE IF NOT EXISTS db_lab_web;
USE db_lab_web;

CREATE TABLE IF NOT EXISTS produk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_produk VARCHAR(100) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    stok INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Data Awal

```sql
INSERT INTO produk (nama_produk, kategori, harga, stok) VALUES
('Keyboard Mekanikal TKL', 'Periferal', 650000.00, 15),
('Mouse Gaming Wireless', 'Periferal', 350000.00, 20),
('Monitor LED 24 Inci 144Hz', 'Display', 1850000.00, 8);
```

## 5. Implementasi Praktikum

### 5.1 Connection Pooling

Menggunakan library `mysql2` untuk mengelola koneksi database melalui connection pool. Pengaturan koneksi meliputi `waitForConnections`, `connectionLimit`, dan `queueLimit`.

Koneksi database menggunakan konfigurasi dari file `.env` agar informasi sensitif tidak ditulis langsung di dalam source code.

### 5.2 READ – Menampilkan Data

Mengimplementasikan proses pengambilan seluruh data produk dari tabel MySQL menggunakan perintah `SELECT`. Data kemudian dikirim dari Model ke Controller dan ditampilkan melalui halaman EJS.

### 5.3 CREATE – Menambahkan Data

Mengimplementasikan proses penambahan produk menggunakan perintah `INSERT INTO`. Prepared Statements digunakan dengan parameter `?` untuk mengamankan input pengguna.

Setelah data berhasil disimpan, aplikasi menggunakan pola Post/Redirect/Get (PRG) untuk mengarahkan pengguna kembali ke halaman daftar produk.

### 5.4 UPDATE – Mengubah Data

Mengimplementasikan proses perubahan data produk menggunakan perintah `UPDATE`. Data produk diambil berdasarkan ID, ditampilkan pada formulir edit, kemudian diperbarui menggunakan parameter query.

### 5.5 DELETE – Menghapus Data

Mengimplementasikan penghapusan data produk menggunakan perintah `DELETE`. ID produk dikirim melalui parameter URL dan proses penghapusan dilakukan melalui POST.

### 5.6 SQL Injection dan Prepared Statements

Melakukan pengujian keamanan menggunakan dua pendekatan:

- **Insecure Query:** menggunakan penggabungan input pengguna secara langsung ke dalam query SQL sehingga rentan terhadap SQL Injection.
- **Secure Query:** menggunakan Prepared Statements dengan placeholder `?` sehingga input pengguna diperlakukan sebagai nilai parameter, bukan bagian dari perintah SQL.

Pengujian dilakukan untuk membandingkan hasil query sebelum dan sesudah penerapan Prepared Statements.

## 6. Dokumentasi Hasil Praktikum

Seluruh bukti pengerjaan praktikum ditampilkan di bawah ini. Gambar menggunakan file yang disimpan di folder `docs/screenshots/`.

### 6.1 Koneksi Database dan Connection Pool

<img width="801" height="345" alt="image" src="https://github.com/user-attachments/assets/f5132da0-0848-442c-82d5-f6d7d4b3b06a" />


### 6.2 READ – Menampilkan Data Produk
<img width="1833" height="972" alt="image" src="https://github.com/user-attachments/assets/b563411b-a455-424b-a8c6-b942d79093be" />


### 6.3 CREATE – Menambahkan Produk
<img width="1902" height="1020" alt="image" src="https://github.com/user-attachments/assets/4cc74c0f-244d-4a7b-9fa0-6ab42b828d69" />


### 6.4 UPDATE – Mengubah Data Produk

<img width="1917" height="1023" alt="image" src="https://github.com/user-attachments/assets/b763ce13-7052-4bd6-b831-03c375b2284e" />


### 6.5 DELETE – Menghapus Data Produk

**Bukti pertama:**

<img width="1917" height="1026" alt="image" src="https://github.com/user-attachments/assets/614a8b0e-eab0-40df-aff0-0d008a3acc08" />

**Bukti kedua:**
<img width="1151" height="736" alt="image" src="https://github.com/user-attachments/assets/b25e8ea2-45b2-44b8-8443-324621c2e01b" />

### 6.6 Pengujian SQL Injection

**Pengujian menggunakan query rentan (Insecure Query):**
<img width="1907" height="977" alt="image" src="https://github.com/user-attachments/assets/5534e5a3-547f-4b70-8775-ae51a81e17cc" />

**Pengujian menggunakan Prepared Statements (Secure Query):**
<img width="1917" height="1015" alt="image" src="https://github.com/user-attachments/assets/bc2a7ca5-640c-4def-b262-e9a3413e625a" />


### 6.7 Pengujian Error Database

**Kasus 1 – ER_ACCESS_DENIED_ERROR**
<img width="1906" height="1015" alt="image" src="https://github.com/user-attachments/assets/09e1f0cc-8e38-4a36-830f-0c78550ec016" />

**Kasus 2 – Bind Parameters Must Not Contain Undefined**

<img width="1903" height="1025" alt="image" src="https://github.com/user-attachments/assets/7467c6b7-908c-4d54-8915-63abc48f8668" />


**Kasus 3 – Connection Pool Exhaustion**
<img width="1917" height="1020" alt="image" src="https://github.com/user-attachments/assets/5771422f-e82f-4433-a2ec-3f30d308226a" />


## 7. Cara Menjalankan Aplikasi

### Persyaratan

- Node.js dan NPM sudah terpasang.
- MySQL Server sudah aktif.
- Database `db_lab_web` sudah dibuat.

### Langkah Menjalankan

1. Clone repository:

```bash
git clone URL_REPOSITORY_KAMU
```

2. Masuk ke folder project:

```bash
cd express-mysql-lab
```

3. Instal dependencies:

```bash
npm install
```

4. Buat file `.env` berdasarkan `.env.example`, kemudian sesuaikan konfigurasi database:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=PASSWORD_MYSQL_KAMU
DB_NAME=db_lab_web
DB_PORT=3306
```

5. Jalankan aplikasi:

```bash
npm run dev
```

6. Buka browser:

```text
http://localhost:3000/produk
```

## 8. Kesimpulan

Berdasarkan praktikum yang telah dilakukan, aplikasi web berbasis Node.js dan Express.js berhasil diintegrasikan dengan MySQL sebagai sistem penyimpanan data. Penerapan arsitektur MVC membantu memisahkan tanggung jawab antara Model, View, dan Controller sehingga struktur aplikasi menjadi lebih terorganisasi.

Fitur CRUD berhasil diterapkan untuk mengelola data produk. Penggunaan Connection Pooling membantu pengelolaan koneksi database, sedangkan Prepared Statements digunakan untuk meningkatkan keamanan query dan mengurangi risiko SQL Injection. Praktikum ini juga memberikan pemahaman mengenai penanganan kesalahan koneksi database, parameter yang tidak terdefinisi, serta kondisi Connection Pool Exhaustion.

---

**Dibuat oleh:**

**I Gede Dika Mahendra Putra**  
NIM: 42530027  
Program Studi Teknologi Informasi  
Fakultas Teknik dan Informatika  
Universitas Pendidikan Nasional (UNDIKNAS)
