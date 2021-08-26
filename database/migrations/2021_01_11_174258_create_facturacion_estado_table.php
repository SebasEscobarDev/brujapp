<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturacionEstadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturacion_estado', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facturacion_id')->references('id')->on('facturaciones')->nullable();
            $table->foreignId('estadof_id')->references('id')->on('estadosf')->nullable();
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
        Schema::dropIfExists('facturacion_estado');
    }
}
