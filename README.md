# videojs-seek-buttons

adds a backword and forward button on the player surface to seek 

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-seek-buttons
```

## Usage

To include videojs-seek-buttons on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-seek-buttons.min.js"></script>
<script>
  var player = videojs('my-video');

  player.seekButtons();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-seek-buttons via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-seek-buttons');

var player = videojs('my-video');

player.seekButtons();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-seek-buttons'], function(videojs) {
  var player = videojs('my-video');

  player.seekButtons();
});
```

## License

MIT. Copyright (c) Samia Ruponti &lt;samia@bongobd.com&gt;


[videojs]: http://videojs.com/
