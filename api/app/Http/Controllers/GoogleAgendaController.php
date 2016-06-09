<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GoogleCalendar;
use DB;
use App\Http\Requests;

class GoogleAgendaController extends Controller
{
    public function getNfo(Request $request) {
        $id = DB::table('neemstylers')->where('id', $request->id_neem)->get();
        $calendar = new GoogleCalendar;
        $calendarNeem = $calendar->getCalendarNeem($id[0]->id_calendar);

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $calendarNeem
        ], 200);
    }

    public function test() {
        $calendar = new GoogleCalendar;
        $event = $calendar->test();
        return response()->json(['data' => $event]);
    }
}
