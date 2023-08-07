<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];
 
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success = true;
            $message = 'User login successfully';
            $token = Str::random(80);
        } else {
            $user = null;
            $success = false;
            $message = 'Unauthorised';
            $token = null;
        }
    
        $response = [
            'user' => $user,
            'success' => $success,
            'message' => $message,
            'token' => $token,
        ];
        return response()->json($response);
    }
    
}
