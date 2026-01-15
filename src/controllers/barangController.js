const db = require("../config/database");

/**
 * CREATE barang
 */
exports.createBarang = (req, res) => {
  const { nama, kategori, jumlah_total } = req.body;

  const sql = `
    INSERT INTO barang (nama, kategori, jumlah_total)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nama, kategori, jumlah_total], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal menambah barang",
        error: err.message
      });
    }

    res.status(201).json({
      message: "Barang berhasil ditambahkan"
    });
  });
};

/**
 * READ semua barang
 */
exports.getAllBarang = (req, res) => {
  const sql = "SELECT * FROM barang";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

/**
 * SEARCH barang berdasarkan nama
 */
exports.searchBarang = (req, res) => {
  const { nama } = req.query;

  const sql = "SELECT * FROM barang WHERE nama LIKE ?";
  db.query(sql, [`%${nama}%`], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

/**
 * GET barang by ID
 */
exports.getBarangById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM barang WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Barang tidak ditemukan"
      });
    }

    res.json(results[0]);
  });
};

/**
 * UPDATE barang
 */
exports.updateBarang = (req, res) => {
  const { id } = req.params;
  const { nama, kategori, jumlah_total } = req.body;

  const sql = `
    UPDATE barang
    SET nama = ?, kategori = ?, jumlah_total = ?
    WHERE id = ?
  `;

  db.query(sql, [nama, kategori, jumlah_total, id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Data barang berhasil diupdate" });
  });
};

/**
 * DELETE barang
 */
exports.deleteBarang = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM barang WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Data barang berhasil dihapus" });
  });
};
