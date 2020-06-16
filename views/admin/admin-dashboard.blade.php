@extends('/partials/admin-layout')

@section('css-links')
<link rel="stylesheet" href="{{asset('/css/global.css')}}">
<link rel="stylesheet" href="{{asset('/css/header.css')}}">
<link rel="stylesheet" href="{{asset('/css/admin-styles.css')}}">
<link rel="stylesheet" href="{{asset('/css/admin-side-column.css')}}">
<link rel="stylesheet" href="{{asset('/css/footer.css')}}">
@endsection

@section('title','Dashboard')


@section('main-section')
    @include('/partials/side-column')
@endsection

@section('footer')
    @include('/partials/footer')
@endsection