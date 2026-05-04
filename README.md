## Stupid Note for Backend of Taeketmaster
// เพื่อน Frontend ไปดู **Taeketmaster Setup** ได้เลย
คำสั้ง Bash ดี ๆ เช่น
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

**Docker Setup (เปิด Docker ด้วย):
`docker-compose up -d`

Clear Docker Setup (เฉพาะถ้าจะลบ):
`docker-compose down -v`
clear และ setup ใหม่เมื่่ออัปเดต database/sql

// ฟินใช้ **PGAdmin4** แทน Adminer ของ Invoice

**Install Packages** ตาม package.json โดยใช้ npm install
`cd server` -> `npm install`
จะได้ `package-lock.json` และ `node_modules`

## Backend API Documentation

**Base URL: `http://localhost:6700/api`**

**Authentication**
- JWT Token ส่งไป: `Authorization: Bearer <token>`
- Token ได้มาจาก Sign In endpoint, อยู่ได้ 7 วัน

---

### 1. Sign Up/Sign In
**POST /signup**

Request:
```json
{
  "first_name": "khanatip",
  "last_name": "nokhuntod",
  "email": "example@mail.taeket.ac.th",
  "username": "cool_username",
  "password": "strong_pASSword",
  "phone": "0867676767",
  "gender": "gay",
  "date_of_birth": "2067-04-28"
}
```

Response (201):
```json
{
  "success": true,
  "message": "Sign up successful, GG",
  "data": {
    "id": 1,
    "first_name": "khanatip",
    "last_name": "nokhuntod",
    "email": "example@mail.taeket.ac.th",
    "username": "cool_username",
    "role": "user"
  }
}
```

Create Account (Sign Up) โดย email และ username ต้องไม่ซ้ำกับคนอื่น

---
**POST /signin**

Request (ใช้ username หรือ email ใส่เข้ามาก็ได้):
```json
{
  "usorem": "cool_username",
  "password": "strong_pASSword"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Sign in successful, GG",
  "data": {
    "token": "eyJhkpXVCJ9.eyJpZCI6MX0...",
    "user": {
      "id": 1,
      "first_name": "khanatip",
      "last_name": "nokhuntod",
      "email": "example@mail.taeket.ac.th",
      "username": "cool_username",
      "role": "user"
    }
  }
}
```

ใช้ username หรือ email ก็ได้ (ส่งใน usERoremAIL) email ไม่ case sensitive แต้ username ใช่, ได้ JWT Token ไปใช้ใน request ที่ต้อง authentication
ถ้า response.role: admin ก็ส่งไปหน้า admin

---

### 2. Home Feed
**GET /home** (หน้าแรก)

Query Parameters:
```
http://localhost:6700/api/home?province=bangkok&startDate=2026-05-01&endDate=2026-12-31&search=concert
```

| Parameter | Ex. | description |
|-----------|---------|-----------|
| province | Bangkok | filter province |
| startDate | 2026-05-01 | start of range (YYYY-MM-DD) |
| endDate | 2026-12-31 | end of range (YYYY-MM-DD) |
| search | concert | search ชื่อ, ศิลปิน, สถานที่ |

Response (200):
```json
{
  "success": true,
  "message": "events fetched successfully",
  "data": {
      "event_id": 1,
      "title": "Taeketmaster Concert",
      "img_path": "/images/events/1.jpg",
      "first_show": "2026-12-01T19:00:00Z",
      "showdate": "01 Dec 2026",
      "status": 1
    }
}
```

**Status:** 0=Coming Soon, 1=Buy Now, 2=Sold Out

---

**GET /event?id=1**

หน้าที่กด Event เพื่อดูลายละเอียด ใช้ id
Query Parameters:
```
id=1 (required)
```

Response (200):
```json
{
  "success": true,
  "message": "event fetched successfully",
  "data": {
    "title": "Taeketmaster Concert",
    "img_path": "/images/events/1.jpg",
    "showdate": "Mon 01 Dec 2026 - Thu 04 Dec 2026",
    "venue_name": "Impact Muang Thong Thani",
    "public_sale": "Mon 01 Oct 2026, 10:00",
    "ticket_prices": "VIP 5,000 / Premium 3,500 / Standard 2,000",
    "status": 1,
    "description": "KeemooKeeMaSOtormakPeeJaMaiWaiLaew..."
  }
}
```
---
No more example response เพราะฟินไม่ไหวแล้วล่ะ

**EventDetail2**
หน้าตอนกด Buy Now จาก Event Detail
GET: `http://localhost:6700/api/event2?id=1`
พาร์ท Zone Layout

Seat Available
GET: `http://localhost:6700/api/event/available?id=1`

หลังเลือก Zone -> หน้า Seat Layout

**Create/Update Address**
---

### 3. หน้า Profile
**GET /profile** (ต้องมี Token)

Headers:
```
Authorization: Bearer <token>
```
Response (200):
```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "id": 1,
    "first_name": "Khanatip",
    "last_name": "Nokkhunthot",
    "email": "example@mail.taeket.ac.th",
    "phone": "0867676767",
    "username": "cool_username",
    "gender": "gay",
    "date_of_birth": "28/04/2006",
    "role": "user",
    "registered_at": "2026-05-04T10:30:00Z"
  }
}
```
---

**PUT /profile** (ยื่นแก้ไข profile (Svae Changes), ต้องมี Token)

Headers:
```
Authorization: Bearer <token>
```

Request (ส่งเฉพาะฟิลด์ที่ต้องแก้):
```json
{
  "first_name": "khipnata",
  "username": "hot_username",
  "phone": "0767676767"
}
```
Response (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "first_name": "khipnata",
    "last_name": "hot_username",
    "email": "example@mail.taeket.ac.th",
    "phone": "0867676767",
    "username": "cool_username",
    "gender": "gay",
    "date_of_birth": "28/04/2006",
    "gender": "gay",
    "role": "user"
  }
}
```
แก้ไข first_name, last_name, username, phone, birthday, gender ได้ | แก้ email ไม่ได้

---

**GET /address** (ต้องมี Token)

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "message": "Address fetched successfully",
  "data": {
    "address_id": 1,
    "user_id": 1,
    "house_no": "22/67",
    "street_name": "Rama 2",
    "sub_district": "Bangmak",
    "district": "Maina",
    "province": "Bangkok",
    "postal_code": "11120"
  }
}
```

ดึงข้อมูลที่อยู่ของผู้ใช้ ถ้ายังไม่มีจะได้ 404

---

**Create/Update Address**

**POST /address** (สร้างใหม่) or **PUT /address** (แก้ไข) (ต้องมี Token)

Headers:
```
Authorization: Bearer <token>
```

Request:
```json
{
  "house_no": "123/45",
  "street_name": "Pracha Uthit",
  "sub_district": "Bang Mot",
  "district": "Thung Khru",
  "province": "Bangkok",
  "postal_code": "10140"
}
```

Response (201 - Create / 200 - Update):
```json
{
  "success": true,
  "message": "Address created successfully",
  "data": {
    "address_id": 1,
    "user_id": 1,
    "house_no": "123/45",
    "street_name": "Pracha Uthit",
    "sub_district": "Bang Mot",
    "district": "Thung Khru",
    "province": "Bangkok",
    "postal_code": "10140"
  }
}
```

server check เอง ถ้ายังไม่มีที่อยู่จะสร้างใหม่ ถ้ามีแล้วจะแก้ไข ทั้ง POST และ PUT ส่งข้อมูลเดียวกัน

---
