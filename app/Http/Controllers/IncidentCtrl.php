<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\IncidentModel;
use App\IncidentPicModel;
use Input;
//use Request;
use DateTime;
use DateTimeZone;

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

        // generate id
        $sqlCounter = "select current_seq from cmn_id_counter where id = :idCounter";
        $counter = DB::select($sqlCounter, ['idCounter'=>'MBF']);
        //$counter = array_shift($counter);
        //$current_seq = $counter['current_seq'];
        $current_seq = $counter[0]->current_seq;
        $current_seq = $current_seq+1;
        
        
        $idIncident = sprintf("MBF-%04s",$current_seq);
        $issue->testResult = $idIncident;
        $issue->save();

        //update sequence
        $sqlCounterUpdate = "update cmn_id_counter set current_seq=:seq where id = :idCounter";
        DB::update($sqlCounterUpdate, ['idCounter'=>'MBF', 'seq'=>$current_seq]);

        return response()->success($issue);
    }

    public function getIncidentShow($idIncident)
    {
        $issue = IncidentModel::find($idIncident);
        return response()->success($issue);
    }

    public function putIncidentShow(Request $request)
    {
        $issueForm = Input::get('data');
        //$issueForms = Input::all();
        $picTask = $request->input('picTask');
        $picUser = $request->input('picUser');
        $startDate = $request->input('startDate');
        $finishDate = $request->input('finishDate');

        $affectedRows = IncidentModel::where('idIncident', '=', intval($issueForm['idIncident']))->update($issueForm);
        
        // update PIC Task
        if($picTask!=null){
            DB::update('update incident_pic set startDate = :startDate, finishDate = :finishDate where fidUser =:fidUser and fidIncident =:fidIncident and task =:task' , ['fidUser'=>intval($picUser),'fidIncident'=>intval($issueForm['idIncident']), 'startDate'=>$startDate, 'finishDate'=>$finishDate, 'task'=>$picTask]);
        }
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
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Analyzing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_analyzing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                    FROM INCIDENT_PIC 
                                    WHERE TASK = 'Fixing' AND FIDINCIDENT = A.IDINCIDENT
                                    GROUP BY FIDINCIDENT LIMIT 1), '') pic_fixing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Testing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_testing 

                    FROM INCIDENT A 
                    ORDER BY A.idIncident    ";
        // $issue = DB::connection()->getPdo()->exec($sql);
        $issue = DB::select($sql);
        return response()->success(compact('issue'));
    }

    public function getIncidentByUser(Request $request)
    { 
        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Analyzing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_analyzing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                    FROM INCIDENT_PIC 
                                    WHERE TASK = 'Fixing' AND FIDINCIDENT = A.IDINCIDENT
                                    GROUP BY FIDINCIDENT LIMIT 1), '') pic_fixing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Testing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_testing 
                    FROM INCIDENT A 
                    LEFT JOIN  INCIDENT_PIC B ON A.IDINCIDENT = B.FIDINCIDENT           
                    WHERE B.FIDUSER = :idUser AND B.TASK = :task
                    ORDER BY A.idIncident    
                    ";
        // $issue = DB::connection()->getPdo()->exec($sql);
        //$task = 'Analyzing';
        $idUser = $request->input('idUser');
        $task = $request->input('task');
        $issue = DB::select($sql, ['idUser'=>$idUser, 'task'=>$task]);
        return response()->success(compact('issue'));
    }

    public function getIncidentFilter(Request $request)
    { 
        // $pdo = DB::getPdo();

        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Analyzing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_analyzing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                    FROM INCIDENT_PIC 
                                    WHERE TASK = 'Fixing' AND FIDINCIDENT = A.IDINCIDENT
                                    GROUP BY FIDINCIDENT LIMIT 1), '') pic_fixing, 
                        coalesce((SELECT GROUP_CONCAT(PICNAME SEPARATOR ', ') 
                                FROM INCIDENT_PIC 
                                WHERE TASK = 'Testing' AND FIDINCIDENT = A.IDINCIDENT
                                GROUP BY FIDINCIDENT LIMIT 1), '') pic_testing 
                    FROM INCIDENT A 
                    WHERE ";
        // $issue = DB::connection()->getPdo()->exec($sql);
        //$task = 'Analyzing';
        $filterValue = $request->input('filterValue');
        $filterBy = $request->input('filterBy');
        if($filterBy == "idIncident"){
            $filterValue = '%'.$filterValue.'%';
            $sql .= " A.idIncident like :filterValue";
        }else if($filterBy == "descriptions"){
            $filterValue = '%'.$filterValue.'%';
            $sql .= " A.issueDescription like :filterValue";
        }else if($filterBy == "raisedBy"){
            $filterValue = '%'.$filterValue.'%';
            $sql .= " A.raisedBy like :filterValue";
        }else if($filterBy == "raisedDate"){
            //$d = new DateTime('2017-12-13', new DateTimeZone('Asia/Jakarta'));
            
            //$timestamp = $d->getTimestamp(); // Unix timestamp
            //$formatted_date = $d->format('Y-m-d'); // 2003-10-16
            $sql .= " A.raisedDate = :filterValue";
        } 

        $sql .= " ORDER BY A.idIncident";
        // $issue = $pdo->prepare($sql);
        // $issue->bindValue(':filterValue', $filterValue);
        // $issue->execute();
        $issue = DB::select($sql, ['filterValue'=>$filterValue]);
        return response()->success(compact('issue'));
    }
}
