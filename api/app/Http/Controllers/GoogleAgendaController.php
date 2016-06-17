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

    public function addEvent(Request $request) {
        $calendar = new GoogleCalendar;
        $event = $calendar->addEvent('EventTest', 1, 'coiffure', '2016-06-09', '11h', '12h', '8623tsjqcin9urn10730r997ks@group.calendar.google.com');

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $event
        ], 200);
    }

    public function getEventsNeem(Request $request) {
        $id = DB::table('neemstylers')->where('id', $request->id_neem)->get();
        $id = $id[0]->id_calendar;
        $calendar = new GoogleCalendar;
        $event = $calendar->getAllEvents($id);
        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $event
        ], 200);
    }
}
