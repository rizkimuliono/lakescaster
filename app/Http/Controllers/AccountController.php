<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class AccountController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $aaSpots = SpotController::$aaSpotsByLatandLon;
        $aLakes = SpotController::$aLakes;
        $aSimpleSpots = SpotController::getSimpleSpots();
        return view('settings', compact('aaSpots', 'aLakes', 'aSimpleSpots'));
    }

    public function deleteAccount()
    {
        $user = User::find(Auth::user()->id);

        Auth::logout();

        if ($user->delete()) {

            session()->flash('message', 'Account deleted succsessfully!');
            return redirect('/');
        }
    }
}
