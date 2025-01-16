<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnrollMatkul extends Model
{
    /** @use HasFactory<\Database\Factories\EnrollMatkulFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'matkul_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Menentukan relasi dengan model Matkul
    public function matkul()
    {
        return $this->belongsTo(Matkul::class, 'matkul_id');
    }
}
