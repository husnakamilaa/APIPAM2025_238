const db = require("../config/database");

/**
 * CREATE peminjaman
 */
exports.createPeminjaman = (req, res) => {
  const {
    id_barang,
    id_anggota,
    tanggal_pinjam,
    tanggal_kembali,
    jumlah_pinjam,
    status_pinjam
  } = req.body;

  const sql = `
    INSERT INTO peminjaman
    (id_barang, id_anggota, tanggal_pinjam, tanggal_kembali, jumlah_pinjam, status_pinjam)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id_barang, id_anggota, tanggal_pinjam, tanggal_kembali, jumlah_pinjam, status_pinjam],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal menambah peminjaman",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Peminjaman berhasil ditambahkan"
      });
    }
  );
};

/**
 * READ semua peminjaman (JOIN)
 */
exports.getAllPeminjaman = (req, res) => {
  const sql = `
    SELECT p.*, a.nama AS nama_anggota, b.nama AS nama_barang
    FROM peminjaman p
    JOIN anggota a ON p.id_anggota = a.id
    JOIN barang b ON p.id_barang = b.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

/**
 * GET peminjaman by ID
 */
exports.getPeminjamanById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM peminjaman WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Peminjaman tidak ditemukan"
      });
    }

    res.json(results[0]);
  });
};

/**
 * UPDATE peminjaman
 */
exports.updatePeminjaman = (req, res) => {
  const { id } = req.params;
  const {
    id_barang,
    id_anggota,
    tanggal_pinjam,
    tanggal_kembali,
    jumlah_pinjam,
    status_pinjam
  } = req.body;

  const sql = `
    UPDATE peminjaman
    SET id_barang=?, id_anggota=?, tanggal_pinjam=?, tanggal_kembali=?,
        jumlah_pinjam=?, status_pinjam=?
    WHERE id = ?
  `;

  db.query(
    sql,
    [id_barang, id_anggota, tanggal_pinjam, tanggal_kembali, jumlah_pinjam, status_pinjam, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Data peminjaman berhasil diupdate" });
    }
  );
};

/**
 * DELETE peminjaman
 */
exports.deletePeminjaman = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM peminjaman WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Data peminjaman berhasil dihapus" });
  });
};
