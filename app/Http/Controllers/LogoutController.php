<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\HttpCache\ResponseCacheStrategy;

class LogoutController extends Controller
{
    public function __invoke()
    {
        Auth::logout();

        if (!Auth::check()) return true;
        return false;

    }
}