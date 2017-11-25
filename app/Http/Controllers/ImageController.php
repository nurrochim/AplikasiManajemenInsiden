<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as Image;
use App\Helpers\ImageHelper;

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

        if(File::exists(public_path() . '\image_issue/' . $request->id))
        {
            File::delete(public_path() . '/image_issue/' . $request->id);
        }

        //$user->update(['image' => '']);

        return response()->json(['message' => 'User image successfully deleted']);

    }
        
}
