<?php

namespace App\Http\Controllers;

use App\Models\Matkul;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pertemuan;
use App\Models\Tugas;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($matkulId, $pertemuanId)
    {
        $tugas = Tugas::with(relations: 'user')->with('pertemuan')->where('pertemuan_id', $pertemuanId)->where('matkul_id', $matkulId)->orderBy('created_at', 'asc')->get();
        $pertemuan = Pertemuan::where('id', $pertemuanId)->first();
        return Inertia::render('Course/Tugas/Index', [
            'tugas' => $tugas,
            'pertemuan' => $pertemuan
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
    public function store(Request $request, $matkulId,  $pertemuanId)
    {
        $validated = $request->validate([
            'tugas' =>  'required|string',
            'deadline' => 'nullable|date',
        ]);


        if ($request->has('deadline')) {
            $deadline = Carbon::parse($validated['deadline'])->setTimezone('Asia/Jakarta');
        }


        Tugas::create([
            'user_id' => Auth::id(),
            'matkul_id' => $matkulId,
            'pertemuan_id' => $pertemuanId,
            'tugas' => $validated['tugas'],
            'deadline' => $deadline ?? null,
            'nilai' => null,
            'status' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('tugas.index', ['matkulId' => $matkulId, 'pertemuanId' => $pertemuanId])->with('success', 'Pertemuan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($matkulId)
    {
        $namaMatkul = Matkul::find($matkulId)->nama_matkul;
        $tugas = Matkul::find($matkulId)->tugas_id;
        return Inertia::render('Course/Tugas/Show', [
            'tugas' => $tugas,
            'namaMatkul' => $namaMatkul
        ]);
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
    public function update(Request $request, $matkulId, $pertemuanId, $tugasId)
    {

        // Validasi input
        $validated = $request->validate([
            'tugas' => 'nullable|string', // Jika tidak selalu diperlukan
            'deadline' => 'nullable|date',
            'nilai' => 'nullable|integer|min:0|max:100', // Validasi nilai
        ]);




        // Temukan tugas berdasarkan ID
        $tugas = Tugas::findOrFail($tugasId);
        $deadline = Carbon::parse($validated['deadline'] ?? $tugas->deadline)->setTimezone('Asia/Jakarta');
        // dd($tugas);

        // Pastikan pengguna yang sedang login adalah pemilik tugas
        // if ($tugas->user_id !== Auth::id()) {
        //     return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk mengedit tugas ini.');
        // }

        // Update nilai jika ada
        if ($request->has('nilai')) {
            // Pastikan nilai yang diterima valid (sudah divalidasi sebelumnya)
            $tugas->update([
                'nilai' => $request->input('nilai'),
                'updated_at' => now(),
            ]);

            return redirect()->route('nilai.index', [
                'matkulId' => $tugas->matkul_id,
                'pertemuanId' => $tugas->pertemuan_id,
            ])->with('success', 'Tugas berhasil diperbarui.');
        }

        // Update tugas dan deadline jika ada perubahan
        if ($request->has('tugas') || $request->has('deadline')) {
            $tugas->update([
                'tugas' => $request->input('tugas', $tugas->tugas), // Gunakan nilai lama jika tidak ada input baru
                'deadline' => $deadline, // Gunakan nilai lama jika tidak ada input baru
                'updated_at' => now(),
            ]);

            return redirect()->route('tugas.index', [
                'matkulId' => $tugas->matkul_id,
                'pertemuanId' => $tugas->pertemuan_id,
            ])->with('success', 'Tugas berhasil diperbarui.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($matkulId, $pertemuanId, $tugasId)
    {
        // Temukan tugas berdasarkan ID
        $tugas = Tugas::findOrFail($tugasId);

        // Pastikan pengguna yang sedang login adalah pemilik tugas
        if ($tugas->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk menghapus tugas ini.');
        }

        // Hapus tugas
        $tugas->delete();

        return redirect()->route('tugas.index', [
            'matkulId' => $tugas->matkul_id,
            'pertemuanId' => $tugas->pertemuan_id,
        ])->with('success', 'tugas berhasil dihapus.');
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
