<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturaciones', function (Blueprint $table) {
            $table->id();
            $table->integer('active');
            $table->foreignId('user_id')->references('id')->on('users')->nullable();
            $table->foreignId('contacto_id')->references('id')->on('contactos')->nullable();
            $table->foreignId('dato_id')->references('id')->on('datos')->nullable();
            $table->foreignId('moneda_id')->references('id')->on('monedas')->unsigned()->nullable();
            $table->bigInteger('valor_moneda')->nullable();
            $table->bigInteger('valor_pesos')->nullable();
            $table->string('envia');
            $table->text('descripcion')->nullable();
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
        Schema::dropIfExists('facturaciones');
    }
}
