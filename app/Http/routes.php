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
use JasperPHP\JasperPHP as JasperPHP;

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');
});
Route::post('/upload', function(){return view('upload');});
Route::post('/destroy-image', 'ImageController@destroyImage');
Route::post('/file-upload', 'ImageController@uploadImage');
Route::get('/report-comm-sheet', 'CommunicationSheetCtrl@exportToPdf');
Route::get('/report-comm-template', function(){return view('ReportTemplate.CommSheetTemplate');});
Route::get('/report-comm-sheet2/{idIncident}', 'CommunicationSheetCtrl@generateReport');
Route::get('/download', 'ImageController@getDownload');
Route::get('/download-report', 'ImageController@getCreatePdf');
Route::get('/download-report3', 'ImageController@createTcpdf');
Route::get('/download-report2', function () {
    
        $jasper = new JasperPHP;
    
        // Compile a JRXML to Jasper
        //$jasper->compile(public_path().'/file_incident/hello_world.jrxml')->execute();
    
        // Process a Jasper file to PDF and RTF (you can use directly the .jrxml)
        $jasper->process(
            public_path().'/file_incident/hello_world.jasper',
            false,
            array("pdf", "rtf"),
            array("php_version" => "xxx")
        )->output();
        echo "<pre>";
        print_r($jasper) ;
        echo "<pre>";
    
        // List the parameters from a Jasper file.
        $array = $jasper->list_parameters(
            public_path().'/file_incident/hello_world.jasper'
        )->output();
    
        return view('welcome');
    });
Route::get('/download/{idIncident}/{filename}', function ($idIncident,$filename)
{
    $path = public_path()."/file_incident/".$idIncident."/". $filename;

    if(!File::exists($path)) abort(404);

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

Route::get('/download-report/{filename}', function ($filename)
{
    $path = public_path()."/report/". $filename;

    if(!File::exists($path)) abort(404);

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
});

// $api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user|role.serviceadmin']], function ($api) {
//     $api->controller('users', 'UserController');
// });

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->controller('issues', 'ControllerIssueList');
    $api->controller('incidents', 'IncidentCtrl');
    $api->controller('incidentpics', 'IncidentPicCtrl');
    $api->controller('files', 'ImageController');
    $api->controller('confirm', 'IncidentConfirmHistoryCtrl');
    $api->controller('users', 'UserController');
    $api->controller('reportcomm', 'CommunicationSheetCtrl');
});

