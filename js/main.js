 /*jshint esversion: 6 */

$(document).ready( () => {

		(function app(){
			'use strict';

			const SIDE = {
				communist : 0,
				usa :1
			};

			const body = document.querySelector('body');
			const windowWidth =  window.innerWidth;
			const windowHeight = window.innerHeight;
			const videoMain = $('.js-video-main');
			const videoUnder = $('.js-video-under');
			const videoLength = 309;
			var top = null;
			var timeOut = null;
			var currentLeft = 0;

			$('.initVideo').on('click', introClick);

			$('.intro a').on('mouseenter', (e) => {
				e.stopPropagation();
				let $elm = $(e.target).closest('li');
				let img = `${$elm.data('img')}`;
				let type = `.${$elm.data('type')}`;
				img = img + type;
				$('.intro').css({
					'background': `url(assets/index_menu/${img})`,
					'background-repeat': 'no-repeat',
					'background-size': 'cover'
				});
			});

			$('.intro a').on('mouseleave', (e) => {
				$('.intro').css({
					'background': 'white',
					'background-repeat': 'no-repeat',
					'background-size': 'cover'
				});
			});

				document.getElementById('videoMain').addEventListener('ended', () => {
				clearTimeout(timeOut);
			}, false);

			$(document).on('keydown', (e) => {
				const code = event.keyCode;
				const prevSide = whatIsTop();

				if(code === 37) {
					changeOverlap(SIDE.usa);
				} else if (code === 39) {
					changeOverlap(SIDE.communist);
				}
				if(prevSide !== whatIsTop()) {
					clearTimeout(timeOut);
					drawBufferBar();
				}
			});

			function changeOverlap(side) {
				if (side === SIDE.communist) {
					videoMain.css('z-index','10');
					videoUnder.css('z-index','0');
					videoMain.prop('muted', false);
					videoUnder.prop('muted', true);
				} else if (side === SIDE.usa) {
					videoMain.css('z-index','0');
					videoUnder.css('z-index','10');
					videoMain.prop('muted', true);
					videoUnder.prop('muted', false);
				}
				top = side;
			}

			function whatIsTop() {
				return top;
			}

			function drawBufferBar() {
				const top = whatIsTop();
				const ww = $('.bar').outerWidth();
				const d =  ww / videoLength;
				var elem = $('<div class=""></div>')
						.addClass('bar-segment')
						.css('left', currentLeft + 'px');
				$( (top == SIDE.communist ? '.js-bar-over' : '.js-bar-under') ).find('.bar').append(elem);
				updateBar(0, elem, d / 4);
			}

			function updateBar(cw,elem,d){
				var currentWidth = cw;
				timeOut = (setTimeout( () => {
					currentWidth = currentWidth + d;
					elem.stop(true, true).width(currentWidth);
					currentLeft = currentLeft + d;
					updateBar(currentWidth, elem, d);
				}, 250));
			}

			function introClick(e) {

					changeOverlap(SIDE.usa);

					$('.intro').hide();
					$('.title').hide();
					videoMain[0].play();
					videoUnder[0].play();
					$('.scene').fadeIn('slow', () => {
						var videos = $('.intro video');
						videos.each( (idx,item) => {
							item.pause();
						});
						$('.bar-wrapper').fadeIn( () => drawBufferBar() );
						$('.navitgation-arrow').fadeIn();
					});
			}

			$('.main-scene video').on('click', function() {
				window.location = 'onepage.html';
			});

		}());


});
