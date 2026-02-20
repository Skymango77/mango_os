// backend/seed.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function seed() {
  const db = await open({
    filename: "./db/mango.db",
    driver: sqlite3.Database,
  });

  console.log("🛠 Resetting tables...");

  await db.exec("DELETE FROM vendors;");
  await db.exec("DELETE FROM menus;");

  console.log("📍 Adding Busan pilot restaurants...");

  await db.exec(`
    INSERT INTO vendors (name, country, city, category, rating, review_count, image)
    VALUES 
    ('윤미옥 갈비', 'Korea', 'Busan', 'Korean BBQ', 4.8, 91, '/images/yoonmiok.png'),
    ('광안리 해변 카페', 'Korea', 'Busan', 'Cafe', 4.6, 134, '/images/beachcafe.png'),
    ('서면 돈코츠 라멘', 'Korea', 'Busan', 'Japanese Ramen', 4.4, 52, '/images/ramen.png');
  `);

  await db.exec(`
    INSERT INTO menus (vendor_id, name, description, price)
    VALUES
    (1, '양념갈비', '부드럽고 촉촉한 육즙 가득 갈비', 22000),
    (1, '갈비탕', '국물이 진한 정통 갈비탕', 14000),
    (2, '아메리카노', '바다 보며 마시는 시그니처 원두', 5500),
    (2, '망고 스무디', '망고앱 시그니처 콜라보', 7200),
    (3, '돈코츠 라멘', '진한 돼지 육수의 라멘', 11000),
    (3, '차슈 추가', '2pcs', 2500);
  `);

  console.log("🎉 Busan Test Data Inserted Successfully!");
  await db.close();
}

seed();
