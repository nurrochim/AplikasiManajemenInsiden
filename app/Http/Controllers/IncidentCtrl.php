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
        $issue->createBy = Input::get('createBy');
        //$issue->created_at = date('Y-m-d H:i:s');

        // generate id
        $sqlCounter = "select current_seq from cmn_id_counter where id = :idCounter";
        $counter = DB::select($sqlCounter, ['idCounter'=>'INC']);
        //$counter = array_shift($counter);
        //$current_seq = $counter['current_seq'];
        $current_seq = $counter[0]->current_seq;
        $current_seq = $current_seq+1;
        
        
        $idIncident = sprintf("INC-%04s",$current_seq);
        $issue->idIncident = $idIncident;
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

        $affectedRows = IncidentModel::where('idIncident', '=', $issueForm['idIncident'])->update($issueForm);
        
        // update PIC Task
        if($picTask!=null){
            DB::update('update incident_pic set startDate = :startDate, finishDate = :finishDate where fidUser =:fidUser and fidIncident =:fidIncident and task =:task' , ['fidUser'=>intval($picUser),'fidIncident'=>$issueForm['idIncident'], 'startDate'=>$startDate, 'finishDate'=>$finishDate, 'task'=>$picTask]);
        }
        return response()->success($issueForm);
    }

    public function deleteIncident($id)
    {
        IncidentModel::destroy($id);
        return response()->success('success');
    }

    public function getIncidentAssignment(Request $request)
    {
        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                       A.expectedResult,
                       A.suspectedReason,
                       A.responTaken,
                       A.decidedSolution,
                       A.recreateStep,
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

                    FROM INCIDENT A ";
                    
                    
        // $issue = DB::connection()->getPdo()->exec($sql);

        $task = $request->input('task');
        if($task=="Assign"){
            $sql .= " WHERE A.statusTask in ('Open','Assign','On Progress')";
        }else if($task=="ConfirmClosing"){
            $sql .= " WHERE A.statusTask in ('Confirm','Closing')";
        }
        $sql .= "ORDER BY A.CREATED_AT ASC";
        $issue = DB::select($sql);
        return response()->success(compact('issue'));
    }

    public function getIncidentClosing(Request $request)
    {
        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                       A.expectedResult,
                       A.suspectedReason,
                       A.responTaken,
                       A.decidedSolution,
                       A.statusTask,
                       A.statusAssignment,
                        coalesce((SELECT GROUP_CONCAT(confirmation SEPARATOR '<hr>') FROM (
                                    SELECT fidIncident, concat(pic_name, '<br/>', confirm_status) as confirmation FROM (
                                    SELECT fidIncident, concat('<text style=\"font-size: 12px;font-weight: bold;\">',userName,' </text>' ) as pic_name, 
                                        case when responApproval = 'Approve' then '<i style=\"color: deepskyblue\" class=\"fa fa-check \"></i>  Approve For Closing'
                                                when responApproval = 'Reject' then '<i style=\"color: red\" class=\"fa fa-ban \"></i>  Issue Not Clear'
                                                else '<i style=\"color: orange\" class=\"fa fa-clock-o \"></i>  Waiting Respon'
                                                end as confirm_status
                                    FROM INCIDENT_CONFIRM_HISTORY
                                    
                                    ORDER BY submitDate ASC) TBL_CONFIRM_1
                                    ) TBL_CONFIRM_2 WHERE fidIncident = A.idIncident), '') 
                        pic_confirm

                    FROM INCIDENT A ";
                    
                    
        // $issue = DB::connection()->getPdo()->exec($sql);

        $task = $request->input('task');
        if($task=="ConfirmClosing"){
            $sql .= " WHERE A.statusTask in ('Closing') AND A.statusAssignment in ('Finish', 'Confirmed')";
        }
        $sql .= "ORDER BY A.CREATED_AT ASC";
        $issue = DB::select($sql);
        return response()->success(compact('issue'));
    }

    public function getApprovalClosing(Request $request)
    {
        $sql = "SELECT A.idIncident, 
                       A.raisedDate,
                       A.raisedBy,
                       coalesce(A.priority, '') priority,
                       coalesce(A.module, '') module,
                       coalesce(A.subModule, '') subModule,
                       A.issueDescription,
                       A.expectedResult,
                       A.suspectedReason,
                       A.responTaken,
                       A.decidedSolution,
                       A.statusTask,
                       A.statusAssignment
                    FROM INCIDENT A LEFT JOIN INCIDENT_CONFIRM_HISTORY B ON A.idIncident = B.fidIncident
                    WHERE A.statusTask = 'Closing' AND A.statusAssignment = 'Finish' AND B.fidUser = :idUser
                    ORDER BY A.CREATED_AT ASC";
                    
                    
        
        $idUser = $request->input('idUser');
        $issue = DB::select($sql, ['idUser'=>$idUser]);
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
                    WHERE B.FIDUSER = :idUser AND B.TASK = :task1
                    ";
        // $issue = DB::connection()->getPdo()->exec($sql);
        //$task = 'Analyzing';
        $idUser = $request->input('idUser');
        $task = $request->input('task');
        
        if($task=="Fixing" || $task=="Testing"){
            $sql .= " AND A.statusAssignment = :task2 ";
        }else if($task=="Analyzing"){
            $sql .= " AND (A.statusAssignment = :task2 OR A.statusAssignment is null)";
        }
        $sql .= " ORDER BY A.idIncident  ";

        $issue = DB::select($sql, ['idUser'=>$idUser, 'task1'=>$task, 'task2'=>$task]);
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

    public function putIncidentStatusUpdate(Request $request)
    {
        $idIncident = $request->input('idIncident');
        $status = $request->input('statusTask');
        $statusTask = $request->input('statusTask');
        $updateBy = $request->input('updateBy');
        $sql = "";
        if($statusTask=="Open"){
            $sql = "update incident set statusTask = :status, updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        }else if($statusTask=="Analyzing" || $statusTask == "Fixing" || $statusTask == "Testing"){
            $sql = "update incident set statusAssignment = :status, updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        }else if($statusTask == "Closing"){
            $sql = "update incident set statusTask = :status, statusAssignment = 'Finish', updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        } 

        if($statusTask == "Re-Open"){
            $sql = "update incident set statusTask = 'On Progress', statusAssignment = 'Analyzing', updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
            $issue = DB::update($sql , ['idIncident'=>$idIncident, 'updateBy'=>intval($updateBy)]);
        }else{
            $issue = DB::update($sql , ['status'=>$status,'idIncident'=>$idIncident, 'updateBy'=>intval($updateBy)]);
        }  
        
        return response()->success(compact('issue'));
    }   

    public function postIncidentClosing() {
        $idIncident = Input::get('idIncident');
        $closedDate = Input::get('closesDate');
        $closedBy = Input::get('closedBy');
        $updateBy = Input::get('updateBy');

        $sql = "update incident set statusTask = 'Closed', closedDate = :closedDate, closedBy = :closedBy, updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        $issue = DB::update($sql , ['idIncident'=>$idIncident, 'updateBy'=>intval($updateBy), 'closedBy'=>$closedBy, 'closedDate'=>$closedDate]);
        return response()->success(compact('issue'));
    }  
    
    public function putIncidentConfirmed(Request $request)
    {
        $idIncident = $request->input('idIncident');
        $status = $request->input('statusTask');
        $statusTask = $request->input('statusTask');
        $updateBy = $request->input('updateBy');
        $responApproval = $request->input('responApproval');
        $responDescription = $request->input('responDescription');
        $sql = "";

        $sql = "update incident set statusAssignment = :status, updated_at = now(), updateBy = :updateBy where idIncident =:idIncident";
        $issue = DB::update($sql , ['status'=>$status,'idIncident'=>$idIncident, 'updateBy'=>intval($updateBy)]);
    
        $sqlConfirmHistory = "update incident_confirm_history set responDescription = :responDescription, responApproval = :responApproval, receiveResponDate = now(), updated_at = now() 
                where fidIncident =:fidIncident and fidUser = :idUser";
        $confirmHistory = DB::update($sqlConfirmHistory , ['fidIncident'=>$idIncident, 'idUser'=>intval($updateBy), 'responDescription'=>$responDescription, 'responApproval'=>$responApproval]);
        
        return response()->success(compact('issue'));
    }
}
