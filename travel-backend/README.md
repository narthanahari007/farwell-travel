
# Farwell Travel — Laravel API

## Run
```powershell
cd C:\Projects\travel-backend
php artisan migrate
php artisan db:seed --class=Database\Seeders\TravelDemoSeeder
php artisan serve
```

API base: `http://127.0.0.1:8000/api`

## Core endpoints
- `GET /api/destinations/trending`
- `GET /api/destinations/{id}`
- `GET /api/packages`
- `GET /api/packages/{id}`
- `POST /api/search`
- `POST /api/newsletter/subscribe`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/bookings`
- `GET /api/bookings`

The seeded database contains destinations, packages, flight offers and stay offers for the demo.
