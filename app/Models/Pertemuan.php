<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pertemuan extends Model
{
    /** @use HasFactory<\Database\Factories\PertemuanFactory> */
    use HasFactory;

    protected $fillable = [
        'matkul_id',
        'topik',
        'pertemuan',
    ];

    public function matkul()
    {
        return $this->belongsTo(Matkul::class, 'matkul_id');
    }
}
