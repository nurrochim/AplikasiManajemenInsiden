<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentConfirmHistoryModel extends Model
{
    protected $fillable = array('idHistory', 
                                'fidIncident',
                                'fidUser',
                                'userName',
                                'submitDate',
                                'confirmDescription',
                                'receiveResponDate',
                                'responApproval',
                                'responDescription'
                                );
protected $table = 'incident_confirm_history';
protected $primaryKey = 'idHistory';
}
