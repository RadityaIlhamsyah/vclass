<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Matkul;
use App\Models\Pertemuan;
use Illuminate\Support\Facades\Auth;


class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($matkulId, $pertemuanId)
    {
        $forum = Forum::with(relations: 'user')->with('pertemuan')->where('pertemuan_id', $pertemuanId)->get();
        $pertemuan = Pertemuan::where('id', $pertemuanId)->first();
        return Inertia::render('Course/Forum/Index', [
            'forum' => $forum,
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
        $request->validate([
            'pesan' =>  'required|string',
        ]);



        Forum::create([
            'user_id' => Auth::id(),
            'matkul_id' => $matkulId,
            'pertemuan_id' => $pertemuanId,
            'pesan' => $request->input('pesan'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('forum.index', ['matkulId' => $matkulId, 'pertemuanId' => $pertemuanId])->with('success', 'Pertemuan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     //
    //     return Inertia::render('Course/Forum/Show', [
    //         'pertemuan' => $id,
    //     ]);
    // }

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
    public function update(Request $request, $matkulId,  $pertemuanId, $forumId)
    {
        // Validasi input
        $request->validate([
            'pesan' => 'required|string',
        ]);

        // Temukan forum berdasarkan ID
        $forum = Forum::findOrFail($forumId);

        // Pastikan pengguna yang sedang login adalah pemilik forum
        if ($forum->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk mengedit forum ini.');
        }

        // Update pesan forum
        $forum->update([
            'pesan' => $request->input('pesan'),
            'updated_at' => now(),
        ]);

        return redirect()->route('forum.index', [
            'matkulId' => $forum->matkul_id,
            'pertemuanId' => $forum->pertemuan_id,
        ])->with('success', 'Pesan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($matkulId, $pertemuanId, $forumId)
    {
        // Temukan forum berdasarkan ID
        $forum = Forum::findOrFail($forumId);

        // Pastikan pengguna yang sedang login adalah pemilik forum
        if ($forum->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk menghapus forum ini.');
        }

        // Hapus forum
        $forum->delete();

        return redirect()->route('forum.index', [
            'matkulId' => $forum->matkul_id,
            'pertemuanId' => $forum->pertemuan_id,
        ])->with('success', 'Pesan berhasil dihapus.');
    }

    public function pertemuan($matkulId)
    {
        $pertemuan = Pertemuan::where('matkul_id', $matkulId)->orderBy('pertemuan', 'asc')->get();
        $matkul = Matkul::with('dosen')->where('id', $matkulId)->first();

        if (!$pertemuan) {
            $pertemuan = null;
        }

        return Inertia::render('Course/Forum/Pertemuan', [
            'pertemuan' => $pertemuan,
            'matkul' => $matkul
        ]);
    }
}
