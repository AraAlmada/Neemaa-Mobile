<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
 * CORS CONFIG
 */
header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api'], function () {
    Route::post('/register', 'RegisterController@index');
    Route::post('/login', 'LoginController@index');
    Route::post('/recovery', 'LoginController@recovery');
    Route::post('/recovery_password', 'LoginController@recoveryPassword');
    Route::get('/confirm/{token}', 'RegisterController@confirm');
    Route::get('/resend/{email}', 'LoginController@resendMail');
});

Route::group(['prefix' => 'api', 'middleware' => 'auth'], function () {
    Route::get('/auth', function() {
        return response()->json(['data' => 'user_logged']);
    });
    Route::post('/get-user', 'UserController@getUser');
    Route::put('/update-user', 'UserController@updateUser');
    Route::post('/update-user-to-neemstyler', 'UserController@updateUserToNeemstyler');
    Route::post('/search', 'SearchController@getList');
    Route::post('/get-neemstyler-search', 'SearchController@getNeem');
    Route::get('/get-all-services', 'ServiceController@getAllService');
    Route::post('/upload-profil-picture-user', 'UserController@uploadProfilPictureUser');
});

Route::group(['prefix' => 'api', 'middleware' => 'neemstyler'], function () {
    Route::get('/auth/neemstyler', function() {
        return response()->json(['data' => 'neemstyler_logged']);
    });
    Route::post('/search', 'SearchController@getList');
    Route::get('/get-neemstyler', 'UserController@getNeemStyler');
    Route::post('/update-neemstyler', 'UserController@updateNeemStyler');
    Route::post('/get-neemstyler-search', 'SearchController@getNeem');
    Route::post('/add-service', 'ServiceController@addService');
    Route::post('/get-service', 'ServiceController@getService');
    Route::post('/delete-service', 'ServiceController@deleteService');
    Route::get('/get-all-service', 'ServiceController@getAllService');
    Route::post('/upload-profil-picture-neemstyler', 'UserController@uploadProfilPictureNeemStyler');
    Route::post('/upload-profil-picture-neemstyler-presente', 'UserController@uploadProfilPictureNeemStylerPresente');
    Route::get('/get/agenda-info', 'GoogleAgendaController@getNfo');
});

Route::group(['prefix' => 'api', 'middleware' => 'admin'], function () {
    Route::get('/auth/admin', function() {
        return response()->json(['data' => 'admin_logged']);
    });
});
