<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Entry;
use Illuminate\Support\Facades\Mail;
use App\Mail\EntryShipped;
use App\Models\User;
use DateTime;
use DateTimeZone;

class PutEntryController extends Controller
{
    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'content' => ['required', 'string', 'min:10', 'max:255'],
            'user_id' => '',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $data = $validator->validated();

        if ($data['user_id']) $user = User::find($data['user_id'])->name;
        else $user = 'Anonymus';

        Entry::create($data);

        $date = new DateTime('now', new DateTimeZone('Europe/Moscow'));
        $data['timeToCreate'] = $date->format('Y-m-d H:i:s');
        Mail::to('crocodilka1@gmail.com')->send(new EntryShipped($data, $user));
    }
}
