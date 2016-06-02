<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;
use Storage;

class UserController extends Controller
{
    public function getUser(Request $request) {
        $users = DB::table('users')->where('email', $request->email)->get();

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $users
        ], 200);
    }

    public function getNeemStyler(Request $request) {
        $users = DB::table('neemstylers')->where('email', $request->email)->get();
        $image = [];

        for ($i = 1; $i <= 5; $i++) {
            if (Storage::disk('publicNeemPresente')->has('file'.$i.'.jpg') == true) {
                $image[] = 'http://localhost:8000/img/neemstyler/benjamin.sansy@gmail.com/presente/file'.$i.'.jpg';
            }
        }
        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $users,
            'picture_presente' => $image
        ], 200);
    }

    public function updateUser(Request $request) {
        $users = DB::table('users')->where('email', $request->email)->get();

        if (empty($users)) {
            return response()->json(['error' => 'user_not_found']);
        }

        try {
            DB::table('users')->where('email', $request->email)->update([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'adress' => $request->adress,
                'cp' => $request->cp,
                'sex' => $request->sex,
                'birthdate' => $request->birthdate,
                'carnation_type' => $request->carnation_type,
                'carnation_color' => $request->carnation_color,
                'hair_type' => $request->hair_type,
                'hair_color' => $request->hair_color
            ]);
        } catch(Exception $e){
            return response()->json(['error' => $e], 400);
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $users
        ], 200);
    }

    public function updateUserToNeemstyler(Request$request) {
        $users = DB::table('users')->where('email', $request->email)->get();

        if (empty($users)) {
            return response()->json(['error' => 'user_not_found']);
        }

        DB::table('users')->delete();

        DB::table('neemstylers')->insert([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'password' => $users[0]->password,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'active' => 1
        ]);

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $users
        ], 200);
    }

    public function updateNeemStyler(Request $request) {
        $users = DB::table('neemstylers')->where('email', $request->email)->get();

        if (empty($users)) {
            return response()->json(['error' => 'user_not_found']);
        }

        try {
            DB::table('neemstylers')->where('email', $request->email)->update([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'adress' => $request->adress,
                'cp' => $request->cp,
                'sex' => $request->sex,
                'city' => $request->city,
                'birthdate' => $request->birthdate,
                'home' => $request->home1,
                'saloon' => $request->saloon1
            ]);
        } catch(Exception $e){
            return response()->json(['error' => $e], 400);
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $request->all()
        ], 200);
    }

    public function uploadProfilPictureNeemStyler(Request $request) {

        $ext = ['jpg', 'JPG', 'JPEG', 'jpeg', 'png', 'PNG', 'gif', 'GIF'];
        $extFile = $request->file->getClientOriginalExtension();

        if (in_array($extFile, $ext)) {
            $file = $request->file;
            $file->move(
                base_path() . '/public/img/neemstyler/'.$request->email, 'profil.'.$extFile
            );
        } else {
            return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'error' => 'bad_format'
            ], 400);
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $file
        ], 200);
    }

    public function uploadProfilPictureNeemStylerPresente(Request $request) {
        $retval = 0;
        $dir = base_path() . '/public/img/neemstyler/' . $request->email . '/presente';
        $this->deleteDirectory($dir);
        $image = [];
        $ext = ['jpg', 'JPG', 'JPEG', 'jpeg'];
        for ($i = 0; $i < count($request->file); $i++) {
            $extFile = $request->file[$i]->getClientOriginalExtension();
            if (in_array($extFile, $ext)) {
                $file = $request->file[$i];
                $file->move(
                    base_path() . '/public/img/neemstyler/' . $request->email . '/presente', 'file' . ($i + 1) . '.' . $extFile
                );
                $image[] = 'http://localhost:8000/img/neemstyler/' . $request->email . '/presente/file' . ($i + 1) . '.' . $extFile;
            }
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $image
        ], 200);
    }

    public function uploadProfilPictureUser(Request $request) {

        $ext = ['jpg', 'JPG', 'JPEG', 'jpeg'];
        $extFile = $request->file->getClientOriginalExtension();

        if (in_array($extFile, $ext)) {
            $file = $request->file;
            $file->move(
                base_path() . '/public/img/client/'. $request->email, 'profil.'. $extFile
            );
        } else {
            return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'error' => 'bad_format'
            ], 400);
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $file
        ], 200);
    }

    public function deleteDirectory($dir) {
        system('rm -rf ' . escapeshellarg($dir), $retval);
        return $retval == 0; // UNIX commands return zero on success
    }
}
