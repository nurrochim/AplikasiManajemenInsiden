<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function getIncidentAssignment()
    {
        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                       coalesce(B.PICNAME, '') pic_analyzing, coalesce(C.PICNAME, '') pic_fixing, coalesce(D.PICNAME, '') pic_testing 
                    FROM INCIDENT A 
                    LEFT JOIN (SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') PICNAME,FIDINCIDENT  FROM INCIDENT_PIC WHERE TASK = 'Analyzing' 
                                GROUP BY FIDINCIDENT LIMIT 1) 
                        B ON A.IDINCIDENT = B.FIDINCIDENT 
                    LEFT JOIN (SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') PICNAME,FIDINCIDENT  FROM INCIDENT_PIC WHERE TASK = 'Programming' 
                                GROUP BY FIDINCIDENT LIMIT 1) 
                        C ON A.IDINCIDENT = C.FIDINCIDENT 
                    LEFT JOIN (SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') PICNAME,FIDINCIDENT  FROM INCIDENT_PIC WHERE TASK = 'Testing' 
                                GROUP BY FIDINCIDENT LIMIT 1) 
                        D ON A.IDINCIDENT = D.FIDINCIDENT    
                    ORDER BY A.idIncident    ";
        // $issue = DB::connection()->getPdo()->exec($sql);
        $issue = DB::select($sql);
        return response()->success(compact('issue'));
    }
}
