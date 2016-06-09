<?php

namespace App;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

class GoogleCalendar {

    protected $client;
    protected $service;

    function __construct() {
        /* Get config variables */
        $client_id = Config::get('google.client_id');
        $service_account_name = Config::get('google.service_account_name');
        $key_file_location = base_path() . Config::get('google.key_file_location');

        $this->client = new \Google_Client();
        $this->client->setApplicationName("Neemaa");
        $this->service = new \Google_Service_Calendar($this->client);

        /* If we have an access token */
        if (Cache::has('service_token')) {
          $this->client->setAccessToken(Cache::get('service_token'));
        }

        $key = file_get_contents($key_file_location);
        /* Add the scopes you need */
        $scopes = array('https://www.googleapis.com/auth/calendar');
        $cred = new \Google_Auth_AssertionCredentials(
            $service_account_name,
            $scopes,
            $key
        );

        $this->client->setAssertionCredentials($cred);
        if ($this->client->getAuth()->isAccessTokenExpired()) {
          $this->client->getAuth()->refreshTokenWithAssertion($cred);
        }
        Cache::forever('service_token', $this->client->getAccessToken());
    }

    public function get($calendarId)
    {
        $results = $this->service->calendars->get($calendarId);
        dd($results);
    }

    public function createCalendarNeem($Summary) {
        $calendar = new \Google_Service_Calendar_Calendar();
        $calendar->setSummary($Summary);
        $calendar->setTimeZone('Europe/Paris');

        $createdCalendar = $this->service->calendars->insert($calendar);

        return $createdCalendar;
    }

    public function deleteCalendarNeem($id) {
        $this->service->calendars->delete($id);
    }

    public function getAllCalendarNeem() {
        $calendarList  = $this->service->calendarList->listCalendarList();
        return $calendarList;
    }

    public function getCalendarNeem($calendarId) {
        $calendar = $this->service->calendars->get($calendarId);
        return $calendar;
    }

    public function addEvent() {
        $event = new \Google_Service_Calendar_Event(array(
          'summary' => 'Titre Event',
          'location' => 'adress Event',
          'description' => 'idclient<||>service<||>date<||>heureDebut<||>heurefin',
          'start' => array(
            'dateTime' => '2015-05-28T09:00:00-07:00',
            'timeZone' => 'Europe/Paris',
          ),
          'end' => array(
            'dateTime' => '2015-05-28T17:00:00-09:00',
            'timeZone' => 'Europe/Paris',
          ),
          'status' => 'tentative',
        //   'recurrence' => array(
        //     'RRULE:FREQ=DAILY;COUNT=2'
        //   ),
        //   'attendees' => array(
        //     array('email' => 'lpage@example.com'),
        //     array('email' => 'sbrin@example.com'),
        //   ),
          'reminders' => array(
            'useDefault' => FALSE,
            'overrides' => array(
              array('method' => 'email', 'minutes' => 24 * 60),
              array('method' => 'popup', 'minutes' => 10),
            ),
          ),
        ));

        $calendarId = 'bdf58dgpaditrvqp1q9mfbt788@group.calendar.google.com';
        $event = $this->service->events->insert($calendarId, $event);

        return $event;
    }

    public function getAllEvents() {
        $events = $this->service->events->listEvents('bdf58dgpaditrvqp1q9mfbt788@group.calendar.google.com');
        $eventsAll = [];

        while(true) {
          foreach ($events->getItems() as $event) {
            $eventsAll[] = $event;
          }
          $pageToken = $events->getNextPageToken();
          if ($pageToken) {
            $optParams = array('pageToken' => $pageToken);
            $events = $this->service->events->listEvents('bdf58dgpaditrvqp1q9mfbt788@group.calendar.google.com', $optParams);
          } else {
            break;
          }
        }

        return $eventsAll;
    }

    public function test() {
        $event = $this->service->events->get('bdf58dgpaditrvqp1q9mfbt788@group.calendar.google.com', "ddac1r2n6rq30qj4q76j40o6i0");

        return $event;
    }
}
