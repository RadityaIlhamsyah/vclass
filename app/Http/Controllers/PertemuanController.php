<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pertemuan;
use Inertia\Inertia;
use App\Models\Matkul;

class PertemuanController extends Controller
{
    public function index($matkulId)
    {
        $matkul = Matkul::with('dosen')->where('id', $matkulId)->first();
        return Inertia::render('Course/Pertemuan/Index', [
            'matkul' => $matkul
        ]);
    }


    public function store(Request $request, $matkulId)
    {
        // Validasi input
        $request->validate([
            'pertemuan' => 'required|numeric|min:1|max:12',
            'topik' => 'required|string|max:255',
        ]);

        // Cek apakah pertemuan untuk matkul_id dan pertemuan sudah ada
        $existingPertemuan = Pertemuan::where('matkul_id', $matkulId)
            ->where('pertemuan', $request->input('pertemuan'))
            ->exists();

        // Jika sudah ada, kembalikan error
        if ($existingPertemuan) {
            return redirect()->route('forum.pertemuan', [$matkulId])
                ->with('error', 'Pertemuan ini sudah ada.');
        }

        // Jika belum ada, simpan pertemuan baru
        Pertemuan::create([
            'matkul_id' => $matkulId,
            'pertemuan' => $request->input('pertemuan'),
            'topik' => $request->input('topik'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('forum.pertemuan', [$matkulId])
            ->with('success', 'Pertemuan berhasil ditambahkan.');
    }
}
