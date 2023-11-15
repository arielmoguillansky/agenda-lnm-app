<?php
use App\Http\Controllers\UploadImageController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
// Route::resource('users', UserController::class);
Route::post('/signup', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::get('/users', [UserController::class, 'index']);
	Route::get('/users/{user}', [UserController::class, 'show']);
	Route::post('/users', [UserController::class, 'store']);
	Route::post('/contacts', [ContactController::class, 'store']);
	Route::post('/users/search', [UserController::class, 'search']);
	Route::put('/users/{user}', [UserController::class, 'update']);
	Route::delete('/users/{user}', [UserController::class, 'destroy']);
	Route::post('/logout', [AuthController::class, 'logout']);
});
