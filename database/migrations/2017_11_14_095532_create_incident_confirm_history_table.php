<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentConfirmHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident_confirm_history', function (Blueprint $table) {
            $table->increments('idHistory');
            $table->integer('fidIncident');
            $table->integer('fidUser')->nullable();
            $table->string('userName')->nullable();
            $table->date('submitDate')->nullable();
            $table->date('receiveResponDate')->nullable();
            $table->string('responDescription')->nullable();
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
        Schema::drop('incident_confirm_history');
    }
}
