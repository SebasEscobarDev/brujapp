<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    //
	public function index()
  {

    return view('images');
  }

  public function storeImage(Request $request)
  {
      $request->validate([
        'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      ]);

      $image = new Image;

      if ($request->file('file')) {
          $imagePath = $request->file('file');
          $imageName = $imagePath->getClientOriginalName();

          $path = $request->file('file')->storeAs('uploads', $imageName, 'public');
      }

      $image->name = $imageName;
      $image->url = '/storage/'.$path;
      $image->user_id = $req->user_id;
      $image->contacto_id = $req->contacto_id;
      $image->save();

      return response()->json('Image uploaded successfully');
  }
}
