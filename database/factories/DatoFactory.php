<?php

namespace Database\Factories;

use App\Models\Dato;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DatoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Dato::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'active' => random_int(0,1),
            'nombre' => $this->faker->name,
            'identificacion' => Str::random(10),
            'ciudad' => $this->faker->city,
            'estado' => $this->faker->state,
            'pais' => $this->faker->country,
            'direccion' => $this->faker->address,
            'telefono' => $this->faker->phoneNumber,
            'tipo_cuenta' => $this->faker->company
        ];
    }
}
