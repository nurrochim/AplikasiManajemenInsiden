<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use App\IncidentPicModel;
use Input;


class IncidentPicCtrl extends Controller
{
    public function getIndex($id = null) {
        if ($id == null) {
            $pics = IncidentPicModel::orderBy('idPic', 'asc')->get();
            return response()->success(compact('pics'));
        }
    }

    public function postIncidentPic() {
        $pic = new IncidentPicModel;
        $pic->fidIncident = Input::get('fidIncident');
        $pic->fidUser = Input::get('fidUser');
        $pic->picName = Input::get('picName');
        $pic->targetDate = Input::get('targetDate');
        $pic->task = Input::get('task');
        
        $pic->save();

        return response()->success($pic);
    }

    public function getIncidentPicShow($idIncident)
    {
        $issue = IncidentPicModel::find($idIncident);
        return response()->success($issue);
    }

    public function putIncidentPicShow()
    {
        $issueForm = Input::get('data');
        $affectedRows = IncidentPicModel::where('idPic', '=', intval($issueForm['idPic']))->update($issueForm);

        return response()->success($issueForm);
    }

    public function deleteIncidentPic($idPic)
    {
        IncidentPicModel::destroy($idPic);
        return response()->success('success');
    }

    public function getPicIncident($fidIncident)
    {
        $pics = IncidentPicModel::where('fidIncident', $fidIncident)->orderBy('task', 'asc')->get();
        return response()->success(compact('pics'));
    }

    public function getPicIncidentTask(Request $request)
    {
        $sql = "select startDate, finishDate, targetDate from incident_pic where fidIncident = :idIncident and fidUser = :idUser and task = :task limit 1";
        
        $idIncident = $request->input('idIncident');
        $idUser = $request->input('idUser');
        $task = $request->input('task');
        $pics = DB::select($sql, ['idUser'=>$idUser, 'task'=>$task, 'idIncident'=>$idIncident]);
        return response()->success(compact('pics'));
    }
}
