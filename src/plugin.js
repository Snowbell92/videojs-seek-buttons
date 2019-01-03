import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
const defaults = {
    "forward": 10,
    "backward": 10
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */

const addSeekButtons = (player, options) => {

    /*create the button*/

    function addButton(direction,seconds) {

        let Button = player.addChild('Button',
            {
                direction: direction,
                seconds: seconds

            });

        Button.controlText('seek '+ direction);
        Button.el().classList += ' vjs-seek-button skip-'+direction+' skip-'+ seconds;

        let playbutton = player.bigPlayButton.el_;

        if (playbutton){
            player.el().insertBefore(Button.el(), playbutton.nextSibling)
        } else {
            player.el().appendChild(Button.el())
        }

        return Button
    }

    /*write the handleclick*/

    function handleClick(direction, val) {
        const now = player.currentTime();
        if (direction === 'forward') {
            player.currentTime(now + val)
        } else if (direction === 'back') {
            player.currentTime(now - val);
        }
    }


    if (options.forward && options.forward > 0) {

        player.forwardButton = addButton('forward', options.forward);

        var _this = player.forwardButton;

        _this.el_.addEventListener('click', function () {
            handleClick(_this.options_.direction, _this.options_.seconds)
        })

        if ('ontouchstart' in window) {
            _this.el_.addEventListener("touchstart", function() {
                var touchHndl = function() {
                    //call the clickHandler actually
                    handleClick(_this.options_.direction, _this.options_.seconds)
                    //remove the touchend haldler after perform
                    this.removeEventListener('touchend',touchHndl)
                }
                //attach a handler for touch end when you are in touchstart event
                this.addEventListener('touchend',touchHndl);
            });
        }

    }

    if (options.backward && options.backward > 0) {
        player.backButton = addButton('back', options.backward);

        var this_ = player.backButton;

        this_.el_.addEventListener('click', function () {
            handleClick(this_.options_.direction,this_.options_.seconds)
        })

        if ('ontouchstart' in window) {
            this_.el_.addEventListener("touchstart", function() {
                var touchHndl = function() {
                    //call the clickHandler actually
                    handleClick(this_.options_.direction, this_.options_.seconds)
                    //remove the touchend haldler after perform
                    this.removeEventListener('touchend',touchHndl)
                }
                //attach a handler for touch end when you are in touchstart event
                this.addEventListener('touchend',touchHndl);
            });
        }
    }

}

const onPlayerReady = (player, options) => {
    player.addClass('vjs-seek-buttons');
    player.on('ready', () => addSeekButtons(player, options));
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function seekButtons
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const seekButtons = function (options) {
    this.ready(() => {
        onPlayerReady(this, videojs.mergeOptions(defaults, options));
    });
};

// Register the plugin with video.js.
registerPlugin('seekButtons', seekButtons);

// Include the version number.
seekButtons.VERSION = VERSION;

export default seekButtons;
