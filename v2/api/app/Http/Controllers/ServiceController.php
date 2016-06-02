<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class ServiceController extends Controller
{
    public function addService(Request $request) {
        DB::table('services')->insert([
            'id_neemstyler' => $request->id,
            'name' => $request->service,
            'price' => $request->price,
            'activator' => 0,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        return response()->json([
            'data' => $request->data,
            'token' => $request->token
        ], 200);
    }

    public function getService(Request $request) {
        $services = DB::table('services')->where('id_neemstyler', $request->id)->get();

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $services
        ], 200);
    }

    public function deleteService(Request $request) {
        DB::table('services')->where('id', '=', $request->id)->delete();

        return response()->json([
            'data' => $request->data,
            'token' => $request->token
        ], 200);
    }

    public function getAllService(Request $request) {
        $services = DB::table('services')->where('activator', 1)->get();

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $services
        ], 200);
    }
}
