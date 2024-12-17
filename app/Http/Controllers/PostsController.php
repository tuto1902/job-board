<?php

namespace App\Http\Controllers;

use App\Enums\EmploymentType;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::all();

        return Inertia::render('Post/Index', [
            'user' => Auth::user(),
            'posts' => $posts->map(
                fn ($post) => [...$post->toArray(), "can" => ["edit_post" => Auth::user()?->can('update', $post)]]
            )
        ]);
    }

    public function create()
    {
        $employmentTypes = EmploymentType::cases();

        return Inertia::render('Post/Create', ['employmentTypes' => $employmentTypes]);
    }

    public function store(Request $request)
    {
        $path = $request->company_logo->store('logos', 'public');
        Post::create([
            'title' => $request->title,
            'location' => $request->location,
            'employment_type' => $request->employment_type,
            'url' => $request->url,
            'salary' => $request->salary,
            'company_name' => $request->company_name,
            'company_logo' => $path
        ]);

        return to_route('posts.index');
    }

    public function edit(Request $request, Post $post)
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403);
        }

        $employmentTypes = EmploymentType::cases();

        return Inertia::render('Post/Edit', [ 'post' => $post, 'employmentTypes' => $employmentTypes ]);
    }

    public function update(Request $request, Post $post)
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403);
        }

        $oldPath = $post->company_logo;
        $path = $request->company_logo?->store('logos', 'public');

        if ($path && $oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        if (!$path) {
            $path = $oldPath;
        }

        $post->update([
            'title' => $request->title,
            'location' => $request->location,
            'employment_type' => $request->employment_type,
            'url' => $request->url,
            'salary' => $request->salary,
            'company_name' => $request->company_name,
            'company_logo' => $path
        ]);

        return to_route('posts.index');
    }

    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->cannot('delete', $post)) {
            abort(403);
        }

        $post->delete();

        return to_route('posts.index');
    }
}
