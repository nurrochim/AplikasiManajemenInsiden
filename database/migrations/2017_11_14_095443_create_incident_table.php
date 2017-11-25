<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident', function (Blueprint $table) {
            $table->increments('idIncident');
            $table->integer('fidUserRaised')->nullable();
            $table->string('raisedBy')->nullable();
            $table->string('fidUserRaised')->nullable();
            $table->date('raisedDate');
            $table->string('priority')->nullable();
            $table->string('status')->nullable();
            $table->string('module')->nullable();
            $table->string('subModule')->nullable();
            $table->string('division')->nullable();
            $table->string('groupDivision')->nullable();
            $table->string('categoryGroup')->nullable();
            $table->string('categoryRootCause')->nullable();
            $table->string('categoryAnalysis')->nullable();
            $table->text('issueDescription')->nullable();
            $table->text('expectedResult')->nullable();
            $table->text('suspectedReason')->nullable();
            $table->string('function')->nullable();
            $table->string('statusTask')->nullable();
            $table->string('statusAssignment')->nullable();
            $table->string('needCr')->nullable();
            $table->string('estimationDurationCr')->nullable();
            $table->string('rootCauseModule')->nullable();
            $table->string('rootCauseSubmodule')->nullable();
            $table->text('recreateStep')->nullable();
            $table->text('responTaken')->nullable();
            $table->text('decidedSolution')->nullable();
            $table->date('targetFixedDate')->nullable();
            $table->date('finishFixedDate')->nullable();
            $table->text('fixingNotes')->nullable();
            $table->text('testScenario')->nullable();
            $table->text('testNotes')->nullable();
            $table->text('testResult')->nullable();
            $table->date('closedDate')->nullable();
            $table->string('closedBy')->nullable();
            $table->string('createBy')->nullable();
            $table->string('updateBy')->nullable();
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
        Schema::drop('incident');
    }
}
