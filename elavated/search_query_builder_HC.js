/**
 * This software is the confidential and proprietary information of
 * eHarmony Inc. and may not be used, reproduced, modified, distributed,
 * publicly displayed or otherwise disclosed without the express written
 * consent of eHarmony Inc.
 *
 * This software is a work of authorship by eHarmony Inc and protected by
 * the copyright laws of the United States and foreign jurisdictions.
 *
 * Copyright 2000-2014 eharmony.com, Inc. All rights reserved.
 */
var edit_save_search_flag_hc = false;
var job_id_name_mapping = [];
var global_candidate_serach_criteria={}
var global_new_serach_criteria={}
//Variable declared for analytics
var Search_Location = 'No', Search_Position = 'No', Search_Range = 'No', Search_Includekeyword='No', Search_Excludekeyword='No', Search_Skill='No', Search_Educationlevel='No', Search_Willingtowork='No', Search_Eligibletowork='No';

/**
 * Search Builder Model
 */
var search_model_hc = {
		total: {
			R1: {
				D1: {
					v1: "Position",
					v2: "Location",
					v3: "Include Keyword",
					v4: "Exclude Keyword",
					v5: "Skills",
					v7: "Education Level"
				},
				selected_D1: "",
				text_field_value: "",
				D2: {
					vdefault: "Select",
					v1: "Great to Have",
					v2: "Nice to Have",
					v3: "Must not Have"
				},
				selected_D2: "",
				loc_flag: false,
				range_flag: false,
				education_flag: false
			}
		}
};
/**
 * New Search Builder Model
 */
var new_search_model_hc = {
		total: {
			R1: {
				D1: {
					v1: "Position",
					v2: "Location",
					v3: "Include Keyword",
					v4: "Exclude Keyword",
					v5: "Skills",
					v7: "Education Level"
				},
				selected_D1: "",
				text_field_value: "",
				D2: {
					vdefault: "Select",
					v1: "Great to Have",
					v2: "Nice to Have",
					v3: "Must not Have"
				},
				selected_D2: "",
				loc_flag: false,
				range_flag: false,
				education_flag: false
			}
		}
};
/**
 * View Edit Search Builder Model
 */
var view_edit_model_hc = {
		total: {
			R1: {
				D1: {
					v1: "Position",
					v2: "Location",
					v3: "Include Keyword",
					v4: "Exclude Keyword",
					v5: "Skills",
					v7: "Education Level"
				},
				selected_D1: "",
				text_field_value: "",
				D2: {
					vdefault: "Select",
					v1: "Great to Have",
					v2: "Nice to Have",
					v3: "Must not Have"
				},
				selected_D2: "",
				loc_flag: false,
				range_flag: false,
				education_flag: false
			}
		}
};
/**
 * Defining search_properties
 */
var search_properties = {
		search_drop_partial_id : "js-field-dropdown-",
		search_parent_class_name:"searchby-fields",
		search_mobile_parent_class_name:"searchby-fields-xs",
		search_split_id:2,
		search_initialize_count:0,
		search_parent_node_id:"current-search",
		search_parent_mobile_node_id:"current-search",
		search_model_name:search_model_hc,
		check_box_div_id:"demo2",
		mobile_check_box_id:"demo3",
		row_id:'searchby-fields-',
		id:'current',
		row_id_mobile:'searchby-fields-xs-',
		set_search_tab_values : function(tab_name){
			switch(tab_name) {
			case 'current-search':
				this.id="current";
				this.search_drop_partial_id = "js-field-dropdown-";
				this.search_parent_class_name="searchby-fields";
				this.search_mobile_parent_class_name="searchby-fields-xs";
				this.search_split_id=2;
				this.search_initialize_count=0;
				this.search_parent_node_id="current-search";
				this.search_parent_mobile_node_id="current-search";
				this.search_model_name=search_model_hc;
				this.check_box_div_id="demo2";
				this.mobile_check_box_id="demo3";
				this.row_id='searchby-fields-';
				this.row_id_mobile='searchby-fields-xs-';
				break;
			case 'new-search':
				this.id="new";
				this.search_drop_partial_id =  "js-new-field-dropdown-";
				this.search_parent_class_name="searchby-new-fields";
				this.search_mobile_parent_class_name="searchby-new-fields-xs";
				this.search_split_id=3;
				this.search_initialize_count=0;
				this.search_parent_node_id="new-search";
				this.search_parent_mobile_node_id="new-search";
				this.search_model_name=new_search_model_hc;
				this.check_box_div_id="demo-new-search";
				this.mobile_check_box_id="Div3";
				this.row_id='searchby-new-fields-';
				this.row_id_mobile='searchby-new-fields-xs-';
				break;
			case 'view-edit':
				this.id="edit";
				this.search_drop_partial_id = "js-field-dropdown-";
				this.search_parent_class_name="searchby-edit-fields";
				this.search_mobile_parent_class_name="searchby-saved-fields-xs";
				this.search_split_id=3;
				this.search_initialize_count=0;
				this.search_parent_node_id="saved-search";
				this.search_parent_mobile_node_id="saved-search";
				this.search_model_name=view_edit_model_hc;
				this.check_box_div_id="demo";
				this.mobile_check_box_id="saved";
				this.row_id='searchby-edit-fields-';
				this.row_id_mobile='searchby-saved-fields-xs-';
				break;
			}
		}

};

var search_fields_count = 1;
var input_val = '',job_id="";
var location_view_title_flag=false,job_title_view_flag=false;
var valid_zip_code = false, zip_code_error = false,job_title_flag = false,location_title_flag= false,job_title_new_flag = false,location_title_new_flag= false,position_title_flag= true;
var view_edited_visited = false;
var bRefineResultsNewSearch = false;
var search_page = "hc";

/**
 * Resize functionality
 */
window.onresize = function () {
	try{
		var ids = get_model_ids_hc();
		for (var j = 0; j < ids.length; j++) {
			select_population_function_hc(ids[j]);
			update_search_model_hc(ids[j]);
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + configuration_var.on_resize_fail + ":" + err);
	}
};
/**
 * on resize functionality
 */
$(window).on('resize',function(){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	var isIphone = ua.indexOf( 'OS' );
	if(!isAndroid && !isIphone) {
		draw_scroll();
	}
});
/**
 * on load functionality
 */
window.onload = function () {
	try{
		$("#headersearch").addClass("active-nav");
		$("#headersearch-ss").removeClass('white-styling');
	    $("#headersearch-ss").addClass("active-nav-mobile");
		populate_fields_hc(1);
	}
	catch(err){
		console.log(configuration_var.search_query_builder + configuration_var.on_load_fail + ":" + err);
	}
};

/**
 * Function for getting model id's
 */
var get_model_ids_hc = function() {
	try{
		var split_id=0;
		var class_name='';
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			if($(window).width() < 768){
				split_id = 3;
				class_name=".searchby-fields-xs";
			}
			else{
				split_id = 2;
				class_name=".searchby-fields";
			}
		} else if ($("#view-edit").css("display") === configuration_var.search_display_block||
				$("#saved-search").css("display") === configuration_var.search_display_block
				) {
			if($(window).width() < 768){
				split_id = 4;
				class_name=".searchby-saved-fields-xs";
			}
			else{
				split_id = 3;
				class_name=".searchby-edit-fields";
			}
		}
		else if ($("#new-search").css("display") === configuration_var.search_display_block) {
			if($(window).width() < 768){
				split_id = 4;
				class_name=".searchby-new-fields-xs";
			}
			else{
				split_id = 3;
				class_name=".searchby-new-fields";
			}
		}
		var get_id = [];
		for (var i = 0; i < $(class_name).length; i++) {
			var temp = $(class_name)[i];
			get_id.push($(temp).attr("id").split("-")[split_id]);
		}
		return get_id;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + configuration_var.get_model_ids_fail + ":" + err);
	}
};

/**
 * generic function for binding list
 */
var generic_hc = function(para) {
	try{
		var d1_html = '';
		$.each(para, function (key, value) {
			d1_html += '<li id="fields' + key + '"><a href="#">' + value + '</a></li>';
		});
		return d1_html;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + configuration_var.generic_fail + ":" + err);
	}
};

/**
 * Clearing fields
 */
var clear_fields_hc = function() {
	try{
		clear_error_fields();
		var parent_class_name = '';
		var split_id = 0;
		var drop_partial_id = '';
		var text = "";
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			parent_class_name = ".searchby-fields";
			split_id = 2;
			drop_partial_id = "#js-field-dropdown-";
			text = $(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text();
			if(text === configuration_var.location){
				loc_flag_element_id = null;
				location_title_flag = false;
			}
			if(text === configuration_var.position){
				var check_position_present = check_position_count(parent_class_name);
				if(!check_position_present){
					position_flag_element_id = null;
					job_title_flag = false;
				}
			}
		}
		else if($("#view-edit").css("display")===configuration_var.search_display_block){
			parent_class_name=".searchby-edit-fields";
			split_id = 3;
			drop_partial_id = "#js-field-dropdown-";
			var text = $(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text();
			if(text === configuration_var.location){
				loc_flag_element_view_id = null;
				location_view_title_flag = false;
			}
			if(text === configuration_var.position){
				var check_position_present = check_position_count(parent_class_name);
				if(!check_position_present){
					position_flag_view_id = null;
					job_title_view_flag=false;
				}
			}
		}
		else if($("#new-search").css("display")===configuration_var.search_display_block){
			parent_class_name=".searchby-new-fields";
			split_id = 3;
			drop_partial_id = "#js-new-field-dropdown-";
			var text = $(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text();
			if(text === configuration_var.location){
				loc_flag_element_new_id = null;
				location_title_new_flag = false;
			}
			if(text === configuration_var.position){
				var check_position_present = check_position_count(parent_class_name);
				if(!check_position_present){
					position_flag_element_new_id = null;
					job_title_new_flag = false;
				}
			}
		}
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text("Select");
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").addClass('clsDefaultTextColor');
		var text_box_element = $(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().find(".input-search");
		$(text_box_element).val('');
		$(text_box_element).attr("value","");
		$(text_box_element).attr("placeholder", "");
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").text("Select");
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").addClass('clsDefaultTextColor');
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").addClass('ipad-padding-left');
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent().parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find('li').removeClass('active-li');
		$(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button").attr("disabled",false);
		/*DES-6632*/
	    var imp_drop_values = '<li><a href="#" class="dropdown-li-p2">'
	        + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
	        + 'Must Have</a></li>'
	        + '<li><a href="#" class="dropdown-li-p2">'
	        + '<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
	        + 'Great to Have</a></li>'
	        + '<li><a href="#" class="dropdown-li-p2">'
	        + '<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
	        + 'Nice to Have</a></li>';
	    $(drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
		.parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find(".js-importance-dropdown").html(imp_drop_values);
	    /*DES-6632*/
		update_search_model_hc(1);
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * Function for toggling the checkbox checked
 */
var checkToggle = function(e) {
	try{
		var target = e.target;
		$(target).parent().toggleClass("jobsearch-custom-checkbox-checked");
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * Add new filter criteria
 */
var addNewFilter_hc = function() {
	try{
		clear_error_fields();
		var total_rows = 0;
		var new_row_id,new_row_class,split_id;
		var model_name=null;
		var view = "";
		var error_id="";
		var total_number_searchfields;
		var drop_partial_id = '';
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			new_row_id = "searchby-fields-";
			new_row_class="searchby-fields";
			split_id=2;
			total_rows=get_total_no_of_rows_hc();
			model_name=null;
			model_name=search_model_hc;
			view = "";
			drop_partial_id = "js-field-dropdown-";
		}
		else if($("#view-edit").css("display")===configuration_var.search_display_block){
			new_row_id = "searchby-edit-fields-";
			new_row_class="searchby-edit-fields";
			split_id=3;
			total_rows=get_total_no_of_rows_viewedit_hc();
			model_name=null;
			model_name=view_edit_model_hc;
			view = "view_edit";
			drop_partial_id = "js-field-dropdown-";
		}
		else if($("#new-search").css("display")===configuration_var.search_display_block){
			new_row_id = "searchby-new-fields-";
			new_row_class="searchby-new-fields";
			split_id=3;
			total_rows=get_total_no_of_rows_newsearch_hc();
			model_name=null;
			model_name=new_search_model_hc;
			view = "";
			drop_partial_id = "js-new-field-dropdown-";
		}
		var ids = get_model_ids_hc();
		search_fields_count =  parseInt(ids[ids.length-1])+ 1;
		var importance_id = "importance_";
		var ipad_class = get_importance_class();
		
		var new_row = '<tr class="tr-no-padding '+new_row_class+'" id="'+new_row_id + (search_fields_count) + '">'
		+'<td class="ss-name td-25-l no-border">'
		+'<div class="btn-group btn-block">'
		+'<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
		+'<span class="col-lg-12">'
		+'<span class="pull-left clsDefaultTextColor">Select</span>'
		+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
		+'</span>'
		+'</button>'
		+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields_hc(event)" role="menu" id="' +drop_partial_id + search_fields_count + '">'
		+'</ul>'
		+'</div>'
		+'</td>'
		+'<td class="td-38 no-border">'
		+ '<input type="text" class="form-control input-search" placeholder="" value="" onkeyup="add_event_listener_for_input_hc(event);">'
		+'</td>'
		+'<td class="td-25 no-border">'
		+'<div class="btn-group btn-block">'
		+'<button type="button" id="'+importance_id + (search_fields_count) + '" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
		+'<span class="col-lg-12 sqb-importance-dropdown-padding">'
		+'<span class="pull-left clsDefaultTextColor ' +ipad_class+'">'
		+'Select</span>'
		+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
		+'</span>'
		+'</button>'
		+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id + (search_fields_count) + '" onclick="add_event_listener_importance_hc(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
		+'<li><a href="#" class="dropdown-li-p2">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
		+'Must Have</a></li>'
		+'<li><a href="#" class="dropdown-li-p2">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
		+'Great to Have</a></li>'
		+'<li><a href="#" class="dropdown-li-p2">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
		+'Nice to Have</a></li>'
		+'</ul>'
		+'</div>'
		+'</td>'
		+'<td class="td-12 no-border">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter_hc(event);">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td></tr>';
		var new_row_xs = '<tr onclick = "search_row_click(event);" class="tr-no-padding no-border searchby-fields-xs" id="searchby-fields-xs-' + (search_fields_count) + '">'
		+'<td class="td-10-priority no-border">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/MustHave_Gray.svgz" class="priority-icon-mobile" width="18px" height="18px"></td>'
		+'<td class="ss-name-xs td-80-icons no-border"><small class="gray-styling"></small><br>'
		+'</td>'
		+'<td class="td-10 sbuilder-link no-border">'
		+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px" class="p-r-5" onclick="mobile_filter_click(event)"></td>'
		+'</tr>';
		model_name.total["R" + search_fields_count] = {
				D1: {
					v1: "Position",
					v2: "Location",
					v3: "Include Keyword",
					v4: "Exclude Keyword",
					v5: "Skills",
					v7: "Education Level"
				},
				selected_D1: "",
				text_field_value: "",
				D2: {
					vdefault: "Select",
					v1: "Great to Have",
					v2: "Nice to Have",
					v3: "Must not Have"
				},
				selected_D2: "",
				loc_flag: false,
				range_flag: false,
				education_flag:  false
		};
		if(view !== ""){
			total_number_searchfields = $(".searchby-edit-fields").length;
		}
		else{
			total_number_searchfields = $("."+new_row_class).length;
		}
		/*********************************** Limit number of rows to 10********************************************/
		if (total_number_searchfields < 10) {
			if (total_number_searchfields === 1) {
				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first")
				.attr("src", static_cdn_path+static_files_version+"/images/MinusCircle.svgz").attr("onclick", "deleteFilter_hc(event);");


				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first").addClass("js-delete-btn");
				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first").removeClass("js-add-btn");
				setTimeout(function(){
					$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
					.parent().find("td:nth-child(4)>img:first").removeClass("adjust-height");},100);
				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first").removeClass("js-add-btn");
				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first").css("visibility","visible");
				$("#"+drop_partial_id + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
				.parent().find("td:nth-child(4)>img:first").addClass("m-r-10");
			}
			/************************************Add new row on click of plus******************************************/
			if(("#"+new_row_id)==="#searchby-fields-"){
				$(new_row).insertAfter($("#search-by .searchby-fields:last"));
				$(new_row_xs).insertAfter($(".ss-current-search").find("table tr.searchby-fields-xs:last"));
			}
			else if(("#"+new_row_id)==="#searchby-new-fields-"){
				$(new_row).insertAfter($("#search-by-new .searchby-new-fields:last"));
			}
			else{
				$(new_row).insertAfter($(".searchby-edit-fields:last"));
			}
			$("."+new_row_class).find(".js-add-btn").remove();
			$("."+new_row_class).find(".add-new-filter").remove();
			if(total_number_searchfields < 9){
				var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td>';
				var div = $("."+new_row_class+":last").find(".js-delete-btn").parent();
				if (!(div.children().hasClass("js-add-btn"))) {
					$("."+new_row_class+":last").find(".js-delete-btn").parent().append(add_btn_html);
				}
			}
			var ids = get_model_ids_hc();
			for (var i = 0; i < ids.length; i++) {
				if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.location) {
					if($("#new-search").css("display")===configuration_var.search_display_block){
						loc_flag_element_new_id = ids[i];
					}
					else if($("#view-edit").css("display")===configuration_var.search_display_block){
						loc_flag_element_view_id = ids[i];
					}
					else{
						loc_flag_element_id = ids[i];
					}
				}
				if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.range_field) {
					if($("#new-search").css("display")===configuration_var.search_display_block){
						range_flag_element_new_id = ids[i];
					}
					else{
						range_flag_element_id = ids[i];
					}
				}
				if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.position) {
					if($("#new-search").css("display")===configuration_var.search_display_block){
						position_flag_element_new_id = ids[i];
					}
					else if($("#view-edit").css("display")===configuration_var.search_display_block){
						position_flag_view_id = ids[i];
					}
					else{
						position_flag_element_id = ids[i];
					}
				}
				if (model_name.total["R" + ids[i]].selected_D1 === "Education Level") {
					if($("#new-search").css("display")===configuration_var.search_display_block){
						education_flag_element_id = ids[i];
					}
					else{
						education_flag_element_new_id = ids[i];
					}
				}
				update_search_model_hc(ids[i]);
				disable_hc_show_results_button();
			}
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
	adjust_compatibility_button();
};
/**
 * Delete row on click of minus
 */
var deleteFilter_hc = function(e) {
	try{
		clear_error_fields();
		$('.drop-search-main44').removeClass("error-txt");
		$('.input-search').removeClass("error-txt");
		var parallel_id='';
		var drop1_value='';
		var table_id=''
			var new_row_id,new_row_class,split_id;
		var model_name='';
		var parent_id='';
		var total_rows = 0;
		var view = "";
		var drop_partial_id = '';
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			row_id = "#searchby-fields-";
			row_class=".searchby-fields";
			split_id=2;
			parent_id="#current-search";
			table_id="#search-by";
			model_name=null;
			model_name=search_model_hc;
			total_rows=get_total_no_of_rows_hc();
			view = "";
			drop_partial_id = "js-field-dropdown-";
		}
		else if($("#view-edit").css("display")===configuration_var.search_display_block){
			row_id = "#searchby-edit-fields-";
			row_class=".searchby-edit-fields";
			parent_id="#view-edit";
			table_id="#search-by-edit";
			split_id=3;
			model_name=null;
			model_name=view_edit_model_hc;
			total_rows=get_total_no_of_rows_viewedit_hc();
			view = "view_edit";
			drop_partial_id = "js-field-dropdown-";
		}
		else if($("#new-search").css("display")===configuration_var.search_display_block){
			row_id = "#searchby-new-fields-";
			row_class=".searchby-new-fields";
			parent_id="#new-search";
			split_id=3;
			table_id="#search-by-new";
			model_name=null;
			model_name=new_search_model_hc;
			total_rows=get_total_no_of_rows_newsearch_hc();
			view = "";
			drop_partial_id = "js-new-field-dropdown-";
		}
		if(view !== ""){
			total_number_searchfields = $(".searchby-edit-fields").length;
		}
		else{
			total_number_searchfields = $(row_class).length;
		}
		if (total_number_searchfields && total_number_searchfields ===1){
			return;
		}
		var parentElement = $(e.target).parent().parent(row_class);
		var parentElement_id = $(parentElement).attr("id").split("-")[split_id];
		var drop1_value = $(parentElement).find("button:first>span>span").text();
		if (drop1_value === configuration_var.location) {
			model_name.total["R" + parentElement_id].selected_D1 = "";
			if($("#new-search").css("display")===configuration_var.search_display_block){
				range_flag_element_new_id = null;
				loc_flag_element_new_id = null;
			}
			else if($("#view-edit").css("display")===configuration_var.search_display_block){
				loc_flag_element_view_id = null;
			}
			else{
				range_flag_element_id = null;
				loc_flag_element_id = null;
			}
			for (var t = 0; t < $(parentElement).siblings(row_class).length ; t++) {
				var element = $(parentElement).siblings(row_class)[t];
				if ($(element).find("button:first>span>span").text() === configuration_var.range_field){
					delete model_name.total["R" + $(element).attr("id").split("-")[2]];
					$(element).remove();
				}
			}
		}
		if (drop1_value === configuration_var.range_field) {
			model_name.total["R" + parentElement_id].selected_D1 = "";
			if($("#new-search").css("display")===configuration_var.search_display_block){
				range_flag_element_new_id = null;
			}
			else if($("#view-edit").css("display")===configuration_var.search_display_block){
				range_flag_view_id = null;
			}
			else{
				range_flag_element_id = null;
			}
		}
		if(drop1_value==="Education Level"){
			model_name.total["R" + parentElement_id].selected_D1 = "";
			if($("#new-search").css("display")===configuration_var.search_display_block){
				education_flag_element_new_id = null;
			}
			else if($("#view-edit").css("display")===configuration_var.search_display_block){
				education_flag_view_id = null;
			}
			else{
				education_flag_element_id = null;
			}
		}
		if(row_class === ".searchby-edit-fields"){
			total_rows=get_total_no_of_rows_viewedit_hc();
		}else if(row_class === ".searchby-new-fields"){
			total_rows=get_total_no_of_rows_newsearch_hc();
		}else if (row_class === ".searchby-fields"){
			total_rows=get_total_no_of_rows_hc();
		}
		if(view !== ""){
			if(total_number_searchfields > 1){
				delete  model_name.total["R" + parentElement_id];
				$("#searchby-fields-xs-" + parentElement_id).remove();
				$(parentElement).remove();
			}
		}
		else{
			if(total_rows>1){
				delete model_name.total["R" + parentElement_id];
			}
			$("#searchby-fields-xs-" + parentElement_id).remove();
			$(parentElement).remove();
		}
		if(drop1_value === configuration_var.position){
			if($("#new-search").css("display")===configuration_var.search_display_block){
				check_position(row_class,"new",parentElement_id);
			}
			else if($("#view-edit").css("display")===configuration_var.search_display_block){
				check_position(row_class,"view",parentElement_id);
			}
			else{
				check_position(row_class,"current",parentElement_id);
			}
		}
		if (drop1_value === configuration_var.location) {
			location_title_flag = false;
		}
		if ($(parent_id+ " "+row_class).length === 0) {
			var new_row = '<tr class="tr-no-padding '+row_class.split(".")[1]+ '" id="'+row_id.split("#")[1]+'1">'
			+ '<td class="ss-name td-25-l no-border">'
			+ '<div class="btn-group btn-block">'
			+ '<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
			+ '<span class="col-lg-12">'
			+ '<span class="pull-left">Select</span>'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
			+ '</span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields_hc(event)" role="menu" id="'+drop_partial_id+'1">'
			+ '</ul>'
			+ '</div>'
			+ '</td>'
			+ '<td class="td-38 no-border">'
			+ '<input type="text" class="form-control input-search" placeholder="" value="" onkeyup="add_event_listener_for_input_hc(event);">'
			+ '</td>'
			+ '<td class="td-25 no-border">'
			+ '<div class="btn-group btn-block">'
			+ '<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
			+ '<span class="col-lg-12 sqb-importance-dropdown-padding">'
			+ '<span class="pull-left">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
			+ 'Must Have</span>'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
			+ '</span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" onclick="add_event_listener_importance_hc(event);" role="menu" id="js-importance-dropdown-1">'
			+ '<li><a href="#" class="dropdown-li-p2">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
			+ 'Must Have</a></li>'
			+ '<li><a href="#" class="dropdown-li-p2">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
			+ 'Great to Have</a></li>'
			+ '<li><a href="#" class="dropdown-li-p2">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
			+ 'Nice to Have</a></li>'
			+ '</ul>'
			+ '</div>'
			+ '</td>'
			+ '<td class="td-12 no-border">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter_hc(event);">'
			+ '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td></tr>';

			model_name.total["R" + 1] = {
					D1: {
						vdefault: "Select",
						v1: "Position",
						v2: "Location",
						v3: "Include Keyword",
						v4: "Exclude Keyword",
						v5: "Skills",
						v7: "Education Level"
					},
					selected_D1: "",
					text_field_value: "",
					D2: {
						vdefault: "Select",
						v1: "Great to Have",
						v2: "Nice to Have",
						v3: "Must not Have"
					},
					selected_D2: "",
					loc_flag: false,
					range_flag: false
			};
			$(new_row).insertAfter($(table_id).find("tbody>tr:last"));
			populate_fields_hc(1);
		}
		var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td>';
		var div = $(row_class+":last").find(".js-delete-btn").parent();
		if (!(div.children().hasClass("js-add-btn"))) {
			$(row_class+":last").find(".js-delete-btn").parent().append(add_btn_html);
		}
		update_search_model_hc(i);
		disable_hc_show_results_button();
		disable_show_search_button();
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
	adjust_compatibility_button();
};

/**
 * Disable Search Button
 */
var disable_hc_show_results_button=function(){
	try{
		if(search_type !== "A"){
			if($("#view-edit").css("display") !== configuration_var.search_display_block){
				$(".show-results").addClass("disabled");
			}
			if ($("#current-search").css("display") === configuration_var.search_display_block ) {
				if(loc_flag_element_id===null  || position_flag_element_id===null  || job_title_flag === false || location_title_flag === false){
					$("#current-search .show-results").addClass("disabled");
				}
				else{
					$("#current-search .show-results").removeClass("disabled");
				}
			}
			else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
				if(location_view_title_flag===null  || position_flag_view_id===null  || job_title_view_flag === false || location_view_title_flag === false){
					$("#view-edit .show-results").addClass("disabled");
				}
				else{
					$("#view-edit .show-results").removeClass("disabled");
				}
			}
		}
		else{
			$("#current-search .show-results").removeClass("disabled");
		    //$("#view-edit .show-results").removeClass("disabled");
		    if($("#view-edit").css("display") === configuration_var.search_display_block){
		    	var saved_job_id = $(".saved-title").attr("data-savedjobid");
		    	if(saved_job_id){
		    		$("#view-edit .show-results").removeClass("disabled");
		    	}else{
		    		if(loc_flag_element_view_id===null  || position_flag_view_id===null  || job_title_view_flag === false || location_view_title_flag === false){
						$("#view-edit .show-results").addClass("disabled");
					}else{
						$("#view-edit .show-results").removeClass("disabled");
					}
		    	}
		    }
		}
		if($("#new-search").css("display")===configuration_var.search_display_block){
			if(loc_flag_element_new_id===null  || position_flag_element_new_id===null  || job_title_new_flag === false || location_title_new_flag === false){
				$("#new-search .show-results").addClass("disabled");
			}
			else{
				$("#new-search .show-results").removeClass("disabled");
			}
	    }
		
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * sort_event_listener
 */
var sort_event_listener_hc = function(e){
	try{
		var field_text = $(e.target).text();   
		var img_chev='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
		$(e.target).parent().parent().parent().find("#dLabel").html(field_text+img_chev);
		if(!jQuery.parseJSON($("#hcsearchresultsdata").val()).eligible_for_score){
			var sort_options='<li role="presentation" class="active-li"><a role="menuitem" tabindex="-1" href="#",name="D">Distance</a></li>'
				+'<li role="presentation"><a role="menuitem" tabindex="-1" href="#",name="PD">Posted Date</a></li>'
				+'<li role="presentation"><a role="menuitem" tabindex="-1" href="#",name="SF">Search Fit</a></li>';
			$(".sortby>ul").html(sort_options);
		}
		sort_search_results(field_text);
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * Search_event_listener
 */
var show_results_event_listener = function(event){
	try{
		var selected_text = $(event.target).text();
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * MOBILE SCREEN | Clear fields
 */
var clear_fields_mobile_hc = function() {
	try{
		clear_mobile_fields();
		$("#clear-fields").hide();
		var text = $(".no-m-8-top").find(".dropdown-1>span>span").text("");
		$(".no-m-8-top").find(".dropdown-1>span>span").text("Select");
		$(".no-m-8-top").find(".dropdown-1>span>span").addClass('clsDefaultTextColor');
		$(".no-m-8-top").find(".input-search-ss").val("");
		$(".no-m-8-top").find(".input-search-ss").text("");
		$(".no-m-8-top").find(".input-search-ss").attr("placeholder","");
		$(".no-m-8-top").find(".dropdown-2>span>span").text("Select");
		$(".no-m-8-top").find(".dropdown-2>span>span").addClass('clsDefaultTextColor');
		$("#importance_mobile_1>span>span").css("margin-left","0px");
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * change_place_holder_attribute
 */
var change_place_holder_attribute_hc = function(element){
	try{
		$(element).val('');
		$(element).attr("value","");
		$(element).attr("placeholder", "");
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * Get total number of rows in the model
 */
var get_total_no_of_rows_hc = function() {
	try{
		var total_rows = 0;
		for (i in search_model_hc.total) {
			if (search_model_hc.total[i]) {
				total_rows++;
			}
		}
		return total_rows;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Get total number of rows in the new search model
 */
var get_total_no_of_rows_newsearch_hc = function() {
	try{
		var total_rows = 0;
		for (i in new_search_model_hc.total) {
			if (new_search_model_hc.total[i]) {
				total_rows++;
			}
		}
		return total_rows;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Get total number of rows in view/edit model
 */
var get_total_no_of_rows_viewedit_hc = function() {
	try{
		var total_rows = 0;
		for (i in view_edit_model_hc.total) {
			if (view_edit_model_hc.total[i]) {
				total_rows++;
			}
		}
		return total_rows;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Get total number of rows on the UI
 */
var get_total_rows_on_ui = function(){
	try{
		var row_class='';
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			row_class=".searchby-fields";
		}
		else if($("#view-edit").css("display")===configuration_var.search_display_block){
			row_class=".searchby-edit-fields";
		}
		else if($("#new-search").css("display")===configuration_var.search_display_block){
			row_class=".searchby-new-fields";
		}
		return $(row_class).length;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Get total number of rows on the Small Screen UI
 */
var get_total_rows_on_ss_ui = function() {
	try{
		return $(".searchby-fields-xs").length;
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Update the model values as per the search criteria selected
 */
var update_search_model_hc = function(id) {
	try{
		var ids = get_model_ids_hc();
		var total_rows=0;
		var model_name;
		var loc_flag;
		var range_flag;
		var position_flag;
		range_flag = range_flag_element_id;
		position_flag = position_flag_element_id;
		education_flag = education_flag_element_id;
		loc_flag = loc_flag_element_id;
		if(search_properties.search_parent_node_id === "current-search"){
			total_rows= get_total_no_of_rows_hc();
			model_name=null;
			model_name=search_model_hc;
		}
		else if(search_properties.search_parent_node_id === "saved-search"){
			total_rows=get_total_no_of_rows_viewedit_hc();
			model_name=null;
			model_name=view_edit_model_hc;
			loc_flag =  loc_flag_element_view_id;
			position_flag = position_flag_view_id;
			range_flag = range_flag_view_id;
			education_flag = education_flag_view_id;
		}
		else if(search_properties.search_parent_node_id === "new-search"){
			total_rows=get_total_no_of_rows_newsearch_hc();
			model_name=null;
			model_name=new_search_model_hc;
			loc_flag =  loc_flag_element_new_id;
			range_flag = range_flag_element_new_id;
			position_flag = position_flag_element_new_id;
			education_flag = education_flag_element_new_id;
		}
		else{
			total_rows=get_total_no_of_rows_hc();
			model_name=null;
			model_name=search_model_hc;
		}
		if(loc_flag!=null || loc_flag!=undefined) {
			for (var j = 0; j < ids.length; j++) {
				if(model_name.total["R" + ids[j]].D1){
					if(ids[j] != loc_flag){
						delete model_name.total["R" + ids[j]].D1.v2;
					}
					model_name.total["R" + ids[j]].D1.v6 = configuration_var.range_field;
				}
				model_name.total["R" + loc_flag].selected_D1 = configuration_var.location;
				delete model_name.total["R" + loc_flag].D1.v6;
			}
			select_population_function_hc(loc_flag);
		}
		else {
			if ($("#current-search").css("display") === configuration_var.search_display_block) {
				loc_flag_element_id = null;
			}
			else if($("#view-edit").css("display")===configuration_var.search_display_block){
				loc_flag_element_view_id = null;
				location_view_title_flag=false;
			}
			else if($("#new-search").css("display")===configuration_var.search_display_block){
				loc_flag_element_new_id = null;
			}
			for (var j = 0; j < ids.length; j++) {
				model_name.total["R" + ids[j]].D1.v2 = configuration_var.location;
				model_name.total["R" + ids[j]].loc_flag = false;
				delete model_name.total["R" + ids[j]].D1.v6;
			}
			select_population_function_hc(null);
		}
		if (range_flag != null || range_flag != undefined) {
			for (var j = 0; j < ids.length; j++) {
				delete model_name.total["R" + ids[j]].D1.v6;
			}
			model_name.total["R" + range_flag].D1.v6 = configuration_var.range_field;
			model_name.total["R" + range_flag].selected_D1 = configuration_var.range_field;
			select_population_function_hc(range_flag);
		}
		else{
			select_population_function_hc(null);
		}
		if (education_flag!=null ||education_flag!=undefined) {
			for (var j = 0; j < ids.length; j++) {
				delete model_name.total["R" + ids[j]].D1.v7;
			}
			model_name.total["R" + education_flag].D1.v7 = "Education Level";
			model_name.total["R" + education_flag].selected_D1 = "Education Level";
			select_population_function_hc(education_flag);
		}
		else {
			for (var j = 0; j < ids.length; j++) {
				model_name.total["R" + ids[j]].D1.v7 = "Education Level";
				model_name.total["R" + ids[j]].education_flag = false;
			}
			if ($("#current-search").css("display") === configuration_var.search_display_block) {
				education_flag_element_id = null;
			}
			else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
				education_flag_view_id = null;
			}
			else if($("#new-search").css("display")===configuration_var.search_display_block){
				education_flag_element_new_id = null;
			}
			select_population_function_hc(null);
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * MOBILE SCREEN | Show fields screen on click of "Add Filter" button
 */
var show_addfilter_section_hc = function() {
	try{
		$("#myTab-HC").hide();
		$("#searchby-fields-ss-1").addClass("add-mobile-li-margin");
		$("#clear-fields").hide();
		 $("#clicked-field").val('');
		++search_fields_count;
		var ids=get_model_ids_hc();
		var total_number_searchfields;
		var model_name = null;
		var model_name = get_model_name("hc");
		populate_mobile_fields("new","","hc");
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			$("#ss-curr-search-container").removeClass("hide-filter");
			$("#ss-curr-search-container").addClass("show-filter");
		}
		else if($("#saved-search").css("display") === configuration_var.search_display_block ){
			$("#ss-saved-search").addClass("hide-filter");
			$("#ss-saved-search").removeClass("show-filter");
			$('.saved-search-fadeout').addClass('add-mobile-li-margin-save-search');
			var window_width = $(window).width();
			if(window_width < 768){
				$('#ss-saved-container').addClass("hide-filter");
				$('#ss-saved-container').removeClass("show-filter");
			}
		}
		else{
			$("#ss-new_search_container").removeClass("show-filter");
			$("#ss-new_search_container").addClass("hide-filter");
		}
		$("#searchby-fields-ss-1").removeClass("hide-filter");
		$("#searchby-fields-ss-1").addClass("show-filter");
		$(".add_filter_section").find(".apply_changes").attr("onclick", "apply_changes_hc();");
		$(".add_filter_section .dropdown-1>span>span").text("Select");
		$(".add_filter_section .dropdown-1>span>span").addClass('clsDefaultTextColor');
		$(".add_filter_section .dropdown-1>span>span").attr("style","margin-left :2px");
		$(".add_filter_section .input-search-ss").text("");
		$(".add_filter_section .input-search-ss").val("");
		$(".section_prev_to_add_filter").addClass("hide-display");
		$("#ss-curr-search-container").removeClass("show-filter");
		$("#ss-curr-search-container").addClass("hide-filter");
		$("#importance_mobile_1").attr("disabled",false);
		$(".add_filter_section").removeClass("hide-display");
		$('#searchby-fields-ss-1 img.saved_search_back').attr('src',static_cdn_path+static_files_version+'/images/chevron-o-left.svgz');
		$(".remove-filter-ss").show();
		$("#user-entered-value").attr("placeholder","");
		$(".add_filter_section").show();
		if($("#new-search").css("display") === configuration_var.search_display_block){
			total_number_searchfields = $(".searchby-new-fields-xs").length;
		}
		else{
			total_number_searchfields = $(".searchby-fields-xs").length;
		}
		$("#model_id").data('model_value',search_fields_count);
		model_name.total["R" + search_fields_count] = {
				D1: {
					vdefault: "Select",
					v1: "Position",
					v2: "Location",
					v3: "Include Keyword",
					v4: "Exclude Keyword",
					v5: "Skills",
					v7: "Education Level"
				},
				selected_D1: "",
				text_field_value: "",
				D2: {
					v1: "Great to Have",
					v2: "Nice to Have",
					v3: "Must not Have"
				},
				selected_D2: "",
				loc_flag: false,
				range_flag: false
		};
		if(total_number_searchfields > 9){
			$(".add_button").hide();
		}
		update_search_model_hc(1);
		$(".no-m-8-top").find(".dropdown-2>span>span").text("Select");
		$(".no-m-8-top").find(".dropdown-2>span>span").addClass('clsDefaultTextColor');
		$('body,html').scrollTop(0);
		$("#importance_mobile_1>span>span").css("margin-left","2px");
	    //$("#js-importance-dropdown-ss-1>li").css("margin-left","-5px");
	    $("#js-importance-dropdown-ss-1>li>a").css("padding-left","7px")
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * apply_changes
 */
var apply_changes_hc = function() {
	try{
		clear_mobile_fields();
		var model_name = null;
		var model_name = get_model_name("hc");
		var sub_class = ".ss-current-search";
		var class_name;
		var search_tab= "current";
		var search_text = $('#myTab-HC').find('li.active').find('span').text();
		if(search_text === "" && $("#saved-search").css("display") === configuration_var.search_display_block){
			search_text = "saved"
		}
		if (search_text === configuration_var.search_type_candidate || search_text === configuration_var.search_type_search) {
			sub_class = ".ss-current-search";
			class_name = "searchby-fields-xs";
			search_tab= "current";

		}
		else if (search_text === configuration_var.search_type_new) {
			sub_class = ".ss-new-search";
			class_name = "searchby-new-fields-xs";
			search_tab= "new";
		}else{
			sub_class = ".ss-saved-search";
			class_name = "searchby-saved-fields-xs";
			search_tab= "saved";
		}
		var valid_inputs = check_valid_inputs_mobile();
		var select_position = identify_select_position("."+class_name);
		if(valid_inputs){
			var proceed_changes = proceed_search();
			if(proceed_changes){
				$("#myTab-HC").show();
				if($("#saved").css("display") === "block"){
					$("#myTab-HC").hide();
				}
				$("#searchby-fields-ss-1").removeClass("add-mobile-li-margin");
				$('.saved-search-fadeout').removeClass('add-mobile-li-margin-save-search');
				if(search_tab === "current"){
					$("#current-search").show();
				}else{
					$("#new-search").show();
				}
				var id = $("#model_id").data('model_value');
				var class_id = class_name+"-"+id
				show_search_filters_hc("apply changes");
				var drop1_value = $(".add_filter_section .dropdown-1>span>span").text();
				if(select_position && drop1_value === "Position"){/*
					delete model_name.total["R" + id];
					var clicked_row_id = $("#clicked-field").val();
					$("#" + clicked_row_id).find("td:nth-child(2)").html('<small class="gray-styling">' + $(".add_filter_section").find(".dropdown-1>span>span").text() + '</small><br>'+$(".input-search-ss").val());
					var image_src = $(".add_filter_section").find(".dropdown-2>span>span>img").attr("src");
					image_src = image_src.replace("White","Gray");
					$(".add_filter_section").find(".dropdown-2>span>span>img").attr("src",image_src);
					$("#" + clicked_row_id).find("td:first").html($(".add_filter_section").find(".dropdown-2>span>span>img"));
					$("#"+clicked_row_id).find('.select_style_padding').removeClass('select_style_padding');
					return;
				*/}
				var new_search_filter_xs = '<tr onclick = "search_row_click(event);" class="tr-no-padding no-border '+class_name+'" id="'+class_id+'">'
				+'<td class="td-10-priority no-border">'
				+ '<img src="' + $(".add_filter_section .dropdown-2>span>span>img").attr("src").replace("White", "Gray") + '" class="priority-icon-mobile" width="18px" height="18px"></td>'
				+'<td class="ss-name-xs td-80-icons no-border"><small class="gray-styling">'+drop1_value+'</small><br>'
				+ $(".add_filter_section .input-search-ss").val()+'</td>'
				+'<td class="td-10 sbuilder-link no-border">'
				+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px" class="p-r-5" onclick="mobile_filter_click(event)"></td>'
				+'</tr>';
				var mob_length = $(sub_class).find("table tr."+class_name+":last");
				if(mob_length !== undefined && mob_length !== null && mob_length.length !==0){
					$(new_search_filter_xs).insertAfter($(".demo3 "+sub_class +" ."+class_name+":last"));
				}
				else{
					$(new_search_filter_xs).insertBefore($(".demo3 "+sub_class ).find("table tr:first"));
				}
				//$(new_search_filter_xs).insertAfter($(".demo3 "+sub_class +" ."+class_name+":last"));
				$("."+class_name+":last button:first>span>span").text(drop1_value);
				$("."+class_name+":last .input-search").val($(".add_filter_section .input-search-ss").val());
				$("."+class_name+":last td:nth-child(3) span").html($(".add_filter_section .dropdown-2>span").html().trim());
				var total_number_searchfields = $("."+class_name).length;
				if(search_tab === "current"){
					if(total_number_searchfields >0){
						//$('.line-shade11-custom').removeClass('hidden'); 
						$(".ss-current-search").removeClass('no-padding-class');
					}
					if(total_number_searchfields === 10) {
						$(".add_button").hide();
					} else {
						$(".add_button").show();
					}
				}else if(search_tab === "saved"){
					if(total_number_searchfields >0){
	    				//$('.line-shade11-custom').removeClass('hidden'); 
	    				$("#saved").removeClass("no-padding-class")
	    			}
					if(total_number_searchfields === 10) {
						$(".view-add-btn").hide();
					} else {
						$(".view-add-btn").show();
					}
				}else{
					if(total_number_searchfields === 10) {
						$(".new-add-btn").hide();
					} else {
						$(".new-add-btn").show();
					}
				}
				var create_row_no = 'R' + id;

				model_name.total["R" + id].selected_D1 = drop1_value;
				if (drop1_value === configuration_var.location) {
					model_name.total[create_row_no].loc_flag = true;
					if(class_name === "searchby-fields-xs"){
						location_title_flag = true;
					}
					else if(class_name = "searchby-saved-fields-xs"){
						location_view_title_flag = true;
					}
					else{
						location_title_new_flag = true;
					}
				}
				else if (drop1_value === configuration_var.position) {
					if(class_name === "searchby-fields-xs"){
						check_position("."+class_name,"current",id);          
					}
					else if(class_name == "searchby-saved-fields-xs"){
						check_position("."+class_name,"saved",id)
					}
					else{
						check_position("."+class_name,"new",id);
					}
				}
				else if (drop1_value === configuration_var.range_field) {
					model_name.total[create_row_no].range_flag = true;
				}
				fields_present(model_name,"hc");
			}
		}
		else{
			check_display(configuration_var.search_general);
		}
		disable_show_search_button();
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Toggle tabs container visibilty based on selection (both screens)
 */
var show_jobs_container_hc = function() {
	try{
		$("#new-search-li span").css("color","#a7a9ac");
		$("#current-search").show();
		$("#current-search").removeClass("hide-filter");
		$("#current-search").addClass("show-filter");
		$("#current-search").addClass("in");
		$("#current-search").addClass("active");
		$("#demo2").show();
		$("#demo").hide();
		$("#demo-new-search").hide();
		$("#saved-search").hide();
		$("#new-search").hide();
		$("#view-edit").hide();
		/*$("#current-search").removeClass("hide-filter");
		$("#current-search").addClass("show-filter");*/
		set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
		analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.tab_click, gtm_event_label.automated_search_from_builder, "HIRING COMPANY", get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));//fix for DES-4583
		disable_hc_show_results_button();
		search_properties.set_search_tab_values('current-search');
		$('#current-search .refine-results').addClass("collapsed");
		$('#ss-curr-search-container .refine-results').addClass("collapsed");
		$('#current-search * .sqb-line-shade').css('display','none');
		var msg_text = $("#"+search_properties.search_parent_node_id+" .long-text2:first").html();
		var window_width = $(window).width();
		var ls_display = $("#ls-curr-search").css("display");
		if(ls_display === "block"){
			 window_width = 769;
		 }
		if(isMobile.any() && $(window).width() < 768){
			msg_text = $("#"+search_properties.search_parent_node_id+" .long-text3:first").html();
		}
		if( msg_text === ""){
			populate_fields_hc();//For binding the dropdown
		}
		if(window_width > 768){
			var drop_down_class = ".joblistings";
		}else{
			drop_down_class = ".mob-joblistings-mob";
		}
		if(($(drop_down_class).css("display") === configuration_var.search_display_block || $(drop_down_class).css("display") === "inline-block")){
			if( msg_text === ""){
			   $("#"+search_properties.search_parent_node_id+" .long-text2:first").html("0 Candidates for");
			   $("#"+search_properties.search_parent_node_id+" .long-text3:first").html("0 Candidates for");
			}
			$("#current-search .long-text2:first").parent().removeClass("col-sm-6").addClass("col-sm-3");
		}
		else{
			if( msg_text === ""){
				$("#"+search_properties.search_parent_node_id+" .long-text2:first").html(configuration_var.custom_message_top);
				$("#"+search_properties.search_parent_node_id+" .long-text3:first").html(configuration_var.custom_message_top);
			}
			$("#current-search .long-text2:first").parent().removeClass("col-sm-3").addClass("col-sm-6");
		}
		if( msg_text !== configuration_var.custom_message_top){
			$("#current-search").find(".refine-results").removeClass("hidden");
		}else{
			$('#current-search * .sqb-line-shade').css('display','block');
		}
		
		if(isMobile.any() && $(window).width() < 768){
			if(($(".mob-joblistings").css("display") === configuration_var.search_display_block || $(".mob-joblistings").css("display") === "inline-block")){
				if(msg_text === undefined || msg_text === null || msg_text === ""){
					$("#"+search_properties.search_parent_node_id+" .long-text3:first").html("0 Candidates for");
				}
			}else{
				if( msg_text === ""){
					$("#"+search_properties.search_parent_node_id+" .long-text2:first").html(configuration_var.custom_message_top);
				}
			}
			if($("#demo3").css("display") === "block"){
				if( msg_text !== configuration_var.custom_message_top){
					$("#current-search .collapse").toggle();
				}
			}
			var total_rows = $(".searchby-fields-xs").length;
			if(total_rows){
				var colums = $(".searchby-fields-xs td").length;
				if(colums === 0){
					$(".searchby-fields-xs").remove();
				}
			}
		}
		else{
			if( msg_text !== configuration_var.custom_message_top){
				$("#current-search .collapse").toggle();
			}
		}		
		setTimeout(function(){
			enable_disable_dropdown();
			if($(window).width() > 768){
			   fnRefineResultImageBinding_hc("#demo2");	
			}
		},600);
		
		if(window_width < 768){  
			$("#ss-curr-search-container").addClass("show-filter");
			$("#mob-row").show();
			fnRefineResultImageBinding_hc("#demo3");
			$('#demo3').css( "height", "auto"); 
			//$('.line-shade11-custom').addClass('hidden');
			if( msg_text === configuration_var.custom_message_top){
				$('.line-shade11-custom').removeClass('hidden'); 
			}else{
				$('.line-shade11-custom').addClass('hidden');
			}
		}
		else{
	    	$("#ss-curr-search-container").removeClass("show-filter");
	    	$("#ss-curr-search-container").addClass("hide-filter");
	    }
		if($("#myTab-HC >li").length === 2){
			$("#current-search #curr-refine_results").parent().removeClass("col-sm-5");
			$("#current-search #curr-refine_results").parent().addClass("col-sm-6");
		}else{
			$("#current-search #curr-refine_results").parent().addClass("col-sm-5");
			$("#current-search #curr-refine_results").parent().removeClass("col-sm-6");
		}
		if(isMobile.any() && window_width < 768){
			var parent_class = search_properties.search_parent_mobile_node_id;
			var img_src = $("#refine-results-id").find('.refine-arrow').attr("src");//$("#"+parent_class).find('.refine-arrow').attr("src");
			var dd_display = $('#ss-curr-search-container .mob-joblistings').css("display");
			if(dd_display === "block"){
				if(img_src.indexOf("Down")>-1){
					$("#current-search #mob-row").addClass("apply-cs-margin-btm-minus");

				}else{
					$("#current-search #mob-row").removeClass("apply-cs-margin-btm-minus");	
				}
			}else{
				if(img_src.indexOf("Down")>-1){
					$("#current-search #mob-row").addClass("apply-mobrow-margin-btm-minus");
					$("#current-search .margin-hc-refine-result").addClass("apply-cs-margin-top");

				}else{
					$("#current-search #mob-row").removeClass("apply-cs-margin-top");	
					$("#current-search .margin-hc-refine-result").removeClass("apply-cs-margin-top");	
				}
			}
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
	adjust_compatibility_button();
	if(window_width > 767){
		$("#current-search").removeClass("hide-filter");
		$("#current-search").addClass("show-filter");
	}else{
		setTimeout(function(){
			$("#current-search").removeClass("hide-filter");
			$("#current-search").addClass("show-filter");
		},10);
	}
	if(global_candidate_serach_criteria && search_type==='A'){	
		if(global_candidate_serach_criteria.job_id){
			drp_job_id=global_candidate_serach_criteria.job_id;
		}
		$('#spinner-results').show();
		$('#banner').removeClass('show');
		$('#banner').addClass('hide');
		/*if(global_candidate_serach_criteria && global_candidate_serach_criteria.search_values && global_candidate_serach_criteria.search_values.search_id){
			unsaved_search_hc(global_candidate_serach_criteria.search_values);
		}
		else */
		if(global_candidate_serach_criteria.search_json && global_candidate_serach_criteria.search_json!==undefined && global_candidate_serach_criteria.search_json.criteria !==undefined ){
			if(global_candidate_serach_criteria.search_json.job_id===undefined){
				global_candidate_serach_criteria.search_json.job_id=drp_job_id;
			}
			unsaved_search_hc(global_candidate_serach_criteria.search_json);
		}
		else if(global_candidate_serach_criteria.job_id && global_candidate_serach_criteria.job_id!==null){
			search_results_jobid(global_candidate_serach_criteria.job_id);
		}
		else if(global_candidate_serach_criteria.initial_job_id){
			search_results_jobid(global_candidate_serach_criteria.initial_job_id);
		}
		else{
			$('#spinner-results').hide();
			$('#banner').removeClass('hide');
			$('#banner').addClass('show');
			$('#searchresults').html("");
			$('#btn-load-more').removeClass('show');
		}
		
		
	}
	
	
};
var show_saved_jobs_container_hc = function(){
	$("#new-search-li span").css("color","#a7a9ac");
	var window_width = $(window).width();
	var ls_display = $("#ls-saved-search").css("display");
	if(ls_display === "block"){
		 window_width = 769;
	 }
	$("#saved-search").show();
	$("#current-search").hide();
	$("#new-search").hide();
	$("#searchby-fields-ss-1").removeClass("show-filter");
	$("#searchby-fields-ss-1").addClass("hide-filter");
	$("#current-search").removeClass("show-filter");
	$("#current-search").addClass("hide-filter");
	$(".searchby-edit-fields tbody").html("");
	search_properties.set_search_tab_values('view-edit');
	$("#ss-saved-search").addClass("show-filter");
	$("#ss-saved-search").removeClass("hide-filter");			
	fnRefineResultImageBinding_hc("#saved");
	$('#saved').css( "height", "auto"); 
	$('.line-shade11-custom-saved').removeClass('hidden');
	$("#ss-saved-search").addClass("show-filter");
	$("#ss-saved-search").removeClass("hide-filter");  
	$(".saved-search-container-mob").removeClass("show-filter");
	$(".saved-search-container-mob").addClass("hide-filter");  
	//var window_width = $(window).width();
	if(window_width < 768){
		$('#ss-saved-container').removeClass("hide-filter");
		$('#ss-saved-container').addClass("show-filter");
		$("#saved-search tr.no-border-li").attr('style',"border-bottom: none !important;");
		$('#saved-search table tr>td').css("overflow","visible");
	}
}
/**
 * show_saved_search_container
 */
var show_saved_search_container_hc=function() {
	try{
		$("#new-search-li span").css("color","#a7a9ac");
		view_edited_visited = true;
		$("#saved-search").show();
		$("#current-search").hide();
		$("#new-search").hide();
		$("#view-edit").hide();
		$('#search_selected_id').val('');
		var window_width = $(window).width();
		var ls_display = $("#ls-saved-search").css("display");
		if(ls_display === "block"){
			window_width = 769;
		}
		$('.saved-search-container-mob').addClass("hide-filter");
		$('.saved-search-container-mob').removeClass("show-filter");
		$("#ss-saved-container").addClass('hide-filter');
		$("#ss-saved-container").removeClass('show-filter');
		if(window_width < 768){
			if($("#saved-search-table-mob tr")){
			  var saved_search_length =	$("#saved-search-table-mob tr").length;
			  if(saved_search_length && saved_search_length >1){
				  $(".mygrid-wrapper-div-xs").css("overflow","auto")
			  }else{
				  $(".mygrid-wrapper-div-xs").css("overflow","hidden")
			  }
			}else{
				$(".mygrid-wrapper-div-xs").css("overflow","auto")
			}
			$('#ss-saved-container').addClass("hide-filter");
			$('#ss-saved-container').removeClass("show-filter");
			$('.saved-search-container-mob').removeClass("hide-filter");
			$('.saved-search-container-mob').addClass("show-filter");
			$('#saved-search table tr>td').css("overflow","hidden");
		}
		
		$("#searchby-fields-ss-1").removeClass("show-filter");
		$("#searchby-fields-ss-1").addClass("hide-filter");
		$("#current-search").removeClass("show-filter");
		$("#current-search").addClass("hide-filter");
		$(".searchby-edit-fields tbody").html("");
		$("#demo2").removeClass("in");
		search_properties.set_search_tab_values('view-edit');		
		var search_name_details = jQuery.parseJSON($("#hcsearchresultsdata").val());
		if ((search_name_details !== undefined && search_name_details !== null &&
				search_name_details.search_names !== undefined && search_name_details.search_names !== null &&
				search_name_details.search_names.length === 0
				&& $("#saved-search").find(".container:first table tbody").is(":empty")
				&& $("#saved-search .lg-savedsearch table tbody:nth-child(2)").is(":empty")) && search_name_details.search_names===""){
			$("#saved-search .container").html('');
			$("#saved-search .container").append('<h3 class="long-text2">You haven\'t created any saved searches yet</h3>');
			//For mobile
/*			$("#saved-search .mygrid-wrapper-div-xs>h3").html("");
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2">You haven\'t created any saved searches yet</h3>');*/
			/*$("#saved-search .mygrid-wrapper-div-xs>h3").html("");
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2">You haven\'t created any saved searches yet</h3>');*/
			$("#saved-search .mygrid-wrapper-div-xs>h3").remove();
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2 mob-apply-margin">You haven\'t created any saved searches yet</h3>');
		}
		else{
			var value =  $("#saved-search .container>h3").html();
			if(value === null){
				$("#saved-search .container>h3").html("");
			}
			if($("#saved-search .lg-savedsearch table tbody:first").is(":empty")){
				$("#saved-search .lg-savedsearch table tbody:first").remove();
			}
		}
		if(($("#saved-search .lg-savedsearch table tbody").find('tr').length === 1)) {
			$("#saved-search tr").attr('style',"border-bottom: 0px solid #444 !important;");
		} else {
			$("#saved-search tr").attr('style',"border-bottom: 1px solid #444 !important;");
		}
		if($("#saved-search .lg-savedsearch table tbody").find('tr').length >0){
			$("#saved-search-table tr:last").css("cssText","border-bottom:none !important")
		}
		if($("#saved-search-table-mob").find('tr').length > 0){
			$("#saved-search-table-mob tr:last").css("cssText","border-bottom:none !important")
		}
		if(($("#saved-search-table tbody").find('tr').length === 0)) {
			//For mobile
/*			$("#saved-search .mygrid-wrapper-div-xs>h3").html("");
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2">You haven\'t created any saved searches yet</h3>');*/
			/*$("#saved-search .mygrid-wrapper-div-xs>h3").html("");
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2">You haven\'t created any saved searches yet</h3>');*/
			$("#saved-search .mygrid-wrapper-div-xs>h3").remove();
			$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2 mob-apply-margin">You haven\'t created any saved searches yet</h3>');
		}
		var saved_search_rows = $("#saved-search-table tr").length;
		if(saved_search_rows !== undefined && saved_search_rows > 6){
			draw_scroll();
		}
		$("#ss-saved-search").removeClass("show-filter");
		$("#ss-saved-search").addClass("hide-filter");
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
	 adjust_compatibility_button();
};

/**
 * show_new_search_container
 */
var show_new_search_container = function() {
	try{
		$("#new-search-li span").css("color","#ffffff");
		var window_width = $(window).width();
		var ls_display = $("#ls-new-search").css("display");
		if(ls_display === "block"){
			 window_width = 769;
		 }
		$("#new-search").show();
		$("#saved-search").hide();
		$("#current-search").hide();
		$("#current-search").removeClass("show-filter");
		$("#current-search").addClass("hide-filter");
		$("#view-edit").hide();
		$("#demo").hide();
		$("#demo2").hide();
		$("#demo-new-search").show();
		$("#demo3").hide();
		$("#Div3").show();    
		$("#demo2").removeClass("in");			
		if($("#new-search .long-text2:first").text() != configuration_var.custom_message_top){
			$(".collapse:not('.navbar-collapse,#user-links')").toggle();
		}
		set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
		analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.tab_click, gtm_event_label.new_search_from_builder, "HIRING COMPANY", get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8)); //fix for DES-4583
		disable_hc_show_results_button();
		search_properties.set_search_tab_values('new-search');
		fnRefineResultImageBinding_hc("#demo-new-search");
		fnRefineResultImageBinding_hc("#Div3");
		//comented the foll lines for DES-5451
		if(isMobile.any() && $(window).width() < 768){
			if($("#new-search .long-text3:first").text() != configuration_var.custom_message_top){				
				$("#Div3").hide(); 
				$('.line-shade11-custom-new').addClass('hidden');
			}			
		}		
		
		/*else{
			$("#new-search .collapse").toggle();
		}	*/	
		$('#new-search .refine-results').addClass("collapsed");
		$('#new-search * .sqb-line-shade').css('display','none');		
		if(window_width < 768){  
			$("#ss-new_search_container").addClass("show-filter");
			$("#mob-refine").show();
			$("#mob-h3-text").show();
			$("#Div3").addClass("new-search-demo");
			$("#A1").show();
			$("#demo-new-search").hide();
			fnRefineResultImageBinding_hc("#Div3");			
		}
		else{
	    	$("#ss-new_search_container").removeClass("show-filter");
	    	$("#ss-new_search_container").addClass("hide-filter");
	    }
		disable_show_search_button();
		if($("#new-search .long-text2:first").text() === configuration_var.custom_message_top){
			$("#new-search .sqb-line-shade").removeAttr('style');
			$('.line-shade11-custom-new').removeClass('hidden'); 
		}
		if(search_type==="A"){
			/*if(global_new_serach_criteria && global_new_serach_criteria.search_values && global_new_serach_criteria.search_values.search_id){
				$('#spinner-results').show();
				$('#banner').removeClass('show');
				$('#banner').addClass('hide');
				unsaved_search_hc(global_new_serach_criteria.search_values);
			}
			else */
			if(global_new_serach_criteria && global_new_serach_criteria.search_json && global_new_serach_criteria.search_json!==undefined && global_new_serach_criteria.search_json.criteria !==undefined ){
				$('#spinner-results').show();
				$('#banner').removeClass('show');
				$('#banner').addClass('hide');
				unsaved_search_hc(global_new_serach_criteria.search_json);
			}
			else{
					$('#spinner-results').hide();
					$('#banner').removeClass('hide');
					$('#banner').addClass('show');
					$('#searchresults').html("");
					$('#btn-load-more').removeClass('show');
			}
		}
		
		
		
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
	 adjust_compatibility_button();
	 
};

/**
 * show_view_edit_container
 */
var show_view_edit_container_hc = function(search_id) {
	try{
		var job_id_saved = $('#'+search_id).data('info');
		//$('#btn-load-more').hide();
		//$('#btn-load-more').removeClass('show');
		//$('#btn-load-more').addClass('hide');
		search_fields_count=0;
		//$('.sortby_hc').removeClass("show");
		//$('.sortby_hc').addClass("hide");
		loc_flag_element_view_id = null;
		position_flag_view_id = null;
		location_view_title_flag=false;
		job_title_view_flag=false;
		$.ajax({
			url:"/search/criteria/"+search_id,
			type: "GET",
			dataType: "json",
			success:function(data){
				search_name = $("#"+search_id).text();
				$(".lead-search").html(search_name);
				$(".lead-search").attr("data-id",search_id);
				$(".lead-search").attr("data-savedjobid",job_id_saved);
				$("#search-id").html(search_id);
				$("#new-search").hide();
				$("#saved-search").hide();
				$("#current-search").hide();
				$("#demo").show();
				$("#view-edit").show();
				$("#demo-new-search").hide()
				$("#demo2").hide()
				$('#myModal').modal('hide');
				//$('#searchresults').html("");
				$("#demo").addClass("in");
				clear_error_fields();	
				$('#view-edit* .sqb-line-shade').css('display','none');	
				$('#view-edit* .sqb-line-shade').removeAttr('style'); 	
				/****************** Pre Population************************/
				var new_row,new_row_xs;
				$("#view-edit .searchby-edit-fields:not(:first)").remove();
				if(data.criteria.categories && data.criteria.categories.length){
					for(var i=0;i<data.criteria.categories.length;i++){
						var placeholder_text = get_placeholder_text(data.criteria.categories[i].name);
						++search_fields_count;
						var importance_id = "importance_"+search_fields_count;
						if(data.criteria.categories[i].name === configuration_var.location){
							loc_flag_element_view_id = search_fields_count;
							location_view_title_flag=true;
						}
						if(data.criteria.categories[i].name === configuration_var.position){
							position_flag_view_id = search_fields_count;
							job_title_view_flag=true;
						}
						if(data.criteria.categories[i].name === "Education Level"){
							education_flag_view_id = search_fields_count;
						}
						new_row = '<tr class="tr-no-padding searchby-edit-fields" id="searchby-edit-fields-' + (search_fields_count) + '">'
						+'<td class="ss-name td-25-l no-border">'
						+'<div class="btn-group btn-block">'
						+'<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
						+'<span class="col-lg-12">'
						+'<span class="pull-left">'+data.criteria.categories[i].name+'</span>'
						+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
						+'</span>'
						+'</button>'
						+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields_hc(event)" role="menu" id="js-field-dropdown-' + search_fields_count + '">'
						+'</ul>'
						+'</div>'
						+'</td>'
						+'<td class="td-38 no-border">'
						+ '<input type="text" class="form-control input-search" placeholder="'+placeholder_text+'" value="'+data.criteria.categories[i].value+'" onkeyup="add_event_listener_for_input_hc(event);">'
						+'</td>'
						+'<td class="td-25 no-border">'
						+'<div class="btn-group btn-block">'
						+'<button id="'+importance_id+'" type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
						+'<span class="col-lg-12 sqb-importance-dropdown-padding">'
						+'<span class="pull-left">';
						if(data.criteria.categories[i].importance==="1"){
							new_row+='<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">Must Have</span>';
						}
						else if(data.criteria.categories[i].importance==="2"){
							new_row+='<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">Great to Have</span>';
						}
						else{
							new_row+='<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">Nice to Have</span>';
						}
						new_row+='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
						+'</button>'
						+ '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id+'" onclick="add_event_listener_importance_hc(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
						+'<li><a href="#" class="dropdown-li-p2">'
						+'<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
						+'Must Have</a></li>'
						+'<li><a href="#" class="dropdown-li-p2">'
						+'<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
						+'Great to Have</a></li>'
						+'<li><a href="#" class="dropdown-li-p2">'
						+'<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
						+'Nice to Have</a></li>'
						+'</ul>'
						+'</div>'
						+'</td>'
						+'<td class="td-12 no-border">'
						+'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter_hc(event);">'
						+'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td></tr>';
						if(search_fields_count === 1){
							view_edit_model_hc.total={};
						}
						view_edit_model_hc.total["R" + search_fields_count] = {
								D1: {
									v1: "Position",
									v2: "Location",
									v3: "Include Keyword",
									v4: "Exclude Keyword",
									v5: "Skills",
									v7: "Education Level"
								},
								selected_D1: "",
								text_field_value: "",
								D2: {
									vdefault: "Select",
									v1: "Great to Have",
									v2: "Nice to Have",
									v3: "Must not Have"
								},
								selected_D2: "",
								loc_flag: false,
								range_flag: false
						};
						$(new_row).insertAfter($(".searchby-edit-fields:last"));
						view_edit_model_hc.total["R"+search_fields_count].selected_D1=data.criteria.categories[i].name;
						/*if (data.criteria.categories[i].name === configuration_var.keyword_phase_to_exclude) {
						$("#"+search_properties.search_parent_node_id).find('#'+importance_id).attr('disabled', 'disabled');
					}*/
					}
				}else{
					var new_ve_row = populate_view_edit_base_row();
					view_edit_model_hc.total = {};
					view_edit_model_hc.total["R" + search_fields_count] = {
							D1: {
								v1: "Position",
								v2: "Location",
								v3: "Include Keyword",
								v4: "Exclude Keyword",
								v5: "Skills",
								v7: "Education Level"
							},
							selected_D1: "",
							text_field_value: "",
							D2: {
								vdefault: "Select",
								v1: "Great to Have",
								v2: "Nice to Have",
								v3: "Must not Have"
							},
							selected_D2: "",
							loc_flag: false,
							range_flag: false
					};
					$(new_ve_row).insertAfter($(".searchby-edit-fields:last"));
				}
				if(data.criteria.eligible_to_work===true){
					$("#view-edit input[type=checkbox]:last").prop("checked", true);
				}
				else {
					$("#view-edit input[type=checkbox]:last").prop("checked", false);
				}
				if(data.criteria.willing_to_travel===true){
					$("#view-edit input[type=checkbox]:first").prop("checked", true);
				}
				else {
					$("#view-edit input[type=checkbox]:first").prop("checked", false);
				}
				/*if(data.criteria.categories.length === 0){
					populate_fields_hc();
				}*/
				$(".searchby-edit-fields:first").remove();
				var total_number_searchfields = $(".searchby-edit-fields").length;
				var ids=get_model_ids_hc();
				for (var i = 0; i < ids.length; i++) {
					if (view_edit_model_hc.total["R" + ids[i]].selected_D1 === configuration_var.location) {
						loc_flag_element_view_id = ids[i];
					}
					if (view_edit_model_hc.total["R" + ids[i]].selected_D1 === configuration_var.range_field) {
						range_flag_view_id = ids[i];
					}
				}
				/*********************************** Limit number of rows to 10********************************************/
				if (total_number_searchfields <= 10) {
					$(".searchby-edit-fields td:nth-child(4)>img:nth-child(2)").remove();
					var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter_hc();"></td>';
					var div = $(".searchby-edit-fields:last").find(".js-delete-btn").parent();
					if (!(div.children().hasClass("js-add-btn"))) {
						if(total_number_searchfields !== 10){
							$(".searchby-edit-fields:last").find(".js-delete-btn").parent().append(add_btn_html);
						}
					}
					update_search_model_hc(1);
				}
				var is_collapsed = $("#demo").hasClass("collapse in");
				if(is_collapsed){
					$("#view-edit .sqb-line-shade").css("display","block");
				}else{
					$("#view-edit .sqb-line-shade").css("display","none");
				}
				$("#view-edit .show-results").removeClass("disabled");
				fnRefineResultImageBinding_hc("#demo");
				
			},
			async: true,
			error: function(jqXHR, exception) {
				handle_errors(jqXHR.status, exception, jqXHR.responseText);
			}
		});
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * MOBILE SCREEN | Show previous screen with "Add Filter" button on click of "Back" button
 */
var show_search_filters_hc = function(apply_changes) {
	try{
		clear_mobile_fields();
		var model_name = null;
		var model_name = get_model_name("hc");
		$(".add_filter_section").addClass("hide-display");
		$(".section_prev_to_add_filter").removeClass("hide-display");
		$("#searchby-fields-ss-1").removeClass("show-filter");
		$("#searchby-fields-ss-1").addClass("hide-filter");
		var search_tab = "current";
		var search_text = $('#myTab-HC').find('li.active').find('span').text();
		if (search_text === configuration_var.search_type_candidate || search_text === configuration_var.search_type_search) {
			$("#ss-curr-search-container").removeClass("hide-filter");
			$("#ss-curr-search-container").addClass("show-filter");
			search_tab = "current";
		}
		else if (search_text === configuration_var.search_type_new) {
			$("#ss-new_search_container").removeClass("hide-filter");
			$("#ss-new_search_container").addClass("show-filter");
			search_tab = "new";
		}
		else{
			//show_saved_search_container_hc();
			search_tab = "saved";
			show_saved_jobs_container_hc();
		}
		$(".section_prev_to_add_filter").show();
		$(".demo3").addClass("collapse in");
		var id = $("#model_id").data('model_value');
		if(search_tab === "saved"){
			$('#myTab-HC').hide();
		}else{
			$('#myTab-HC').show();
		}
		if(apply_changes === "back"){
			$("#user-entered-value").attr("value","");
			$("#user-entered-value").val('');
			$("#myTab-HC").show();
	    	$("#searchby-fields-ss-1").removeClass("add-mobile-li-margin");
	    	$('.saved-search-fadeout').removeClass('add-mobile-li-margin-save-search');
			delete_from_back(id,model_name);
			if(search_tab === "current"){
				$('#myTab-HC').show();
				$("#current-search").show();
			}else if(search_tab === "new"){
				$("#new-search").show();
				$('#myTab-HC').show();
			}
			if(search_tab === "saved"){
		    	  $('#myTab-HC').hide();
		    	  $("#ss-saved-container").removeClass("hide-filter");
		    	  $("#ss-saved-container").addClass("show-filter");
		      }
			
		}
		$(".apply_changes").unbind();
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};





/**
 * save_search_name
 */
var save_search_name_hc = function(){
	try{
		$("#error").html('');
		$("#SearchName").css("cssText", "border: none !important");
		save_search_hc("POST",$("#SearchName").val(),true,null);
		set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
		if ($("#saved-search-li").hasClass('active')){//fix for DES-4601
			analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.save_new_search, gtm_event_label.save_new_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
		}else if ($("#current-search-li").hasClass('active')){//fix for DES-4601
			analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.save_search, gtm_event_label.save_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
		}

	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * edit_save_search
 */
var edit_save_search_hc = function(){
	try{
		clear_error_fields();
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			field_class = ".searchby-fields";
		}
		else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
			edit_save_search_flag_hc = true;
			$('#spinner-results').show();
			field_class = ".searchby-edit-fields";
		}
		else if ($("#new-search").css("display") === configuration_var.search_display_block) {
			field_class = ".searchby-new-fields";
		}
		var is_automated = identify_automated_search();
	    if(is_automated){
	    	save_search_hc("PUT",$(".lead-search").text(),false, $(".lead-search").attr("data-id"));
	    	return;
	    }
		var valid = dispaly_errormessage(field_class);
		if(!valid){
			save_search_hc("PUT",$(".lead-search").text(),false, $(".lead-search").attr("data-id"));
			set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
			analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.save_search, gtm_event_label.save_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));

		}
		else{
			$('#spinner-results').hide();
			check_display(configuration_var.search_general);
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * show_save_error
 */
var show_save_error_hc = function(message){
	try{
		if($("#myModal22 #modal-error-display")){
			$("#myModal22 #modal-error-display").remove();
		}
		$("#myModal22 .modal-body").append('<label id="modal-error-display"></label>');
		$("#modal-error-display").html('');
		$("#modal-error-display").html(message);
		$("#SearchName").addClass("error-txt");
		$("#SearchName").css("cssText", "border: none !important");
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * unsaved_search
 */
var unsaved_search_hc = function(data){
	$('#btn-load-more').removeClass('show');
	$('#btn-load-more').addClass('hide');
	try{
		var v_token=get_cookie('csrf_token');
		if(search_properties.search_parent_node_id === "saved-search"){		
			data.src = "SS"; 
		}
		$.ajax({
			url: "/search/results/",
			type: "POST",
			dataType: "json",
			data:data,
			headers: 
			{	
				'x-csrf-token' : v_token
			},
			success:function(data){
				$("#search-error").hide();
				//correlation_id = get_correlation_id_from_response_header();
				if(data.correlation_id){
					correlation_id = data.correlation_id;
				}
				if(data.search_id){
					global_search_id=data.search_id;
				}
				if(data){
					setTimeout(function(){
						$('#spinner-results').hide();
					}, 500);
					if(data.job_id){
						drp_job_id = data.job_id
					}else{
						drp_job_id = "";
					}
					if(data.criteria && data.criteria.categories && data.criteria.categories!==null){
						total_number_searchfields=data.criteria.categories.length;
					}
					clear_error_fields();
					g_search_results = [];
					$("#searchresults").html("");
					$('#myModal23').modal('hide');
					$(".refine-results").removeClass("hidden");
					$(".collapse:not('.navbar-collapse,#user-links')").toggle();
					
					if($("#saved-search").css("display") === "block"){
						$(".collapse:not('.navbar-collapse,#user-links')").toggle();
					}
					$(".refine-results img").attr("src",static_cdn_path+static_files_version+"/images/Chevron-o.svgz");
					
					populate_criteria_hc(data,false);
					if (data.sort_order){
						var sort_val = get_sort_value(data.sort_order);
						var sort_image='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
						$("#dLabel").html(sort_val+sort_image);
					}
					$('#getstarted').hide();
					bind_search_results_hc(data,false);
					if(data.results === null|| data.results === undefined|| data.results.length === 0){
						$('#banner').removeClass('hide');
						$('#banner').addClass('show');
						$("#getstarted").hide();
					}
					else{
						$('#banner').removeClass('show');
						$('#banner').addClass('hide');
					}
					if($("#demo2").css('display')==='block'){
						$('.tab-pane.active a.refine-results img').attr("src",static_cdn_path+static_files_version+"/images/OrangeArrow_Up.svgz");;
					}
					if($("#demo3").css('display')==='block'){
						$('.tab-pane.active a.refine-results img').attr("src",static_cdn_path+static_files_version+"/images/OrangeArrow_Up.svgz");;
					}
					setTimeout(function(){
						refined_results_gradient_toggle();
						remove_plus_button();
				    },500);
				}
				return data;
			},
			async: true,
			error: function(jqXHR, exception) {
				line_shade_display(true);
				setTimeout(function(){
					$('#spinner-results').hide();
				}, 500);
				if(jqXHR){
					show_error_message(jqXHR);
				}
				handle_errors(jqXHR.status, exception, jqXHR.responseText);
			}
		});
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * save_search
 */
var save_search_hc = function(ajax_type,search_name,proceed_val,search_id){
	try{
		var search_json={};
		var proceed=true;
		var field_id,field_class;
		var dropdown_id;
		var fields_length=0;
		var initialize_count=0;
		var selected_tab_name='';
		if(search_name==="unsaved"){
			if ($("#current-search").css("display") === configuration_var.search_display_block) {
				field_class = ".searchby-fields";
				field_id="#searchby-fields-";
			}
			else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
				field_class = ".searchby-edit-fields";
				field_id="#searchby-edit-fields-";
			}
			else if ($("#new-search").css("display") === configuration_var.search_display_block) {
				field_class = ".searchby-new-fields";
				field_id="#searchby-new-fields-";
				selected_tab_name="newsearch";
			}
			var valid = dispaly_errormessage(field_class);
			if(!valid){
				search_json={};
				search_json["criteria"]={};
				search_json.criteria["categories"]=[];
				if($("#current-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo2 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo2 .etwus-checkbox").is(":checked");
				}
				else if($("#view-edit").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#view-edit .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#view-edit .etwus-checkbox").is(":checked");
				}
				else if($("#new-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo-new-search .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo-new-search .etwus-checkbox").is(":checked");
				}
				else{
					search_json.criteria["willing_to_travel"]=false;
					search_json.criteria["eligible_to_work"]=false;
				}
				set_analytics_information('', true, search_json);//function to store analytics data
				if(selected_tab_name!="newsearch"){
					if(drp_job_id){
						search_json["job_id"]=drp_job_id;
					}
				}
				if ($("#view-edit").css("display") === configuration_var.search_display_block){
					var saved_job_id = $(".lead-search").attr("data-savedjobid");
					if(saved_job_id){
						search_json["job_id"]=saved_job_id;
					}else{
						delete search_json.job_id;
					}
				}
				if(field_class===".searchby-edit-fields"){
					initialize_count=1;
				}
				else{
					initialize_count=0;
				}
				var ids=get_model_ids_hc();
				$(field_class).each(function() {
					category={};
					var dropdown_id= $(this).attr('id');
					if($( "#"+dropdown_id).is(":visible")){
						category["name"]=$("#"+dropdown_id+" button:first>span>span").text();
						if(category["name"] === configuration_var.range_field){
			            	category["name"]=configuration_var.search_range;
			            }
						category["value"]=$("#"+dropdown_id+" .input-search").val();
						var imp='';
						if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
							var img_arr = $("#"+dropdown_id).find("button:last>span>span>img").attr("src").split('/');
							var img_length = img_arr.length-1;
							imp = img_arr[img_length].split('_')[0];
						}
						else{
							imp=1;
						}
						if(imp==="GreatToHave"){
							category["importance"]=2;
						}
						else if(imp==="NiceToHave"){
							category["importance"]=3;
						}
						else{
							category["importance"]=1;
						}
						set_analytics_information(category["name"], false, ''); //function to store analytics data
						search_json.criteria.categories.push(category);
					}
				});
				
				//for serarchh refresh
				if($('#new-search-li').hasClass("active") && search_type==='A'){
					 global_new_serach_criteria.search_json=search_json;
				}
				else if($('#current-search-li').hasClass("active") && search_type==='A'){
					 global_candidate_serach_criteria.search_json=search_json;
				}
				var response=unsaved_search_hc(search_json);
				
				
				if(response && response.number_of_listings !== null && response.number_of_listings !== undefined){
					if ($("#current-search").css("display") === configuration_var.search_display_block) {
						$(".hc_container #current-search .long-text2:first").html(data.number_of_listings+" Candidates");
						$(".hc_container #current-search .long-text2:first").html(data.number_of_listings+" Candidates");
					}else if($("#new-search").css("display") === configuration_var.search_display_block){
						$(".hc_container #new-search .long-text2:first").html(data.number_of_listings+" Candidates");
						$(".hc_container #new-search .long-text3:first").html(data.number_of_listings+" Candidates");
					}
				}
				
			}
			else{
				check_display(configuration_var.search_general);
				$("zip-error_mobile").text(configuration_var.search_general);
			}
		}
		else{
			if(proceed_val){
				if ($("#current-search").css("display") === configuration_var.search_display_block) {
					field_class = ".searchby-fields";
					field_id="#searchby-fields-";
				}
				else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
					field_class = ".searchby-edit-fields";
					field_id="#searchby-edit-fields-";
				}
				else if ($("#new-search").css("display") === configuration_var.search_display_block) {
					field_class = ".searchby-new-fields";
					field_id="#searchby-new-fields-";
					selected_tab_name="newsearch";
				}
				if(!search_name){
					//show_save_error_hc(configuration_var.search_provide_name);
					$("#error").html(configuration_var.search_provide_name);
					$("#SearchName").addClass("error-txt");
					$("#SearchName").css("cssText", "border: 2px solid #ed6f50 !important");
					return 0;
				}
				if (search_name && search_name.trim() === ""){
					//show_save_error(configuration_var.search_provide_name);
					$("#error").html(configuration_var.search_provide_name);
					$("#SearchName").addClass("error-txt");
					$("#SearchName").css("cssText", "border: 2px solid #ed6f50 !important");
					return 0;
				}
				if(search_name.length>40){
					$("#error").html(configuration_var.saved_search_max_limit);
					$("#SearchName").addClass("error-txt");
					$("#SearchName").css("cssText", "border: none !important");
					return 0;
				}
				if(search_name && contains_special_character(search_name)){
					$("#error").html(configuration_var.general)
					$("#SearchName").addClass("error-txt");
					$("#SearchName").css("cssText", "border: none !important");
					return 0;
				}
				else if(search_name.length<=40){
					for(var k=0;k<$("#saved-search>div>li").length;k++){
						var element=$("#saved-search>div>li")[k];
						if($(element).text()===search_name.toLowerCase()){
							proceed = false;
							show_save_error_hc(configuration_var.search_duplicate_name);
							break;
						}
					}
				}
			}
			else{
				field_class=".searchby-edit-fields";
				field_id="#searchby-edit-fields-";
			}
			if (proceed){
				search_json["name"]= search_name;
				if(!proceed_val){
					search_json["search_id"]=search_id;
				}
				if(selected_tab_name!="newsearch"){
					if(job_id!=null || job_id!=""){
						if(jQuery.parseJSON($("#hcsearchresultsdata").val()).jobs.length > 0 && jQuery.parseJSON($("#hcsearchresultsdata").val()).jobs !== undefined){
							search_json["job_id"]=jQuery.parseJSON($("#hcsearchresultsdata").val()).jobs[0].job_id;
						}
					}
					else{
						search_json["job_id"]=job_id;
					}
				}
				if ($("#view-edit").css("display") === configuration_var.search_display_block){
					var saved_job_id = $(".lead-search").attr("data-savedjobid");
					if(saved_job_id){
						search_json["job_id"]=saved_job_id;
					}else{
						search_json["job_id"]="";
					}
				}
				search_json["criteria"]={};
				search_json.criteria["categories"]=[];
				if($("#current-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo2 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo2 .etwus-checkbox").is(":checked");
				}
				else if($("#view-edit").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#view-edit .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#view-edit .etwus-checkbox").is(":checked");
				}
				else if($("#new-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo-new-search .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo-new-search .etwus-checkbox").is(":checked");
				}
				else{
					search_json.criteria["willing_to_travel"]=false;
					search_json.criteria["eligible_to_work"]=false;
				}
				set_analytics_information('', true, search_json);//function to store analytics data
				var fields_length=0;
				var initialize_count=0;
				var ids=get_model_ids_hc();
				if(field_class===".searchby-edit-fields"){
					initialize_count=1;
				}
				else{
					initialize_count=0;
				}
				$(field_class).each(function() {
					category={};
					var dropdown_id= $(this).attr('id');
					if($( "#"+dropdown_id).is(":visible")){
						category["name"]=$("#"+dropdown_id+" button:first>span>span").text();
						if(category["name"] === configuration_var.range_field){
			            	category["name"]=configuration_var.search_range;
			            }
						category["value"]=$("#"+dropdown_id+" .input-search").val();         
						var imp='';
						set_analytics_information(category["name"], false, ''); //function to store analytics data
						if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
							var img_arr = $("#"+dropdown_id).find("button:last>span>span>img").attr("src").split('/');
							var img_length = img_arr.length-1;
							imp = img_arr[img_length].split('_')[0];
						}
						else{
							imp=1;
						}
						if(imp==="GreatToHave"){
							category["importance"]=2;
						}
						else if(imp==="NiceToHave"){
							category["importance"]=3;
						}
						else{
							category["importance"]=1;
						}
						search_json.criteria.categories.push(category);
					}
				});
				var if_automated = identify_automated_search();
				if(if_automated){
		        	var saved_search_id;
		        	var saved_search_name = search_name;
		        	var saved_search_job_id; 
		        	var search_text =  $('#myTab-HC').find('li.active').find('span').text();
		        	if(search_text === configuration_var.search_type_search || search_text === configuration_var.search_type_candidate){
		        		saved_search_job_id = drp_job_id;
		        	}else{
		        		saved_search_job_id = $(".lead-search").attr("data-savedjobid");
		        	}
		        	if(ajax_type === "PUT"){
		        		saved_search_id=search_id;
		        		saved_search_name= search_name;
		        	}
		        	var willing_travel = search_json.criteria.willing_to_travel;
		        	var eligible_travel = search_json.criteria.eligible_to_work;
		        	save_search_automated(ajax_type,saved_search_id,saved_search_name,saved_search_job_id,willing_travel,eligible_travel);
		        	return;
		        }
				save_search_ajax(ajax_type,search_json,proceed_val,search_name,saved_search_job_id);
			}
		}
		if($("#current-search").is(':visible')){
			  $('#current-search * .sqb-line-shade').css('display','none');	
			  $('#current-search .refine-results').addClass("collapsed");
	    }
	    if($("#new-search").is(':visible')){
		      $('#new-search * .sqb-line-shade').css('display','none');	
		      $('#new-search .refine-results').addClass("collapsed");
	    }
	    else{
		      $('#view-edit * .sqb-line-shade').css('display','none'); 
		      $('#view-edit .refine-results').addClass("collapsed");
	    }
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * set_analytics_information
 */
var set_analytics_information = function (tmp_category, check_json, tmp_search_json){
	try{
		if (check_json){
			if (tmp_search_json.criteria["willing_to_travel"]){
				Search_Willingtowork = "Yes";
			}
			if (tmp_search_json.criteria["eligible_to_work"]){
				Search_Eligibletowork  = "Yes";
			}
		}else{
			var categories = ["Position", "Location", "Skills", "Education Level", "Include Keyword", "Exclude Keyword", configuration_var.range_field];//fix for DES-4605
			var position=$.inArray(tmp_category, categories);
			switch (position) {
			case 0:
				Search_Position = "Yes";
				break;
			case 1:
				Search_Location = "Yes";
				break;
			case 2:
				Search_Skill = "Yes";
				break;
			case 3:
				Search_Educationlevel = "Yes"; //fix for DES-4605
				break;
			case 4:
				Search_Includekeyword = "Yes";
				break;
			case 5:
				Search_Excludekeyword = "Yes";
				break;
			case 6:
				Search_Range = "Yes";
				break;
			}
		}
	}catch (err){
		console.log(configuration_var.search_query_builder + ": " + "set_analytics_information() : " + err);
	}
};

/**
 * restore_modal
 */
var restore_modal_hc = function(){
	try{
		var modal='<div class="modal-dialog modal-sm">'
			+'<div class="modal-content">'
			+'<div class="modal-body">'
			+'<form role="form">'
			+'<label for="SeachName" class="search-name">Name this search</label>'
			+'<div id="error"></div>'
			+'<input type="text" class="form-control form-style margin_top_search" id="SearchName" placeholder="">'
			+'</form>'
			+'</div>'
			+'<div class="modal-footer search-footer">'
			+'<button type="button" class="btn btn-outlined" data-dismiss="modal" onclick="restore_modal_hc();">Cancel</button>'
			+'<button id="save-search" type="button" class="btn btn-primary" onclick="save_search_name_hc();">Save</button>'
			+'</div>'
			+'</div>'
			+'</div>';
		$("#myModal22").modal('hide');
		$("#myModal22").html(modal);
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * populate_remove_id
 */
var populate_remove_id_hc = function(event,search_id){
	try{
		if(search_id){
			$("#myModal23").find("label.search-name").attr("data-value",search_id);
			$(event.target).parent().parent().attr("data-remove",search_id);
			var mobile_id = "mob-"+search_id;
			$("#"+mobile_id).attr("data-remove-mobile",search_id);
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * remove_saved_search
 */
var remove_saved_search_hc = function(event){
	try{
		var id=$("#myModal23").find("label.search-name").attr("data-value");
		var v_token=get_cookie('csrf_token');
		$.ajax({
			url: "/search/criteria/"+id,
			type: "DELETE",
			dataType: "json",
			headers: 
			{	
				'x-csrf-token' : v_token,
				'correlation_id':correlation_id
			},
			success:function(data){
				$("#search-error").hide();
				if(data){
					if($("#saved-search").find('tr').attr("data-remove")!=""){
						$("#saved-search").find("[data-remove]").remove();
					}
					if($("#saved-search").find('tr').attr("data-remove-mobile")!=""){
						$("#saved-search").find("[data-remove-mobile]").remove();
					}
					if(($("#saved-search .lg-savedsearch table tbody").find('tr').length < 1)){
						$("#saved-search .container").html('');
						$("#saved-search .container").append('<h3 class="long-text2">You haven\'t created any saved searches yet</h3>');
						//For mobile
						$("#saved-search .mygrid-wrapper-div-xs>h3").html("");
						$("#saved-search .mygrid-wrapper-div-xs").append('<h3 class="mob-long-text2">You haven\'t created any saved searches yet</h3>');
					} else if(($("#saved-search .lg-savedsearch table tbody").find('tr').length === 1)) {
						$("#saved-search tr").attr('style',"border-bottom: 0px solid #444 !important;");
					} else {
						$("#saved-search tr").attr('style',"border-bottom: 1px solid #444 !important;");
					}
					if(($("#saved-search .lg-savedsearch table tbody").find('tr').length >0)){
						$("#saved-search-table tr:last").css("cssText","border-bottom:none !important");
					}
					if($("#saved-search-table-mob").find('tr').length > 0){
						$("#saved-search-table-mob tr:last").css("cssText","border-bottom:none !important")
					}
				}
				get_saved_search_name_from_service();
			},
			async: true,
			error: function(jqXHR, exception) {
				if(jqXHR){
					show_error_message(jqXHR);
				}
			}
		});
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * show_results
 */
var show_results_hc = function(){
	try{
		$('#banner').removeClass('show');
		$('#banner').addClass('hide');
		/****** SOCB: Changes for 6528*******/
		var $filters = $('.searchby-fields');
		var split_id = 2;
		var job_id = drp_job_id;
		var willing_travel = false;
    	var eligible_work = false;
    	var tab_name;
		var search_text = $('#myTab-HC').find('li.active').find('span').text();
		if(search_text === configuration_var.search_type_candidate ||  search_text === configuration_var.search_type_search){
	    	$filters = $('.searchby-fields');
	    	split_id = 2;
	    	job_id = drp_job_id;
	    	willing_travel=$("#demo2 .wtt-checkbox").is(":checked");
			eligible_work=$("#demo2 .etwus-checkbox").is(":checked");
	    }
		else if(search_text === configuration_var.search_type_new){
	    	$filters = null;
	    	split_id = 3; 
	    }else{
	    	$filters = $(".searchby-edit-fields");
	    	job_id= $(".saved-title").attr("data-savedjobid");
	    	split_id = 3;
	    	willing_travel=$("#view-edit .wtt-checkbox").is(":checked");
			eligible_work=$("#view-edit .etwus-checkbox").is(":checked");
	    }
		if(search_type === "A" && $filters && $filters.length && $filters.length === 1){
	    	var if_automated = check_if_automated_search_results($filters);
	    	if(if_automated){
	    		
	    		get_automated_search_results(job_id,tab_name,willing_travel,eligible_work);
	    		var data_json = {
	    				criteria: {
	    					categories: [],
	    					eligible_to_work: eligible_work,
	    					willing_to_travel: willing_travel
	    				}
	    		};
	    		if(job_id){
	    			data_json.job_id = job_id;
	    		}
	    		if($('#current-search-li').hasClass("active") && search_type==='A'){
					 global_candidate_serach_criteria.search_json=data_json;
				}
	    		set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
	    	    analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.refine_results, gtm_event_label.refine_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
	    		return;
	    	}
	    	
	    }
		/****** EOCB: Changes for 6528*******/
		bRefineResultsNewSearch = true;    
		var field_class = '.'+search_properties.search_parent_class_name;
		var valid_rows = dispaly_errormessage(field_class)
		if(!valid_rows){      	
			check = check_city_sate();
			var check_error ="";
			if($("#current-search").css("display") === configuration_var.search_display_block){
				check_error = $("#zip-error").text().trim();
			}
			else if($("#view-edit").css("display") === configuration_var.search_display_block){
				check_error = $("#zip-error_view").text().trim();
			}
			else if ($("#new-search").css("display") === configuration_var.search_display_block) {
				check_error = $("#zip-error_new").text().trim();
			}
			if(check_error !== ""){
				return;
			}
			if(!zip_error && !check){
				$("#spinner-results").show();
				save_search_hc('POST',"unsaved",false,null);
				set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
				analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.refine_results, gtm_event_label.refine_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
			}
			else{
				if(zip_error){
					check_display(configuration_var.zipcode);
					highlight_textbox();
				}
				else{
					check_display(configuration_var.valid_city_state);
					highlight_textbox();
				}
			}
		}else{
			check_display(configuration_var.search_general);
			$("zip-error_mobile").text(configuration_var.search_general);
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Show Search Results for HC
 */
var show_search_results_hc = function(id){
	 var window_width = $(window).width();
	 var ls_display = $("#ls-curr-search").css("display");
	 if($("#ls-new-search").css("display") === "block" || $("#ls-saved-search").css("display") === "block"){
		 ls_display = "block";
	 }
	 if(ls_display === "block"){
		 window_width = 769;
	 }
	$("#spinner-results").show();
	$('#btn-load-more').removeClass('show');
	$('#btn-load-more').addClass('hide');
	try{
		var v_token=get_cookie('csrf_token');
		var data={};
		data["search_id"]=id;
		data["src"] = "SS";

		$.ajax({
			url: "/search/results/",
			type: "POST",
			dataType: "json",
			data:data,
			headers: 
			{	
				'x-csrf-token' : v_token
			},
			success:function(data){
				$("#search-error").hide();
				//correlation_id = get_correlation_id_from_response_header();
				if(data.correlation_id){
					correlation_id = data.correlation_id;
				}
				if(data.search_id){
					global_search_id=data.search_id;
				}
				if(data){
					if(data.job_id){
						drp_job_id = data.job_id
					}else{
						drp_job_id = "";
					}
					if(data.criteria && data.criteria.categories && data.criteria.categories!==null){
						total_number_searchfields=data.criteria.categories.length;
					}
					console.log(drp_job_id);
					g_search_results = [];
					$("#searchresults").html("");
					setTimeout(function(){
						$('#spinner-results').hide();
					}, 500);
					$('#getstarted').hide();
					if(data.results === null|| data.results === undefined|| data.results.length === 0){
						$('#banner').removeClass('hide');
						$('#banner').addClass('show');
					}
					else{
						bind_search_results_hc(data,false);
						$('#banner').removeClass('show');
						$('#banner').addClass('hide');
					}
					if(data.eligible_sort_options && data.eligible_sort_options.length>0){
						$('#sort_dropdown').html('');
						$('#sort_dropdown-mob').html('');
						if (data.sort_order){
							var sort_val = get_sort_value(data.sort_order);
							sort_dropdown_bind(data.eligible_sort_options,sort_val);
							var sort_image='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
							$("#dLabel").html(sort_val+sort_image);
						}
						
					}
					if(data.results !== null && data.results !== undefined && data.results.length > 1 ){
						$('.sortby_hc').removeClass("hide");
						$('.sortby_hc').addClass("show")
						$('.sortby_hc').parent().addClass('hc-sort-btn-paddings')
						if(window_width < 768){ 
							$("#sort_dropdown-mob").parent().parent().addClass("show-filter");
							$("#sort_dropdown-mob").parent().parent().removeClass("hide-filter");
						}
					}else{
						$('.sortby_hc').addClass("hide");
						$('.sortby_hc').removeClass("show")
						$('.sortby_hc').parent().removeClass('hc-sort-btn-paddings')
						if(window_width < 768){ 
							$("#sort_dropdown-mob").parent().parent().removeClass("show-filter");
							$("#sort_dropdown-mob").parent().parent().addClass("hide-filter");
						}

					}
				}
			},
			async: true,
			error: function(jqXHR, exception) {
				setTimeout(function(){
					$('#spinner-results').hide();
				}, 500);
				if(jqXHR){
					show_error_message(jqXHR);
				}
				handle_errors(jqXHR.status, exception, jqXHR.responseText);
			}
		});


	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};
/**
 * Save search for ajax
 */
var save_search_ajax = function(ajax_type,search_json,proceed_val,search_name){
	try{
		var v_token=get_cookie('csrf_token');
		$.ajax({
			url: "/search/criteria",
			type: ajax_type,
			dataType: "json",
			data:search_json,
			headers: 
			{	
				'x-csrf-token' : v_token,
				'correlation_id':correlation_id
			},
			success:function(data){
				if(data){
					if(!edit_save_search_flag_hc){
						get_saved_search_name_from_service(search_id);
					}else{
						edit_save_search_flag_hc = false;
						var is_collapsed = $("#demo").hasClass("collapse in");
						if(is_collapsed){
							$("#view-edit .sqb-line-shade").css("display","block");
						}else{
							$("#view-edit .sqb-line-shade").css("display","none");
						}
						$('#spinner-results').hide();
					}
				}
			},
			async: true,
			error: function(jqXHR, exception) {
				$('#spinner-results').hide();
				if(!edit_save_search_flag_hc){
					var message = jQuery.parseJSON(jqXHR.responseText);
					var error_message;
					if(message.type === "validation"){
						error_message = message.message;
						if(error_message.indexOf("#")>0){
							var message_detail = error_message.split('#');
							error_message = message_detail[0];
						}
						$("#error").html(error_message);
						$("#SearchName").addClass("error-txt");
						$("#SearchName").css("cssText", "border: none !important");
					}
					else{
						var is_collapsed = $("#demo").hasClass("collapse in");
						if(is_collapsed){
							$("#view-edit .sqb-line-shade").css("display","block");
						}else{
							$("#view-edit .sqb-line-shade").css("display","none");
						}
						$("#myModal22 .modal-body #error").html("Error in saving");
					}

				}else{
					if(jqXHR){
						show_error_message(jqXHR);
					}
				}
				handle_errors(jqXHR.status,exception,jqXHR.responseText);
			}
		});
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};



/**
 * show_results_mobile
 */
var show_results_mobile = function(){
	try{
		clear_mobile_fields();
		fnCollapseHCSearchBuilder();
		var check = check_city_sate_mobile();
		var check_error ="";
		if($("#current-search").css("display") === configuration_var.search_display_block){
			check_error = $("#zip-error_mobile_filter").text().trim();
		}
		if(check_error !== ""){
			return;
		}
		if(!zip_error && !check){
			//$('#spinner-results').show();
			save_search_mobile('POST',"unsaved",false,null);
			set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
			analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.refine_results, gtm_event_label.refine_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
		}
		else{
			if(zip_error){
				check_display(configuration_var.zipcode);
				highlight_textbox();
			}
			else{
				check_display(configuration_var.valid_city_state);
				highlight_textbox();
			}
		}
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * save_search_mobile
 */
var save_search_mobile = function(ajax_type,search_name,proceed_val,search_id){
	try{
		var search_tab;
		var search_json={};
		var proceed=true;
		var field_id,field_class;
		var dropdown_id;
		var fields_length=0;
		var initialize_count=0;
		process_value=proceed_val;
		if(search_name === "unsaved"){
			if ($("#current-search").css("display") === configuration_var.search_display_block) {
				field_class = ".searchby-fields-xs";
				field_id="#searchby-fields-xs-";
				search_tab = "current";
			}
			else if ($("#saved-search").css("display") === configuration_var.search_display_block) {
				field_class = ".searchby-saved-fields-xs";
				field_id = "#searchby-saved-fields-xs";
				search_tab = "saved";
			}
			else{
				field_class = ".searchby-new-fields-xs";
				field_id="#searchby-new-fields-xs-";
				search_tab = "new";
			}
			var valid = dispaly_errormessage_mobile(field_class);
			if(!valid){
				$('#spinner-results').show();  
				search_json={};
				search_json["criteria"]={};
				search_json.criteria["categories"]=[];
				if($("#current-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo3 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo3 .etwus-checkbox").is(":checked");
					if(drp_job_id){
						search_json["job_id"]=drp_job_id;
					}
				}
				else if($("#new-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#Div3 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#Div3 .etwus-checkbox").is(":checked");
				}
				else{
					search_json.criteria["willing_to_travel"]=$("#saved .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#saved .etwus-checkbox").is(":checked");
				}
				if(field_class===".searchby-edit-fields"){
					initialize_count=2;
				}
				else{
					initialize_count=1;
				}
				$(field_class).each(function() {
					category={};
					var valid = false;
					var row_id = $(this).attr('id');
					var idenifier_value = $("#"+row_id).find("td:nth-child(2)").find("small").text();
					var priority = ($("#"+row_id).find("td:nth-child(1)").find('img').attr('src').split('_')[0].split('images')[1]).replace("/","");
					if(priority==="GreatToHave"){
						category["importance"]=2;
					}
					else if(priority==="NiceToHave"){
						category["importance"]=3;
					}
					else{
						category["importance"]=1;
					}
					if(idenifier_value !== 'Select' || idenifier_value !== ""){
						var value_in_row = $("#"+row_id).find("td:nth-child(2)").text();
						var value_text = value_in_row.replace(idenifier_value,"");
						category["name"] = idenifier_value;
						if(category["name"] === configuration_var.range_field){
			            	category["name"]=configuration_var.search_range;
			            }
						category["value"]=value_text;
					}
					search_json.criteria.categories.push(category);
				});
				if (search_type === "A" && search_tab !== "new"){
					var job_id = drp_job_id;
		        	var search_text = $('#myTab-HC').find('li.active').find('span').text();
		        	var total_num_search_rows;
		        	var tab_name = "current";
		        	var willing_to_travel = false;
					var eligible_to_work = false;
					if (search_text === configuration_var.search_type_candidate || search_text === configuration_var.search_type_search) {
						total_num_search_rows = $(".searchby-fields-xs").length;
						job_id = drp_job_id;
						tab_name = "current";
						willing_to_travel=$("#demo3 .wtt-checkbox").is(":checked");
						eligible_to_work=$("#demo3 .etwus-checkbox").is(":checked");
					}
					else{
						total_num_search_rows = $(".searchby-saved-fields-xs").length;
						job_id = $("#saved-search-name").attr("data-jobid");
						tab_name = "saved";
						willing_to_travel=$("#saved .wtt-checkbox").is(":checked");;
						eligible_to_work=$("#saved .etwus-checkbox").is(":checked");
					}
					if(total_num_search_rows !== undefined && total_num_search_rows === 0){
						search_json = {
								criteria: {
									categories: [],
									eligible_to_work: true,
									willing_to_travel: false
								}
						};
						get_automated_search_results(job_id,tab_name,willing_to_travel,eligible_to_work);
						var data_json = {
			    				criteria: {
			    					categories: [],
			    					eligible_to_work: eligible_work,
			    					willing_to_travel: willing_travel
			    				}
			    		};
			    		if(job_id){
			    			data_json.job_id = job_id;
			    		}
			    		if($('#current-search-li').hasClass("active") && search_type==='A'){
							 global_candidate_serach_criteria.search_json=data_json;
						}
						return;
					}
		        }
				
				if($('#new-search-li').hasClass("active") && search_type==='A'){
					 global_new_serach_criteria.search_json=search_json;
				}
				else if($('#current-search-li').hasClass("active") && search_type==='A'){
					 global_candidate_serach_criteria.search_json=search_json;
				}
				unsaved_search_hc(search_json);
			}
			else{
				$("#zip-error").text(configuration_var.search_general);
				$("#zip-error_mobile").text(configuration_var.search_general);
			}
		}
		else{
			if(proceed_val){
				if ($("#current-search").css("display") === configuration_var.search_display_block) {
					field_class = ".searchby-fields-xs";
					field_id="#searchby-fields-xs-";
				}
				else{
					field_class = ".searchby-new-fields-xs";
					field_id="#searchby-new-fields-xs-";
				}
			}
			if (proceed){
				search_json["name"]= search_name;
				if(!proceed_val){
					search_json["search_id"]=search_id;
				}
				search_json["criteria"]={};
				search_json.criteria["categories"]=[];
				if($("#current-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#demo3 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#demo3 .etwus-checkbox").is(":checked");
				}
				else if($("#new-search").css("display") === configuration_var.search_display_block){
					search_json.criteria["willing_to_travel"]=$("#Div3 .wtt-checkbox").is(":checked");
					search_json.criteria["eligible_to_work"]=$("#Div3 .etwus-checkbox").is(":checked");
				}
				else{
					search_json.criteria["willing_to_travel"]=false;
					search_json.criteria["eligible_to_work"]=false;
				}
				set_analytics_information('', true, search_json);//function to store analytics data
				var fields_length=0;
				var initialize_count=0;
				if(field_class===".searchby-edit-fields"){
					initialize_count=2;
				}
				else{
					initialize_count=1;
				}
				$(field_class).each(function() {
					category={};
					var dropdown_id= $(this).attr('id');
					if($( "#"+dropdown_id).is(":visible" )){
						category["name"]=$("#"+dropdown_id+" button:first>span>span").text();
						if(category["name"] === configuration_var.range_field){
			            	category["name"]=configuration_var.search_range;
			            }
						category["value"]=$("#"+dropdown_id+" .input-search").val();
						var imp='';
						if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
							var img_arr = $("#"+dropdown_id).find("button:last>span>span>img").attr("src").split('/');
							var img_length = img_arr.length-1;
							imp = img_arr[img_length].split('_')[0];
						}
						else{
							imp=1;
						}
						if(imp==="GreatToHave"){
							category["importance"]=2;
						}
						else if(imp==="NiceToHave"){
							category["importance"]=3;
						}
						else{
							category["importance"]=1;
						}
						search_json.criteria.categories.push(category);
					}
				});
				save_search_ajax(ajax_type,search_json,proceed_val,search_name);
			}
		}
		if($("#current-search").is(':visible')){			  
			  $('#current-search .refine-results').addClass("collapsed");
	    }
	    if($("#new-search").is(':visible')){		      
		      $('#new-search .refine-results').addClass("collapsed");
	    }
	    else{		       
		      $('#saved-search .refine-results').addClass("collapsed");
		      
	    }
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
};

/**
 * Function for resized window
 */
$(window).resize(function() {
	try{
		resize_search();
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ":" + err);
	}
});	

/**
 * saved_search_view
 */
var saved_search_view_hc = function(e,search_id){
	var saved_job_id = $(e.target).parent().parent().attr("data-info");	
	console.log(saved_job_id);
	var saved_name = $(e.target).parent().parent().attr("data-name");	
	$.ajax({
		url:  "/search/criteria/"+search_id,
		type: "GET",
		dataType: "json",
		success:function(data){
			$('#search_selected_id').val(search_id);
			/*if(saved_job_id !== undefined && saved_job_id !== null &&
					saved_job_id !== "" && saved_job_id !== "null"){
				var job_title = get_job_title_from_id(saved_job_id);				
				show_jobs_container_hc();
				populate_criteria_hc(data);
				$("#dropdownMenu-mob>span").text(job_title);
				drp_job_id = saved_job_id;
				$("#mob-row").hide()
				//$('#current-search-li').addClass('active');
				$("#current-search").removeClass('fade');
				$("#"+search_properties.check_box_div_id).addClass("in");
				$("#demo3").show();
			}else{
				drp_job_id = "";
				show_new_search_container();
				populate_criteria_hc(data);
				$("#mob-refine").hide();
			    $("#mob-h3-text").hide();
			    $("#A1").hide();
			    $("#Div3").removeClass("new-search-demo");
				$("#new-search").removeClass('fade');
				$("#Div3").show();				
			}*/
			var sort_available = $("#sort_dropdown-mob").parent().parent().hasClass("show-filter");
			show_saved_jobs_container_hc();
			populate_criteria_hc(data);
			if(sort_available){
				$("#sort_dropdown-mob").parent().parent().addClass("show-filter");
				$("#sort_dropdown-mob").parent().parent().removeClass("hide-filter");
			}else{
				$("#sort_dropdown-mob").parent().parent().removeClass("show-filter");
				$("#sort_dropdown-mob").parent().parent().addClass("hide-filter");
			}
			$("#A1-ss").css("display","none");
			$(".line-shade11-custom-saved").removeClass("hidden");
			$("#saved-search-name ").text(saved_name);
			$("#saved-search-name ").attr("data-jobid",saved_job_id);
			$("#del-ss").attr("data-id",search_id);
			$("#saved").show();
			$("#ss-saved-container").addClass("ss-detail-margin-top");
			$("#myTab-HC").hide();
			$('.saved-search-fadeout').css("display","none");
			var total_number_searchfields = $(".searchby-saved-fields-xs").length;
	    	if(total_number_searchfields == 0){
	    		$("#saved").addClass('no-padding-class');
	    	}else{
	    		$("#saved").removeClass('no-padding-class');
	    	}
			disable_show_search_button();
		},
		async: true,
		error: function(jqXHR, exception) {
			handle_errors(jqXHR.status, exception, jqXHR.responseText);
		}
	});
};
var back_saved_search = function(val){
	$('#search_selected_id').val('');
	$('.saved-search-fadeout').css("display","block");
	$("#myTab-HC").find('#saved-search-li').addClass("active");
	$("#myTab-HC").find('#current-search-li').removeClass("active");
	$("#myTab-HC").find('#new-search-li').removeClass("active");
	$("#myTab-HC").show();
	$("#ss-saved-container").removeClass("ss-detail-margin-top");
	$("#ss-saved-container").addClass('hide-filter')
	$("#ss-saved-container").removeClass('show-filter')
	$(".saved-search-container-mob").removeClass('hide-filter');
	$(".saved-search-container-mob").addClass('show-filter');
};
var remove_saved_search = function (event,type){
	var to_be_removed_id = $(event).attr("data-id");
	//to_be_removed_id ="1234";
	var v_token=get_cookie('csrf_token');
	$.ajax({
		url: "/search/criteria/"+to_be_removed_id,
		type: "DELETE",
		dataType: "json",
		headers: 
		{	
			'x-csrf-token' : v_token
		},
		success:function(data){
			get_saved_search_name_from_service();
			setTimeout(function(){
			$("#ss-saved-container").removeClass("ss-detail-margin-top");
			$("#ss-saved-container").addClass('hide-filter')
			$("#ss-saved-container").removeClass('show-filter')
			$(".saved-search-container-mob").removeClass('hide-filter');
			$(".saved-search-container-mob").addClass('show-filter');
			$('#myTab-HC').show()
			},100);
		},
		async: true,
		error: function(jqXHR, exception) {
			console.log(jqXHR);
			console.log(exception);
			/*if(jqXHR){
				show_error_message(jqXHR);
			}*/
		}
	});
	
}


var refined_results_gradient_toggle=function(){
	
	  var img=$('.tab-pane.active a.refine-results img');
	  var line_shade=$('.tab-pane.active .sqb-line-shade');
	  var line_shade_mob=$('.tab-pane.active .line-shade11');
	  var line_shade_candidate=$('.tab-pane.active .line-shade111');
	  
	  if(img){
		  var img_src=img.attr("src");
		  if(img.length>1){
			var mob_img=$(img[1]).attr('src');  
		  }
		  
	  }
	  if(mob_img && $(window).width()<768){
		  if(mob_img.indexOf("Down")>-1){
			  line_shade.css('display','none');
			  line_shade_mob.addClass('hidden');
			  line_shade_candidate.addClass('hidden');
		  }else if (mob_img.indexOf("Up")>-1){
			  line_shade.css('display','block');
			  line_shade_mob.removeClass('hidden');
			  line_shade_candidate.removeClass('hidden');
		  } 
	  }
	  else{
		  if(img_src.indexOf("Down")>-1){
			  line_shade.css('display','none');
			  line_shade_mob.addClass('hidden');
			  line_shade_candidate.addClass('hidden');
		  }else if (img_src.indexOf("Up")>-1){
			  line_shade.css('display','block');
			  line_shade_mob.removeClass('hidden');
			  line_shade_candidate.removeClass('hidden');
		  }
	  }
	  
	  
	
}
var remove_plus_button=function(){
	var array=$('.tab-pane#current-search #search-by tr.searchby-fields');
	var new_array=$('.tab-pane#new-search #search-by-new tr.searchby-new-fields');
	if($(window).width()>768){
		if(array.length>=10){
			for(var i=0;i<array.length;i++){
				$(array[i]).find(".js-add-btn").remove();
			}
		}
		if(new_array.length>=10){
			for(var i=0;i<new_array.length;i++){
				$(new_array[i]).find(".js-add-btn").remove();
			}
		}
	}
}