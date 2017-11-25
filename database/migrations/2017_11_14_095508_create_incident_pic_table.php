<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentPicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident_pic', function (Blueprint $table) {
            $table->increments('idPic');
            $table->integer('fidIncident');
            $table->integer('fidUser');
            $table->string('picName')->nullable();
            $table->date('startDate')->nullable();
            $table->date('finishDate')->nullable();
            $table->date('targetDate')->nullable();
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
        Schema::drop('incident_pic');
    }
}
