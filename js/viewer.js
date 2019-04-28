var videoViewer = {
	UI: {
		loadVideoJS: function () {
			if (this.videoJSLoaded) {
				return $.when();
			} else {
				this.videoJSLoaded = true;
				var stylePath = OC.filePath('nextcloud-videoplayer', 'js', 'skins/youtube.min.css');
				$('head').append($('<link rel="stylesheet" type="text/css" href="' + stylePath + '"/>'));
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'videojs/video.min.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		videoJSLoaded: false,
		loadVideoJSLang: function () {
			if (this.videoJSLangLoaded) {
				return $.when();
			} else {
				this.videoJSLangLoaded = true;
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'videojs/lang/zh-CN.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		videoJSLangLoaded: false,
		loadFLVJS: function () {
			if (this.flvJSLoaded) {
				return $.when();
			} else {
				this.flvJSLoaded = true;
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'plugins/flv.min.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		flvJSLoaded: false,
		loadVideoJSFLVJS: function () {
			if (this.videoJSFLVJSLoaded) {
				return $.when();
			} else {
				this.videoJSFLVJSLoaded = true;
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'plugins/videojs-flvjs.min.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		videoJSFLVJSLoaded: false,
		loadVideoHotKey: function () {
			if (this.videoJSHotKeyLoaded) {
				return $.when();
			} else {
				this.videoJSHotKeyLoaded = true;
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'plugins/videojs.hotkeys.min.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		videoJSHotKeyLoaded: false,
		loadVideoPlaylist: function () {
			if (this.videoJSPlaylistLoaded) {
				return $.when();
			} else {
				this.videoJSPlaylistLoaded = true;
				var scriptPath = OC.filePath('nextcloud-videoplayer', 'js', 'plugins/videojs-playlist.min.js');

				var deferred = $.Deferred();
				var script = document.createElement('script');
				script.src = scriptPath;
				script.setAttribute('nonce', btoa(OC.requestToken));
				script.onload = function () {
					deferred.resolve();
				};
				document.head.appendChild(script);

				return deferred;
			}
		},
		videoJSPlaylistLoaded: false,
		playerTemplate: '<video id="my_video_1" style="width:100%;height:100%" class="video-js" controls />',
		show: function () {
			// insert HTML
			var playerView = videoViewer.UI.playerTemplate;
			if (videoViewer.inline === null) {
				var overlay = $('<div id="videoplayer_overlay" style="display:none;"><div id="videoplayer_outer_container"><div id="videoplayer_container"><div id="videoplayer"></div></div></div></div>');
				overlay.appendTo('body');
				$(playerView).prependTo('#videoplayer');
				// close when clicking on the overlay
				overlay.on("click", function (e) {
					if (e.target === this) {
						videoViewer.hidePlayer();
					}
				});
				// show elements
				overlay.fadeIn('fast');
			} else {
				var wrapper = $('<div id="videoplayer_view"></div>');
				wrapper.append(playerView);
				$(videoViewer.inline).html(wrapper);
			}

			// initialize player
			videojs("my_video_1", {
				autoplay: true,
				language: 'zh-CN',
				flvjs: {
					mediaDataSource: {
						isLive: true,
						withCredentials: true
					}
				}
			}).ready(function () {
				videoViewer.player = this;
				if (videoViewer.inline === null) {
					var closeButton = $('<a class="icon-view-close" id="box-close" href="#"></a>').click(videoViewer.hidePlayer);
					$("#my_video_1").append(closeButton);
					var title = $('<span id="vtitle" style="position:absolute;top:5px;left:5px;opacity:.35;color:#000" />');
					$("#my_video_1").append(title);
				}
				var plist = [];
				if (typeof videoViewer.ls !== 'undefined') {
					var llist = videoViewer.ls.length;
					var pindex = 0;
					var plist = [];
					var llist = videoViewer.ls.length;
					var pindex = 0;
					var subtitles = {};
					var mimes = videoViewer.mimeTypes.join();
					var langcodeToName = {
						af: '南非语',
						am: '阿姆哈拉语',
						ar: '阿拉伯语',
						as: '阿萨姆语',
						ba: '巴什基尔语',
						be: '白俄罗斯语',
						bg: '保加利亚语',
						bn: '孟加拉语',
						bo: '藏语',
						br: '布列塔尼语',
						ca: '加泰罗尼亚语',
						co: '科西嘉语',
						cs: '捷克语',
						cy: '威尔士语',
						da: '丹麦语',
						de: '德语',
						dv: '迪维西语',
						el: '希腊语',
						en: '英语',
						es: '西班牙语',
						et: '爱沙尼亚语',
						eu: '巴斯克语',
						fa: '波斯语',
						fi: '芬兰语',
						fo: '法罗语',
						fr: '法语',
						gd: '苏格兰盖尔语',
						gl: '加利西亚语',
						gu: '古吉拉特语',
						he: '希伯来语',
						hi: '印地语',
						hr: '克罗地亚语',
						hu: '匈牙利语',
						hy: '亚美尼亚语',
						id: '印尼语',
						ig: '伊博语',
						is: '冰岛语',
						it: '意大利语',
						ja: '日语',
						ka: '格鲁吉亚语',
						kk: '哈萨克语',
						km: '高棉语',
						kn: '卡纳达语',
						ko: '韩语',
						lb: '卢森堡语',
						lo: '老挝语',
						lt: '立陶宛语',
						lv: '拉脱维亚语',
						mi: '毛利语',
						ml: '马拉雅拉姆语',
						mr: '马拉地语',
						ms: '马来语',
						mt: '马耳他语',
						ne: '尼泊尔语',
						nl: '荷兰语',
						no: '挪威语',
						oc: '奥克语',
						or: '奥里亚语',
						pl: '波兰语',
						ps: '普什图语',
						pt: '葡萄牙语',
						qu: '克丘亚语',
						ro: '罗马尼亚语',
						ru: '俄语',
						rw: '卢旺达语',
						sa: '梵语',
						si: '僧伽罗语',
						sk: '斯洛伐克语',
						sl: '斯洛文尼亚语',
						sq: '阿尔巴尼亚语',
						sv: '瑞典语',
						ta: '泰米尔语',
						te: '泰卢固语',
						th: '泰语',
						tk: '土库曼语',
						tr: '土耳其语',
						tt: '鞑靼语',
						uk: '乌克兰语',
						ur: '乌尔都语',
						vi: '越南语',
						wo: '沃洛夫语',
						yo: '约鲁巴语',
						zh: '汉语'
					}
					var checksub = function (p) {
						var fileEnding = p.lastIndexOf('.');
						var candidateName = p.substr(0, fileEnding);
						var languageRegex = /^.*([a-zA-Z]{2})\.vtt$/g;
						var language = languageRegex.exec(videoViewer.ls[i].name);
						if (language) {
							var srclang = language[1];
							var label = langcodeToName[srclang];
							return [p.substr(0, p.lastIndexOf('_')), label, navigator.language.indexOf(srclang) === 0]
						}
						return false;
					}
					for (var i = 0; i < llist; i++) {
						var tp = escapeHTML(videoViewer.sp + '/' + encodeURI(videoViewer.ls[i].name));
						var tm = videoViewer.ls[i].mimetype;
						if (mimes.indexOf(tm) + 1) {
							if (tm === 'video/x-matroska') {
								tm = 'video/webm';
							}
							plist.push({
								sources: [{
										src: tp,
										type: tm
									}
								],
								vtitle: videoViewer.ls[i].name
							});
						} else {
							var tn = videoViewer.ls[i].name;
							var sub = checksub(tn);
							if (sub) {
								if (!(sub[0]in subtitles)) {
									subtitles[sub[0]] = [];
								}
								subtitles[sub[0]].push([tn, sub[1], sub[2]]);
							}
						}
					}

					for (var i = 0; i < plist.length; i++) {
						var tp = plist[i].sources[0].src;
						var tn = decodeURI(tp.replace(videoViewer.sp + '/', ''));
						tn = tn.substr(0, tn.lastIndexOf('.'));
						var subs = subtitles[tn];
						if (subs) {
							plist[i].textTracks = [];
							for (var q = 0; q < subs.length; q++) {
								plist[i].textTracks.push({
								default:
									subs[q][2],
									kind: "subtitles",
									label: subs[q][1],
									src: escapeHTML(videoViewer.sp + "/" + encodeURI(subs[q][0]))
								});
							}
						}
						if (plist[i].vtitle === videoViewer.file) {
							pindex = i;
						}
					}

					this.on('play', function () {
						$("#vtitle").text(escapeHTML(plist[videoViewer.player.playlist.currentItem()].vtitle));
					});

					var Button = videojs.getComponent('Button');
					var PrevButton = videojs.extend(Button, {
							constructor: function () {
								Button.apply(this, arguments);
								this.addClass('vjs-icon-previous-item');
								this.controlText("上一个");
							},
							handleClick: function () {
								videoViewer.player.playlist.previous();
							}
						});
					Button = videojs.getComponent('Button');
					var NextButton = videojs.extend(Button, {
							constructor: function () {
								Button.apply(this, arguments);
								this.addClass('vjs-icon-next-item');
								this.controlText("下一个");
							},
							handleClick: function () {
								videoViewer.player.playlist.next();
							}
						});
					videojs.registerComponent('NextButton', NextButton);
					videojs.registerComponent('PrevButton', PrevButton);
					this.getChild('controlBar').addChild('PrevButton', {}, 0);
					this.getChild('controlBar').addChild('NextButton', {}, 2);
				} else {
					plist.push({
						sources: [{
								src: videoViewer.location,
								type: videoViewer.mime
							}
						],
						vtitle: escapeHTML($('input[name=filename]')[0].value)
					});
				}
				this.on('contextmenu', function (e) {
					e.preventDefault();
				});
				this.hotkeys();
				this.playlist(plist);
				this.playlist.currentItem(pindex);
				this.playlist.autoadvance(0);
				this.play();
			});
		},
		hide: function () {
			$('#videoplayer_overlay').fadeOut('fast', function () {
				$('#videoplayer_overlay').remove();
			});
		},
	},
	mime: null,
	file: null,
	location: null,
	player: null,
	inline: null,
	mimeTypes: [
		'video/mp4',
		'video/x-m4v',
		'video/webm',
		'video/x-flv',
		'video/ogg',
		'video/quicktime',
		'video/x-matroska'
	],
	mimeTypeAliasses: {
		'video/x-matroska': 'video/webm' // mkv support for Chrome. webm uses the same container format
	},
	onView: function (file, data) {
		videoViewer.file = file;
		videoViewer.dir = data.dir;
		videoViewer.ls = data.fileList.files;
		videoViewer.sp = videoViewer.location = data.fileList.getDownloadUrl('', videoViewer.dir);
		videoViewer.location = data.fileList.getDownloadUrl(file, videoViewer.dir);
		videoViewer.mime = data.$file.attr('data-mime');
		if (videoViewer.mimeTypeAliasses.hasOwnProperty(videoViewer.mime)) {
			videoViewer.mime = videoViewer.mimeTypeAliasses[videoViewer.mime];
		}
		videoViewer.showPlayer();
	},
	onViewInline: function (element, file, mime) {
		videoViewer.location = file;
		videoViewer.mime = mime;
		if (videoViewer.mimeTypeAliasses.hasOwnProperty(videoViewer.mime)) {
			videoViewer.mime = videoViewer.mimeTypeAliasses[videoViewer.mime];
		}
		videoViewer.inline = element;
		videoViewer.showPlayer();
	},
	showPlayer: function () {
		videoViewer.UI.loadVideoJS().then(function () {
			videoViewer.UI.loadVideoJSLang().then(function () {
				videoViewer.UI.loadFLVJS().then(function () {
					videoViewer.UI.loadVideoJSFLVJS().then(function () {
						videoViewer.UI.loadVideoHotKey().then(function () {
							videoViewer.UI.loadVideoPlaylist().then(function () {
								videoViewer.UI.show();
							})
						})
					})
				})
			})
		});
	},
	hidePlayer: function () {
		if (videoViewer.player !== null && videoViewer.player !== false && videoViewer.inline === null) {
			videoViewer.player.dispose();
			videoViewer.player = false;
			videoViewer.UI.hide();
		}
	},
	log: function (message) {
		console.log(message);
	}
};

$(document).ready(function () {

	// add event to ESC key
	$(document).keyup(function (e) {
		if (e.keyCode === 27) {
			videoViewer.hidePlayer();
		}
	});

	var isSupportedMimetype = false;
	var mimetype = $('#mimetype').val();

	if (typeof FileActions !== 'undefined') {
		for (var i = 0; i < videoViewer.mimeTypes.length; ++i) {
			var mime = videoViewer.mimeTypes[i];
			OCA.Files.fileActions.register(mime, 'View', OC.PERMISSION_READ, '', videoViewer.onView);
			OCA.Files.fileActions.setDefault(mime, 'View');
			if (mime === mimetype) {
				isSupportedMimetype = true;
			}
		}
	}

	if ($('#body-public').length && $('#imgframe').length && isSupportedMimetype) {
		var videoUrl = $('#downloadURL').val();
		videoViewer.onViewInline($('#imgframe'), videoUrl, mimetype);
	}

});
