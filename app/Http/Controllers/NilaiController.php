<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Nilai;
use App\Models\Matkul;
use App\Models\Pertemuan;
use App\Models\Tugas;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($matkulId, $pertemuanId)
    {
        $tugas = Tugas::whereHas('user', function ($query) {
            $query->where('role', 'siswa');
        })
            ->with(['user', 'matkul'])
            ->where('pertemuan_id', $pertemuanId)
            ->where('matkul_id', $matkulId)
            ->orderBy('created_at', 'asc')
            ->get();

        $pertemuan = Pertemuan::where('id', $pertemuanId)->first();

        return Inertia::render('Course/Nilai/Index', [
            'tugas' => $tugas,
            'pertemuan' => $pertemuan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function pertemuan($matkulId)
    {
        $pertemuan = Pertemuan::where('matkul_id', $matkulId)->orderBy('pertemuan', 'asc')->get();
        $matkul = Matkul::with('dosen')->where('id', $matkulId)->first();

        if (!$pertemuan) {
            $pertemuan = null;
        }

        return Inertia::render('Course/Tugas/Pertemuan', [
            'pertemuan' => $pertemuan,
            'matkul' => $matkul
        ]);
    }
}
