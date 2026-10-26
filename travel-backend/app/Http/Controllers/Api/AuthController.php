<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'max:72'],
        ]);

        $user = User::create($validated);
        return $this->issueToken($user);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'The email or password is incorrect.'], 422);
        }

        return $this->issueToken($user);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $this->userFromRequest($request);
        if ($user) {
            $user->forceFill(['api_token' => null])->save();
        }
        return response()->json(['message' => 'Logged out.']);
    }

    private function issueToken(User $user): JsonResponse
    {
        $plain = Str::random(60);
        $user->forceFill(['api_token' => hash('sha256', $plain)])->save();

        return response()->json([
            'token' => $plain,
            'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email],
        ]);
    }

    public static function userFromRequest(Request $request): ?User
    {
        $token = $request->bearerToken();
        return $token
            ? User::where('api_token', hash('sha256', $token))->first()
            : null;
    }
}
