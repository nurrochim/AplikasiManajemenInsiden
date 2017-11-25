<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ModelIssue extends Model
{
    protected $fillable = array('id', 
                                'raise_date',
                                'priority',
                                'status',
                                'module',
                                'sub_module',
                                'pic',
                                'category_group',
                                'category_root_cause',
                                'issue_description',
                                'suspected_reason',
                                'respon_taken',
                                'decided_solution',
                                'target_fixed_date',
                                'finish_fixed_date',
                                'closed_date',
                                'closed_by',
                                'pic_analyzing',
                                'finish_analyzing',
                                'pic_fixing',
                                'finish_fixing',
                                'pic_testing',
                                'finish_testing',
                                'deployment_code',
                                'deployment_date');
    protected $table = 'tbl_issue';
}
