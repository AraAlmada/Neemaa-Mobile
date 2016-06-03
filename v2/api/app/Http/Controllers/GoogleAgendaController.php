<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GoogleCalendar;
use App\Http\Requests;

class GoogleAgendaController extends Controller
{
    public function getNfo() {
        $calendar = new GoogleCalendar;
        $calendarId = "YourCalendarID";
        $result = $calendar->get($calendarId);
        return response()->json([
                'data' => $request->data,
                'token' => $request->token,
                'response' => $result
            ], 200);
    }
}
