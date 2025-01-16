<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matkul extends Model
{
    use HasFactory;

    protected $fillable = ['nama_matkul', 'dosen_id', 'kelas', 'kode_matkul'];

    public function dosen()
    {
        return $this->belongsTo(User::class, 'dosen_id');
    }
}
