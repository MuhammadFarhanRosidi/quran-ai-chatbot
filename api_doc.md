[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15442582&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Restaurant API Documentation

#### Link Access

```json
https://graded1p2.farhanrosidi.online/pub/cuisines
```

## Endpoint:

List of available endpoints:

- <code>GET /pub/cuisines</code>
- <code>GET /pub/cuisines/:id</code>
- <code>POST /login</code>
- <code>POST /add-user</code>
- <code>POST /cuisines</code>
- <code>GET /cuisines</code>
- <code>GET /cuisines/:id</code>
- <code>PUT /cuisines/:id</code>
- <code>DELETE /cuisines/:id</code>
- <code>POST /categories</code>
- <code>GET /categories</code>
- <code>PUT /categories/:id</code>
- <code>DELETE /categories/:id</code>
- <code>PATCH /cuisines/:id/imgUrl</code>

## 1. GET /pub/cuisines

Request:

- query:

```json
{
  "filter": 1,
  OR
  "sort": "<item>",
  OR
  "page[number]": 1,
  OR
  "page[size]": 2,
  OR
  "search": "<item_name>"
}
```

_Response (200 - OK)_

```json
{
  "page": 1,
  "data": [
    {
      "id": 11,
      "name": "Big Mac Deluxe",
      "description": "A double-layered burger with lettuce, cheese, pickles, onions, and special sauce.",
      "price": 5000,
      "imgUrl": "https://example.com/images/bigmac.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-07-23T09:31:11.414Z",
      "updatedAt": "2024-07-23T09:31:11.414Z"
    },
    {
      "id": 10,
      "name": "Big Mac Deluxe",
      "description": "A double-layered burger with lettuce, cheese, pickles, onions, and special sauce.",
      "price": 5000,
      "imgUrl": "https://example.com/images/bigmac.jpg",
      "categoryId": 1,
      "authorId": 1,
      "createdAt": "2024-07-23T09:31:10.533Z",
      "updatedAt": "2024-07-23T09:31:10.533Z"
    }
  ],
  "totalData": 6,
  "totalPage": 3,
  "dataPerPage": 2
}
```

&nbsp;

## 2. GET /pub/cuisines/:id

Request:

- params:

```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Big Mac Hello testing",
  "description": "A double-layered burger with lettuce, cheese, pickles, onions, and special sauce.",
  "price": 500000,
  "imgUrl": "https://example.com/images/bigmac.jpg",
  "categoryId": 1,
  "authorId": 1,
  "createdAt": "2024-07-22T10:14:31.878Z",
  "updatedAt": "2024-07-22T13:32:39.039Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 3. POST /login

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

## 4. POST /add-user

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

## 5. POST /cuisines

Description:

- Add cuisine

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
  "name": "Big Mac",
  "description": "A double-layered burger with lettuce, cheese, pickles, onions, and special sauce.",
  "price": 50000,
  "imgUrl": "https://example.com/images/bigmac.jpg",
  "categoryId": 1,
  "authorId": 1
}
```

_Response (201 - CREATED)_

```json
{
  "id": 11,
  "name": "Big Mac Deluxe",
  "description": "A double-layered burger with lettuce, cheese, pickles, onions, and special sauce.",
  "price": 5000,
  "imgUrl": "https://example.com/images/bigmac.jpg",
  "categoryId": 1,
  "authorId": 1,
  "updatedAt": "2024-07-22T22:39:27.621Z",
  "createdAt": "2024-07-22T22:39:27.621Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter your name"
}
OR
{
  "message": "Please enter your description"
}
OR
{
  "message": "Please enter your price"
}
OR
{
  "message": "Minimum price is 5000"
}
OR
{
  "message": "Please enter your url image"
}
OR
{
  "message": "Please enter your category id"
}
OR
{
  "message": "Please enter your author id"
}
```

&nbsp;

## 6. GET /cuisines

Description:

- Show All Cuisines

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "name": "Chicken McNuggets",
    "description": "Crispy, tender pieces of chicken served with your choice of dipping sauces.",
    "price": 30000,
    "imgUrl": "https://example.com/images/mcnuggets.jpg",
    "categoryId": 2,
    "authorId": 2,
    "createdAt": "2024-07-22T10:14:31.878Z",
    "updatedAt": "2024-07-22T10:14:31.878Z",
    "User": {
      "id": 2,
      "username": "jane_smith",
      "email": "jane_smith@example.com",
      "role": "staff",
      "phoneNumber": "082345678901",
      "address": "Jl. Kemerdekaan No.2, Surabaya",
      "createdAt": "2024-07-22T10:14:31.873Z",
      "updatedAt": "2024-07-22T10:14:31.873Z"
    }
  }
  ...
]
```

&nbsp;

## 7. GET /cuisines/:id

Description:

- Get cuisine by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

- params:

```json
 "id": 4
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "name": "Caesar Salad",
  "description": "A fresh salad with romaine lettuce, Parmesan cheese, and Caesar dressing.",
  "price": 35000,
  "imgUrl": "https://example.com/images/caesarsalad.jpg",
  "categoryId": 4,
  "authorId": 4,
  "createdAt": "2024-07-22T10:14:31.878Z",
  "updatedAt": "2024-07-22T10:14:31.878Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 8. PUT /cuisines/:id

Description:

- Update cuisine by id

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
  "id": 5
}
```

- body:

```json
{
  "id": 5,
  "name": "McFlurry Enak",
  "description": "Creamy soft serve ice cream mixed with your choice of toppings.",
  "price": 20000,
  "imgUrl": "https://example.com/images/mcflurry.jpg",
  "categoryId": 5,
  "authorId": 5,
  "createdAt": "2024-07-22T10:14:31.878Z",
  "updatedAt": "2024-07-22T22:51:01.914Z"
}
```

_Response (200 - OK)_

```json
{
  "id": 5,
  "name": "McFlurry Enak Lezat",
  "description": "Creamy soft serve ice cream mixed with your choice of toppings.",
  "price": 20000,
  "imgUrl": "https://example.com/images/mcflurry.jpg",
  "categoryId": 5,
  "authorId": 5,
  "createdAt": "2024-07-22T10:14:31.878Z",
  "updatedAt": "2024-07-22T22:51:01.914Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter your name"
}
OR
{
  "message": "Please enter your description"
}
OR
{
  "message": "Please enter your price"
}
OR
{
  "message": "Minimum price is 5000"
}
OR
{
  "message": "Please enter your url image"
}
OR
{
  "message": "Please enter your category id"
}
OR
{
  "message": "Please enter your author id"
}
```

&nbsp;

## 9. DELETE /cuisines/:id

Description:

- Delete cuisine by id

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
  "id": integer,
}
```

_Response (200 - OK)_

```json
{
  "message": "Big Mac Deluxe success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## 10. POST /categories

Description:

- Add category

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
  "name": "string"
}
```

_Response (201 - CREATED)_

```json
{
  "id": 8,
  "name": "Rice Bowl",
  "updatedAt": "2024-07-22T22:57:38.715Z",
  "createdAt": "2024-07-22T22:57:38.715Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter your category"
}
```

&nbsp;

## 11. GET /categories

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
[
    {
        "id": 1,
        "name": "Burger",
        "createdAt": "2024-07-22T10:14:31.861Z",
        "updatedAt": "2024-07-22T10:14:31.861Z"
    }
    ...
]
```

&nbsp;

## 12. PUT /categories/:id

Description:

- Add category

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
  "id": integer
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 8,
  "name": "happy meal",
  "createdAt": "2024-07-22T22:57:38.715Z",
  "updatedAt": "2024-07-22T23:01:50.338Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter your category"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 13. DELETE /categories/:id

Description:

- Delete category by id

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
  "id": integer
}
```

_Response (200 - OK)_

```json
{
  "message": "happy meal success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 13. PATCH /cuisines/:id/imgUrl

Description:

- Update imgUrl

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
  "id": integer
}
```

- data:

```json
{
  "avatar": "file"
}
```

_Response (200 - OK)_

```json
{
  "message": "Image Cuisine success to update"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please enter your url image"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
