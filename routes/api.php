<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PutEntryController;
use App\Http\Controllers\ShowEntryController;
use App\Http\Controllers\DeleteEntryController;
use App\Http\Controllers\UpdateEntryController;
use App\Http\Controllers\AuthController;

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

Route::post('/entry', [PutEntryController::class, 'create']);
Route::get('/entry', ShowEntryController::class);

Route::group(['middleware' => 'test'], function () {
    Route::patch('/entry/{entry}', UpdateEntryController::class);
    Route::delete('/entry/{entry}', DeleteEntryController::class);
});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});