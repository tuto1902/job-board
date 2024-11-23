<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index()
    {
        $jobs = Post::all();

        return Inertia::render('Post/Index', [
            'jobs' => $jobs
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/Create');
    }
}
