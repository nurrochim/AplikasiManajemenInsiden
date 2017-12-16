<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use App\IncidentConfirmHistoryModel;
use Input;

class IncidentConfirmHistoryCtrl extends Controller
{
    public function getIndex($id = null) {
        if ($id == null) {
            $confirmHistory = IncidentConfirmHistoryModel::orderBy('idHistory', 'asc')->get();
            return response()->success(compact('pics'));
        }
    }

    public function postIncidentConfirm() {
        $confirmHistory = new IncidentConfirmHistoryModel;
        $confirmHistory->fidIncident = Input::get('fidIncident');
        $confirmHistory->fidUser = Input::get('fidUser');
        $confirmHistory->userName = Input::get('userName');
        $confirmHistory->submitDate = Input::get('submitDate');
        $confirmHistory->confirmDescription = Input::get('confirmDescription');
        
        $confirmHistory->save();

        $userId = Input::get('userId');
        $fidIncident = Input::get('fidIncident');
        $sql = "update incident set statusAssignment = 'Waiting Confirmation', updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        $issue = DB::update($sql , ['idIncident'=>$fidIncident, 'updateBy'=>intval($userId)]);
        
        return response()->success($confirmHistory);
    }

    public function getIncidentConfirmShow($idConfirm)
    {
        $confirmHistory = IncidentConfirmHistoryModel::find($idConfirm);
        return response()->success($confirmHistory);
    }

    public function putIncidentConfirmShow()
    {
        $confirmHistoryForm = Input::get('data');
        $affectedRows = IncidentConfirmHistoryModel::where('idHistory', '=', intval($confirmHistoryForm['idHistory']))->update($confirmHistoryForm);

        return response()->success($affectedRows);
    }

    public function deleteIncidentConfirm($idHistory)
    {
        IncidentConfirmHistoryModel::destroy($idHistory);
        return response()->success('success');
    }

    public function getConfirmIncident($fidIncident)
    {
        $confirmHistory = IncidentConfirmHistoryModel::where('fidIncident', $fidIncident)->orderBy('idHistory', 'asc')->get();
        return response()->success(compact('confirmHistory'));
    }
}
