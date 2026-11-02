const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produk.controller');
const db = require('../config/database');

router.get('/produk', produkController.getDaftarProduk);

router.get('/produk/tambah', produkController.getFormTambah);
router.post('/produk/tambah', produkController.postTambahProduk);

router.get('/produk/edit/:id', produkController.getFormEdit);
router.post('/produk/edit/:id', produkController.postUpdateProduk);

router.post('/produk/hapus/:id', produkController.postHapusProduk);

// Route pengujian SQL Injection
router.get('/uji-keamanan', async (req, res) => {
    try {
        const { kategori } = req.query;

        // EKSPERIMEN: Menggunakan query yang aman (Prepared Statement)
        const hasil = await require('../models/produk.model')
            .getByKategoriSecure(kategori || '');

        res.json({
            metode: 'Prepared Statement (Aman)',
            jumlah_data: hasil.length,
            data: hasil
        });

    } catch (error) {
        console.error('[ERROR uji-keamanan]:', error);
        res.status(500).send('Terjadi kesalahan saat pengujian keamanan.');
    }
});

// SIMULASI CONNECTION POOL EXHAUSTION
router.get('/uji-pool', async (req, res) => {
    try {
        const connection = await db.getConnection();

        console.log('[POOL TEST] Koneksi berhasil diambil dan ditahan.');

        // Sengaja tidak memanggil connection.release()
        res.send('Koneksi berhasil diambil dan sedang ditahan.');
    } catch (error) {
        console.error('[POOL ERROR]', error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;

