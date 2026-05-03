## Stupid Note for Backend of Taeketmaster
// เพื่อน Frontend ไปดู **Taeketmaster Setup** ได้เลย
คำสั่ง Bash ดี ๆ เช่น
 - `cd ../..` คือ move up
 - `mkdir controllers, models, ...` คือ สร้าง folders

เพิ่มเติม: [Bash Commands Overview](https://www.w3schools.com/bash/bash_commands.php)

**เริ่มโปรเจกต์**
คลิปดี ๆ ที่ลงตัว: [Playlist for Taeketmaster](https://youtube.com/playlist?list=PL7JYqKN4Q1hgbEjC4pV5Gq-q5-9yrmUTq&si=pMSIdn6WZ-EYujBj)

1. `npm init` สร้าง `package.json` ไว้ใน server
2. `npm install <package-name>` ลง package ที่จะใช้
3. `docker-compose.yml` เขียนไว้เพื่อ setup database ใน docker 
4. **Server Structure:** ข้างใน `server/src/`
    `app.js` - คล้าย ๆ main.c หรือ Main.java
    `routes` - รับ Request จาก Frontend พวก GET, POST, ... แล้วก็เรียกใช้ controller ที่ต้องใช้
    `middlewares` - authentication, error handling
    `controllers` - เอา req จาก route มาใส่ function ตาม buissness logic เช่น Sign in ได้ req มาเป็น email/username + password ละทำไรต่อ
    `models` - เตรียม function query database ต่าง ๆ ให้ controller ใช้
    `config` - เชื่อมต่อ database

## Taeketmaster Setup

// ถ้าติดปัญหาอะไรก็ถามฟินหรือถ้าแก้เองเราฝากพิมพ์มาบอกด้วยว่าเจอปัญหาอะไร แก้ยังไง

(Optional) สร้าง `.env` ตาม format `.env-example` กำหนด environment ต่าง ๆ หรือเปลี่ยนชื่อ `.env-example` เป็น `.env` ก็ได้

**Docker Setup (เปิด Docker ด้วย):**
`docker-compose up -d`

Clear Docker Setup (เฉพาะถ้าจะลบ):
`docker-compose down -v`
clear และ setup ใหม่เมื่่ออัปเดต database/sql

// ฟินใช้ **PGAdmin4** แทน Adminer ของ Invoice

**Install Packages** ตาม package.json โดยใช้ npm install
`cd server` -> `npm install`
จะได้ `package-lock.json` และ `node_modules`

## Backend ทำไรไปแล้วบ้าง
**Sign up**

**Sign in**
-> ใช้ email/username โดย email case-insensitive และ username case-sensitive
-> JWT ไว้จำว่า sign in แล้ว (มีแต่ Access Token)

## Frontend ทำไรไปแล้วบ้าง
**Login and Register page** เหลือ api