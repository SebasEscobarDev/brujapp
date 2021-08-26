<?php

namespace Database\Factories;

use App\Models\Contacto;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ContactoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Contacto::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'active' => 1,
            'from' => 'MasterApp',
            'to' => random_int(0,1),
            'name' => $this->faker->name,
            'prefix' => random_int(0, 500),
            'phone' => $this->faker->unique()->randomNumber,
            'state' => $this->faker->state,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'birth_date' => $this->faker->date()
        ];
    }
}
