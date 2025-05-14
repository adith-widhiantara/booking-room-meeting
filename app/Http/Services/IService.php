<?php

namespace App\Http\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

interface IService
{
    public function store(FormRequest $request);

    public function update(Model $model, FormRequest $request);

    public function delete(Model $model);
}
