<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contacto;
use Illuminate\Support\Str;

class ContactoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Contacto::truncate();
        //Ramiro Uribe
        // 57
        // 3178439805
        $contacto = new Contacto;
        $contacto->prefix = 57;
        $contacto->nombre = "Ramiro Uribe";
        $contacto->phone = 3178439805;
        $contacto->save();

    }
}
