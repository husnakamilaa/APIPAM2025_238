const db = require("../config/database");

/**
 * CREATE kerusakan
 */
exports.createKerusakan = (req, res) => {
  const {
    id_barang,
    deskripsi,
    jumlah,
    tanggal,
    status_perbaikan
  } = req.body;

  const sql = `
    INSERT INTO kerusakan
    (id_barang, deskripsi, jumlah, tanggal, status_perbaikan)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id_barang, deskripsi, jumlah, tanggal, status_perbaikan],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal menambah kerusakan",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Data kerusakan berhasil ditambahkan"
      });
    }
  );
};

/**
 * READ semua kerusakan (JOIN barang)
 */
exports.getAllKerusakan = (req, res) => {
  const sql = `
    SELECT k.*, b.nama AS nama_barang
    FROM kerusakan k
    JOIN barang b ON k.id_barang = b.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

/**
 * GET kerusakan by ID
 */
exports.getKerusakanById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM kerusakan WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Data kerusakan tidak ditemukan"
      });
    }

    res.json(results[0]);
  });
};

/**
 * UPDATE kerusakan
 */
exports.updateKerusakan = (req, res) => {
  const { id } = req.params;
  const {
    id_barang,
    deskripsi,
    jumlah,
    tanggal,
    status_perbaikan
  } = req.body;

  const sql = `
    UPDATE kerusakan
    SET id_barang=?, deskripsi=?, jumlah=?, tanggal=?, status_perbaikan=?
    WHERE id = ?
  `;

  db.query(
    sql,
    [id_barang, deskripsi, jumlah, tanggal, status_perbaikan, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Data kerusakan berhasil diupdate" });
    }
  );
};

/**
 * DELETE kerusakan
 */
exports.deleteKerusakan = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM kerusakan WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Data kerusakan berhasil dihapus" });
  });
};
