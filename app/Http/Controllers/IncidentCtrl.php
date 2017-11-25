<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\IncidentModel;
use Input;

class IncidentCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getIndex($id = null) {
        if ($id == null) {
            $incidents = IncidentModel::orderBy('idIncident', 'asc')->get();
            return response()->success(compact('incidents'));
        }
    }

    public function postIncident() {
        $issue = new IncidentModel;
        $issue->raisedBy = Input::get('raisedBy');
        $issue->fidUserRaised = Input::get('fidUserRaised');
        $issue->raisedDate = Input::get('raisedDate');
        $issue->division = Input::get('division');
        $issue->groupDivision = Input::get('groupDivision');
        $issue->issueDescription = Input::get('issueDescription');
        $issue->save();

        return response()->success($issue);
    }

    public function getIncidentShow($idIncident)
    {
        $issue = IncidentModel::find($idIncident);
        return response()->success($issue);
    }

    public function putIncidentShow()
    {
        $issueForm = Input::get('data');
        $affectedRows = IncidentModel::where('idIncident', '=', intval($issueForm['idIncident']))->update($issueForm);

        return response()->success($issueForm);
    }

    public function deleteIncident($id)
    {
        IncidentModel::destroy($id);
        return response()->success('success');
    }
}
