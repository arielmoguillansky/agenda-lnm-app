<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\MultipartFormRequest;
use App\Http\Resources\MultipartFormResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'lastname'=> 'required',
            'address'=> 'required',
            'phone'=> 'required',
            'title'=> 'required',
            'email'=> 'required|email|unique:users',
            'avatar' => 'image|mimes:jpeg,png,jpg',
        ]);
        $input= $request->all();
        
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            
            // for disk storage - deprecated
            // $avatarPath = $avatar->store('avatars', 'public');

            // cloud storage
            $avatarName = $avatar->hashName();
            $avatarPath = $avatar->storeAs('avatars', $avatarName, 's3');
            
            $input['avatar']=$avatarName;
            Storage::disk('s3')->put($avatarPath, file_get_contents($avatar));
        }

        return User::create($input);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return User::find($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $contact)
    {
        // $user object passed as a parameter, which already represents the user you want to update. You don't need to find the user again using 
        $contact->update($request->all());
        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Search for a name
     */
    public function search(Request $request)
    {
        return User::where('name', 'like', '%' . $request->input('name') . '%')->get();
    }
}
