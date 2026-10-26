
# Farwell Travel — Angular Frontend

## Run
```powershell
cd C:\Projects\travel-frontend
npm install
npm start
```
Open http://localhost:4200

The frontend expects Laravel at `http://localhost:8000`.

## Main routes
- `/` — home
- `/results` — search results
- `/packages/:id` — package details
- `/destinations/:id` — destination details
- `/login` — login
- `/signup` — registration
- `/booking` — booking checkout
- `/confirmation` — booking confirmation

## Backend
Start Laravel separately:
```powershell
cd C:\Projects\travel-backend
php artisan migrate
php artisan db:seed --class=Database\Seeders\TravelDemoSeeder
php artisan serve
```
