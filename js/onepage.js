/*jshint esversion: 6 */

$(document).ready( () => {

	(function app() {
		var audio = null;
		$('.play').hide();
		$('.lyrics').hide();
		$('.vinyl').hide();
		$('.track--info').hide();


		const data = [
			{date:"1980", author:"Kate Bush", track:"Breathing"},
			{date:"1980", author:"XTC", track:"Living through another cubs"},
			{date:"1981", author:"Discharge", track:"Two monstrous nuclear stockpiles"},
			{date:"1982", author:"ABBA", track:"The visitors"},
			{date:"1983", author:"Nena", track:"99 Luftballons"},
			{date:"1983", author:"Pink Floyd", track:"Two suns in the sunset"},
			{date:"1983", author:"Depeche Mode", track:"Two minute warning"},
			{date:"1984", author:"Queen", track:"Hammer to fall"},
			{date:"1984", author:"Iron Maiden", track:"Two minutes to midnight"},
			{date:"1984", author:"Frankie Goes To Hollywood", track:"Two tribes"},
			{date:"1985", author:"Fishbone", track:"Party at ground zero"},
			{date:"1985", author:"Sting", track:"Russians"},
			{date:"1985", author:"Elton John", track:"Nikita"},
			{date:"1986", author:"Genesis", track:"Land of confusion"},
			{date:"1986", author:"David Bowie", track:"when the wind blows"},
			{date:"1989", author:"Billy Joel", track:"We didn't start the fire"},
			{date:"1989", author:"Billy Joel", track:"Leningrad"},
			{date:"1990", author:"Scorpions", track:"Wind of change"}
		];

		const dataUSSR = [
			{date:"1980", author:"Zoopark", track:"Blues de Moscou"},
			{date:"1980", author:"Európa Kiadó", track:"Szabadíts Meg!"},
			{date:"1981", author:"Zemlyane", track:"Grass By The Home"},
			{date:"1982", author:"URH", track:"Ismeretlen Katona"},
			{date:"1983", author:"Alisa", track:"My Generation"},
			{date:"1983", author:"Kino", track:"I declare my town a nuclear free zone"},
			{date:"1983", author:"Aria", track:"S Kem Ty?"},
			{date:"1984", author:"Bravo", track:"Wonderful Land"},
			{date:"1984", author:"Akvarium", track:"This Train's on Fire"},
			{date:"1984", author:"DDT", track:"Revolution"},
			{date:"1985", author:"Nautilus Pompilius", track:"Good Bye, America!"},
			{date:"1985", author:"Sexepil", track:"Egy a világ"},
			{date:"1985", author:"Európa Kiadó", track:"Szavazz rám"},
			{date:"1986", author:"Sekret", track:"Leningradskoye Vremya"},
			{date:"1986", author:"Tereskova", track:"Száll az űrhajó"},
			{date:"1989", author:"Üllői Úti FUCK", track:"A háborút megnyerük"},
			{date:"1989", author:"Sziámi", track:"Nem bízhatsz Senkiben"},
			{date:"1990", author:"URH", track:"Nagy Testvér"}
		];

		const movieData = [
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ecs2TPGdnLk" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Y0S7uE7l_oA" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gIk6aBLCoHg" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/uL4gjQFsw9E" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qAfbp3YX9F0" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IXAVKJTIM1E" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IivpyjnD-Dw" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Rh4uIHsXJdw" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/A1pfvv-jE4o" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mg_BHnszYNY" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/A3qEBXoeqNI" frameborder="0" allowfullscreen></iframe>'},
			{link: '<iframe width="560" height="315" src="https://www.youtube.com/embed/AfxF8U8YXR0" frameborder="0" allowfullscreen></iframe>'}
		];

		const $overlay = $('.overlay');

		$('.fullpage').fullpage({
			controlArrows: false,
			anchors: ['intro','dinosaur','music','musicStripes','videoIntro','videos'],
			onLeave: function(index, nextIndex, direction){

				if(index === 1 || nextIndex === 1) {
					$('.keyboard').fadeToggle();
				}

				if(index === 4) {
					$('.player__svg-lp').addClass('paused');
					if(audio)
						audio.pause();
					$('.play').show();
					$('.pause').hide();
				}
			}
		});

		$(window).resize(() => {
			winHeight = $(window).height();
			winWidth = $(window).width();
			createSizes();
		});

		function createSizes() {
			winHeight = $('.album--wrapper').height();
			movieHeight = $('.movies--wrapper').height();
			winWidth = $(window).width();
			current = 0;
			currentm = 0;
			current_ussr = 0;
			currentm_ussr = 0;

			gapAlbum = parseInt(winHeight/18);
			heightAlbum = 18 * gapAlbum;
			offsetAlbum = (heightAlbum - winHeight)/2;

			gapMovie = parseInt(movieHeight/6);
			mHeight = 6 * gapMovie;
			offsetMovie = (mHeight - movieHeight)/2;



			$('.album--wrapper .images, .links').css({
				marginTop: -offsetAlbum
			});

			$('.movies--wrapper .images,.links').css({
				marginTop: -offsetMovie
			});

			$('.album--wrapper_ussr .images,.links').css({
				marginTop: -offsetAlbum
			});

			$('.movies--wrapper_ussr .images,.links').css({
				marginTop: -offsetMovie
			});

			$('.album--wrapper .images li').each(function(){
				$(this).css({
					height:gapAlbum,
					top: current * gapAlbum,
					background:'url(assets/usa/' + (current + 1) +'.jpg) no-repeat center 45%'
				}).data('top', current++ * gapAlbum);
			});

			$('.movies--wrapper .images li').each(function(){
				$(this).css({
					height:gapMovie,
					top: (currentm) * gapMovie,
					background:'url(assets/movies/usa/' + (currentm + 1) +'.jpg) no-repeat center 45%'
				}).data('top', currentm++ * gapMovie);
			});

			$('.album--wrapper_ussr .images li').each(function(){
				$(this).css({
					height:gapAlbum,
					top: current_ussr * gapAlbum,
					background:'url(assets/ussr/' + (current_ussr + 1) +'.jpg) no-repeat center 45%'
				}).data('top', current_ussr++ * gapAlbum);
			});

			$('.movies--wrapper_ussr .images li').each(function(){
				$(this).css({
					height:gapMovie,
					top: (currentm_ussr) * gapMovie,
					background:'url(assets/movies/ussr/' + (currentm_ussr + 1) +'.jpg) no-repeat center 45%'
				}).data('top', currentm_ussr++ * gapMovie);
			});

			current = 0;
			currentm = 0;
			current_ussr = 0;
			currentm_ussr = 0;

			$('.album--wrapper .links a').each(function(){
				$(this).css({
					height:gapAlbum,
					top: current * gapAlbum
				}).data('top', current++ * gapAlbum);
			});

			$('.movies--wrapper .links a').each(function(){
				$(this).css({
					height:gapMovie,
					top: (currentm) * gapMovie
				}).data('top', currentm++ * gapMovie);
			});

			$('.album--wrapper_ussr .links a').each(function(){
				$(this).css({
					height:gapAlbum,
					top: (current_ussr) * gapAlbum
				}).data('top', current_ussr++ * gapAlbum);
			});

			$('.movies--wrapper_ussr .links a').each(function(){
				$(this).css({
					height:gapMovie,
					top: (currentm_ussr) * gapMovie
				}).data('top', currentm_ussr++ * gapMovie);
			});

		}
		createSizes();

		$('.album--wrapper .hover').mouseenter(function(){
			var parent = $(this).parents('.album--wrapper');
			var offset = offsetAlbum;

			var index = $(this).index();

			$('.images li', parent).eq(index).css({
				zIndex:100,
				top:offset,
				height:winHeight,
				width: '700px',
				'margin':'0 auto',
				'background-position':'center center'
		});
		$('.images li:eq(' + index + ') .number', parent).show();
		}).mouseleave(function(){
			var parent = $(this).parents('.album--wrapper');
			var gap = gapAlbum;
			var align = '45%';

			var index = $(this).index();
			$('.images li', parent).eq(index).css({
					top:$(this).data('top'),
					height:gap,
					zIndex:0,
					width: '100%',
					'background-position':'center ' + align
				});
			}).click(function(e){
				e.preventDefault();
			});

			$('.movies--wrapper .hover').mouseenter(function(){
				var parent = $(this).parents('.movies--wrapper');
				var offset = offsetMovie;

				var index = $(this).index();

				$('.images li', parent).eq(index).css({
					zIndex:100,
					top:offset,
					height:winHeight,
					'background-position':'center center'
			});

			$('.movies--wrapper.images li:eq(' + index + ') .number', parent).show();
			}).mouseleave(function(){
				var parent = $(this).parents('.movies--wrapper');
				var gap = gapMovie;
				var align = '45%';

				var index = $(this).index();

				$('.images li', parent).eq(index).css({
						top:$(this).data('top'),
						height:gap,
						zIndex:0,
						'background-position':'center ' + align
					});
				}).click(function(e){
					e.preventDefault();
				});

			$('.choose_a_song').on('click', (e) => {
				$.fn.fullpage.moveSlideLeft();
			});

			$('.album--wrapper .hover, .album--wrapper_ussr .hover').on('click', (e) => {
				$('.vinyl').show();
				$('.lyrics').hide();
				$('.choose_a_song').hide();
					if(audio) {
						audio.pause();
						audio = null;
					}
					var el = $(e.target);
					var parent = el.parent().parent();
					var id = el.data('id');
					var country = parent.attr("class") === 'album--wrapper_ussr' ? 'ussr' : 'usa';

					var element = country === 'ussr' ? dataUSSR[id-1] : data[id-1];

					lyrics_id = country === 'ussr' ? id + 18 : id;
					
					var fontSize = lyrics_id === 4 ? '0.65em' : '11px';
					var paddingTop = lyrics_id === 4 ? '50px' : '90px';

					$('.section6 .fp-tableCell').css('padding-top', paddingTop);
					$('.lyrics').css('font-size', fontSize);
					
					$('.lyrics[data-id="'+lyrics_id+'"]').css('z-index',100).show();
					$('.ddate').text(element.date);
					$('.dauthor').text(element.author);
					$('.dtrack').text(element.track);
					$('.player__svg-lp').addClass('rotate');
					$('.player__svg-lp image').attr('xlink:href',"./assets/"+country+"/"+id+'.jpg');
					audio = new Audio('./assets/'+country+'/music/'+id+'.mp3');
					$('.pause').show();
					$('.track--info').show();
					$('.play').hide();
					$('.player__svg-lp').removeClass('paused');
					audio.play();
					$.fn.fullpage.moveSlideRight();
			});

			$('.movies--wrapper .hover, .movies--wrapper_ussr .hover').on('click', (e) => {
					$('.movie-data-block').hide();
				
					var el = $(e.target);
					var parent = el.parent().parent();
					var id = el.data('id');
					var country = parent.attr("class") === 'movies--wrapper_ussr' ? 'ussr' : 'usa';

					var element = country === 'ussr' ? movieData[12-id-1] : movieData[id-1];

					description_id = country === 'ussr' ? id + 6 : id;

					$('.choose_a_movie').hide();
					$('.movie-data-block[data-id="'+description_id+'"]').css('z-index',100).show();
					$('.iframe').html('');
					$('.iframe').append(element.link);
					$.fn.fullpage.moveSlideRight();
			});

			$('.album--wrapper_ussr .hover').mouseenter(function(){
				var parent = $(this).parents('.album--wrapper_ussr');
				var offset = offsetAlbum;

				var index = $(this).index();

				$('.images li', parent).eq(index).css({
					zIndex:100,
					top:offset,
					height:winHeight,
					width: '700px',
					'margin':'0 auto',
					'background-position':'center center'
			});
			$('.images li:eq(' + index + ') .number', parent).show();
			}).mouseleave(function(){
				var parent = $(this).parents('.album--wrapper_ussr');
				var gap = gapAlbum;
				var align = '45%';

				var index = $(this).index();
				$('.images li', parent).eq(index).css({
						top:$(this).data('top'),
						height:gap,
						zIndex:0,
						width: '100%',
						'background-position':'center ' + align
					});
				}).click(function(e){
					e.preventDefault();
			});

			$('.movies--wrapper_ussr .hover').mouseenter(function(){
				var parent = $(this).parents('.movies--wrapper_ussr');
				var offset = offsetMovie;

				var index = $(this).index();

				$('.images li', parent).eq(index).css({
					zIndex:100,
					top:offset,
					height:winHeight,
					'background-position':'center center'
			});
			
			$('.movies--wrapper_ussr.images li:eq(' + index + ') .number', parent).show();
			}).mouseleave(function(){
				var parent = $(this).parents('.movies--wrapper_ussr');
				var gap = gapMovie;
				var align = '45%';

				var index = $(this).index();

				$('.images li', parent).eq(index).css({
						top:$(this).data('top'),
						height:gap,
						zIndex:0,
						'background-position':'center ' + align
					});
				}).click(function(e){
					e.preventDefault();
				});

			$('.choose_a_song, .choose_a_movie').on('click', (e) => {
				$.fn.fullpage.moveSlideLeft();
			});


		$('.nav-wrapper').click(function(){
			toggleOverlay();
		});

		function toggleOverlay() {
			$('#nav-icon').toggleClass('open');
			$('.overlay').fadeToggle();
			$overlay.css({'background-image': `none`});
		}

		$('.menu a').on('mouseenter', (e) => {
			e.stopPropagation();
			let $elm = $(e.target).closest('li');
			let img = `${$elm.data('img')}`;
			let type = `.${$elm.data('type')}`;
			img = img + type;
			$overlay.css({'background-image': `url(assets/menu/${img})`});
		});
		
		$('.menu a').on('click', (e) => {
			toggleOverlay();
		});

		$('.section2 a').on('mouseenter', (e) => {
			e.stopPropagation();
			let $elm = $(e.target);
			let img = `${$elm.data('id')}`;
			let type = `.${$elm.data('type')}`;
			img = img + type;
			$('.content--box__size_p').css({'background-image': `url(assets/text_gifs/${img})`});
		});

		$('.section2 a').on('mouseleave', (e) => {
			$('.content--box__size_p').css({'background-image': 'none'});
		});

		$('.play, .pause').on('click', (e) => {
			var $elm = $(e.target);
			var cl = $elm.attr('data-type');

			if(cl === 'pause') {
				if(audio) {
					audio.pause();
				}
				$('.player__svg-lp').addClass('paused');
				$elm.hide();
				$('.play').show();
			} else {
				if(audio) {
					audio.play();
				}
				$('.player__svg-lp').removeClass('paused');
				$elm.hide();
				$('.pause').show();
			}
		});

	}());

});
