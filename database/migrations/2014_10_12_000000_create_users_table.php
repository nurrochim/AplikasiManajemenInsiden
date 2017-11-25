<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('oauth_provider')->nullable();
            $table->string('oauth_provider_id')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('avatar')->nullable();
            $table->enum('email_verified', ['1', '0'])->default('0');
            $table->string('email_verification_code', 60)->nullable();
            $table->string('status_user')->nullable();
            $table->string('job_title')->nullable();
            $table->string('status_user')->nullable();
            $table->string('division')->nullable();
            $table->string('group_division')->nullable();
            $table->string('contact_no')->nullable();
            $table->enum('client', ['1', '0'])->default('1');
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
