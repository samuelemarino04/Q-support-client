API ENDPOINTS

Events routes

Base URL /events

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| GET        | /getAllEvents            | All Events list                   |
| POST       | /saveEvent               | create new event                  |
| GET        | /:id                     | Matching ID event details         |
| PUT        | /:id/edit                | Edit matching ID event            |
| DELETE     | /:id/delete              | Delete matching ID event          |

Users routes

Base URL /clients

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| GET        | /getAllUsers            |   All clients list                 |
| POST       | /saveUsers              |   create new User                  |
| GET        | /:id                     | Matching ID client details        |
| PUT        | /:id/edit                | Edit matching ID User             |
| DELETE     | /:id/delete              | Delete matching ID User           |

        
Subscriptions routes

Base URL /subscriptions

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| GET        | /getAllSubscriptions     |   All subscriptions list          |
| POST       | /saveSubscriptions       |    create new subscriptions       |
| GET        | /:id                     | Matching ID subscriptions details |
| PUT        | /:id/edit                | Edit matching ID subscriptions    |
| DELETE     | /:id/delete              | Delete matching ID subscriptions  |

Auth Routes

Base URL /auth

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| POST       | /signup                  | Signup user                       |
| POST       | /login                   | Login user                        |
| GET        | /verify                  | Verify auth token                 |
|---------------------------------------------------------------------------|



 CLIENT ROUTES

|URL             | DESCRIPTION                | PROTECTED |
|---------------------------------------------------------|
| /              | Index Page                 |           |
| /signup        | signup page                |           |
| /login         | login page                 |           |
| /events        | events page                |           |
| /details/:id   | events details page        |           |
| /edit          | edit events details        | *         |
| /delete        | delete event               | *         |
| /profile       | user profile               | *         |
| /edit profile  | edit user profile          |           |
| /delete profile| delete user profile        | *         |
| /subscriptions | subscriptions page         |           |
| /details/:id   | subscriptions details page |           |
| /edit          | edit subscriptions details | *         |
| /delete        | delete subscription        | *         |
| /users         | user page                  |           |
| /details/:id   | users details page         |           |
| /edit          | edit users details         | *         |
| /delete        | delete user                | *         |
| *              | 404 error page             |           |
|---------------------------------------------------------|
| GET        | /getAllEvents            | All Events list                   |
| POST       | /saveEvent               | create new event                  |
| GET        | /:id                     | Matching ID event details         |
| PUT        | /:id/edit                | Edit matching ID event            |
| DELETE     | /:id/delete              | Delete matching ID event          |

Users routes

Base URL /clients

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| GET        | /getAllUsers            |   All clients list                 |
| POST       | /saveUsers              |   create new User                  |
| GET        | /:id                     | Matching ID client details        |
| PUT        | /:id/edit                | Edit matching ID User             |
| DELETE     | /:id/delete              | Delete matching ID User           |

        
Subscriptions routes

Base URL /subscriptions

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| GET        | /getAllSubscriptions     |   All subscriptions list          |
| POST       | /saveSubscriptions       |    create new subscriptions       |
| GET        | /:id                     | Matching ID subscriptions details |
| PUT        | /:id/edit                | Edit matching ID subscriptions    |
| DELETE     | /:id/delete              | Delete matching ID subscriptions  |

Auth Routes

Base URL /auth

| HTTP METHOD| URI PATH                 | DESCRIPTION                       |
|----------- |--------------------------|-----------------------------------|
| POST       | /signup                  | Signup user                       |
| POST       | /login                   | Login user                        |
| GET        | /verify                  | Verify auth token                 |
|---------------------------------------------------------------------------|



 CLIENT ROUTES

|URL             | DESCRIPTION                | PROTECTED |
|---------------------------------------------------------|
| /              | Index Page                 |           |
| /registro      | signup page                |           |
| /inicio-sesion | login page                 |           |
| /events        | events page                |           |
| /details/:id   | events details page        |           |
| /edit          | edit events details        | *         |
| /delete        | delete event               | *         |
| /profile       | user profile               | *         |
| /edit profile  | edit user profile          |           |
| /delete profile| delete user profile        | *         |
| /subscriptions | subscriptions page         |           |
| /details/:id   | subscriptions details page |           |
| /edit          | edit subscriptions details | *         |
| /delete        | delete subscription        | *         |
| /users         | user page                  |           |
| /details/:id   | users details page         |           |
| /edit          | edit users details         | *         |
| /delete        | delete user                | *         |
| *              | 404 error page             |           |
|---------------------------------------------------------|
