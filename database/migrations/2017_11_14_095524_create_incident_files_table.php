<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('incident_files', function (Blueprint $table) {
            $table->increments('idFile');
            $table->string('filePath')->nullable();
            $table->string('fileName')->nullable();
            $table->string('fileType')->nullable();
            $table->string('fileGroup')->nullable();
            $table->string('createBy')->nullable();
            $table->date('createDate')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('incident_files');
    }
}
