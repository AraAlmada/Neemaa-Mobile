<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GoogleCalendar;
use App\Http\Requests;

class GoogleAgendaController extends Controller
{
    public function getNfo(Request $request) {
        $calendar = new GoogleCalendar;
        $result = $calendar->createCalendarNeem();
        //$calendarId = "YourCalendarID";
        //$result = $calendar->get($calendarId);
        return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'response' => $result
            ], 200);
    }
}
