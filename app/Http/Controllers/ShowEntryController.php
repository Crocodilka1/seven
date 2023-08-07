<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entry;

class ShowEntryController extends Controller
{
    public function __invoke()
    {
        $entriesSort = Entry::orderBy('created_at', 'desc')->paginate(3);
        //$entries = $entriesSort->paginate(1);
        return $entriesSort;
    }
}
