<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //User::truncate();
        $user = new User;
        $user->name = "Master Admin";
        $user->email = "master@admin.com";
        $user->active = 1;
        $user->password = Hash::make("qaws12pj-22");
        $user->save();

        $user = new User;
        $user->name = "Alex";
        $user->email = "alex@admin.com";
        $user->active = 1;
        $user->password = Hash::make("qaws12pj-22");
        $user->save();

        $user = new User;
        $user->name = "Elkin Escobar";
        $user->email = "elkin@admin.com";
        $user->active = 1;
        $user->password = Hash::make("qaws12pj-22");
        $user->save();

        $user = new User;
        $user->name = "Yaneth Alba Jaramillo";
        $user->email = "yaneth@admin.com";
        $user->active = 1;
        $user->password = Hash::make("qaws12pj-22");
        $user->save();

        $user = new User;
        $user->name = "Sebas Escobar";
        $user->email = "sebas@maestro.com";
        $user->active = 1;
        $user->password = Hash::make("qaws12pj-22");
        $user->save();

        //User::factory(29)->create();
    }
}
