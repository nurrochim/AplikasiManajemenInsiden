<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as Image;
use App\Helpers\ImageHelper;
use App\IncidentFilesModel;
use Illuminate\Support\Facades\DB;
use DateTime;
use Input;
use Response;
use JasperPHP;
use PDF;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        if($request->file){
            // $validate = ImageHelper::validate($request->file, 2000000);
            
            // if(! $validate['success'])
            // {
            //     return response()->json([$validate['message']], 422);
            // }

            $image = ImageHelper::create($request->file, 600, 'image_issue/');
        }
    }

    public function destroyImage(Request $request)
    {
        //$user = User::find($request->id);

        if(!File::exists(public_path() . '\image_issue/' . $request->id))
        {
            File::delete(public_path() . '/image_issue/' . $request->id);
        }

        //$user->update(['image' => '']);

        return response()->json(['message' => 'User image successfully deleted']);

    }

    public function uploadImage(){
        //get parameter
        $request = $_REQUEST;
        $idIncident = $request['idIncident'];
        $fileGroup = $request['fileGorup'];
        $userName = $request['userName'];

        // build path
        $pathTo = public_path(). DIRECTORY_SEPARATOR .'file_incident' . DIRECTORY_SEPARATOR . $idIncident;
        if(!File::exists($pathTo))
        {
            File::makeDirectory($pathTo);
            // recursive (create berulang sampai path terakhir)
            //File::makeDirectory($pathTo, $idIncident, true);

        }

        if ( !empty( $_FILES ) ) {
            $request = $_REQUEST;
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $public_path = public_path();
        
            $uploadPath =  $pathTo. DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
            
            // jika file sudah ada di direktori, tak perlu disimpan ke database
            if(!File::exists($uploadPath))
            {
                $sql = "select idFile from incident_files where filePath = :path";
                $idFile = DB::select($sql, ['path'=>$uploadPath]);

                if(count($idFile)<1){
                    // save info to db
                    $fileIncident = new IncidentFilesModel;
                    $fileIncident->filePath = $uploadPath;
                    $fileIncident->fileName = $_FILES[ 'file' ][ 'name' ];
                    $fileIncident->fileType = $_FILES[ 'file' ][ 'type' ];
                    $fileIncident->fidIncident = $idIncident;
                    $fileIncident->fileGroup = $fileGroup;
                    $fileIncident->createBy = $userName;
                    $fileIncident->createDate = new DateTime();
                    $fileIncident->save();
                }
            }
            move_uploaded_file( $tempPath, $uploadPath );

            $answer = array( 'answer' => 'File transfer completed' );
            $json = json_encode( $answer );
            echo $json;
        } else {
            echo 'No files';
        }
    }

    public function getDownload(){
        $fileName = Input::get('fileName');
        //$pathTo = public_path(). DIRECTORY_SEPARATOR .'file_incident' . DIRECTORY_SEPARATOR . $idIncident;
        //$uploadPath =  $pathTo. DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

        $file = public_path()."/file_incident/Kartu Ujian.pdf";
        $headers = array('Content-Type: application/pdf',);
        return Response::download($file, 'info.pdf',$headers);
    }

    public function getFileByGroup(Request $request)
    {
        $sql = "select * from incident_files where fidIncident = :idIncident and fileGroup = :fileGroup";
        
        $idIncident = $request->input('idIncident');
        $fileGroup = $request->input('fileGroup');
        $files = DB::select($sql, ['fileGroup'=>$fileGroup, 'idIncident'=>$idIncident]);
        return response()->success(compact('files'));
    }

    public function getCreatePdf(){
        $template = public_path().'/file_incident/hello_world.jasper';
        // $report = new JasperPHP;
        // $report->process(
        JasperPHP::process(
            escapeshellarg($template),
            false,
            array('pdf', 'rtf'),
            array('php_version' => phpversion())
        )->execute();
        // echo "<pre>";
        // print_r(JasperPHP::output()) ;
        // echo "<pre>";
        // $output = public_path();
        // $report = new JasperPHP;
        // $report->process(
        //     public_path().'/file_incident/hello_world.jasper',
        //     false, 
        //     array('pdf', 'rtf', 'xml'),
        //     array(),
        //     array(),
        //     'pt_BR' //locale  
        //     )->execute();
    }    
        

    public function createTcpdf(){
        PDF::SetTitle('Hello World');
        PDF::AddPage();
        PDF::Write(0, 'Hello World');
        PDF::Output(public_path('hello_world' . '.pdf'), 'F');
    }
}
