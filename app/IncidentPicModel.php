<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentPicModel extends Model
{
    protected $fillable = array('idPic', 
                                'fidIncident',
                                'fidUser',
                                'picName',
                                'task',
                                'startDate',
                                'finishDate',
                                'targetDate'
                                );
    protected $table = 'incident_pic';
    protected $primaryKey = 'idPic';
}
