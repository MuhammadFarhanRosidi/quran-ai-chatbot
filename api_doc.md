[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15442582&assignment_repo_type=AssignmentRepo)

# P2-Individual Project (Server and Client Side)

# My Quran

#### Link Access

```json
https:
```

## Endpoint:

List of available endpoints:

- <code>POST /register</code>
- <code>POST /login</code>
- <code>POST /google-login</code>
- <code>POST /quran-chatbot</code>
- <code>GET /courses</code>
- <code>GET /my-courses</code>
- <code>GET /detailCourse/:id</code>
- <code>POST /joinCourse/:courseId</code>
- <code>GET /editMyCourse/:id</code>
- <code>PUT /editMyCourse/:id</code>
- <code>DELETE /deleteMyCourse/:id</code>

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "user@mail.com",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": number,
    "username": "string",
    "email": "user@mail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": ["Format must be an email"]
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password is required"
}
```

&nbsp;

## 3. POST /google-login

Description:

- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email and Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email and Password is invalid"
}
```

&nbsp;

## 4. POST /quran-chatbot

Description:

- Create a staff by admin

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "email": "Please enter your email"
}
OR
{
  "password": "Please enter your password"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 5. GET /courses

Description:

- Show All Chapters

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

_Response (201 - CREATED)_

```json
{
    "chapters": [
        {
            "number": 1,
            "name": {
                "arab": "الفاتحة",
                "translation": "Pembukaan"
            },
            "tafsir": "Surat Al Faatihah (Pembukaan) yang diturunkan di Mekah dan terdiri dari 7 ayat adalah surat yang pertama-tama diturunkan dengan lengkap  diantara surat-surat yang ada dalam Al Quran dan termasuk golongan surat Makkiyyah. Surat ini disebut Al Faatihah (Pembukaan), karena dengan surat inilah dibuka dan dimulainya Al Quran. Dinamakan Ummul Quran (induk Al Quran) atau Ummul Kitaab (induk Al Kitaab) karena dia merupakan induk dari semua isi Al Quran, dan karena itu diwajibkan membacanya pada tiap-tiap sembahyang. Dinamakan pula As Sab'ul matsaany (tujuh yang berulang-ulang) karena ayatnya tujuh dan dibaca berulang-ulang dalam sholat."
        },
        {
            "number": 2,
            "name": {
                "arab": "البقرة",
                "translation": "Sapi"
            },
            "tafsir": "Surat Al Baqarah yang 286 ayat itu turun di Madinah yang sebahagian besar diturunkan pada permulaan tahun Hijrah, kecuali ayat 281 diturunkan di Mina pada Hajji wadaa' (hajji Nabi Muhammad s.a.w. yang terakhir). Seluruh ayat dari surat Al Baqarah termasuk golongan Madaniyyah, merupakan surat yang terpanjang di antara surat-surat Al Quran yang di dalamnya terdapat pula ayat yang terpancang (ayat 282). Surat ini dinamai Al Baqarah karena di dalamnya disebutkan kisah penyembelihan sapi betina yang diperintahkan Allah kepada Bani Israil (ayat 67 sampai dengan 74), dimana dijelaskan watak orang Yahudi pada umumnya. Dinamai Fusthaatul-Quran (puncak Al Quran) karena memuat beberapa hukum yang tidak disebutkan dalam surat yang lain. Dinamai juga surat  alif-laam-miim karena surat ini dimulai dengan Alif-laam-miim."
        },
        ...
    ]
}
```

&nbsp;

## 6. GET /my-courses

Description:

- Show My Courses

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "username": "farhan",
    "Courses": [
        {
            "id": 8,
            "title": "الماۤئدة",
            "description": "Surat Almaidah ayat ke 5 aku paling suka",
            "price": null,
            "chapterId": 5,
            "createdAt": "2024-08-07T10:17:21.908Z",
            "updatedAt": "2024-08-08T03:58:35.422Z",
            "UserCourse": {
                "userId": 1,
                "courseId": 8,
                "isSubscribe": false,
                "createdAt": "2024-08-07T10:17:21.910Z",
                "updatedAt": "2024-08-07T10:17:21.910Z"
            }
        },
        ...
    ]
}
```

&nbsp;

## 7. GET /detailCourse/:id

Description:

- Get detail course by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
 "id": 1
```

_Response (200 - OK)_

```json
{
    "code": 200,
    "status": "OK.",
    "message": "Success fetching surah.",
    "data": {
        "number": 1,
        "sequence": 5,
        "numberOfVerses": 7,
        "name": {
            "short": "الفاتحة",
            "long": "سُورَةُ ٱلْفَاتِحَةِ",
            "transliteration": {
                "en": "Al-Faatiha",
                "id": "Al-Fatihah"
            },
            "translation": {
                "en": "The Opening",
                "id": "Pembukaan"
            }
        },
        "revelation": {
            "arab": "مكة",
            "en": "Meccan",
            "id": "Makkiyyah"
        },
        "tafsir": {
            "id": "string"
        },
        "preBismillah": null,
        "verses": [
            {
                "number": {
                    "inQuran": 1,
                    "inSurah": 1
                },
                "meta": {
                    "juz": 1,
                    "page": 1,
                    "manzil": 1,
                    "ruku": 1,
                    "hizbQuarter": 1,
                    "sajda": {
                        "recommended": false,
                        "obligatory": false
                    }
                },
                "text": {
                    "arab": "string",
                    "transliteration": {
                        "en": "string"
                    }
                },
                "translation": {
                    "en": "string",
                    "id": "string"
                },
                "audio": {
                    "primary": "string",
                    "secondary": [
                        "string",
                        "string"
                    ]
                },
                "tafsir": {
                    "id": {
                        "short": "string",
                        "long": "string"
                    }
                }
            },
            ...
        ]
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 8. POST /joinCourse/:courseId

Description:

- Add Course by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": 1
}
```

_Response (201 - Created)_

```json
{
  "message": "Course successfully added to user"
}
```

&nbsp;

## 9. GET /editMyCourse/:id

Description:

- Get Data Edit My Course by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
  "id": 8,
  "title": "الماۤئدة",
  "description": "Surat Almaidah ayat ke 5 aku paling suka",
  "price": null,
  "chapterId": 5,
  "createdAt": "2024-08-07T10:17:21.908Z",
  "updatedAt": "2024-08-08T03:58:35.422Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 10. PUT /editMyCourse/:id

Description:

- Edit Description of My Course by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
{
  "id": 1
}
```

- body:

```json
{
  "description": "ini surat yang dapat julukan ummul kitab"
}
```

_Response (200 - OK)_

```json
{
  "message": {
    "id": 8,
    "title": "الماۤئدة",
    "description": "ini surat yang dapat julukan ummul kitab",
    "price": null,
    "chapterId": 5,
    "createdAt": "2024-08-07T10:17:21.908Z",
    "updatedAt": "2024-08-08T18:44:00.515Z"
  }
}
```

&nbsp;

## 11. DELETE /deleteMyCourse/:id

Description:

- Show all categories

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

_Response (200 - OK)_

```json
{
  "message": "Course successfully deleted"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Email and Password is invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
OR
{
    "message": "Request failed with status code 404" //from API
}
```
