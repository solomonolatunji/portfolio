# Backend Structure for Portfolio Project (Laravel)

## 1. Suggested Models

Based on the frontend structure, here are the recommended backend models:

### User

- id
- name
- email
- password
- role (admin, user)

### BlogArticle

- id
- title
- slug
- content
- excerpt
- cover_image
- author_id (User)
- published_at
- tags (many-to-many)

### Tag

- id
- name
- slug

### Project

- id
- title
- slug
- description
- image
- technologies (many-to-many)
- url

### Technology

- id
- name
- icon

### Education

- id
- institution
- degree
- field_of_study
- start_date
- end_date
- description

### Experience

- id
- company
- position
- start_date
- end_date
- description

### Product

- id
- name
- slug
- description
- price
- image
- stock

### Cart (optional, for e-commerce)

- id
- user_id
- status (active, completed)

### CartItem

- id
- cart_id
- product_id
- quantity

### NewsletterSubscriber

- id
- email
- subscribed_at

### ContactMessage

- id
- name
- email
- message
- created_at

---

## 2. API Endpoints

### Public Endpoints

#### Blog

- `GET /api/blog` — List articles
- `GET /api/blog/{slug}` — Get single article
- `GET /api/blog/tags` — List tags
- `GET /api/blog/tag/{slug}` — List articles by tag

#### Portfolio

- `GET /api/projects` — List projects
- `GET /api/projects/{slug}` — Get single project
- `GET /api/technologies` — List technologies

#### About

- `GET /api/about/education` — List education
- `GET /api/about/experience` — List experience
- `GET /api/about/profile` — Get profile info
- `GET /api/about/skills` — List skills

#### Shop

- `GET /api/products` — List products
- `GET /api/products/{slug}` — Get single product

#### Newsletter

- `POST /api/newsletter/subscribe` — Subscribe to newsletter

#### Contact

- `POST /api/contact` — Send contact message

---

### Admin Endpoints (require authentication)

#### Blog

- `POST /api/admin/blog` — Create article
- `PUT /api/admin/blog/{id}` — Update article
- `DELETE /api/admin/blog/{id}` — Delete article
- `POST /api/admin/blog/{id}/publish` — Publish article
- `POST /api/admin/blog/{id}/unpublish` — Unpublish article
- `POST /api/admin/tags` — Create tag
- `DELETE /api/admin/tags/{id}` — Delete tag

#### Projects

- `POST /api/admin/projects` — Create project
- `PUT /api/admin/projects/{id}` — Update project
- `DELETE /api/admin/projects/{id}` — Delete project
- `POST /api/admin/technologies` — Create technology
- `DELETE /api/admin/technologies/{id}` — Delete technology

#### About

- `POST /api/admin/education` — Add education
- `PUT /api/admin/education/{id}` — Update education
- `DELETE /api/admin/education/{id}` — Delete education
- `POST /api/admin/experience` — Add experience
- `PUT /api/admin/experience/{id}` — Update experience
- `DELETE /api/admin/experience/{id}` — Delete experience
- `POST /api/admin/skills` — Add skill
- `DELETE /api/admin/skills/{id}` — Delete skill

#### Products

- `POST /api/admin/products` — Create product
- `PUT /api/admin/products/{id}` — Update product
- `DELETE /api/admin/products/{id}` — Delete product

#### Newsletter

- `GET /api/admin/newsletter/subscribers` — List subscribers
- `DELETE /api/admin/newsletter/subscribers/{id}` — Remove subscriber

#### Contact

- `GET /api/admin/contact/messages` — List contact messages
- `DELETE /api/admin/contact/messages/{id}` — Delete message

#### Users

- `GET /api/admin/users` — List users
- `POST /api/admin/users` — Create user
- `PUT /api/admin/users/{id}` — Update user
- `DELETE /api/admin/users/{id}` — Delete user

---

## Notes

- All admin endpoints should be protected by authentication and authorization (e.g., Laravel Sanctum or Passport).
- Consider using Laravel Resource Controllers for RESTful endpoints.
- Adjust models and endpoints as needed for your specific business logic.
