<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\MatkulController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PertemuanController;
use App\Http\Controllers\TugasController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [MatkulController::class, 'index'])->name('matkul.index');
    Route::get('/matkul', [MatkulController::class, 'search'])->name('matkul.search');
    Route::post('/matkul', [MatkulController::class, 'search'])->name('matkul.search');
    Route::get('/matkul/{matkulId}', [MatkulController::class, 'show'])->name('matkul.show');
    Route::post('/matkul/{matkulId}', [MatkulController::class, 'enroll'])->name('matkul.enroll');
    Route::delete('/matkul/{matkulId}', [MatkulController::class, 'destroy'])->name('matkul.destroy');

    Route::get('/buat-kelas', function () {
        return Inertia::render('BuatKelas');
    })->name('buat-kelas');
    Route::post('/buat-kelas', [MatkulController::class, 'store'])->name('matkul.store');

    Route::get('/matkul/{matkulId}/forum', [ForumController::class, 'pertemuan'])->name('forum.pertemuan');
    Route::get('/matkul/{matkulId}/tugas', [ForumController::class, 'pertemuan'])->name('tugas.pertemuan');
    Route::get('/matkul/{matkulId}/nilai', [ForumController::class, 'pertemuan'])->name('nilai.pertemuan');


    Route::get('/matkul/{matkulId}/forum/{pertemuanId}', [ForumController::class, 'index'])->name('forum.index');
    Route::post('/matkul/{matkulId}/forum/{pertemuanId}', [ForumController::class, 'store'])->name('forum.store');
    Route::patch('/matkul/{matkulId}/forum/{pertemuanId}/{forumId}', [ForumController::class, 'update'])->name('forum.update');
    Route::delete('/matkul/{matkulId}/forum/{pertemuanId}/{forumId}', [ForumController::class, 'destroy'])->name('forum.destroy');

    Route::get('/matkul/{matkulId}/tugas/{pertemuanId}', [TugasController::class, 'index'])->name('tugas.index');
    Route::post('/matkul/{matkulId}/tugas/{pertemuanId}', [TugasController::class, 'store'])->name('tugas.store');
    Route::patch('/matkul/{matkulId}/tugas/{pertemuanId}/{tugasId}', [TugasController::class, 'update'])->name('tugas.update');
    Route::delete('/matkul/{matkulId}/tugas/{pertemuanId}/{tugasId}', [TugasController::class, 'destroy'])->name('tugas.destroy');

    Route::get('/matkul/{matkulId}/nilai/{pertemuanId}', [NilaiController::class, 'index'])->name('nilai.index');
    Route::post('/matkul/{matkulId}/nilai/{pertemuanId}', [NilaiController::class, 'store'])->name('nilai.store');
    Route::patch('/matkul/{matkulId}/nilai/{pertemuanId}/{nilaiId}', [NilaiController::class, 'update'])->name('nilai.update');
    Route::delete('/matkul/{matkulId}/nilai/{pertemuanId}/{nilaiId}', [NilaiController::class, 'destroy'])->name('nilai.destroy');

    Route::post('/matkul/{matkulId}/pertemuan', [PertemuanController::class, 'store'])->name('pertemuan.store');
    Route::get('/matkul/{matkulId}/pertemuan', [PertemuanController::class, 'index'])->name('pertemuan.index');

    Route::get('/nilai', function () {
        return Inertia::render('Course/Nilai');
    })->name('nilai');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
