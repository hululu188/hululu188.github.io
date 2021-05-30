vip_buy = function (vip_id) {
	$(ctmodal).load(api_server + "/api.php?item=vip&action=buy&vip_id=" + vip_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

mobile_vip_buy = function (vip_id) {
	$(ctmodal).load(api_server + "/api.php?item=vip&action=mobilebuy&vip_id=" + vip_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

checkOnclick = function () {
	checkedIDs.length = 0;
	$("#table_files tr > td:first-child input:checkbox").filter(':checked').each(function () {
		checkedIDs.push($(this).val());
	});
	if (checkedIDs.length == 0) {
		$('#file-control').hide();
		$('#table_files th input:checkbox').attr('checked', false);
		$('#table_files_wrapper > .row-fluid:first-child').fadeIn(500);

	}
	else {
		$('#selected_files_count').html(checkedIDs.length);
		$('#table_files_wrapper > .row-fluid:first-child').hide();
		$('#file-control').fadeIn(500);
	}
};

bulk_muti_down = function () {
	if (checkedIDs.length == 0) {
		cterror("请选择文件后再进行操作。");
		return false;
	}
	if (checkedIDs.length > 200) {
		cterror("页面无法容纳超过200个文件的批量操作。请分开操作。");
		return false;
	}
	var idlist = checkedIDs.join(",");
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_mutiple_download&uid=" + userid + "&file_id=" + idlist + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

bulk_pack_down = function () {
	if (checkedIDs.length == 0) {
		cterror("请选择文件后再进行操作。");
		return false;
	}
	if (checkedIDs.length > 200) {
		cterror("页面无法容纳超过200个文件的批量操作。请分开操作。");
		return false;
	}
	var idlist = checkedIDs.join(",");
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_package_download&uid=" + userid + "&file_id=" + idlist + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

bulk_search_save = function () {
	if (checkedIDs.length == 0) {
		cterror("请选择文件后再进行操作。");
		return false;
	}
	if (checkedIDs.length > 200) {
		cterror("页面无法容纳超过200个文件的批量操作。请分开操作。");
		return false;
	}
	var idlist = checkedIDs.join(",");
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=search_file_copy&uid=" + userid + "&file_id=" + idlist + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

file_openzip = function () {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_unzip&task=readonly&uid=" + userid + "&file_id=" + file_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

file_unzip = function () {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_unzip&uid=" + userid + "&file_id=" + file_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

file_zip = function () {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_zip&uid=" + userid + "&file_id=" + file_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

file_play = function () {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=file_play&uid=" + userid + "&file_id=" + file_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};

file_save = function () {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=search_file_copy&uid=" + userid + "&file_id=" + file_id + "&token=" + getTokenId(), function () { $(ctmodal).modal() });
};



free_vip_upgrade = function (file_size) {
	$(ctmodal).load(api_server + "/api.php?item=file_act&action=premium&file_size=" + file_size).modal({ backdrop: "static" }).draggable();
};


function file_down(mb, app) {
	file_down_init(file_id, 0, file_chk, mb, app);
}



function dir_down(mb, app) {
	file_down_init(0, folder_id, file_chk, mb, app);
}


function CloseAndScrollToVIP() {
	if ($(ctmodal).hasClass('show'))
	{
		$(ctmodal).modal("hide");
	}
	$("html, body").animate({ scrollTop: $(document).height() - $(window).height() - 150 });
}

function file_down_init(file_id, folder_id, file_chk, mb, app, verifycode) {

	if (!app && is_weixn_qq()) {
		wx_browser_show();
		return false;
	}

	var acheck = mb ? $("#mobile-500x200:visible").length : $("#760ad:visible").length;

	verifycode = typeof verifycode !== 'undefined' ? verifycode : "";
	$.getJSON(api_server + "/get_file_url.php?uid=" + userid + "&fid=" + file_id + "&folder_id=" + folder_id + "&file_chk=" + file_chk + "&mb=" + mb + "&app=" + app + "&acheck=" + acheck + "&verifycode=" + verifycode + '&rd=' + Math.random(), function (data) {
		if (data.code == 503) {

			$(ctmodal).load(api_server + "/api.php?item=file_act&action=verifycode&uid=" + userid + "&fid=" + file_id + "&folder_id=" + folder_id + "&file_chk=" + file_chk + "&mb=" + mb + "&app=" + app, function () { $(ctmodal).modal() });

		}

		if (data.code == 302) {
			window.location.href = data.url;
		}

		if (data.code == 215) {
			
			alert(data.message);

		}

		if (data.code == 216) {

			$(ctmodal).load(api_server + "/api.php?item=file_act&action=download_queue&uid=" + userid + "&fid=" + file_id + "&folder_id=" + folder_id + "&mb=" + mb, function () { $(ctmodal).modal() });

		}

		if (data.code == 217) {

			$(ctmodal).load(api_server + "/api.php?item=file_act&action=download_limit&uid=" + userid + "&fid=" + file_id + "&folder_id=" + folder_id + "&mb=" + mb + "&waittime=" + data.waittime, function () { $(ctmodal).modal() });

		}


		if (data.code == 215 || data.code == 216 || data.code == 217) {
			if ($("#doubleclick_log").length > 0 && $("#doubleclick_log").attr("src").length > 50) {
				$("#doubleclick_log").attr("src", data.confirm_url);
			}

			if (data.pop > 0) {
				setTimeout(function() {
				important_window();
				}, 4000);
			}
		}



		if (data.code == 200) {

			if ($("#doubleclick_log").length > 0 && $("#doubleclick_log").attr("src").length > 50) {
				$("#doubleclick_log").attr("src", data.confirm_url);
			}

			if (app) {
				if (!mb) {
					$('<div style="display:none;"><iframe src="ctfile://xturl' + data.xt_link + '" frameborder="0" scrolling="no" id="myFrame"></iframe></div>').appendTo('body');
					//window.location.href = "ctfile://xturl" + data.xt_link;
					$(ctmodal).load(api_server + "/api.php?item=file_act&action=xt_downlink&xtlink=" + data.xt_link, function () { $(ctmodal).modal() });
				}
				else {
					window.location.href = "ctfile://inapp.ctfile.com/app.php?||xt||ctfile://xturl" + data.xt_link;
					$("#xtlink_input").val("ctfile://xturl" + data.xt_link);
					$("#xtlink_copy_alert").show();
				}


			} else {
				/*
				if (data.showvip == 1)
				{
					if (!mb) {
						setTimeout(function () { free_vip_upgrade(data.file_size); }, 1500);
					} else {
						setTimeout(function () { $("#free_down_alert").show(); }, 1500);
					}
				}
				*/



				if (data.pop > 0) {
					important_window();
				}

				if (data.downurl) {
					setTimeout(function () { window.location.href = data.downurl; }, 100);
				}



			}



		}

	});
}

var _popup_ispoped = false;
function important_window(){
	var _popheight = screen.height*0.8;
	var _popwidth = screen.height*0.8;
	
	if (!_popup_ispoped)
	{
		_popup_ispoped = true;
		myWindow=window.open("http://mydisplay.ctfile.com/popjump.php?r=" + Math.random(),"","width=" + _popwidth + ",height=" + _popheight + ",top=" + (screen.height - _popheight) + ",left=" + (screen.width - _popwidth));
		myWindow.blur();
	}
    
}


function is_weixn_qq() {
	var ua = navigator.userAgent.toLowerCase();
	var ref = document.referrer;
	if (ua.match(/MicroMessenger|QQ\/|weibo|alipay|tieba|zhihu|baidu/i)) {
		return true;
	}

	if (ref.match(/nativeapp\.toutiao|test\.ctfile/i)) {
		return true;
	}

	return false;
}

function is_ios() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/iphone|ipad/i)) {
		return true;
	}
	return false;
}

function wx_browser_hide() {
	$('.wx_browser_warp').hide();
}

function wx_browser_show() {
	$('.wx_browser_warp').show();
}


function mobileapp_predownload() {
	$("#doubleclick_log").attr("src", "https://doubleclick.ctfile.com/vip_log.php");
}



function changeCaptcha() {
	$("#captcha-img").attr("src", api_server + "/randcodeV2_login.php?r=" + Math.random());
}

function loadCaptcha() {
	if ($("#captcha-img:visible").length == 0) {
		$("#captcha-img").show();
		changeCaptcha();
	}
}

ctsuccess = function (content) {
	$("#toast-title").html("操作成功！");
	$("#toast-message").html(content);
	$('.toast').toast("show");
	setTimeout("checkOnclick()", 1000);
}

cterror = function (content) {
	$("#toast-title").html("操作失败！");
	$("#toast-message").html(content);
	$('.toast').toast("show");
}


function user_logout() {
	$.ajax({
		type: 'GET',
		url: api_server + "/api.php?item=account&action=logout&token=" + getTokenId(),
		dataType: 'json',
		success: function (res) {
			window.location.reload();
		},
	});
}

document.writeln("<div class=\"modal fade\" id=\"infoModal\"  tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\"></div>");
var ctmodal = "#infoModal";
var checkedIDs = new Array();



var file_id = 0;
var folder_id = 0;
var file_chk = 0;
var userid = 0;
var global_site = 0;
var passcode = "";
var api_server = "https://webapi.ctfile.com";

function page_right_register() {

	$('#register-form').ajaxForm({
		dataType: 'json',
		url: api_server + "/api.php?item=account&action=register&gb=" + global_site,
		success: function (data) {
			if (data.code == 200) {
				var ref_tag = window.location.href.indexOf("?") >= 0 ? "&" : "?";
                window.location.href = window.location.href + ref_tag + "token=" + data.token;
			}
			else {
				$("#reg-response-msg").html(data.message);
				$("#reg-response-info").show();
			}
		},
		beforeSubmit: function (arr, $form, options) {
			if ($form.find("#reg-email").val() == "") {
				$("#reg-response-msg").html("请输入邮箱地址。");
				$("#reg-response-info").show();
				return false;
			}

			if ($form.find("#reg-password").val() == "") {
				$("#reg-response-msg").html("请输入密码。");
				$("#reg-response-info").show();
				return false;
			}

			var v = $.trim($form.find("#reg-password").val());
			if (v.length < 6 || v.length > 30) {
				$("#reg-response-msg").html("密码长度为6位至30位。");
				$("#reg-response-info").show();
				return false;
			}

			if ($form.find("#reg-password").val() != $form.find("#reg-confirm-password").val()) {
				$("#reg-response-msg").html("确认密码与密码不同。");
				$("#reg-response-info").show();
				return false;
			}

			if (/^\d+$/.test(v)) {
				$("#reg-response-msg").html("密码必须包含数字和字母。");
				$("#reg-response-info").show();
				return false;
			}

			if (/^[a-z]+$/i.test(v)) {
				$("#reg-response-msg").html("密码必须包含数字和字母。");
				$("#reg-response-info").show();
				return false;
			}

			if (!/^[A-Za-z0-9]+$/.test(v)) {
				$("#reg-response-msg").html("密码只允许包含数字和字母。");
				$("#reg-response-info").show();
				return false;
			}

			if ($form.find("#reg-captcha").val() == "") {
				$("#reg-response-msg").html("请输入四位验证码。");
				$("#reg-response-info").show();
				return false;
			}
		}
	});
}
function load_file(query, path) {
	$.ajax({
		type: 'GET',
		url: api_server + "/getfile.php?path=" + path + "&f=" + query + "&passcode=" + passcode + "&token=" + getTokenId() + "&r=" + Math.random() + "&ref=" + escape(document.referrer),
		dataType: 'json',
		success: function (res) {

			file_id = res.file_id;
			file_chk = res.file_chk;
			userid = res.userid;
			global_site = res.global;

			if (res.code == 200) { //ok to login
				var file_template = "file-content.php";
				if (res.is_mb) {
					file_template = "file-content-mb.php";
				}
				$("#main-content").load(template_url + "/template/" + file_template + "?pop=" + res.popad, function () {
					document.title = res.page_title;
					rivets.bind($('.content'), { file: res });

					loadtextad();


					page_right_register();


				});

				if (res.doubleclick_url) {
					$("#doubleclick_log").attr("src", res.doubleclick_url);

				}

			} else {
				error_code_handler(res);
			}
		},
	});
}


function loadtextad(){
	$.ajax({
		type: 'GET',
		url: api_server + "/ad_display.php?ad_pos=0&r=" + Math.random(),
		dataType: 'json',
		success: function (res) {
			if (res.code == 200) {
				$("#ad_text").html(res.content);
			}
		},
	});
}

function error_code_handler(res) {
	if (res.code == 401) { //request passcode
		$("#main-content").load(template_url + "/template/file-passcode.php", function () { rivets.bind($('.container'), { file: res }); loadtextad(); });
		document.title = "请输入访问密码";
	} else {
		$("#main-content").load(template_url + "/template/file-404.php", function () { rivets.bind($('.container'), { file: res }); loadtextad(); });
		document.title = "找不到文件";
	}
}

function load_subdir(subdir_id) {
	window.location.href = window.location.pathname + "?" + subdir_id;
}

function load_dir(query, path) {
	$.ajax({
		type: 'GET',
		url: api_server + "/getdir.php?path=" + path + "&d=" + query + "&folder_id=" + window.location.search.substr(1) + "&passcode=" + passcode + "&token=" + getTokenId() + "&r=" + Math.random() + "&ref=" + escape(document.referrer),
		dataType: 'json',
		success: function (res) {

			folder_id = res.folder_id;
			file_chk = res.file_chk;
			userid = res.userid;

			if (res.code == 200) { //ok to login

				var dir_template = "dir-content.php";
				if (res.is_mb) {
					dir_template = "dir-content-mb.php";
				}

				$("#main-content").load(template_url + "/template/" + dir_template + "?" + res.popad, function () {
					document.title = res.page_title;
					rivets.bind($('.content'), { file: res });


					$('#table_files').dataTable({
						"bProcessing": false,
						"bServerSide": true,
						"bAutoWidth": false,
						"sAjaxSource": api_server + res.url,
						"responsive": false,
						//"pagingType":"simple",
						"lengthChange": res.is_mb ? false : true,
						"searching": res.is_mb ? false : true,
						"language": {
							"info": "显示 _START_ 至 _END_，总共 _TOTAL_ 个文件",
							"infoEmpty": "显示 0至 0，总共 0 个文件",
							"lengthMenu": "每页显示 _MENU_ 个文件",
							"search": "搜索：",
							"zeroRecords": "没有找到结果。",
							"paginate": {
								"first": "首页",
								"last": "末页",
								"next": "后一页",
								"previous": "前一页"
							},
						},
						"drawCallback": function () {
							if (res.is_mb) {
								$('.dataTables_paginate').addClass('d-flex justify-content-center');
							}
						},
						"pageLength": 10,
						"lengthMenu": [[10, 25, 50, 100, 200], [10, 25, 50, 100, 200]],
						"pagingType": res.is_mb ? "full" : "full_numbers",
						"aoColumns": res.is_mb ? [null, { "sClass": "text-center", "sWidth": "110px" }] : [{ "bSortable": false, "sWidth": "50px" }, null, { "sClass": "text-center", "sWidth": "110px" }, { "sClass": "text-center", "sWidth": "110px" }],
					});



					$('#table_files th input:checkbox').on('click', function () {
						var that = this;
						$(this).closest('table').find('tr > td:first-child input:checkbox').not(':disabled')
							.each(function () {
								this.checked = that.checked;
								checkOnclick();
							});

					});

					$("#table_files").delegate("tr > td:first-child input:checkbox", "click", function () {
						$(this).closest('tr').toggleClass('selected');
						checkOnclick();
					});

					$.ajax({
						type: 'GET',
						url: api_server + "/ad_display.php?ad_pos=0&r=" + Math.random(),
						dataType: 'json',
						success: function (res) {
							if (res.code == 200) {
								$("#ad_text").html(res.content);
							}
						},
					});

				});

				if (res.doubleclick_url) {
					$("#doubleclick_log").attr("src", res.doubleclick_url);

				}

			} else {
				error_code_handler(res);
			}
		},
	});
}

function load_buy_premium(is_gb, query) {
	$.ajax({
		type: 'GET',
		url: api_server + "/getpremium.php?gb=" + is_gb + "&l=" + query + "&r=" + Math.random() + "&ref=" + escape(document.referrer),
		dataType: 'json',
		success: function (res) {

			global_site = res.global;

			if (res.code == 200) {

				var buy_premium_template = "buy-premium.php";
				if (res.is_mb) {
					buy_premium_template = "buy-premium-mb.php";
				}
				$("#main-content").load(template_url + "/template/" + buy_premium_template, function () {
					document.title = res.page_title;
					rivets.bind($('.content'), { file: res });
					page_right_register();


					$.ajax({
						type: 'GET',
						url: api_server + "/ad_display.php?ad_pos=0&r=" + Math.random(),
						dataType: 'json',
						success: function (res) {
							if (res.code == 200) {
								$("#ad_text").html(res.content);
							}
						},
					});

				});

				if (res.doubleclick_url) {
					$("#doubleclick_log").attr("src", res.doubleclick_url);

				}

			} else {
				error_code_handler(res);
			}
		},
	});
}

function verify_passcode() {

	$.ajax({
		type: 'GET',
		url: api_server + "/passcode.php?file_id=" + file_id + "&folder_id=" + folder_id + "&userid=" + userid + "&passcode=" + $("#passcode").val() + "&r=" + Math.random(),
		dataType: 'json',
		success: function (res) {
			if (res.code == 200) {
				passcode = res.passcode;
				init_load();
			} else {
				error_code_handler(res);
			}
			
			loadtextad();
		},
	});
}

function init_load() {
	var path = window.location.pathname.split('/');

	if (path.length < 3) {
		$("#main-content").load(template_url + "/template/file-notfound.php");
		document.title = "找不到文件 - 城通网盘-50TB超大网盘";
	}

	if (path[1].indexOf("f") == 0) {
		load_file(path[2], path[1]);
	}

	if (path[1].indexOf("d") == 0) {
		load_dir(path[2], path[1]);
	}

	if (path[1].indexOf("premium") == 0) { //path[2] is global or not , path[3] is error code
		load_buy_premium(path[2], path[3]);
	}
}


function getTokenId(){
	
	var tokenInUrl = /token=([^&]+)/i.test(window.location.search) ? RegExp.$1 : false;
	var tokenInCookie = /token=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
   
	if (tokenInUrl && tokenInUrl != tokenInCookie)
	{
		document.cookie="token=" + tokenInUrl + ";path=/";
	}
	
    return tokenInUrl ? tokenInUrl : tokenInCookie;
}

(function () {

	$.ajaxSetup({
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
	});

	init_load();


	var copyxtlink = new ClipboardJS('#xtlink_copybtn');
	copyxtlink.on('success', function (e) {
		ctsuccess("复制成功，手动打开App后文件会自动载入。");
	});

	copyxtlink.on('error', function (e) {
		cterror("复制失败，请手动复制后打开App。");
	});

})();
