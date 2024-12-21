<?php

namespace App\Http\Controllers;

use App\Enums\EmploymentType;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Post::with('tags')->get();

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

        $tags = Tag::all();

        return Inertia::render('Post/Create', ['employmentTypes' => $employmentTypes, 'tags' => $tags]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'location' => 'required',
            'employment_type' => ['required', Rule::enum(EmploymentType::class)],
            'url' => ['required', 'url:http,https'],
            'company_name' => 'required',
            'tags' => 'array',
            'tags.*' => [Rule::exists('tags', 'id')],
        ]);

        $path = $request->company_logo->store('logos', 'public');

        $post = Auth::user()->posts()->create([
            'title' => $request->title,
            'location' => $request->location,
            'employment_type' => $request->employment_type,
            'url' => $request->url,
            'salary' => $request->salary,
            'company_name' => $request->company_name,
            'company_logo' => $path
        ]);
        $post->tags()->sync($request->tags);

        return to_route('posts.index');
    }

    public function edit(Request $request, Post $post)
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403);
        }

        $employmentTypes = EmploymentType::cases();
        $tags = Tag::all();
        $post->load('tags');

        return Inertia::render('Post/Edit', [ 'post' => $post, 'tags' => $tags, 'employmentTypes' => $employmentTypes ]);
    }

    public function update(Request $request, Post $post)
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403);
        }

        $request->validate([
            'title' => 'required',
            'location' => 'required',
            'employment_type' => ['required', Rule::enum(EmploymentType::class)],
            'url' => ['required', 'url:http,https'],
            'company_name' => 'required',
            'tags' => 'array',
            'tags.*' => [Rule::exists('tags', 'id')],
        ]);

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

        $post->tags()->sync($request->tags);

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
