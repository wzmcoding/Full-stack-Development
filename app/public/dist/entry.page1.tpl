<!doctype html><html lang="en"><head><meta charset="UTF-8"><link href="/static/normalize.css" rel="stylesheet"/><link href="/static/logo.png" rel="icon" type="image/x-icon"/><title>{{ name }}</title><script defer="defer" src="/dist/prod/js/vendor_0731f5b9.bundle.js"></script><script defer="defer" src="/dist/prod/js/common_48be9d04.bundle.js"></script><script defer="defer" src="/dist/prod/js/entry.page1_153b9b45.bundle.js"></script></head><body style="margin: 0;"><div id="root"></div><input id="env" value="{{ env }}" style="display: none;"> <input id="options" value="{{ options }}" style="display: none;"></body><script>try {
        window.env = document.getElementById('env').value;
        const options = document.getElementById('options').value;
        window.options = JSON.parse(options);
    } catch (e) {
        console.log(e);
    }</script></html>