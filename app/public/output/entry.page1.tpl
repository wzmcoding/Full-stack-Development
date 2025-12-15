<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{{ name }}</title>
        <link href="/static/normalize.css" rel="stylesheet"  />
        <link href="/static/logo.png" rel="icon" type="image/x-icon"  />
    </head>
<body style="color: blue;">
    <h1>Page1</h1>
    <input id="env" value="{{ env }}" style="display: none;">
    <input id="options" value="{{ options }}" style="display: none;">
    <button onclick="handleClick()">发送请求</button>
</body>
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script type="text/javascript">
    try {
        window.env = document.getElementById('env').value;
        const options = document.getElementById('options').value;
        window.options = JSON.parse(options);
    } catch (e) {
        console.log(e);
    }

    function handleClick() {
        axios.get('/api/project/list').then(res => console.log(res));
    }
</script>
</html>