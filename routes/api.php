<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PutEntryController;
use App\Http\Controllers\ShowEntryController;
use App\Http\Controllers\DeleteEntryController;
use App\Http\Controllers\UpdateEntryController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', LoginController::class);
Route::post('/register', [RegistrationController::class, 'create']);
Route::post('/logout', LogoutController::class);
Route::post('/entry', [PutEntryController::class, 'create']);
Route::get('/entry', ShowEntryController::class);
Route::delete('/entry/{entry}', DeleteEntryController::class);
Route::patch('/entry/{entry}', UpdateEntryController::class);