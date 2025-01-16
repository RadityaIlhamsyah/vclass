<?php

namespace App\Http\Controllers;

use App\Models\EnrollMatkul;
use App\Models\Forum;
use Illuminate\Http\Request;
use App\Models\Matkul;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Pertemuan;
use App\Models\Tugas;
use App\Models\User;


class MatkulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matkulEnrolled = EnrollMatkul::with('matkul')
            ->where('user_id', operator: Auth::id())
            ->get();


        $matkul = $matkulEnrolled->map(function ($enrollment) {
            return [
                'id' => $enrollment->matkul->id,
                'dosen' => $enrollment->matkul->dosen,
                'nama_matkul' => $enrollment->matkul->nama_matkul,
                'kelas' => $enrollment->matkul->kelas,
                'created_at' => $enrollment->matkul->created_at,
                'updated_at' => $enrollment->matkul->updated_at,
            ];
        });


        return Inertia::render('Dashboard', [
            'matkul' => $matkul,
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
        $request->validate([
            'nama_matkul' => 'required|string|max:255',
            'kelas' => 'required|string|max:10',
        ]);


        $matkul = Matkul::create([
            'dosen_id' => Auth::id(),
            'nama_matkul' => $request->input('nama_matkul'),
            'kelas' => $request->input('kelas'),
            'kode_matkul' => strtoupper(substr('MK' . uniqid(), 0, 10)),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Enroll user ke mata kuliah
        EnrollMatkul::create([
            'user_id' => Auth::id(),
            'matkul_id' => $matkul->id,
        ]);

        return redirect()->route('matkul.index')->with('success', 'Matkul berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($matkulId)
    {
        $matkul = Matkul::with('dosen')->find($matkulId);

        $enrollStatus = EnrollMatkul::where('user_id', Auth::id())->where('matkul_id', $matkulId)->exists();


        if (!$matkul) {
            return redirect()->route('matkul')->with('error', 'Matkul tidak ditemukan');
        }

        // $forumStatus = Forum::where('matkul_id', $matkulId)->exists();
        // $tugasStatus = Tugas::where('matkul_id', $matkulId)->exists();

        return Inertia::render('Course/Course', [
            'matkul' => $matkul,
            'enrollStatus' => $enrollStatus,
            // 'tugasStatus' => $tugasStatus,
            // 'forumStatus' => $forumStatus
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Matkul::find($id)->delete();

        return redirect()->route('matkul.index')->with('success', 'Matkul berhasil dihapus');
    }

    public function search(Request $request)
    {
        $kodeMatkul = $request->input('kode_matkul');
        // Mencari matkul berdasarkan ID
        $matkul = Matkul::with('dosen')
            ->where('kode_matkul', $kodeMatkul)
            ->first();

        return Inertia::render('GabungKelas', [
            'matkul' => $matkul,
        ]);
    }

    public function enroll(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure user_id is valid
            'matkul_id' => 'required|exists:matkuls,id',
            // You can add more validation rules if needed
        ]);

        // Check if the user is already enrolled in the class
        $existingEnrollment = EnrollMatkul::where('user_id', Auth::id())
            ->where('matkul_id', $request->input('matkul_id'))
            ->first();

        if ($existingEnrollment) {
            return redirect()->back()->with('error', 'Anda sudah terdaftar di kelas ini.');
        }

        // Create a new enrollment
        EnrollMatkul::create([
            'user_id' => Auth::id(),
            'matkul_id' => $request->input('matkul_id'),
        ]);

        return redirect()->route('matkul.index')->with('success', 'Anda berhasil bergabung dengan kelas.');
    }
}
