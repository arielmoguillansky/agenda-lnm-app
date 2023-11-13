<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
            'password'=> 'required'
        ]);

        return User::create($request->all());
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
    public function update(Request $request, User $user)
    {
        // $user object passed as a parameter, which already represents the user you want to update. You don't need to find the user again using 
        $user->update($request->all());
        return $user;
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
