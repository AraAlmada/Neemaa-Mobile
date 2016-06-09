<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Schedule;
use App\Http\Requests;

class ScheduleController extends Controller
{
    public function setSchedule(Request $request) {
        $schedules = new Schedule;
        $schedules->id_neemstyler = $request->id_neemstyler;
        $schedules->monday = $request->monday;
        $schedules->tuesday = $request->tuesday;
        $schedules->wednesday = $request->wednesday;
        $schedules->thursday = $request->thursday;
        $schedules->friday = $request->friday;
        // $schedules->saturday = $request->saturday;
        // $schedules->sunday = $request->sunday;
        $schedules->save();

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $schedules
        ], 200);
    }
}
