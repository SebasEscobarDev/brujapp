<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RolUser;
use App\Models\User;
use App\Models\Rol;

class RolUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //RolUser::truncate();
        for ($i=0; $i < 4; $i++) { 
            $rolUser = new RolUser;
            $rolUser->user_id = ($i+1);
            $rolUser->rol_id = 1;
            $rolUser->save();
        }

        $rolUser = new RolUser;
        $rolUser->user_id = 5;
        $rolUser->rol_id = 2;
        $rolUser->save();

    }
}
