<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentModel extends Model
{
    protected $fillable = array('idIncident'
                                ,'fidUserRaised' 
                                ,'raisedBy'
                                ,'fidUserRaised'
                                ,'raisedDate'
                                ,'priority'
                                ,'status'
                                ,'module'
                                ,'subModule'
                                ,'division'
                                ,'groupDivision'
                                ,'categoryGroup'
                                ,'categoryRootCause'
                                ,'categoryAnalysis'
                                ,'issueDescription'
                                ,'expectedResult'
                                ,'suspectedReason'
                                ,'function'
                                ,'statusTask'
                                ,'statusAssignment'
                                ,'needCr'
                                ,'estimationDurationCr'
                                ,'rootCauseModule'
                                ,'rootCauseSubmodule'
                                ,'recreateStep'
                                ,'responTaken'
                                ,'decidedSolution'
                                ,'targetFixedDate'
                                ,'finishFixedDate'
                                ,'fixingNotes'
                                ,'testScenario'
                                ,'testNotes'
                                ,'testResult'
                                ,'closedDate'
                                ,'closedBy'
                                ,'createBy'
                                ,'updateBy'
                                ,'created_at'
                            );
    protected $table = 'incident';
    protected $primaryKey = 'idIncident';
    public $incrementing = false;
}
