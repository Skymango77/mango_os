CREATE TABLE IF NOT EXISTS vendors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT,
  city TEXT,
  category TEXT,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  image TEXT,
  is_open INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vendor_id INTEGER,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image TEXT,
  FOREIGN KEY(vendor_id) REFERENCES vendors(id)
);
