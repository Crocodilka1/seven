<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Entry;
use Illuminate\Support\Facades\Mail;
use App\Mail\EntryShipped;
use App\Models\User;
use App\Http\Requests\EditRequest;
use DateTime;
use DateTimeZone;
use Exception;

class PutEntryController extends Controller
{
    public function create(EditRequest $request) {
        
        $admins = User::where('role', 0)->get();

        $data = $request->validated();

        $result = [];

        if (isset($admins[0])) {
            foreach ($admins as $admin)
            {
                $dataForSend = [];
                $dataForSend['content'] = $data['content'];
                if ($data['user_id']) $user = User::find($data['user_id'])->name;
                else $user = 'Anonymus';
                $date = new DateTime('now', new DateTimeZone('Europe/Moscow'));
                $dataForSend['timeToCreate'] = $date->format('Y-m-d H:i:s');
                $dataForSend['admin_email'] = $admin->email;
                $result[] = $dataForSend;

                /* Аккаунт на mailgun заблокировали, отправкиписем пока не будет. 
                В консоли выводятся почтовые ящики админов*/

                // try {
                //     Mail::to($admin->email)->send(new EntryShipped($dataForSend, $user));
                // } catch (Exception $e)
                // {
                //     $errors[] = 'Сообщение отправлено ' + $admin->email;
                // }
            }
        }
        
        Entry::create($data);

        $response = ['message' => 'Entry create', 'results' => $result];

        return response()->json($response);
    }
}
