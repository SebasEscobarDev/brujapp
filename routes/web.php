<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\ContactosController;
use App\Http\Controllers\DatosController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FacturacionesController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\HoroscoposController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('/');
Route::get('/dashboard', [HomeController::class, 'index'])->name('dashboard');
Route::get('/chat', [HomeController::class, 'chat']);
Route::get('/logout', [HomeController::class, 'logout'])->name('logout');
Route::get('/graficos', [HomeController::class, 'graficos'])->name('graficos');

Route::get('/contactos', [ContactosController::class, 'indexC'])->name('contactos');
Route::get('/datos', [DatosController::class, 'index'])->name('datos');
Route::get('/datos/{id}/getmaestro/', [DatosController::class, 'getmaestro'] )->name('datos.getmaestro');
Route::get('/getdato/{id}', [DatosController::class, 'getdato'])->name('getdato');
Route::get('/datos/maestros/{id}', [DatosController::class, 'getmaestros'] )->name('datos.getmaestros');
Route::get('/maestros', [UsersController::class, 'index'])->name('maestros');

Route::get('/facturaciones', [FacturacionesController::class, 'index'])->name('facturaciones');
Route::get('/facturaciones/desde/hasta', [FacturacionesController::class, 'index'])->name('facturaciones.desde.hasta');

//CRUD CONTACTOS
Route::get('/getcontacto/{id}', [ContactosController::class, 'getcontacto'])->name('getcontacto');
Route::post('/contactos/createc', [ContactosController::class, 'createc'] )->name('contactos.createc');
Route::put('/contactos/editc', [ContactosController::class, 'editc'] )->name('contactos.editc');
Route::post('/contactos/delete', [ContactosController::class, 'delete'] )->name('contactos.delete');
Route::post('/contactos/addmaestro', [ContactosController::class, 'addmaestro'] )->name('contactos.addmaestro');
Route::post('/contacto/estado', [ContactosController::class, 'updateEstado'] )->name('contacto.updateEstado');
Route::get('/contacto/busqueda', [ContactosController::class, 'search'] )->name('contacto.search');

//CRUD DATOS
Route::put('/datos/edit', [DatosController::class, 'edit'] )->name('datos.edit');
Route::post('/datos/delete', [DatosController::class, 'delete'] )->name('datos.delete');
Route::post('/dato/estado', [DatosController::class, 'updateEstado'] )->name('dato.updateEstado');
Route::post('/datos/addmaestro', [DatosController::class, 'addmaestro'] )->name('datos.addmaestro');
Route::post('/datos/addmaestros', [DatosController::class, 'addmaestros'] )->name('datos.addmaestros');
Route::post('/datos/save-type-account', [DatosController::class, 'savetypeaccount'] )->name('datos.savetypeaccount');
Route::post('/datos/delete-type-account', [DatosController::class, 'deletetypeaccount'] )->name('datos.deletetypeaccount');
Route::post('/datos/save-dato', [DatosController::class, 'create'] )->name('datos.create');
Route::get('/dato/busqueda', [DatosController::class, 'search'] )->name('dato.search');

//CRUD MAESTROS
Route::post('/maestros/create', [UsersController::class, 'create'] )->name('maestros.create');
Route::put('/maestros/edit', [UsersController::class, 'edit'] )->name('maestros.edit');
Route::post('/maestro/estado', [UsersController::class, 'updateEstado'] )->name('maestros.updateEstado');
Route::post('/maestros/delete', [UsersController::class, 'delete'] )->name('maestros.delete');
Route::get('/maestros/busqueda', [UsersController::class, 'search'] )->name('maestros.search');

//CRUD FACTURACION
Route::post('/facturaciones/create', [FacturacionesController::class, 'create'] )->name('facturaciones.create');
Route::post('/facturaciones/edit', [FacturacionesController::class, 'edit'] )->name('facturaciones.edit');
Route::post('/facturaciones/delete', [FacturacionesController::class, 'delete'] )->name('facturaciones.delete');
Route::post('/facturacion/estado', [FacturacionesController::class, 'updateEstado'] )->name('facturacion.updateEstado');
Route::post('/facturacion/valor', [FacturacionesController::class, 'updateValor'] )->name('facturacion.updateValor');
Route::post('/facturacion/rechazo', [FacturacionesController::class, 'updateRechazo'] )->name('facturacion.updateRechazo');

Route::put('/facturaciones/delete/imagen', [FacturacionesController::class, 'deleteImage'] )->name('facturaciones.deleteImage');
//ruta almacenamiento de imagenes
Route::post('/facturaciones/imagen', [FacturacionesController::class, 'postImage'] )->name('facturaciones.postImage');
Route::post('/facturaciones', [FacturacionesController::class, 'storeImage'] )->name('facturaciones.storeImage');
//delete images
Route::delete('facturaciones/delete/{photo}', [FacturacionesController::class, 'destroy'] )->name('facturaciones.destroyImage');
Route::get('facturacion/busqueda', [FacturacionesController::class, 'search'] )->name('facturaciones.search');

// /photos/{photo}/comments
Route::get('/fotos/{facturacion_id}', [FacturacionesController::class, 'getFotos'] )->name('fotos.get');
Route::get('/foto/{facturacion_id}', [FacturacionesController::class, 'getImagesFacturacion'] )->name('fotos.getImages');

Route::get('perfil', [PerfilController::class, 'index'])->name('perfil');
Route::get('perfil/{id}', [PerfilController::class, 'getPerfil'])->name('perfil.get');

//semanas 
Route::post('/semanas/save', [HomeController::class, 'savesemanas'] )->name('semanas.save');
Route::post('/semanas/active', [HomeController::class, 'activesemanas'] )->name('semanas.active');
Route::post('/semanas/delete', [HomeController::class, 'deletesemanas'] )->name('semanas.delete');


//post HOROSCOPO
Route::post('/api/horoscopo/create', [HoroscoposController::class, 'create'] )->name('horoscopo.create');


Route::get('/date', [HomeController::class, 'date'] )->name('date');
