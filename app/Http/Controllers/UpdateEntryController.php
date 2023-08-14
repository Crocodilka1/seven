<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditRequest;
use App\Models\Entry;

class UpdateEntryController extends Controller
{
    public function __invoke(Entry $entry, EditRequest $request)
    {
        $data = $request->validated();
        $entry->update($data);
        
        return response('Updated');
    }
}
