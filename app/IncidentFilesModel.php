<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentFilesModel extends Model
{
    protected $fillable = array('idFile', 
                                'fidIncident',
                                'filePath',
                                'fileName',
                                'fileType',
                                'fileGroup',
                                'createBy',
                                'createDate'
                                );
    protected $table = 'incident_files';
}
