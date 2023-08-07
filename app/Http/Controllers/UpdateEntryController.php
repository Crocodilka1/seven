<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entry;

class UpdateEntryController extends Controller
{
    public function __invoke(Entry $entry, Request $request)
    {
        $data = $request->validated();
        $entry->update($data);
        
        return 'Updated';
    }
}
