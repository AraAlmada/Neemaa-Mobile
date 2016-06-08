<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GoogleCalendar;
use App\Http\Requests;

class GoogleAgendaController extends Controller
{
    public function getNfo(Request $request) {
        $calendar = new GoogleCalendar;
        //$calendar->createCalendarNeem('test', 'UTC');
        $result = $calendar->getAllCalendarNeem();
        $res = [];
        while(true) {
          foreach ($result->getItems() as $calendarListEntry) {
            $res[] = $calendarListEntry->getId().'<br>';
          }
          $pageToken = $result->getNextPageToken();
          if ($pageToken) {
            $optParams = array('pageToken' => $pageToken);
            $result = $service->calendarList->listCalendarList($optParams);
          } else {
            break;
          }
        }

        return response()->json([
            'data' => $request->data,
            'token' => $request->token,
            'response' => $res
        ], 200);
    }
}
