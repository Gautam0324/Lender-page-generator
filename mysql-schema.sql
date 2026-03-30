CREATE DATABASE IF NOT EXISTS lender_portal;
USE lender_portal;

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lenders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_user_id BIGINT UNSIGNED NOT NULL,
  lender_name VARCHAR(150) NOT NULL,
  website VARCHAR(255) DEFAULT '',
  contact_email VARCHAR(190) DEFAULT '',
  contact_phone VARCHAR(40) DEFAULT '',
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lenders_admin_user
    FOREIGN KEY (admin_user_id)
    REFERENCES admin_users(id)
    ON DELETE CASCADE
);

INSERT IGNORE INTO admin_users (id, full_name, username, email, password_hash)
VALUES (1, 'Admin User', 'admin', 'admin@lendflow.com', SHA2('admin', 256));
