# vrv-rbac
Assignment: Role-Based Access Control (RBAC)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Example Use Case: CMS for a News Website](#example-use-case-cms-for-a-news-website)
    - [Admin](#admin)
    - [Editor](#editor)
    - [Author](#author)
    - [Viewer](#viewer)
- [Test Credentials](#test-credentials)
- [Installation](#installation)
- [Documentation](#documentation)

## Overview
This project is a simple implementation of Role-Based Access Control (RBAC) for a Content Management System (CMS). The application is built using the MERN stack (MongoDB, Express, React, Node.js) and uses JSON Web Tokens (JWT) for authentication.


## Features
- Role-based access control (RBAC) with different permissions for different roles
- Logging of user activities
- Assign Role-Based Permissions or Direct Permissions to Users
- Middleware for checking permissions before accessing routes


## Example Use Case: CMS for a News Website

In this case, a CMS is used by a news agency to manage articles, editors, authors and more. Different roles would have different access permissions. Some example roles might include:

### Admin
- Full access to all content, users, and settings.
- Can create, edit, and delete articles, and user accounts.
- Can view system logs, configure settings, and assign roles.

### Editor
- Can create and edit articles, but not delete them.
- Can view the content published on the site and edit drafts, but cannot manage users or settings.

### Author
- Can only create new articles and submit them for approval.
- Cannot edit or delete existing content and cannot access other users’ work.

### Viewer
- Can view published content, but cannot create or edit articles.
- Typically a read-only role for visitors or authorized users.


## Test Credentials

To test the application, here are some example credentials for different roles:

### Admin
- **Email:** omavhad22@gmail.com
- **Password:** rbacPassword@1

### Editor
- **Email:** editor@gmail.com
- **Password:** rbacPassword@1

### Author
- **Email:** author1@gmail.com
- **Password:** rbacPassword@1

- **Email:** author2@gmail.com
- **Password:** rbacPassword@1


## Installation
1. Clone the repository
```bash
git clone https://github
```

2. Setup Backend
```bash
cd vrv-rbac/backend
npm install
npm start
```

3. Setup Frontend
```bash
cd vrv-rbac/frontend
npm install
npm run dev
```


## Documentation
[API Documentation](https://documenter.getpostman.com/view/19388406/2sAYBYeVY9)
