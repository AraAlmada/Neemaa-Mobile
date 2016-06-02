<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use DB;

class SearchController extends Controller
{
    public function getList(Request $request) {
        $list = DB::table('neemstylers')->where('cp', $request->cp)->get();
        $services = DB::table('services')->where('name', $request->service)->get();
        $neemstyler = [];

        if (empty($list)) {
            return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'error' => 'no_neemstyler'
            ], 400);
        }
        
        for ($i = 0; $i < count($list); $i++) {
            for ($j = 0; $j < count($services); $j++) {
                if ($list[$i]->id == $services[$j]->id_neemstyler) {
                    $neemstyler[] = $list[$i];
                }
            }
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $neemstyler
        ], 200);
    }

    public function getNeem(Request $request) {
        $society = implode('', $request->all());
        $neemstyler = DB::table('neemstylers')->where('society', $society)->get();

        if (empty($neemstyler)) {
            return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'error' => 'bad_society'
            ], 400);
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $neemstyler
        ], 200);
    }
}
