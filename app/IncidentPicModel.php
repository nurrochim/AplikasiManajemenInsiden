<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentPicModel extends Model
{
    protected $fillable = array('idPic', 
                                'fidIncident',
                                'fidUser',
                                'picName',
                                'startDate',
                                'finishDate',
                                'targetDate'
                                );
    protected $table = 'incident_pic';
}
