<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_issue', function (Blueprint $table) {
            $table->increments('id');
            
            $table->date('raise_date');
            $table->string('priority')->nullable();
            $table->string('status')->nullable();
            $table->string('module')->nullable();
            $table->string('sub_module')->nullable();
            $table->string('pic')->nullable();
            $table->string('category_group')->nullable();
            $table->string('category_root_cause')->nullable();
            $table->text('issue_description')->nullable();
            $table->text('suspected_reason')->nullable();
            $table->text('respon_taken')->nullable();
            $table->text('decided_solution')->nullable();
            $table->date('target_fixed_date')->nullable();
            $table->date('finish_fixed_date')->nullable();
            $table->date('closed_date')->nullable();
            $table->string('closed_by')->nullable();
            $table->string('pic_analyzing')->nullable();
            $table->date('finish_analyzing')->nullable();
            $table->string('pic_fixing')->nullable();
            $table->date('finish_fixing')->nullable();
            $table->string('pic_testing')->nullable();
            $table->date('finish_testing')->nullable();
            $table->string('deployment_code')->nullable();
            $table->date('deployment_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tbl_issue');
    }
}
