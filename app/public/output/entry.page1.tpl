<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{{ name }}</title>
    </head>
<body style="color: blue;">
    <h1>Page1</h1>
    <input id="env" value="{{ env }}" style="display: none;">
    <input id="options" value="{{ options }}" style="display: none;">
</body>
<script type="text/javascript">
    try {
        window.env = document.getElementById('env').value;
        const options = document.getElementById('options').value;
        window.options = JSON.parse(options);
    } catch (e) {
        console.log(e);
    }
</script>
</html>