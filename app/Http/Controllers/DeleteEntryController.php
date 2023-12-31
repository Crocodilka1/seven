<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entry;

class DeleteEntryController extends Controller
{
    public function __invoke(Entry $entry)
    {
        $entry->delete();
        return response('Deleted');
    }
}
