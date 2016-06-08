<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Validator;
use DB;
use Mail;
use Storage;

class RegisterController extends Controller
{
    public function index(Request $request) {
        $token = str_random(60);
        if (isset($request->society)) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:neemstylers|unique:users|max:255',
                'password' => 'required|min:6|max:20|confirmed',
                'password_confirmation' => 'required|min:6|max:20',
                'society' => 'min:1|max:45'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'error_form'], 401);
            }
        } else {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:neemstylers|unique:users|max:255',
                'password' => 'required|min:6|max:20|confirmed',
                'password_confirmation' => 'required|min:6|max:20'
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'error_form'], 401);
            }
        }

        if (isset($request->society)) {
            $society = $request->society;
            try {
                DB::table('neemstylers')->insert([
                    'password' => bcrypt($request->password),
                    'email' => $request->email,
                    'society' => $society,
                    'token_activator' => $token,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                $disk = file_get_contents(base_path() . '/public/img/profil.jpg');
                file_put_contents(base_path() . '/public/img/neemstyler/' . $request->email . '/profil.jpg', $disk, LOCK_EX);
            }catch(Exception $e){
                return response()->json(['error' => $e], 401);
            }
        } else {
            try {
                DB::table('users')->insert([
                    'password' => bcrypt($request->password),
                    'email' => $request->email,
                    'token_activator' => $token,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                $disk = file_get_contents(base_path() . '/public/img/profil.jpg');
                file_put_contents(base_path() . '/public/img/client/' . $request->email . '/profil.jpg', $disk, LOCK_EX);
            }catch(Exception $e){
                return response()->json(['error' => $e], 401);
            }
        }

        $this->emailTo($request, 'email.confirm', ['token' => $token], 'Confirmer le comte Neemaa');

        return response()->json([
            'data' => [
                'email' => $request->email,
                'valide' => 0
            ]], 200);
    }

    public function confirm($token) {


        $user = $email = DB::table('users')->where('token_activator', $token)->get();
        $neemStyler = $email = DB::table('neemstylers')->where('token_activator', $token)->get();

        if (!empty($user)) {

            try {
                DB::table('users')
                    ->where('token_activator', $token)
                    ->update([
                        'active' => true
                    ]);
                return response()->json(['data' => 'user_activated'], 200);
            } catch(Exception $e){
                return response()->json(['error' => $e], 400);
            }
        }

        if (!empty($neemStyler)) {
            try {
                DB::table('neemstylers')
                    ->where('token_activator', $token)
                    ->update([
                        'active' => true
                    ]);
                return response()->json(['data' => 'neemstylers_activated'], 200);
            } catch(Exception $e){
                return response()->json(['error' => $e], 400);
            }
        }

        return response()->json(['error' => 'invalid_token'], 400);
    }

    public function emailTo($person, $view, $data, $subject)
    {
        Mail::send($view, $data, function($message) use($person, $subject)
        {
            $message->from('notificiation@neemaa.com', $subject);

            $message->to($person->email)
                ->subject($subject);
        });
    }
}
