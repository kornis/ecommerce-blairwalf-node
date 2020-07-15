<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap/bootstrap-grid.min.css">
    @yield('css-links')
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet"> 
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/14cc9117fe.js" crossorigin="anonymous"></script>
    <title>BW - BlairWalf |  @yield('title')</title>
</head>
<body>

    @yield('header')
    
    @yield('main-section')
    
    @yield('footer')
    

    @yield('js')
</body>
</html>