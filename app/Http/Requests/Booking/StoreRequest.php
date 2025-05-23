<?php

namespace App\Http\Requests\Booking;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'unit' => ['required', 'exists:units,name'],
            'room' => ['required', 'exists:rooms,name'],
            'date' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal:today'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'number_of_guests' => ['required', 'integer', 'min:1'],
            'foods' => ['required', 'array'],
            'foods.snack_siang' => ['required', 'boolean'],
            'foods.makan_siang' => ['required', 'boolean'],
            'foods.snack_sore' => ['required', 'boolean'],
        ];
    }
}
