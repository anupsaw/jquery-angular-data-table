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
var search_fields_count = 1;
var input_val = '';
var loc_flag_element_id, range_flag_element_id, position_flag_element_id,range_flag_view_id,loc_flag_element_view_id,position_flag_view_id;
var valid_zip_code = false, zip_code_error = false,job_title_flag = false,location_title_flag= false,position_title_flag= true,job_title_view_flag=false,location_view_title_flag=false;
var edit_save_search_flag = false;
//Variable declared for analytics
var Search_Location = 'No', Search_Position = 'No', Search_Range = 'No', Search_Includekeyword='No', Search_Excludekeyword='No', Search_Skill='No', Search_Educationlevel='No', Search_Willingtowork='No', Search_Eligibletowork='No';
/**
 * Function for transforming arrow on click of
 * refine results
 */
var transform_arrow = function (event) {
	var window_width = $(window).width();
	 var ls_display = $("#ls-curr-search").css("display");
	 if($("#ls-new-search").css("display") === "block" || $("#ls-saved-search").css("display") === "block"){
		 ls_display = "block";
	 }
	 if(ls_display === "block"){
		 window_width = 769;
	 }
	var sub_class = ".ss-current-search";
	var class_name="searchby-fields-xs";
	 var total_number_searchfields = $(".searchby-fields-xs").length;
     
     
     if(total_number_searchfields === 0) {
   	  $(".ss-current-search").addClass('no-padding-class');
       }
       else {
         $(".ss-current-search").removeClass('no-padding-class');
       }
  if($("#current-search").is(':visible')) {    
    fnRefineResultImageBindingForToggle("#demo2");	
    fnRefineResultImageBindingForToggle("#demo3");
    //if ($("#demo3").css("display") === configuration_var.search_display_block) {
    /*if(isMobile.any()){
    	fnRefineResultImageBindingForToggle("#demo3");
	}*/
  } 
  else if($("#view-edit").is(':visible')) {
    fnRefineResultImageBindingForToggle("#demo");
  }
  /*if(($(event.target).hasClass('collapsed')||$(event.target).parent().hasClass('collapsed'))&& $(window).width()>767){
	  $('#current-search').addClass('new_padding_search');
	  $('#current-search .container').addClass('new_padding_search');
	  $('.long-text2').addClass('new-margin-search');
	  $('#current-search .refine-results').addClass('new-margin-search');
	  if($("#current-search").is(':visible')){
		  $('#current-search * .sqb-line-shade').removeAttr('style'); 
	  }
	  else{
		  $('#view-edit * .sqb-line-shade').removeAttr('style');  
	  }
	  
  }
  else{
	  $('#current-search').removeClass('new_padding_search');  
	  $('#current-search .container').removeClass('new_padding_search');
	  $('.long-text2').removeClass('new-margin-search');
	  $('#current-search .refine-results').removeClass('new-margin-search');
	  
	  if($("#current-search").is(':visible')){
		  $('#current-search * .sqb-line-shade').css('display','none');
	  }
	  else{
		  $('#view-edit * .sqb-line-shade').css('display','none'); 
	  }
  }*/
  var parent_class = "#current"
	  if (search_properties_js.id === "current"){
		  parent_class = "#current-search";
		  if(window_width < 768){
				parent_class = "#current-search>#ss-curr-search-container";
			}
	  }else{
		  parent_class = "#view-edit";
	  }
  var img_src = $(parent_class).find('.refine-arrow').attr("src");
  if(img_src.indexOf("Down")>-1){
	  line_shade_display_js(false);
	  $('#current-search').removeClass('new_padding_search');  
	  $('#current-search').addClass('new_padding_search');
	  $('#current-search .container').addClass('new_padding_search');
	  $('.long-text2').removeClass('new-margin-search');
	  if (search_properties_js.id === "current" && $(window).width() < 768){
		  $('.mobileButtonContainer').removeClass("p-t-9");
		  $('.mobileButtonContainer').removeClass("p-b-15");
		  $('#ss-curr-search-container #mob-refine').addClass("m-b-6");
	  }
  }else if (img_src.indexOf("Up")>-1){
	  $('#current-search').removeClass('new_padding_search');  
	  $('#current-search .container').removeClass('new_padding_search');
	  line_shade_display_js(true);
	  $('.long-text2').addClass('new-margin-search');
	  $('#current-search .refine-results').addClass('new-margin-search');
	  if (search_properties_js.id === "current" && $(window).width() < 768){
		  $('.mobileButtonContainer').addClass("p-t-9");
		  $('.mobileButtonContainer').addClass("p-b-15");
		  $('#ss-curr-search-container #mob-refine').removeClass("m-b-6");
	  }
  }
  
};

var search_transform = function () {	
	  if($("#current-search").is(':visible')) {    
		  fnRefineResultImageBindingForToggle("#demo2");	     
		  if ($("#demo3").css("display") === configuration_var.search_display_block) {
		     fnRefineResultImageBindingForToggle("#demo3");
		  }
	  } 
	  else if($("#view-edit").is(':visible')) {
	    fnRefineResultImageBindingForToggle("#demo");
	  }
	  $('#current-search').removeClass('new_padding_search');  
	  $('#current-search .container').removeClass('new_padding_search');
	  $('.long-text2').removeClass('new-margin-search');
	  $('#current-search .refine-results').removeClass('new-margin-search');
	  
	  if($("#current-search").is(':visible')){
		  $('#current-search * .sqb-line-shade').css('display','none');
	  }
	  else{
		  $('#view-edit * .sqb-line-shade').css('display','none'); 
	  }
	  $('#current-search .refine-results').addClass("collapsed");
	  $('#view-edit .refine-results').addClass("collapsed");
};
/**
 * search builder model
 */
var search_model = {
    total: {
      R1: {
        D1: {
          v1: "Position",
          v2: "Location",
          v3: "Include Keyword",
          v4: "Exclude Keyword",
          v5: "Skills"
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
      }
    }
};
/**
 * view_edit_model
 */
var view_edit_model = {
    total: {
      R1: {
        D1: {
          vdefault: "Select",
          v1: "Position",
          v2: "Location",
          v3: "Include Keyword",
          v4: "Exclude Keyword",
          v5: "Skills"
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
      }
    }
};
/**
 * setting search properties
 */
var search_properties_js = {
    search_drop_partial_id : "js-field-dropdown-",
    search_parent_class_name:"searchby-fields",
    search_mobile_parent_class_name:"searchby-fields-xs",
    search_split_id:2,
    search_initialize_count:0,
    search_parent_node_id:"current-search",
    search_parent_mobile_node_id:"current-search",
    search_model_name:search_model,
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
        this.search_model_name=search_model;
        this.check_box_div_id="demo2";
        this.mobile_check_box_id="demo3";
        this.row_id='searchby-fields-';
        this.row_id_mobile='searchby-fields-xs-';
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
        this.search_model_name=view_edit_model;
        this.check_box_div_id="demo";
        this.mobile_check_box_id="saved";
        this.row_id='searchby-edit-fields-';
        this.row_id_mobile='searchby-saved-fields-xs-';
        break;
      }
    }

};
/**
 * Resize functionality
 */
window.onresize = function () {
  try{
    var ids = get_model_ids();
    for (var j = 0; j < ids.length; j++) {
      select_population_function(ids[j]);
      update_search_model(ids[j]);
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ":" + err);
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
    //draw_scroll();
    populate_fields(1);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ":" + err);
  }
};

/**
 * Function for getting model id's
 */
var get_model_ids = function() {
  try{
    var split_id=0;
    var class_name='';
    if ($("#current-search").css("display") === configuration_var.search_display_block) {

      if($(window).width() < 768){
        split_id = 3;
        class_name=".searchby-fields-xs";
      }else{
        split_id = 2;
        class_name=".searchby-fields";
      }
    } else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
      split_id = 3;
      class_name=".searchby-edit-fields";
    }
    var get_id = [];
    for (var i = 0; i < $(class_name).length; i++) {
      var temp = $(class_name)[i];
      get_id.push($(temp).attr("id").split("-")[split_id]);
    }
    return get_id;
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": get_model_ids :" + err);
  }
};
/**
 * Populating query builder
 */
var populate_criteria = function(data){
  try{
    $('.sortby').addClass("hide");
    $('.sortby').removeClass("show");    
    $('.mobile-sort').addClass("hide-filter");
    $('.mobile-sort').removeClass("show-filter");
    $('#demo3').parent().find('.refine-results img').addClass("refine-arrow");	
    //$('#sort-dropdown').addClass("hide");
   // $('#sort-dropdown').removeClass("show");
    if($(window).width() < 768){
		new_row_class = search_properties_js.search_mobile_parent_class_name;
	}
	else{
		new_row_class = search_properties_js.search_parent_class_name;
	}
    $("#"+search_properties_js.search_parent_node_id+" .long-text2:first").html("0 Jobs");
    $("#"+search_properties_js.search_parent_node_id+" .long-text3:first").html("0 Jobs");
    var new_row,new_row_xs;
    var ids=get_model_ids();
    var check_row_id = search_properties_js.row_id_mobile;
	if(check_row_id){
		check_row_id = search_properties_js.row_id_mobile.substring(0, search_properties_js.row_id_mobile.length - 1);
	}
    if(data.search_type==="C"){
      if(data.criteria === null){
        $("#"+search_properties_js.check_box_div_id +" input[type=checkbox]:last").attr("checked","checked");
        $("#"+search_properties_js.mobile_check_box_id+" input[type=checkbox]:last").prop("checked", true);
        custom_search();
        //$("#mobile-search").addClass("disabled");
        disable_show_search_button();
      }
    }
    if(data.criteria){
      if(data.criteria.categories && data.criteria.categories.length){
        search_fields_count=0;
        if(search_properties_js.id !== 'edit'){
          $("#"+search_properties_js.search_parent_node_id+" ."+search_properties_js.search_parent_class_name).remove();
          $("#"+search_properties_js.search_parent_mobile_node_id+" ."+search_properties_js.search_mobile_parent_class_name).remove();
        }else{
          $("#view-edit .searchby-edit-fields:not(:first)").remove();
          $("#"+search_properties_js.search_parent_mobile_node_id+" ."+search_properties_js.search_mobile_parent_class_name).remove();
        }
        for(var i=0;i<data.criteria.categories.length;i++){
          ++search_fields_count;
          if(data.criteria.categories[i].name===configuration_var.location && data.criteria.categories[i].value !== "" && data.criteria.categories[i].value !== undefined){
				set_flags(data.criteria.categories[i].name,new_row_class,search_fields_count);
				if(search_properties_js.search_parent_node_id === "current-search"){
					location_title_flag = true;
				}
				else{
					location_view_title_flag = true;
				}
			}
          if(data.criteria.categories[i].name===configuration_var.position && data.criteria.categories[i].value !== "" && data.criteria.categories[i].value !== undefined){
				set_flags(data.criteria.categories[i].name,new_row_class,search_fields_count);
				if(search_properties_js.search_parent_node_id === "current-search"){
					job_title_flag = true;
				}
				else{
					job_title_view_flag = true;
				}
			}
          /*if(data.criteria.categories[i].name === configuration_var.position && data.criteria.categories[i].value !== "" && data.criteria.categories[i].value !== undefined ){
            job_title_flag = true;
          }
          if(data.criteria.categories[i].name === configuration_var.location && data.criteria.categories[i].value !== "" && data.criteria.categories[i].value !== undefined ){
            location_title_flag = true;
          }*/
          var importance_id = "importance_"+search_fields_count;
          var placeholder_text = get_placeholder_text(data.criteria.categories[i].name);
          var parent_class = search_properties_js.search_parent_class_name;
          var div_row_id = search_properties_js.row_id+search_fields_count;
          new_row = '<tr class="tr-no-padding '+parent_class+'" id="'+div_row_id + '">'
          +'<td class="ss-name td-25-l no-border">'
          +'<div class="btn-group btn-block">'
          +'<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
          +'<span class="col-lg-12">'
          +'<span class="pull-left">'+data.criteria.categories[i].name+'</span>'
          +'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
          +'</span>'
          +'</button>'
          + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" required onclick="add_event_listener_for_fields(event)" role="menu" id="js-field-dropdown-' + search_fields_count + '">'
          +'</ul>'
          +'</div>'
          +'</td>'
          +'<td class="td-38 no-border">'
          + '<input type="text" class="form-control input-search" placeholder="'+placeholder_text+'" value="'+data.criteria.categories[i].value+'" onkeyup="add_event_listener_for_input(event);">'
          +'</td>'
          +'<td class="td-25 no-border">'
          +'<div class="btn-group btn-block">'
          +'<button type="button" id="'+importance_id+'" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
          +'<span class="col-lg-12 sqb-importance-dropdown-padding">'
          +'<span class="pull-left">';
          var parent_class_mobile = search_properties_js.search_mobile_parent_class_name;
          var div_row_id_mobile = search_properties_js.row_id_mobile+search_fields_count;
          new_row_xs ='<tr onclick = "search_row_click(event);" class="tr-no-padding no-border  '+parent_class_mobile+'" id="' +div_row_id_mobile+ '">'
          +'<td class="td-10-priority no-border">'
          +'<img id = "img-'+search_fields_count+'" src="'+static_cdn_path+static_files_version+'/images/MustHave_Gray.svgz" class="priority-icon-mobile" width="18px" height="18px"></td>'
          +'<td class="ss-name-xs td-80-icons no-border"><small class="gray-styling">'+data.criteria.categories[i].name+'</small><br>'
          +data.criteria.categories[i].value+'</td>'
          +'<td class="td-10 sbuilder-link no-border">'
          +'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px" class="p-r-5" onclick="mobile_filter_click(event)"></td>'
          +'</tr>';
          if(data.criteria.categories[i].importance==="1"){
            new_row+='<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">Must Have</span>';
            $(new_row_xs).find("td:first").html('<img src="'+static_cdn_path+static_files_version+'/images/MustHave_Gray.svgz" class="icon-dd" width="18px" height="18px">');
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/MustHave_Gray.svgz");            
          }
          else if(data.criteria.categories[i].importance==="2"){
            new_row+='<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">Great to Have</span>';
            $(new_row_xs).find("td:first").html('<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_Gray.svgz" class="icon-dd" width="18px" height="18px">');
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/GreatToHave_Gray.svgz");
          }
          else{
            new_row+='<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">Nice to Have</span>';
            $(new_row_xs).find("td:first").html('<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_Gray.svgz" class="icon-dd" width="18px" height="18px">');
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/NiceToHave_Gray.svgz");
          }
          if(data.criteria.categories[i].importance==="1" && data.criteria.categories[i].name === configuration_var.keyword_phase_to_exclude){      		
      			new_row+='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
                +''
                +'</button>'
                + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id+'" onclick="add_event_listener_importance(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
                +'<li><a href="#" class="dropdown-li-p2">'
                +'<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
                +'Must Have</a></li>'
                +'<li><a href="#" class="dropdown-li-p2 disable-selected">'
                +'<img src="'+static_cdn_path+static_files_version+'/images/Arrow_GreatToHave_Disabled.svgz" class="icon-dd" width="18px" height="18px">'
                +'Great to Have</a></li>'
                +'<li><a href="#" class="dropdown-li-p2 disable-selected">'
                +'<img src="'+static_cdn_path+static_files_version+'/images/Arrow_NiceToHave_Disabled.svgz" class="icon-dd" width="18px" height="18px">'
                +'Nice to Have</a></li>'
                +'</ul>'
                +'</div>'
                +'</td>'
                +'<td class="td-12 no-border">'
                +'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter(event);">'
                +'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td></tr>';
      		}
          else{
            new_row+='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
            +''
            +'</button>'
            + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id+'" onclick="add_event_listener_importance(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
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
            +'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter(event);">'
            +'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td></tr>';
          }
          var model_name = "";
          if(search_properties_js.id === 'current'){
            model_name = search_model;
          }else{
            model_name = view_edit_model;
          }
          model_name.total["R" + search_fields_count] = {
              D1: {
                v1: "Position",
                v2: "Location",
                v3: "Include Keyword",
                v4: "Exclude Keyword",
                v5: "Skills"
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

          if(search_properties_js.id === 'edit'){
            $(new_row).insertAfter($(".searchby-edit-fields:last"));
          }else{
            $(new_row).insertAfter($("#"+search_properties_js.search_parent_node_id +" .container:first table tr:last"));
          }
          var element = $("#"+importance_id).parent().find('li')[parseInt(data.criteria.categories[i].importance)-1];
          $(element).addClass('active-li');
          if(data.criteria.categories[i].importance==="1"){
        		if (data.criteria.categories[i].name === configuration_var.keyword_phase_to_exclude) {        			
        			$('li').on('click',function(e){   		
        		  		var class_name = $(this).find('a').attr('class');
        		  		if(class_name.indexOf('disable-selected') > -1){
        		  			return false;
        		  		}
        			});
        			//$("#"+search_properties_js.search_parent_node_id).find('#'+importance_id).attr('disabled', 'disabled');
        		}
          }
         /* var mob_length = $(".ss-current-search").find("table tr.searchby-fields-xs:last");
          if(mob_length !== undefined && mob_length !== null && mob_length.length !==0){
            $(new_row_xs).insertAfter($(".ss-current-search").find("table tr.searchby-fields-xs:last"));
          }else{
            $(new_row_xs).insertBefore($(".ss-current-search").find("table tr:first"));
          }*/
          var mob_length = $("#"+search_properties_js.search_parent_node_id +" .ss-"+search_properties_js.search_parent_node_id).find("table tr."+check_row_id+":last");
          if(mob_length !== undefined && mob_length !== null && mob_length.length !==0){
        	  $(new_row_xs).insertAfter($("#"+search_properties_js.search_parent_node_id +" .ss-"+search_properties_js.search_parent_node_id).find("table tr."+check_row_id+":last"));
          }else{
        	  $(new_row_xs).insertBefore($("#"+search_properties_js.search_parent_node_id +" .ss-"+search_properties_js.search_parent_node_id).find("table tr:first"));
          }
          model_name.total["R"+search_fields_count].selected_D1=data.criteria.categories[i].name;
          if(data.criteria.categories[i].importance==="1"){
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/MustHave_Gray.svgz");
          }
          else if(data.criteria.categories[i].importance==="2"){
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/GreatToHave_Gray.svgz");
          }
          else{
            $("#img-"+search_fields_count).attr("src",static_cdn_path+static_files_version+"/images/NiceToHave_Gray.svgz");
          }
        }
        if(search_properties_js.id === 'edit'){
          $(".searchby-edit-fields:first").remove();
        }
        var total_number_searchfields = $("."+search_properties_js.search_parent_class_name).length;
        var model_ids=get_model_ids();
        for (var iloop = 0; iloop < model_ids.length; iloop++) {
          if (model_name.total["R" + model_ids[iloop]].selected_D1 === configuration_var.location) {
            //loc_flag_element_id = model_ids[iloop];
        	  set_flags(configuration_var.location,new_row_class,model_ids[iloop]);
          }
          if (model_name.total["R" + model_ids[iloop]].selected_D1 === configuration_var.range_field) {
            //range_flag_element_id = model_ids[iloop];
        	  set_flags(configuration_var.range_field,new_row_class,model_ids[iloop]);
          }
        }
        /*********************************** Limit number of rows to 10********************************************/
        if (total_number_searchfields === 1) {
          $("."+search_properties_js.search_parent_class_name+" #"+search_properties_js.search_drop_partial_id + $("."+search_properties_js.search_parent_class_name).attr("id").split("-")[3]).parent().parent()
          .parent().find("td:nth-child(4)>img:first")
          .attr("src", static_cdn_path+static_files_version+"/images/MinusCircle.svgz").attr("onclick", "deleteFilter(event);");
        }
        //************************************Add new row on click of plus******************************************//*
        $("."+search_properties_js.search_parent_class_name+" td:nth-child(4)>img:nth-child(2)").remove();
        var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td>';
        var div = $("."+search_properties_js.search_parent_class_name+":last").find(".js-delete-btn").parent();
        if (!(div.children().hasClass("js-add-btn"))) {
        	if(total_number_searchfields !== 10){
        		$("."+search_properties_js.search_parent_class_name+":last").find(".js-delete-btn").parent().append(add_btn_html);
        	}
        }
        for (var j = 1; j <= ids.length; j++) {
          update_search_model(ids[j]);
        }
        $("#"+search_properties_js.check_box_div_id+" .show-results").removeClass("disabled");
        if(data.results===0){
          $("#"+search_properties_js.check_box_div_id).addClass("in");
        }
      }
      else{
    	if(search_type === "A"){
    		$("#"+search_properties_js.search_parent_mobile_node_id+" ."+search_properties_js.search_mobile_parent_class_name).remove();
    		var mob_length = $("#"+search_properties_js.search_parent_node_id +" .ss-"+search_properties_js.search_parent_node_id).find("table tr."+check_row_id);
    		var height = $(window).height();
			if(mob_length.length === 0 && (isMobile.any() && height <768 )){
				search_model.total = [];
			}
    	}
        //populate_fields(1);
      }
      //DES-2399 - Fixed
      if(data.criteria.eligible_to_work===true){
        $("#"+search_properties_js.check_box_div_id+" input[type=checkbox]:last").prop("checked", true);
        $("#"+search_properties_js.mobile_check_box_id+" input[type=checkbox]:last").prop("checked", true);
      }else {

        $("#"+search_properties_js.check_box_div_id+" input[type=checkbox]:last").prop("checked", false);
        $("#"+search_properties_js.mobile_check_box_id+" input[type=checkbox]:last").prop("checked", false);
      }
      if(data.criteria.willing_to_travel===true){
        $("#"+search_properties_js.check_box_div_id+" input[type=checkbox]:first").prop("checked", true);
        $("#"+search_properties_js.mobile_check_box_id+" input[type=checkbox]:first").prop("checked", true);
      }else {

        $("#"+search_properties_js.check_box_div_id+" input[type=checkbox]:first").prop("checked", false);
        $("#"+search_properties_js.mobile_check_box_id+"3 input[type=checkbox]:first").prop("checked", false);
      }

      /***************End Pre Population************************/
    }
    else{
      populate_fields(1);
      $(".sortby").hide();
      $(".mobile-sort").hide();
      //$("#btn-load-more").hide();
      $('#btn-load-more').addClass('hide');
      $('#btn-load-more').removeClass('show');
    }

    if(data.eligible_sort_options && data.eligible_sort_options.length>0){
      $('#sort_dropdown').html('');
      $('#sort_dropdown-mob').html('');
      if (data.sort_order){
        var sort_val = get_sort_value(data.sort_order);
        sort_dropdown_bind(data.eligible_sort_options,sort_val);
        var sort_image='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
        $("#dLabel").html(sort_val+sort_image);
        $("#A1 span.selectedValue").html(sort_val+sort_image);
      }
    }

    if(data.results !== null && data.results !== undefined && data.results.length > 1 ){
      $('.sortby').removeClass("hide");
      $('.sortby').addClass("show");
      sort_data = true;
      if($(window).width() < 768){ 
	      $('.mobile-sort').removeClass("hide-filter");
	      $('.mobile-sort').addClass("show-filter");
      }
      //$('#sort-dropdown').removeClass("hide");
      //$('#sort-dropdown').addClass("show");
    }
    if(data.number_of_listings !== null && data.number_of_listings !== undefined){
      var text_to_be_displayed="";
      if(data.number_of_listings === 1){
        text_to_be_displayed = data.number_of_listings+configuration_var.search_job_found;
      }else{
        text_to_be_displayed = data.number_of_listings+configuration_var.search_jobs_found;
      }
      if(data.search_type === "C" && data.criteria === null){
        text_to_be_displayed = configuration_var.search_jobs_matching;
      }
      $("#"+search_properties_js.search_parent_node_id+" .long-text2:first").html(text_to_be_displayed);
      $("#"+search_properties_js.search_parent_node_id+" .long-text3:first").html(text_to_be_displayed);
    }

    if(data.search_type === "C" && (!data.criteria || data.criteria === null ||data.criteria.length<=0)){
      $("#"+search_properties_js.check_box_div_id).addClass("in");
      $("#"+search_properties_js.mobile_check_box_id).addClass("in");
    }
    else if(search_type === "A"){
      $("#"+search_properties_js.check_box_div_id).removeClass("in");
      $("#"+search_properties_js.mobile_check_box_id).removeClass("in");
      line_shade_display_js(false);
    }
    else{
    	setTimeout(function(){
    		var search_text = $('#myTab').find('li.active').find('span').text();
    		$("#"+search_properties_js.check_box_div_id).removeClass("in");
    		if(search_text !== configuration_var.search_type_mob_ss){
    			line_shade_display_js(false);
    		}
    		if(search_text !== configuration_var.search_type_mob_ss){
    			$("#"+search_properties_js.mobile_check_box_id).removeClass("in");
    			//line_shade_display_js(false);
    		}else{
    			$("#"+search_properties_js.mobile_check_box_id).addClass("in");
    			//line_shade_display_js(true);
    		}
    	},300);
    }
    dropdown_remove_highlight();
    var window_width = $(window).width();
    var refine_results = $("#mob-refine").find('.refine-results').hasClass("hidden");
    if(/*isMobile.any() &&*/ search_properties_js.id === "current" && window_width<768 && !refine_results){
    	var parent_class = search_properties_js.search_parent_mobile_node_id;
    	var img_src = $("#"+parent_class).find('.refine-arrow').attr("src");
    	if(img_src.indexOf("Down")>-1){
    		$('#current-search').removeClass('new_padding_search');  
    		$('#current-search').addClass('new_padding_search');
    		$('#current-search .container').addClass('new_padding_search');
    		$('.mobileButtonContainer').removeClass("p-t-9");
    		$('.mobileButtonContainer').removeClass("p-b-15");
    		$('#ss-curr-search-container #mob-refine').addClass("m-b-6");
    	}else{
    		$('#current-search').removeClass('new_padding_search');  
    		$('#current-search .container').removeClass('new_padding_search');
    		$('#current-search .refine-results').addClass('new-margin-search');
    		$('.mobileButtonContainer').addClass("p-t-9");
    		$('.mobileButtonContainer').addClass("p-b-15");
    		$('#ss-curr-search-container #mob-refine').removeClass("m-b-6");
    	}
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": populate_criteria :" + err);
  }
};
var line_shade_display_js = function(display){
	var display_property = "display : block";
	if(!display){
		if(search_properties_js.id === "current"){
			$('#current-search * .sqb-line-shade').css('display','none');	
			$('.line-shade11-custom').addClass('hidden');
		}else if(search_properties_js.id === "new"){
			$('#new-search * .sqb-line-shade').css('display','none');		
			$('.line-shade11-custom-new').addClass('hidden');
		}else{
			$('#view-edit * .sqb-line-shade').css('display','none'); 
			$('#saved-search .refine-results').removeClass("collapsed");
			$('.line-shade11-custom-saved').addClass('hidden');
		}
	}else{
		if(search_properties_js.id === "current"){
			$('#current-search * .sqb-line-shade').removeAttr('style'); 				 
			$('.line-shade11-custom').removeClass('hidden'); 
			/*var total_search_rows = $(".searchby-fields-xs").length;
			if(total_search_rows === 0){
				$('.line-shade11-custom').addClass('hidden');
			}*/
		}else if(search_properties_js.id === "new"){
			  $('#new-search * .sqb-line-shade').removeAttr('style'); 				  
			  $('.line-shade11-custom-new').removeClass('hidden'); 
		}else{
			$('#view-edit * .sqb-line-shade').removeAttr('style');
			$('#saved-search * .sqb-line-shade').removeAttr('style');
			$('.line-shade11-custom-saved').removeClass('hidden'); 
		}
	}
}

/**
 * generic function for binding list
 */
var generic = function(para) {
  try{
    var d1_html = '';
    $.each(para, function (key, value) {
      d1_html += '<li id="fields' + key + '"><a href="#">' + value + '</a></li>';
    });
    return d1_html;
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": generic :" + err);
  }
};

/**
 * populating saved search
 */
var populate_saved_search=function(data){
  try{
    var add_in_new_tab,addnewtab_in_xs;
    if(data.search_names!=="" && data.search_names!==null && data.search_names !== undefined  && data.search_names.length !== 0){
      for(var i=0;i<data.search_names.length;i++){
        var desktop_row = "des-"+data.search_names[i].search_id;
        var mobile_row = "mob-"+data.search_names[i].search_id;
        add_in_new_tab='<tr id ="'+desktop_row+'"class="tr-no-padding"><td id="'+data.search_names[i].search_id+'" class="ss-name td-60 tr-no-border-top">'
        +data.search_names[i].search_name+'</td><td id="search-id" class="col-lg-1 tr-no-border-top"></td>'
        +'<td class="td-10 sbuilder-link tr-no-border-top">'
        +'<a href="" data-toggle="modal" data-target="#myModal23" class="white-styling" onclick=populate_remove_id(event,"'
        +data.search_names[i].search_id+
        '")>REMOVE</a></td>'
        +'<td class="td-15 sbuilder-link tr-no-border-top" onclick=show_view_edit_container("'
        +data.search_names[i].search_id+
        '")> <a href="#view-edit" class="white-styling">VIEW / EDIT</a><img class="margin_l_3" src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px"></td>'
        +'<td class="text-right td-15 tr-no-border-top">'
        +'<button type="button" class="btn btn-primary wide-btn" onclick=show_search_results("'
        +data.search_names[i].search_id+
        '")>Search</button></td></tr>';
        addnewtab_in_xs='<tr id = "'+mobile_row+'" class="tr-no-padding no-border" id="'+data.search_names[i].search_id+'">'
        +'<td class="ss-name-xs td-80 no-border"><div class="adjust-search-name"><a  class="white-styling">'+data.search_names[i].search_name+'</a></div></td>'
        +'<td class="td-10-l sbuilder-link no-border"><a  class="white-styling"><i class="fa fa-search" onclick=show_search_results("'
        +data.search_names[i].search_id+
        '")></i></a></td>'
        +'<td class="td-10 sbuilder-link no-border" data-name = "'+data.search_names[i].search_name+'" data-info ="'+data.search_names[i].job_id+'"><a  onclick=saved_search_view(event,"'
        +data.search_names[i].search_id+
        '")>'
        +'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px" class="p-r-5"></a></td>'
        +'</tr>';
        $("#saved-search-table tbody:last").append(add_in_new_tab);
        $("#saved-search-table-mob tbody:last").append(addnewtab_in_xs);
        $("#saved-search-view>h6").html("");
        apply_saved_search_height();
      }
      //console.log($("#saved-search-table tr:last"));
      //$("#saved-search-table tr:last").css("cssText","border-bottom:none !important")
    }
    else{
      $("#saved-search .container").html('<h3 class="long-text2">You haven\'t created any saved searches yet</h3>');
      //For mobile
      $("#saved-search-view").html('');
      $("#saved-search-view").append('<h6 class="mob-long-text2 mob-long-vcenter">You haven\'t created any saved searches yet</h6>');
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": populate_saved_search :" + err);
  }
};
/**
 * populate fields
 */
var populate_fields = function(id) {
  try{
    var d1_html_returned = '';
    var d2_html = '';
    var total_rows = get_total_rows_on_ui();
    var drop_partial_id = '';
    var parent_class_name='';
    var split_id = 0;
    var initialize_count=0;
    var model_name=null;
    var parent_node_id='';
    var drop_importance_id = "";
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      drop_partial_id = "#js-field-dropdown-";
      parent_class_name=".searchby-fields";
      split_id=2;
      initialize_count=0;
      parent_node_id="#current-search";
      model_name=null;
      model_name=search_model;
      drop_importance_id = "#js-importance-dropdown-";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block){
      drop_partial_id = "#js-field-dropdown-";
      parent_class_name=".searchby-edit-fields";
      split_id=3;
      initialize_count=0;
      parent_node_id="#view-edit";
      model_name=null;
      model_name=view_edit_model;
      drop_importance_id = "#js-importance-dropdown-";
    }

    /**** Populate Fields dropdown ******/
    var id_temp;
    var temp_el;
    var fields_length = $(parent_class_name).length;
    for (var k = initialize_count; k <= fields_length; k++) {
      temp_el = $(parent_class_name)[k];
      if ($(temp_el).attr("id")) {
        id_temp = $(temp_el).attr("id").split("-")[split_id];
        if(model_name.total["R" + id_temp] && model_name.total["R" + id_temp].D1){
        	d1_html_returned = generic(model_name.total["R" + id_temp].D1);
        }
      }
      $(parent_node_id+" "+drop_partial_id + id_temp).empty().html('');
      $(parent_node_id+" "+drop_partial_id + id_temp).append(d1_html_returned);
      var field_text = $(parent_node_id+" "+drop_partial_id + id_temp).parent().find('button>span>span').text();
      $(parent_node_id+" "+drop_partial_id + id_temp).find('li>a').each(function(i) {
        var element = $(parent_node_id+" "+drop_partial_id + id_temp).find('li>a')[i];
        if(field_text === $(parent_node_id+" "+drop_partial_id + id_temp).find('li>a')[i].text){
          $(element).parent().addClass('active-li');
        }else{
          $(element).parent().removeClass('active-li');
        }
      });
    }

    if (fields_length === 1) {
    	var text_box_value = $(parent_class_name+' '+drop_partial_id+$(parent_class_name).attr("id").split("-")[split_id]).parent().parent().parent().find(".input-search").val();
		if(!text_box_value || text_box_value === ""){
			$(parent_class_name+' '+drop_partial_id+$(parent_class_name).attr("id").split("-")[split_id]).parent().parent().parent().find(".input-search").attr("value");
		}
		if (($(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text() !== "Select") ||
				($(parent_class_name+' '+drop_importance_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text() !== "Select") ||
				(text_box_value !=="")) {
		
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("js-delete-btn");

        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first")
        .attr("src", static_cdn_path+static_files_version+"/images/ClearButton_M.svgz").attr("onclick", "clear_fields()");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").addClass("addpointer");
       setTimeout(function(){
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").addClass('adjust-height');},50);
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").css("visibility","visible");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:last").css("visibility","visible");
      }else{
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:last").css("visibility", "hidden");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first")
        .attr("src", static_cdn_path+static_files_version+"/images/AddCircle.svgz").attr("onclick", "addNewFilter()");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").addClass("js-add-btn");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("js-delete-btn");
        $(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("adjust-height");
        /*$(parent_class_name+' '+drop_partial_id + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("m-r-10");*/
      }
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": populate_fields :" + err);
  }
};

/**
 * Clearing fields
 */
var clear_fields = function() {
  try{
    clear_error_fields();
    var parent_class_name = '';
    var split_id = 2;
    var text = "";
    if ($("#view-edit").css("display") === configuration_var.search_display_block) {
      parent_class_name = ".searchby-edit-fields";
      split_id = 3;
      view = "view_edit";
    }
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
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").text("Select");
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().find("button>span>span").addClass('clsDefaultTextColor');
    var text_box_element = $(parent_class_name +" #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().find(".input-search");
    $(text_box_element).val('');
    $(text_box_element).attr("value","");
    $(text_box_element).attr("placeholder", "");
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").text("Select");
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").addClass('clsDefaultTextColor');
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find("button>span>span").addClass('ipad-padding-left');
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent().parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find('li').removeClass('active-li');
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find('button').attr("disabled",false);
    $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent()
    .parent().parent().find("button").removeClass("error-txt");
    var text_box_element = $(parent_class_name +" #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().find(".input-search").removeClass("error-txt");
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
  $(parent_class_name + " #js-field-dropdown-" + $(parent_class_name).attr("id").split("-")[split_id]).parent().parent()
    .parent().parent().find("tr:nth-child(2)").find("td:nth-child(3)").find(".js-importance-dropdown").html(imp_drop_values);
    /*DES-6632*/
    
    
    update_search_model(1);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": clear_fields :" + err);
  }
};

/**
 * Add new filter criteria
 */
var addNewFilter = function() {
  try{
    clear_error_fields();
    var total_rows = 0;
    var new_row_id,new_row_class,split_id;
    var model_name=null;
    var view = "";
    var total_number_searchfields;
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      new_row_id = "searchby-fields-";
      new_row_class="searchby-fields";
      split_id=2;
      total_rows=get_total_no_of_rows();
      model_name=null;
      model_name=search_model;
      view = "";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block){
      new_row_id = "searchby-edit-fields-";
      new_row_class="searchby-edit-fields";
      split_id=3;
      total_rows=get_total_no_of_rows_viewedit();
      model_name=null;
      model_name=view_edit_model;
      view = "view_edit";
    }
    //check_location(model_name);
    var ipad_class = get_importance_class();
    var importance_id = "importance_";
    var new_row = '<tr class="tr-no-padding '+new_row_class+'" id="'+new_row_id + (++search_fields_count) + '">'
    +'<td class="ss-name td-25-l no-border">'
    +'<div class="btn-group btn-block">'
    +'<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
    +'<span class="col-lg-12">'
    +'<span class="pull-left clsDefaultTextColor">Select</span>'
    +'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
    +'</span>'
    +'</button>'
    + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields(event)" role="menu" id="js-field-dropdown-' + search_fields_count + '">'
    +'</ul>'
    +'</div>'
    +'</td>'
    +'<td class="td-38 no-border">'
    + '<input type="text" class="form-control input-search" placeholder="" value="" onkeyup="add_event_listener_for_input(event);">'
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
    + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id + (search_fields_count) + '" onclick="add_event_listener_importance(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
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
    +'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter(event);">'
    +'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td></tr>';
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
          v5: "Skills"
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
    if(view !== ""){
      total_number_searchfields = $(".searchby-edit-fields").length;
    }
    else{
      total_number_searchfields = $("."+new_row_class).length;
    }
    /*********************************** Limit number of rows to 10********************************************/
    if (total_number_searchfields < 10) {
      if (total_number_searchfields === 1) {
        $("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first")
        .attr("src", static_cdn_path+static_files_version+"/images/MinusCircle.svgz").attr("onclick", "deleteFilter(event);");
        $("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").addClass("js-delete-btn");
        setTimeout(function(){
        $("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("adjust-height");},100);
        /*$("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("m-r-10");*/
        $("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").removeClass("js-add-btn");
        $("." + new_row_class + " #js-field-dropdown-" + $("."+new_row_class).attr("id").split("-")[split_id]).parent().parent()
        .parent().find("td:nth-child(4)>img:first").css("visibility","visible");
      }
      /************************************Add new row on click of plus******************************************/
      if(("#"+new_row_id)==="#searchby-fields-"){
        $(new_row).insertAfter($("#search-by .searchby-fields:last"));
        $(new_row_xs).insertAfter($(".ss-current-search").find("table tr.searchby-fields-xs:last"));
      }
      else{
        $(new_row).insertAfter($(".searchby-edit-fields:last"));
      }
      $("."+new_row_class).find(".js-add-btn").remove();
      $("."+new_row_class).find(".add-new-filter").remove();
      if(total_number_searchfields < 9){
        var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td>';
        var div = $("."+new_row_class+":last").find(".js-delete-btn").parent();
        if (!(div.children().hasClass("js-add-btn"))) {
          $("."+new_row_class+":last").find(".js-delete-btn").parent().append(add_btn_html);
        }
      }
      var ids = get_model_ids();
      for (var i = 0; i < ids.length; i++) {
        if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.location) {
          set_flags(configuration_var.location,new_row_class,ids[i]);
        }
        if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.range_field) {
          set_flags(configuration_var.range_field,new_row_class,ids[i]);
        }
        if (model_name.total["R" + ids[i]].selected_D1 === configuration_var.position) {
          set_flags(configuration_var.position,new_row_class,ids[i]);
        }
        update_search_model(ids[i]);
        disable_show_results_button();
        disable_show_search_button();
      }
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": addNewFilter :" + err);
  }
  adjust_compatibility_button();
};
/**
 * Delete filter on click of '-'
 */
var deleteFilter = function(e) {
  try{
    clear_error_fields();
    $('.drop-search-main44').removeClass("error-txt");
    $('.input-search').removeClass("error-txt");
    var parallel_id='';
    var drop1_value='';
    var new_row_id,new_row_class,split_id;
    var view = "";
    var parent_id='';
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      row_id = "#searchby-fields-";
      row_class=".searchby-fields";
      new_row_class = "searchby-fields";
      split_id=2;
      model_name=search_model;
      view = "";
      table_id="#search-by";
      parent_id="#current-search";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block){
      row_id = "#searchby-edit-fields-";
      row_class=".searchby-edit-fields";
      new_row_class = "searchby-edit-fields";
      split_id=3;
      model_name=view_edit_model;
      view = "view_edit";
      table_id="#search-by-edit";
      parent_id="#view-edit";
    }
    if(view !== ""){
      total_number_searchfields = $(".searchby-edit-fields").length;
    }
    else{
      total_number_searchfields = $("."+new_row_class).length;
    }
    if (total_number_searchfields && total_number_searchfields ===1){
      return;
    }
    var parentElement = $(e.target).parent().parent(row_class);
    var parentElement_id = $(parentElement).attr("id").split("-")[split_id];
    var drop1_value = $(parentElement).find("button:first>span>span").text();
    if (drop1_value === configuration_var.location) {
      model_name.total["R" + parentElement_id].selected_D1 = "";
      set_flags(configuration_var.location,new_row_class,null);
      set_flags(configuration_var.range_field,new_row_class,null);
      if ($("#current-search").css("display") === configuration_var.search_display_block) {
        location_title_flag = false;
      }
      else if($("#view-edit").css("display")===configuration_var.search_display_block){
        location_view_title_flag=false;
      }
      for (var t = 0; t < $(parentElement).siblings(row_class).length ; t++) {
        var element = $(parentElement).siblings(row_class)[t];
        if ($(element).find("button:first>span>span").text() === configuration_var.range_field){
          delete model_name.total["R" + $(element).attr("id").split("-")[split_id]];
          $(element).remove();
        }
      }
    }
    if (drop1_value === configuration_var.range_field) {
      model_name.total["R" + parentElement_id].selected_D1 = "";
      set_flags(configuration_var.range_field,new_row_class,null);
    }
    if(view !== ""){
      if(total_number_searchfields > 1){
        delete  model_name.total["R" + parentElement_id];
        $("#searchby-fields-xs-" + parentElement_id).remove();
        $(parentElement).remove();
      }
    }
    else{
      delete  model_name.total["R" + parentElement_id];
      $("#searchby-fields-xs-" + parentElement_id).remove();
      $(parentElement).remove();
    }
    if(drop1_value === configuration_var.position){
        if($("#view-edit").css("display")===configuration_var.search_display_block){
            check_position(row_class,"view",parentElement_id);
          }
          else{
            check_position(row_class,"current",parentElement_id);
          }
    }
    /*if (drop1_value == "Location") {
      check_location(search_model);
    }*/
    if($(row_class).length===0){
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
      + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields(event)" role="menu" id="js-field-dropdown-1">'
      + '</ul>'
      + '</div>'
      + '</td>'
      + '<td class="td-38 no-border">'
      + '<input type="text" class="form-control input-search" placeholder="" value="" onkeyup="add_event_listener_for_input(event);">'
      + '</td>'
      + '<td class="td-25 no-border">'
      + '<div class="btn-group btn-block">'
      + '<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
      + '<span class="col-lg-12 sqb-importance-dropdown-padding">'
      + '<span class="pull-left">'
      + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px">'
      + 'Must Have</span>'
      + '<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
      + '</span>'
      + '</button>'
      + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" onclick="add_event_listener_importance(event);" role="menu" id="js-importance-dropdown-1">'
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
      + '<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter(event);">'
      + '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td></tr>';

      model_name.total["R" + 1] = {
          D1: {
            vdefault: "Select",
            v1: "Position",
            v2: "Location",
            v3: "Include Keyword",
            v4: "Exclude Keyword",
            v5: "Skills"
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
    }
    var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td>';
    var div = $(row_class+":last").find(".js-delete-btn").parent();
    if (!(div.children().hasClass("js-add-btn"))) {
      $(row_class+":last").find(".js-delete-btn").parent().append(add_btn_html);
    }
    var total_rows = 0;
    if(view !== ""){
      total_rows = get_total_no_of_rows_viewedit();
    }else{
      total_rows = get_total_no_of_rows();
    }
    update_search_model(1);
    disable_show_results_button();
    disable_show_search_button();
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": deleteFilter :" + err);
  }
  adjust_compatibility_button();
};

var add_event_listener_for_search_name = function(event) {
	/*console.log(event);
	$("#error").text("")
	$("#SearchName").removeClass("error-txt");
	if($("#myModal22 #modal-error-display")){
		$("#myModal22 #modal-error-display").remove();

	}*/
};

/**
 * add_event_listener_for_input
 */
var add_event_listener_for_input = function(e) {
  try{
    $(e.target).parent().parent().find(".input-search").autocomplete({ disabled: true });
    clear_error_fields();
    $("#search-error").text("");
    var regex_digits = /[0-9]|\./;
    var regex_alphabets = /^[A-Za-z,\. ]+$/;
    var split_id=2;
    var row_class;
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      split_id=2;
      row_class=".searchby-fields";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block){
      split_id=3;
      row_class=".searchby-edit-fields";
    }
    $(e.target).parent().parent().find(".input-search").removeClass("error-txt");
    var input_text = $(e.target).val();

    if(input_text === "") {
      $(e.target).parent().parent().find(".input-search").addClass('clsDefaultTextColor');
    }
    else {
      $(e.target).parent().parent().find(".input-search").removeClass('clsDefaultTextColor');
    }
    set_input_text(input_text);
    var id = $(e.target).parent().parent().attr('id').split('-')[split_id];
    $(".ss-current-search").find("tr#searchby-fields-xs-" + id).find("td:nth-child(2)").append(get_input_text());
    var place_holder = $(e.target).attr('placeholder');
    var element = $(e.target).parent().parent();
    var value = $(e.target).parent().parent().find(".input-search").val();
    check_values(row_class,id);
    if($(e.target).parent().parent().find("button:first>span>span").text()===configuration_var.location){
      if (input_text !== undefined && input_text !== null){
        if (regex_digits.test(input_text)) {
        }
        else if (regex_alphabets.test(input_text)) {
          var key = e.keyCode || e.charCode;
          var autosugest_position = 2;
          if(key === 8 || key === 46)
          {
            autosugest_position = 3;
          }
          if(input_text.length>=autosugest_position){
            var id_text = $(e.target).parent().parent().attr('id');
            $(e.target).parent().parent().find(".input-search").autocomplete({ disabled: false });
            get_autosuggest_values(input_text,id_text);
          }
          if(input_text.split(",").length===2){
            check_valid_city_state($(e.target).val(),element);
          }
        }
      }
    }
    disable_show_results_button();
    disable_show_search_button();
    populate_fields(1);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listener_for_input :" + err);
  }
};
/**
 * sort_event_listener
 */
var sort_event_listener = function(e){
  e.preventDefault();
  try{
    var field_text = $(e.target).text();
    $(".sortby>ul>li").find();
    var img_chev='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
    $(e.target).parent().parent().parent().find("#dLabel").html(field_text+img_chev);
    if(!jQuery.parseJSON($("#searchresultsdata").val()).eligible_for_score){
      var sort_options='<li role="presentation" class="active-li"><a role="menuitem" tabindex="-1" href="#",name="D">Distance</a></li>'
        +'<li role="presentation"><a role="menuitem" tabindex="-1" href="#",name="PD">Posted Date</a></li>'
        +'<li role="presentation"><a role="menuitem" tabindex="-1" href="#",name="SF">Search Fit</a></li>';
      $(".sortby>ul").html(sort_options);
    }
    sort_search_results(field_text);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": sort_event_listener :" + err);
  }
};

/**
 * clear_fields_mobile
 */
var clear_fields_mobile = function() {
  try{
    clear_mobile_fields();
    $("#clear-fields").hide();
    $('#importance_mobile_1').removeAttr("disabled");
    var text = $(".no-m-8-top").find(".dropdown-1>span>span").text("");
    $(".no-m-8-top").find(".dropdown-1>span>span").text("Select");
    $(".no-m-8-top").find(".dropdown-1>span>span").addClass('clsDefaultTextColor');
    $(".no-m-8-top").find(".input-search-ss").val("");
    $(".no-m-8-top").find(".input-search-ss").text("");
    $(".no-m-8-top").find(".input-search-ss").attr("placeholder","")
    $(".no-m-8-top").find(".dropdown-2>span>span").text("Select");
    $(".no-m-8-top").find(".dropdown-2>span>span").addClass('clsDefaultTextColor');
    $("#importance_mobile_1>span>span").css("margin-left","0px");
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": clear_fields_mobile :" + err);
  }
};

/**
 * add_event_listener_for_fields for desktop
 */
var add_event_listener_for_fields = function(e) {
  e.preventDefault();
  try{
    clear_error_fields();
    $("#search-error").text("");
    var row_class;
    var field_text = $(e.target).text();
    var imp_drop_values = '';
    var model_name=null;
    var split_id=0;
    var new_row_class;
    $(e.target).parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
    $(e.target).parent().parent().parent().parent().parent().find(".input-search").addClass('clsDefaultTextColor');
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      model_name=null;
      model_name=search_model;
      split_id=2;
      row_class=".searchby-fields";
      new_row_class = "searchby-fields";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block){
      model_name=null;
      model_name=view_edit_model;
      split_id=3;
      row_class=".searchby-edit-fields";
      new_row_class="searchby-edit-fields";
    }
    $(e.target).parent().parent().parent().find("button").removeClass("error-txt");
    $(e.target).parent().parent().parent().parent().parent().find('button').removeClass("error-txt");
     $(e.target).parent().parent().parent().parent().parent().find('.input-search').removeClass("error-txt");
    $(e.target).parent().parent().val(field_text);
    $(e.target).parent().parent().parent().find("button>span>span").text(field_text);
    var id = ($(e.target).parent().parent().parent().parent().parent().attr('id')).split('-')[split_id];
    $(e.target).parent().parent().parent().parent().parent().find(".input-search").val("");
    $(e.target).parent().parent().parent().parent().find(".input-search-ss").val("");
    $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").html('Select</a></li>');
    $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").addClass('clsDefaultTextColor');
    $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").addClass('ipad-padding-left');
    check_fields_present(row_class);
    check_values(row_class,id);
    $(".ss-current-search").find("tr#searchby-fields-xs-" + id).find("td:nth-child(2)")
    .html('<small class="gray-styling">' + field_text + '</small><br>');//$("#searchby-fields-" + id).find(".input-search").val()
        var create_row_no = 'R' + id;
    //Add the selected field text to the model
    model_name.total[create_row_no].selected_D1 = field_text;
    if (field_text === configuration_var.keyword_phase_to_exclude) {
      imp_drop_values+= '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Must Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2 disable-selected">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/Arrow_GreatToHave_Disabled.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Great to Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2 disable-selected">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/Arrow_NiceToHave_Disabled.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Nice to Have</a></li>';
      $(e.target).parent().parent().parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").html(imp_drop_values);
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder",configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").siblings().find("span>span").html('<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px" >Must Have</a>');
      $('li').on('click',function(e){   		
  		var class_name = $(this).find('a').attr('class');
  		if(class_name.indexOf('disable-selected') > -1){    			
  			return false;
  		}
  	});
      //$(e.target).parent().parent().parent().parent().parent().find('#importance_'+id).attr('disabled', 'disabled');
    }
    else {
      imp_drop_values+= '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Must Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Great to Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="icon-dd" width="18px" height="18px">'
        + 'Nice to Have</a></li>';
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").html(imp_drop_values);
     // $(e.target).parent().parent().parent().parent().parent().find('#importance_'+id).removeAttr("disabled");
      
    }
    if (field_text === "Select"){
      var element =  $(e.target).parent().parent().parent().parent().parent().find(".input-search");
      change_place_holder_attribute(element);
      var element_mobile =  $(e.target).parent().parent().parent().parent().find(".input-search-ss");
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").html(imp_drop_values);
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").siblings().find("span>span").html('Select</a>');
      $(e.target).parent().parent().parent().parent().parent().find('#importance_'+id).removeAttr("disabled");
      change_place_holder_attribute(element_mobile);
      update_search_model(id);
    }

    //Modify the model search criteria if Location is selected once
    if (field_text === configuration_var.location) {
      model_name.total[create_row_no].loc_flag = true;
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.location_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.location_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").html('Select</a></li>');
      $(e.target).parent().parent().parent().parent().parent().find("button:last").removeClass("error-txt");
      update_search_model(id);
    }
    else if (field_text === configuration_var.range_field) {
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.range_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.range_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").html('Select</a></li>');
      $(e.target).parent().parent().parent().parent().parent().find("button:last").removeClass("error-txt");
      model_name.total[create_row_no].range_flag = true;
      set_flags(configuration_var.range_field,new_row_class,id);
      update_search_model(id);
    }
    else if (field_text === configuration_var.position) {
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.position_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.position_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().parent().find("button:last>span>span").html('Select</a></li>');
      $(e.target).parent().parent().parent().parent().parent().find("button:last").removeClass("error-txt");
      update_search_model(id);
    }
    //Update the model if Location & range is not selected in any of the rows
    else {
      if (field_text === configuration_var.key_word_phase_to_include) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      }
      else if (field_text === configuration_var.skill) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.skill_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.skill_placeholder).attr("value", "");
      }
      update_search_model(id);
    }
    disable_show_results_button();
    disable_show_search_button();
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listener_for_fields :" + err);
  }
};
/**
 * change_place_holder_attribute
 */
var change_place_holder_attribute = function(element){
  $(element).val('');
  $(element).attr("value","");
  $(element).attr("placeholder", "");
};
/**
 * add_event_listener_for_fields_smallscreen
 */
var add_event_listener_for_fields_smallscreen = function(e){
  try{
    clear_mobile_fields();
    $("#clear-fields").show();
    $("#user-entered-value").attr("disabled",false);
    var field_text = $(e.target).text();
    var imp_drop_values = '';
    $(e.target).parent().parent().val(field_text);
    $(e.target).parent().parent().parent().find("button>span>span").text(field_text);
    var id = $("#model_id").data('model_value');
    var parent_id = $(e.target).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").split('-')[3];
    var create_row_no = 'R' + id;
    var placeholder_text = get_placeholder_text(field_text);
    highlight_field(field_text);
    $("#user-entered-value").attr("value","");
    $("#user-entered-value").val('');
    $("#user-entered-value").attr("placeholder",placeholder_text);
    $(e.target).parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
    $(e.target).parent().parent().parent().parent().find(".input-search-ss").addClass('clsDefaultTextColor');
    if (field_text === configuration_var.keyword_phase_to_exclude) {
      imp_drop_values+= '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Must Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2 disable-selected">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/Arrow_GreatToHave_Disabled.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Great to Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2 disable-selected">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/Arrow_NiceToHave_Disabled.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Nice to Have</a></li>';
      $(e.target).parent().parent().parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").html(imp_drop_values);
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").siblings().find("span>span").html('<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="priority-icon-mobile" width="18px" height="18px">Must Have</a>');
      $('li').on('click',function(e){   		
    		var class_name = $(this).find('a').attr('class');
    		if(class_name.indexOf('disable-selected') > -1){    			
    			return false;
    		}
      });
      //$(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").find(".disable-selected-mobile").attr("click", "");
      //$(e.target).parent().parent().parent().parent().parent().find('#importance_mobile_'+parent_id).attr('disabled', 'disabled');
    }
    else {
      imp_drop_values+= '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/MustHave_White.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Must Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/GreatToHave_White.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Great to Have</a></li>'
        + '<li><a href="#" class="dropdown-li-p2">'
        + '<img src="'+static_cdn_path+static_files_version+'/images/NiceToHave_White.svgz" class="priority-icon-mobile" width="18px" height="18px">'
        + 'Nice to Have</a></li>';
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").html(imp_drop_values);
      $(e.target).parent().parent().parent().parent().parent().find(".js-importance-dropdown").siblings().find("span>span").html('Select</a>');
      //$(e.target).parent().parent().parent().parent().parent().find('#importance_mobile_'+parent_id).removeAttr("disabled");
    }
    //Modify the model search criteria if Location is selected once
    if (field_text === configuration_var.location) {
      $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.location_placeholder).attr("value", "");
      $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.location_placeholder).attr("value", "");
    }
    //Update the model is Location is not selected in any of the rows
    else {
      if (field_text === configuration_var.key_word_phase_to_include) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.keyword_phase_to_exclude_placeholder).attr("value", "");
      }
      else if (field_text === configuration_var.position) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.position_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.position_placeholder).attr("value", "");
      }
      else if (field_text === configuration_var.skill) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.skill_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.skill_placeholder).attr("value", "");
      }
      else if (field_text === configuration_var.range_field) {
        $(e.target).parent().parent().parent().parent().parent().find(".input-search").attr("placeholder", configuration_var.range_placeholder).attr("value", "");
        $(e.target).parent().parent().parent().parent().find(".input-search-ss").attr("placeholder", configuration_var.range_placeholder).attr("value", "");
      }
    }
    if (field_text === configuration_var.keyword_phase_to_exclude){
    	$("#importance_mobile_1>span>span").css("margin-left","-5px")
    }else{
    	$("#importance_mobile_1>span>span").css("margin-left","0px");
    }
    //$("#js-importance-dropdown-ss-1>li").css("margin-left","-5px");
    //$("#js-importance-dropdown-ss-1>li>a").css("padding-left","6px")
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listener_for_fields_smallscreen :" + err);
  }
};

/**
 * add_event_listener_importance for desktop
 */
var add_event_listener_importance = function(e) {
  e.preventDefault();
  try{
    clear_error_fields();
    $(e.currentTarget).siblings('button').removeClass("error-txt");
    $(e.currentTarget).find('li').removeClass('active-li');
    $(e.target).parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
    $(e.target).parent().parent().parent().find(".ipad-padding-left").removeClass("ipad-padding-left");
    var field_text = $(e.target).text().trim("");
    var selected_importance = $(e.target).html().trim();
    $(e.target).parent().addClass('active-li');
    var id = $(e.target).parent().parent().parent().parent().parent().attr('id').split('-')[2];
    $(e.target).parent().parent().parent().find("button>span>span").html(selected_importance);
    if($(e.target).parent().parent().parent().find("button>span>span img").length===1){
      $(e.target).parent().parent().parent().find("button>span>span").html(selected_importance);
    }
    if (field_text === "Nice to Have") {
      $(".ss-current-search").find("tr#searchby-fields-xs-" + id).find("td:first-child>img").attr("src", static_cdn_path+static_files_version+"/images/NiceToHave_Gray.svgz");
    }
    else if (field_text === "Great to Have") {
      $(".ss-current-search").find("tr#searchby-fields-xs-" + id).find("td:first-child>img").attr("src", static_cdn_path+static_files_version+"/images/GreatToHave_Gray.svgz");
    }
    else if (field_text === "Must Have") {
      $(".ss-current-search").find("tr#searchby-fields-xs-" + id).find("td:first-child>img").attr("src", static_cdn_path+static_files_version+"/images/MustHave_Gray.svgz");
    }
    update_search_model(1);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listener_importance :" + err);
  }
};
/**
 * add_event_listener_importance_smallscreen
 */
var add_event_listener_importance_smallscreen = function(e) {
  try{
    clear_mobile_fields();
    $("#clear-fields").show();
    //if (!$(e.target).parent().hasClass("disabled")) {
      $(e.currentTarget).find('li').removeClass('active-li');
      $(e.target).parent().parent().parent().find(".clsDefaultTextColor").removeClass("clsDefaultTextColor");
      var field_text = $(e.target).text().trim("");
      var selected_importance = $(e.target).html().trim();
      var imp_value = get_importance_value(field_text);
      highlight_importance(imp_value);
      $(selected_importance).attr("id","importance-img");
      $(e.target).parent().parent().parent().find("button>span>span").html(selected_importance);
      //$("#js-importance-dropdown-ss-1>li").css("margin-left","-5px");
      //$("#js-importance-dropdown-ss-1>li>a").css("padding-left","6px")
      $("#importance_mobile_1>span>span").css("margin-left","-5px");
    //}
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listener_importance_smallscreen :" + err);
  }
};

/**
 * get_total_no_of_rows
 */
var get_total_no_of_rows = function() {
  try{
    var total_rows = 0;
    for (i in search_model.total) {
      if (search_model.total[i]) {
        total_rows++;
      }
    }
    return total_rows;
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": get_total_no_of_rows :" + err);
  }
};
/**
 * get_total_no_of_rows_viewedit
 */
var get_total_no_of_rows_viewedit = function() {
  try{
    var total_rows = 0;
    for (i in view_edit_model.total) {
      if (view_edit_model.total[i]) {
        total_rows++;
      }
    }
    return total_rows;
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": get_total_no_of_rows_viewedit :" + err);
  }
};
/**
 * get_total_rows_on_ui
 */
var get_total_rows_on_ui = function(){
  try{
    if($("#current-search").css("display") === configuration_var.search_display_block){
      return $(".searchby-fields").length;
    }else if($("#view-edit").css("display") === configuration_var.search_display_block){
      return $(".searchby-edit-fields").length;
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": get_total_rows_on_ui :" + err);
  }
};
/**
 * get_total_rows_on_ss_ui
 */
var get_total_rows_on_ss_ui = function() {
  try{
    if($("#current-search").css("display") === configuration_var.search_display_block){
      return $(".searchby-fields-xs").length;
    }else if($("#view-edit").css("display") === configuration_var.search_display_block){
      return $(".searchby-edit-fields-xs").length;
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": get_total_rows_on_ss_ui :" + err);
  }
};
/**
 * select_population_function
 */
var select_population_function = function(id){
  try{
      populate_fields(id);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": select_population_function :" + err);
  }
};
/**
 * update_search_model
 */
var update_search_model = function(id) {
  try{
    var ids = get_model_ids();
    var total_rows=0;
    var model_name;
    if ($("#current-search").css("display") === configuration_var.search_display_block) {
      total_rows= get_total_no_of_rows();
      model_name=null;
      model_name=search_model;
      row_class = "searchby-fields";
    }
    else if($("#view-edit").css("display")===configuration_var.search_display_block ||
			$("#saved-search").css("display")===configuration_var.search_display_block){
      total_rows=get_total_no_of_rows_viewedit();
      model_name=null;
      model_name=view_edit_model;
      row_class = "searchby-edit-fields";
    }
    else{
      total_rows=get_total_no_of_rows();
      model_name=null;
      model_name=search_model;
    }
    var location_flag = get_flags(configuration_var.location);
    if (location_flag!=null || location_flag!=undefined) {

      for (var j = 0; j < ids.length; j++) {
        if(model_name.total["R" + ids[j]].D1){
          if(ids[j] != location_flag){
               delete model_name.total["R" + ids[j]].D1.v2;
          }
          //delete model_name.total["R" + ids[j]].D1.v2;
          model_name.total["R" + ids[j]].D1.v6 = configuration_var.range_field;
        }
      }
      delete model_name.total["R" + location_flag].D1.v6;
      select_population_function(location_flag);
    }
    else {
      set_flags(configuration_var.location,row_class,null);
      for (var j = 0; j < ids.length; j++) {
        if(model_name.total["R" + ids[j]] && model_name.total["R" + ids[j]].D1){
          model_name.total["R" + ids[j]].D1.v2 = configuration_var.location;
          model_name.total["R" + ids[j]].loc_flag = false;
          delete model_name.total["R" + ids[j]].D1.v6;
        }
      }
      select_population_function(null);
    }
    var range_flag = get_flags(configuration_var.range_field);
    if (range_flag != null || range_flag != undefined) {
      for (var j = 0; j < ids.length; j++) {
        if(model_name.total["R" + ids[j]].D1){
          delete model_name.total["R" + ids[j]].D1.v6;
        }
      }
      if( model_name.total["R" + range_flag].D1){
        model_name.total["R" + range_flag].D1.v6 = configuration_var.range_field;
        select_population_function(range_flag);
      }
    }
    else{
      set_flags(configuration_var.range_field,row_class,null);
      select_population_function(range_flag);
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": update_search_model :" + err);
  }
};

/**
 * show_addfilter_section
 */
var show_addfilter_section = function() {
  try{
	  $("#clear-fields").hide();
    ++search_fields_count;
    var ids=get_model_ids();
    $("#clicked-field").val('');
    $("#myTab").hide();
    $("#searchby-fields-ss-1").addClass("add-mobile-li-margin");
    populate_mobile_fields("new","","js");
    $("#searchby-fields-ss-1").removeClass("hide-filter");
    $("#searchby-fields-ss-1").addClass("show-filter");
    $(".add_filter_section").find(".apply_changes").attr("onclick", "apply_changes();");
    $(".add_filter_section .dropdown-1>span>span").text("Select");
    $(".add_filter_section .dropdown-1>span>span").addClass('clsDefaultTextColor');
    $(".add_filter_section .input-search-ss").text("");
    $(".add_filter_section .input-search-ss").val("");
    $(".section_prev_to_add_filter").addClass("hide-display");
    $(".add_filter_section").removeClass("hide-display");
    $("#ss-curr-search-container").removeClass("show-filter");
    $("#ss-curr-search-container").addClass("hide-filter");
    $("#ss-saved-container").removeClass("show-filter");
    $("#ss-saved-container").addClass("hide-filter");
    $("#importance_mobile_1").attr("disabled",false);
    $('#searchby-fields-ss-1 img.saved_search_back').attr('src',static_cdn_path+static_files_version+'/images/chevron-o-left.svgz');
    $(".remove-filter-ss").show();
    $("#user-entered-value").attr("placeholder","");
    $(".add_filter_section").show();
    var total_number_searchfields = $(".searchby-fields-xs").length;
    $("#model_id").data('model_value',search_fields_count);
    var model_name = get_model_name("js");
    model_name.total["R" + search_fields_count] = {
        D1: {
          v1: "Position",
          v2: "Location",
          v3: "Include Keyword",
          v4: "Exclude Keyword",
          v5: "Skills"
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
    if(total_number_searchfields > 9){
      $(".add_button").hide();
    }
    update_search_model(1);
    $(".no-m-8-top").find(".dropdown-2>span>span").text("Select");
    $(".no-m-8-top").find(".dropdown-2>span>span").addClass('clsDefaultTextColor');
    $('body,html').scrollTop(0);
    $("#importance_mobile_1>span>span").css("margin-left","0px");
    //$("#js-importance-dropdown-ss-1>li").css("margin-left","-5px");
    //$("#js-importance-dropdown-ss-1>li>a").css("padding-left","6px")
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_addfilter_section :" + err);
  }
};
/**
 * apply_changes
 */
var apply_changes = function() {
  try{
	  
	  var model_name = null;
	  var model_name = get_model_name("js");
	  var sub_class = ".ss-current-search";
	  var class_name;
	  var search_tab;
	  var search_text = $('#myTab').find('li.active').find('span').text();
	  if(search_text === "" && $("#saved-search").css("display") === configuration_var.search_display_block){
		  search_text = "saved";
		  search_tab= "saved";
	  }
	  if (search_text === configuration_var.search_type_job || search_text === configuration_var.search_type_search) {
		  sub_class = ".ss-current-search";
		  class_name = "searchby-fields-xs";
		  search_tab= "current";

	  }else{
		  sub_class = ".ss-saved-search";
		  class_name = "searchby-saved-fields-xs";
		  search_tab= "saved";
	  }
	  
    var valid_inputs = check_valid_inputs_mobile();
    if(valid_inputs){
    	var proceed_changes = proceed_search();
    	if(proceed_changes){
    		$("#myTab").show();
    		$("#searchby-fields-ss-1").removeClass("add-mobile-li-margin");
    		$('.saved-search-fadeout').removeClass('add-mobile-li-margin-save-search');
    		if(search_tab === "current"){
    			$("#current-search").show();
    		}
    		if(search_tab === "saved"){
    			$("#myTab").hide();
    		}
    		var id = $("#model_id").data('model_value');
    		var class_id = class_name+"-"+id;
    		show_search_filters("apply changes");
    		var drop1_value = $(".add_filter_section .dropdown-1>span>span").text();
    		var new_search_filter_xs = '<tr onclick = "search_row_click(event);" class="tr-no-padding no-border '+class_name+'" id="'+class_id+'">'
    		+'<td class="td-10-priority no-border">'
    		+ '<img src="' + $(".add_filter_section .dropdown-2>span>span>img").attr("src").replace("White", "Gray") + '" class="priority-icon-mobile" width="18px" height="18px"></td>'
    		+'<td class="ss-name-xs td-80-icons no-border"><small class="gray-styling">'+drop1_value+'</small><br>'
    		+ $(".add_filter_section .input-search-ss").val()+'</td>'
    		+'<td class="td-10 sbuilder-link no-border">'
    		+'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o-Right.svgz" height="19px" class="p-r-5" onclick="mobile_filter_click(event)"></td>'
    		+'</tr>';
    		//$(new_search_filter_xs).insertAfter($(".demo3 .searchby-fields-xs:last"));
    		/*var mob_length = $(sub_class).find("table tr.searchby-fields-xs:last");
      if(mob_length !== undefined && mob_length !== null && mob_length.length !==0){
    	  $(new_search_filter_xs).insertAfter($(".demo3 "+sub_class +" ."+class_name+":last"));
      }
      else{
    	  $(new_search_filter_xs).insertBefore($(".demo3 "+sub_class ).find("table tr:first"));
      }*/
    		var mob_length = $(sub_class).find("table tr."+class_name+":last");
    		if(mob_length !== undefined && mob_length !== null && mob_length.length !==0){
    			$(new_search_filter_xs).insertAfter($(".demo3 "+sub_class +" ."+class_name+":last"));
    		}
    		else{
    			$(new_search_filter_xs).insertBefore($(".demo3 "+sub_class ).find("table tr:first"));
    		}
    		/*$(".searchby-fields:last button:first>span>span").text(drop1_value);
      $(".searchby-fields:last .input-search").val($(".add_filter_section .input-search-ss").val());
      $(".searchby-fields:last td:nth-child(3) span").html($(".add_filter_section .dropdown-2>span").html().trim());
      var total_number_searchfields = $(".searchby-fields-xs").length;*/
    		$("."+class_name+":last button:first>span>span").text(drop1_value);
    		$("."+class_name+":last .input-search").val($(".add_filter_section .input-search-ss").val());
    		$("."+class_name+":last td:nth-child(3) span").html($(".add_filter_section .dropdown-2>span").html().trim());
    		var total_number_searchfields = $("."+class_name).length;
    		/*if(total_number_searchfields === 10) {
        $(".add_button").hide();
      }
      else {
        $(".add_button").show();
      }
      if(total_number_searchfields > 0 ) {
    	  $(".ss-current-search").removeClass('no-padding-class');
        }*/
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
    		}else if (search_tab === "saved"){
    			if(total_number_searchfields >0){
    				//$('.line-shade11-custom').removeClass('hidden'); 
    				$("#saved").removeClass("no-padding-class")
    			}
    			if(total_number_searchfields === 10) {
    				$(".view-add-btn").hide();
    			} else {
    				$(".view-add-btn").show();
    			}
    		}
    		var create_row_no = 'R' + id;
    		model_name.total["R" + id].selected_D1 = drop1_value;
    		if (drop1_value === configuration_var.location) {
    			model_name.total[create_row_no].loc_flag = true;
    			//location_title_flag = true;
    			if(class_name === "searchby-fields-xs"){
    				location_title_flag = true;
    			}
    			else if(class_name = "searchby-saved-fields-xs"){
    				location_view_title_flag = true;
    			}

    		}
    		else if (drop1_value === configuration_var.position) {
    			/*position_flag_element_id=id;
        check_position(".searchby-fields-xs","current",id);*/
    			if(class_name === "searchby-fields-xs"){
    				check_position("."+class_name,"current",id);          
    			}
    			else if(class_name = "searchby-saved-fields-xs"){
    				check_position("."+class_name,"saved",id)
    			}
    			else{
    				check_position("."+class_name,"new",id);
    			}
    		}
    		else if (drop1_value === configuration_var.range_field) {
    			model_name.total[create_row_no].range_flag = true;
    		}
    		fields_present(model_name,"js");
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
    console.log(configuration_var.search_query_builder + ": apply_changes :" + err);
  }
};

/**
 * show_jobs_container
 */
var show_jobs_container = function() {
  try{
	  var window_width = $(window).width();
	  var ls_display = $("#ls-curr-search").css("display");
	  if(ls_display === "block"){
		  window_width = 769;
	  }
    $("#searchby-fields-ss-1").removeClass("show-filter");
    $("#searchby-fields-ss-1").addClass("hide-filter");
    //$("#current-search").show();
    $("#current-search").removeClass("hide-filter");
      $("#current-search").addClass("show-filter");
    $("#saved-search").hide();
    $("#new-search").hide();
    $("#view-edit").hide();
    search_properties_js.set_search_tab_values('current-search');
    fnRefineResultImageBinding("#demo2");
    fnRefineResultImageBinding("#demo3");
    if(window_width < 768){  
       $("#ss-curr-search-container").addClass("show-filter");
       $("#mob-refine").show();
       $("#mob-h3-text").show();
       $("#demo3").removeClass("add_ss_margin-top");
       if($("#demo3").css("display") === configuration_var.search_display_block){
    	   $('.line-shade11-custom').removeClass('hidden'); 
       }
    }
    else{
    	$("#ss-curr-search-container").removeClass("show-filter");
    	$("#ss-curr-search-container").addClass("hide-filter");
    }

  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_jobs_container :" + err);
  }
  adjust_compatibility_button();
};
/**
 * show_saved_search_container
 */
var show_saved_search_container=function() {
  try{
    $("#saved-search").show();
    $("#searchby-fields-ss-1").removeClass("show-filter");
    $("#searchby-fields-ss-1").addClass("hide-filter");
    $("#current-search").removeClass("show-filter");
      $("#current-search").addClass("hide-filter");
      $("#ss-saved-container").addClass('hide-filter');
		$("#ss-saved-container").removeClass('show-filter');
		$('#search_selected_id').val('');
    $("#new-search").hide();
    $("#view-edit").hide();
    //$("#current-search").removeClass("show-filter");
    $(".searchby-edit-fields tbody").html("");
    search_properties_js.set_search_tab_values('view-edit');
    $('#view-edit * .sqb-line-shade').removeAttr('style'); 
    var search_name_details = jQuery.parseJSON($("#searchresultsdata").val());
    if ((search_name_details !== undefined && search_name_details !== null &&
        (search_name_details.search_names !== undefined || search_name_details.search_names !== null ||
            search_name_details.search_names.length === 0)
            && $("#saved-search").find(".container:first table tbody").is(":empty")
            && $("#saved-search .lg-savedsearch table tbody:nth-child(2)").is(":empty"))){
      $("#saved-search .container").html('');
      $("#saved-search .container").append('<h3 class="long-text2">You haven\'t created any saved searches yet</h3>');
      //For mobile
      $("#saved-search-view").html('');
      $("#saved-search-view").append('<h6 class="mob-long-text2 mob-long-vcenter">You haven\'t created any saved searches yet</h6>');
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
    if(($("#saved-search .lg-savedsearch table tbody").find('tr').length === 0)) {
      //For mobile
      $("#saved-search-view").html('');
      $("#saved-search-view").append('<h6 class="mob-long-text2 mob-long-vcenter">You haven\'t created any saved searches yet</h6>');
    }
    var window_width = $(window).width();
    var ls_display = $("#ls-saved-search").css("display");
	if(ls_display === "block"){
		window_width = 769;
	}

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
    }
    var saved_search_rows = $("#saved-search-table tr").length;
	if(saved_search_rows !== undefined && saved_search_rows > 6){
		draw_scroll();
	}
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_saved_search_container :" + err);
  }

  adjust_compatibility_button();
};

/**
 * show_view_edit_container
 */
var show_view_edit_container = function(search_id) {
  try{
    //$('#btn-load-more').hide();	  
      $('#btn-load-more').addClass('hide');
      $('#btn-load-more').removeClass('show');
      loc_flag_element_view_id=null;
      range_flag_view_id=null;
      position_flag_view_id=null;  
      location_view_title_flag=false;
      job_title_view_flag=false;
    search_fields_count=0;
    $.ajax({
      url:  "/search/criteria/"+search_id,
      type: "GET",
      dataType: "json",
      success:function(data){
        if(data){
          search_name = $("#"+search_id).text();
          $(".lead-search").html(search_name);
          $(".lead-search").attr("data-id",search_id);
          $("#search-id").html(search_id);
          $("#new-search").hide();
          $("#saved-search").hide();
          $("#current-search").hide();
          $("#view-edit").show();
          $('#myModal').modal('hide');
          $("#demo").addClass("in");
          clear_error_fields();
          /****************** Pre Population************************/
          var new_row,new_row_xs;
          $("#view-edit .searchby-edit-fields:not(:first)").remove();
          if(data.criteria.categories && data.criteria.categories.length){
        	  for(var i=0;i<data.criteria.categories.length;i++){
        		  var placeholder_text = get_placeholder_text(data.criteria.categories[i].name);
        		  ++search_fields_count;
        		  var importance_id = "importance_"+search_fields_count;
        		  if(data.criteria.categories[i].name === configuration_var.location){
        			  loc_flag_element_view_id = i;
        			  location_view_title_flag=true;
        		  }
        		  if(data.criteria.categories[i].name === configuration_var.position){
        			  position_flag_view_id = i;
        			  job_title_view_flag=true;
        		  }
        		  new_row = '<tr class="tr-no-padding searchby-edit-fields" id="searchby-edit-fields-' + search_fields_count + '">'
        		  +'<td class="ss-name td-25-l no-border">'
        		  +'<div class="btn-group btn-block">'
        		  +'<button type="button" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_dropdown()">'
        		  +'<span class="col-lg-12">'
        		  +'<span class="pull-left">'+data.criteria.categories[i].name+'</span>'
        		  +'<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="10px" class="sqb-dropdown-chevron1 pull-right">'
        		  +'</span>'
        		  +'</button>'
        		  + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-field-dropdown" onclick="add_event_listener_for_fields(event)" role="menu" id="js-field-dropdown-' + search_fields_count + '">'
        		  +'</ul>'
        		  +'</div>'
        		  +'</td>'
        		  +'<td class="td-38 no-border">'
        		  + '<input type="text" class="form-control input-search" placeholder="'+placeholder_text+'" value="'+data.criteria.categories[i].value+'" onkeyup="add_event_listener_for_input(event);">'
        		  +'</td>'
        		  +'<td class="td-25 no-border">'
        		  +'<div class="btn-group btn-block">'
        		  +'<button type="button" id="'+importance_id+'" class="btn drop-search-main44 btn-block dropdown-toggle" data-toggle="dropdown" onclick="reload_importance_dropdown(event)">'
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
        		  + '<ul class="dropdown-menu dropdown-menu8 btn-block dropdown-menu-b23 js-importance-dropdown" data-btn-id="'+importance_id+'" onclick="add_event_listener_importance(event);" role="menu" id="js-importance-dropdown-' + search_fields_count + '"">'
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
        		  +'<img src="'+static_cdn_path+static_files_version+'/images/MinusCircle.svgz" class="m-r-10 js-delete-btn" width="30px" onclick="deleteFilter(event);">'
        		  +'<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td></tr>';
        		  if(search_fields_count === 1){
        			  view_edit_model.total={};
        		  }
        		  view_edit_model.total["R" + search_fields_count] = {
        				  D1: {
        					  v1: "Position",
        					  v2: "Location",
        					  v3: "Include Keyword",
        					  v4: "Exclude Keyword",
        					  v5: "Skills"
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
        		  var to_be_removed_parent = $(".searchby-edit-fields:first");
        		  var to_be_removed_id = $(to_be_removed_parent).attr("id");
        		  view_edit_model.total["R"+search_fields_count].selected_D1=data.criteria.categories[i].name;
        		  if (data.criteria.categories[i].name === configuration_var.keyword_phase_to_exclude) {
        			  $("#"+search_properties_js.search_parent_node_id).find('#'+importance_id).attr('disabled', 'disabled');
        		  }
        	  }
          }else{
        	  var new_ve_row = populate_view_edit_base_row_js();
        	  view_edit_model.total = {};
        	  view_edit_model.total["R" + search_fields_count] = {
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
          $(".searchby-edit-fields:first").remove();
          if(data.criteria.eligible_to_work===true){
            $("#view-edit input[type=checkbox]:last").prop("checked", true);
          }else {

            $("#view-edit input[type=checkbox]:last").prop("checked", false);
          }
          if(data.criteria.willing_to_travel===true){
            $("#view-edit input[type=checkbox]:first").prop("checked", true);
          }
          else{

            $("#view-edit input[type=checkbox]:first").prop("checked", false);
          }
          var total_number_searchfields = $(".searchby-edit-fields").length;
          var ids=get_model_ids();
          for (var i = 0; i < ids.length; i++) {
            if (view_edit_model.total["R" + ids[i]].selected_D1 === configuration_var.location) {
              loc_flag_element_view_id = ids[i];
            }
            if (view_edit_model.total["R" + ids[i]].selected_D1 === configuration_var.range_field) {
              range_flag_view_id = ids[i];
            }
          }
          /*********************************** Limit number of rows to 10********************************************/
          if (total_number_searchfields <= 10) {
            /************************************Add new row on click of plus******************************************/
            $(".searchby-edit-fields td:nth-child(4)>img:nth-child(2)").remove();
            var add_btn_html = '<img src="'+static_cdn_path+static_files_version+'/images/AddCircle.svgz" class="js-add-btn" width="30px" onclick="addNewFilter();"></td>';
            var div = $(".searchby-edit-fields:last").find(".js-delete-btn").parent();
            if (!(div.children().hasClass("js-add-btn"))) {
            	if(total_number_searchfields !== 10){
            		$(".searchby-edit-fields:last").find(".js-delete-btn").parent().append(add_btn_html);
            	}
            }
            for (var j = 1; j <= ids.length; j++) {
              update_search_model(ids[j]);
              populate_fields(ids[j]);
            }
          }
        }
        display_ss_line_shade();
        $("#view-edit .show-results").removeClass("disabled");
        fnRefineResultImageBinding("#demo");
        adjust_compatibility_button();
      },
      async: true,
      error: function(jqXHR, exception) {
        handle_errors(jqXHR.status, exception, jqXHR.responseText);
        adjust_compatibility_button();
      }
    });
    setTimeout(function() {
    	dropdown_remove_highlight();
    }, 1000);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_view_edit_container :" + err);
  }
};

/**
 * show_search_filters
 */
var show_search_filters = function(apply_changes) {
  try{
    clear_mobile_fields();
    var model_name = get_model_name("js");
    $(".add_filter_section").addClass("hide-display");
    $(".section_prev_to_add_filter").removeClass("hide-display");
    $("#searchby-fields-ss-1").removeClass("show-filter");
    $("#searchby-fields-ss-1").addClass("hide-filter");
    var search_tab = "current";
	var search_text = $('#myTab').find('li.active').find('span').text();
	if (search_text === configuration_var.search_type_job || search_text === configuration_var.search_type_search) {
		$("#ss-curr-search-container").removeClass("hide-filter");
		$("#ss-curr-search-container").addClass("show-filter");
		search_tab = "current";
	}
	else{
		//show_saved_search_container_hc();
		search_tab = "saved";
		show_saved_jobs_container();
	}
    $(".section_prev_to_add_filter").show();
    $(".demo3").addClass("collapse in");
    var id = $("#model_id").data('model_value');
    if(apply_changes === "back"){
    	$("#myTab").show();
    	$("#searchby-fields-ss-1").removeClass("add-mobile-li-margin");
      delete_from_back(id,model_name);
      $("#current-search").show();
      if($('#myTab').find('li.active').find('span').text() === configuration_var.search_type_mob_ss){
    	  $('#myTab').hide();
    	  $("#ss-saved-container").removeClass("hide-filter");
    	  $("#ss-saved-container").addClass("show-filter");
      }
    }
    $(".apply_changes").unbind();
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_search_filters :" + err);
  }
};

/**
 * mobile_filter_click
 */
var mobile_filter_click = function(e){
  try{
	  var row_id=$(e.target).parent().parent().attr("id");
	  show_mobile_edit_view(row_id);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": mobile_filter_click :" + err);
  }
};
var search_row_click = function(event){
	try{
		var row_id = $(event.target).parent().attr("id");
		if(!row_id){
			row_id=$(event.target).parent().parent().attr("id");
		}
		show_mobile_edit_view(row_id);
	}catch(err){
		console.log(err);
	}
}

var show_mobile_edit_view = function(row_id){
	try{
		$("#zip_saved_error_mobile").text("");
		$("#clicked-field").val('');
		$("#myTab").hide();
		$("#searchby-fields-ss-1").addClass("add-mobile-li-margin");
		$("#clear-fields").show();
		$("#zip-error_mobile_filter").text("");
		var model_name = get_model_name("js");
		var class_name;
		var search_tab = "current";
		if ($("#current-search").css("display") === configuration_var.search_display_block) {
			$("#ss-curr-search-container").removeClass("show-filter");
			$("#ss-curr-search-container").addClass("hide-filter");
			class_name = "searchby-fields-xs";
			search_tab = "current";
		} else{
			$('.saved-search-fadeout').addClass('add-mobile-li-margin-save-search');
			//$("#searchby-fields-ss-1").removeClass('add-mobile-li-margin');
			//$("#searchby-fields-ss-1").addClass('add-mobile-li-margin-save-search');
			$("#ss-saved-search.container").removeClass("show-filter");
			$("#ss-saved-search.container").addClass("hide-filter");
			class_name = "searchby-saved-fields-xs";
			search_tab = "saved";
			var window_width = $(window).width();
			if(window_width < 768){
				$('#ss-saved-container').addClass("hide-filter");
				$('#ss-saved-container').removeClass("show-filter");
			}
		}
		var importance_icon;
		var id = row_id.split("-")[3];
		if($("#view-edit").css("display")===configuration_var.search_display_block ||
				$("#saved-search").css("display")===configuration_var.search_display_block){
			id = row_id.split("-")[4];
		}
		$("#model_id").data('model_value',id);
		$("#clicked-field").val(row_id);
		$(".section_prev_to_add_filter").addClass("hide-display");
		$(".add_filter_section").removeClass("hide-display");
		$(".add_filter_section").find(".apply_changes").attr("onclick", "");
		$(".add_filter_section").show();
		//var class_name = "searchby-fields-xs"; 
		var criteria = $("#"+row_id).find("small").text();
		var importance_2 = $("#js-importance-dropdown-ss-1").find('li a')[1];
		var importance_3 = $("#js-importance-dropdown-ss-1").find('li a')[2];
		if(criteria && criteria === configuration_var.keyword_phase_to_exclude){			
			$(importance_2).addClass("disable-selected");
			$(importance_3).addClass("disable-selected");	
			$(importance_2).find('img').attr("src",static_cdn_path+static_files_version+"/images/Arrow_GreatToHave_Disabled.svgz");
			$(importance_3).find('img').attr("src",static_cdn_path+static_files_version+"/images/Arrow_NiceToHave_Disabled.svgz");			
		}
		else{
			$(importance_2).removeClass("disable-selected");
			$(importance_3).removeClass("disable-selected");	
			$(importance_2).find('img').attr("src",static_cdn_path+static_files_version+"/images/GreatToHave_White.svgz");
			$(importance_3).find('img').attr("src",static_cdn_path+static_files_version+"/images/NiceToHave_White.svgz");			
		}
		var criteria_text = criteria;
		var criteria_value = "";
		if(Object.keys(model_name.total).length === 1){
			$(".remove-filter-ss").hide();
		}
		else{
			$(".remove-filter-ss").show();
		}
		if(search_type === "A"){
			$(".remove-filter-ss").show();
		}
		if($("#" + row_id).find("td:first>img").length === 0){
			importance_icon = "Select";
		}
		else{
			importance_icon = $("#" + row_id).find("td:first>img").attr("src");
			if (importance_icon.substr==="Gray") {
				importance_icon=importance_icon.replace("Gray", "White");
			}
		}
		criteria = criteria.replace("Select a ","");
		var placeholder = get_placeholder_text(criteria);
		if(criteria === null || criteria === undefined || criteria === "" || criteria === "Select"){
			placeholder = "";
		}
		$("#user-entered-value").attr("placeholder",placeholder);
		if(criteria !== null){
			if(criteria_text.indexOf("Select a") === -1){
				criteria_value = $("#" + row_id).find("td:nth-child(2)").text().replace(criteria,"");
			}
		}
		else{
			criteria_value = $("#" + row_id).find("td:nth-child(2)").text();
		}
		//var criteria_value = $("#" + row_id).find("td:nth-child(2)").html().split("<br>")[1];
		if(criteria_value !== null && criteria_value !== undefined && criteria_value !==""){
			$("#user-entered-value").attr('disabled',false);
			$(".add_filter_section .input-search-ss").val(criteria_value.trim(""));
		}
		else{
			$(".add_filter_section .input-search-ss").val(criteria_value);
		}
		$(".add_filter_section .dropdown-1>span>span").text(criteria);
		var image_src = importance_icon.split('/');
		var image_name = get_image_name(image_src);

		if(importance_icon === "Select"){
			$(".add_filter_section .dropdown-2>span>span").html(importance_icon);
		}
		else{
			$(".add_filter_section .dropdown-2>span>span").html('<img id = "importance-img" src="' + importance_icon.replace("Gray", "White") + '" class="priority-icon-mobile" width="18px" height="18px"/>' + image_name);
		}
		populate_mobile_fields("edit",criteria,"js");
		highlight_field(criteria);
		var imp_value = get_importance_value(image_name);
		highlight_importance(imp_value);
		$(".apply_changes").unbind().click(function() {
			var valid_inputs = check_valid_inputs_mobile();
			if(valid_inputs){
				var proceed_changes = proceed_search();
				if(proceed_changes){
					$("#myTab").show();
					$("#searchby-fields-ss-1").removeClass("add-mobile-li-margin");
					$('.saved-search-fadeout').removeClass('add-mobile-li-margin-save-search');
					if(search_tab === "current"){
						$("#current-search").show();
					}else{
						//class_name = "searchby-fields-xs";
						$("#myTab").hide();
						$("#ss-saved-search").show();
					}
					show_search_filters("apply changes");
					var clicked_row_id = $("#clicked-field").val();
					$("#" + clicked_row_id).find("td:nth-child(2)").html('<small class="gray-styling">' + $(".add_filter_section").find(".dropdown-1>span>span").text() + '</small><br>'+$(".input-search-ss").val());
					var image_src = $(".add_filter_section").find(".dropdown-2>span>span>img").attr("src");
					image_src = image_src.replace("White","Gray");
					$(".add_filter_section").find(".dropdown-2>span>span>img").attr("src",image_src);
					$("#" + clicked_row_id).find("td:first").html($(".add_filter_section").find(".dropdown-2>span>span>img"));
					if(model_name.total["R" + id] && model_name.total["R" + id].selected_D1 ){	
						var selected_text = $(".add_filter_section").find(".dropdown-1>span>span").text();
						if (model_name.total["R" + id].selected_D1 === configuration_var.location && 
								model_name.total["R" + id].selected_D1 !== selected_text) {
							set_flags(configuration_var.range_field,class_name,null);	  
							set_flags(configuration_var.location,class_name,null);
							for (var t = 0; t < $("#"+clicked_row_id).siblings('.'+class_name).length ; t++) {
								var element = $("#"+clicked_row_id).siblings('.'+class_name)[t];
								var value = $(element).find("td:nth-child(2)").find("small").text();
								if (value === configuration_var.range_field){
									var range_id = $(element).attr("id");
									var range_model_id = range_id.split(class_name+"-")[1];	          
									delete model_name.total["R" + range_model_id];
									$(element).remove();
								}
							}
							disable_show_search_button();
						}
						model_name.total["R" + id].selected_D1 =  $(".add_filter_section").find(".dropdown-1>span>span").text();
					}
					if($(".add_filter_section").find(".dropdown-1>span>span").text() === configuration_var.position){
						position_flag_element_id = id;
					}
					fields_present(model_name,"js");
					$(".apply_changes").unbind();
				}
			}else{
				check_display(configuration_var.search_general);
			}
		});
		if(criteria_text.indexOf("Select a") === -1){
			$("#importance_mobile_1>span>span").css("margin-left","-5px");
		}
		else{
			$("#importance_mobile_1>span>span").css("margin-left","0px");
		}		
	    //$("#js-importance-dropdown-ss-1>li").css("margin-left","-5px");
		//$("#js-importance-dropdown-ss-1>li>a").css("padding-left","6px")
		$("#searchby-fields-ss-1").removeClass("hide-filter");
		$("#searchby-fields-ss-1").addClass("show-filter");
		$('body,html').scrollTop(0);

	}catch(err){
		console.log(err);
	}
}

$(".dropdown-menu2 li").on("click", function (event) {
  try{
    $("#dropdownMenu1>span").text($(event.target).text());
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ":" + err);
  }
});
/**
 * save_search_name
 */
var save_search_name = function(){
  try{
	  $("#SearchName").css("cssText", "border: none !important");
    $("#error").html('');
    save_search("POST",$("#SearchName").val(),true,null);
    set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
    analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.save_new_search, gtm_event_label.save_new_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": save_search_name :" + err);
  }
};
/**
 * edit_save_search
 */
var edit_save_search = function(){
  try{
	  clear_error_fields();
    $('#spinner-results').show();
    if ($("#current-search").css("display") == configuration_var.search_display_block) {
      field_class = ".searchby-fields";
    }
    else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
      edit_save_search_flag = true;
      field_class = ".searchby-edit-fields";
    }
    var is_automated = identify_automated_search();
    if(is_automated){
    	save_search("PUT",$(".lead-search").text(),false, $(".lead-search").attr("data-id"));
    	return;
    }
    var valid = dispaly_errormessage(field_class);
    if(!valid){
      save_search("PUT",$(".lead-search").text(),false, $(".lead-search").attr("data-id"));
      set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
      analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.save_search, gtm_event_label.save_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
      
    }else{
      $('#spinner-results').hide();
      check_display(configuration_var.search_general);
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": edit_save_search :" + err);
  }
};
/**
 * show_save_error
 */
var show_save_error = function(message){
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
    console.log(configuration_var.search_query_builder + ": show_save_error :" + err);
  }
};

/**
 * unsaved_search
 */
var unsaved_search = function(data){
  //$('#btn-load-more').hide();
	$('#btn-load-more').addClass('hide');
	$('#btn-load-more').removeClass('show');
  try{	 
	  var v_token=get_cookie('csrf_token'); 
	if(search_properties_js.search_parent_node_id === "view-edit"){		
	  data.src = "SS"; 
	}	
   // $(".show-results").removeClass("disabled");//Commented forDES-4273
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
    	  //correlation_id = get_correlation_id_from_response_header();
    	  if(data.correlation_id){
				correlation_id = data.correlation_id;
			}
    	  if(data.search_id){
				global_search_id=data.search_id;
			}
        $("#search-error").hide();
        if(data){
          $('#getstarted').hide();
          clear_error_fields();
          g_search_results = [];
          $("#searchresults").html("");
          $('#myModal23').modal('hide');
          $(".refine-results").removeClass("hidden");
          //$(".collapse").collapse();
          //$(".collapse").toggle();
		  //$(".refine-results img").attr("src",static_cdn_path+static_files_version+"/images/Chevron-o.svgz");
		  $(".refine-results img").attr("src",static_cdn_path+static_files_version+"/images/OrangeArrow_Down.svgz");
          populate_criteria(data);
          bind_search_results(data,false);
          setTimeout(function(){
            $('#spinner').hide();
            $('#spinner-results').hide();
          }, 500);
          if (data.sort_order){
            var sort_val = get_sort_value(data.sort_order);
            var sort_image='<img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="text-right sr-sort-chevron">';
            $("#dLabel").html(sort_val+sort_image);
          }
          if(data.results === null|| data.results === undefined|| data.results.length === 0){
            $('#banner').removeClass('hide');
            $('#banner').addClass('show');
          }
          else{
            $('#banner').removeClass('show');
            $('#banner').addClass('hide');
          }
        }
      },
      async: true,
      error: function(jqXHR, exception) {
        if(jqXHR){
          show_error_message(jqXHR);
        }
        handle_errors(jqXHR.status, exception, jqXHR.responseText);
      }
    });
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": unsaved_search :" + err);
  }
};

var process_value;
var savesuccess;
var save_error;
/**
 * save_search
 */
var save_search = function(ajax_type,search_name,proceed_val,search_id){
  try{
    var search_json={};
    var proceed=true;
    var field_id,field_class;
    var dropdown_id;
    var fields_length=0;
    var initialize_count=0;
    process_value=proceed_val;
    if(search_name === "unsaved"){
      if ($("#current-search").css("display") === configuration_var.search_display_block) {
        field_class = ".searchby-fields";
        field_id="#searchby-fields-";
      }
      else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
        field_class = ".searchby-edit-fields";
        field_id="#searchby-edit-fields-";
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
        else{
          search_json.criteria["willing_to_travel"]=false;
          search_json.criteria["eligible_to_work"]=false;
        }
        set_analytics_information('', true, search_json);//function to store analytics data
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
            var value = $("#"+dropdown_id+" .input-search").val();
            if(value){
            	value = value.trim();
            }
            category["value"]=value;
            set_analytics_information(category["name"], false, ''); //function to store analytics data
            var imp='';
            if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
              var img_arr = $("#"+dropdown_id).find("button:last>span>span>img").attr("src").split('/');
              var img_length = img_arr.length-1;
              imp = img_arr[img_length].split('_')[0];
              //imp=$("#"+dropdown_id).find("button:last>span>span>img").attr("src").split("/")[2].split("-")[0].split(".")[0].split("_")[0];
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
        unsaved_search(search_json);
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
        if(!search_name){
        	//show_save_error(configuration_var.search_provide_name);
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
          $("#SearchName").css("cssText", "border: 2px solid #ed6f50 !important");
          return 0;
        }
        else if(search_name.length<=40){
          for(var k=0;k<$("#saved-search>div>li").length;k++){
            var element=$("#saved-search>div>li")[k];
            if($(element).text()===search_name.toLowerCase()){
              proceed = false;
              show_save_error(configuration_var.search_duplicate_name);
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
            //category["value"]=$("#"+dropdown_id+" .input-search").val();
            var value = $("#"+dropdown_id+" .input-search").val();
            if(value){
            	value = value.trim();
            }
            category["value"]= value;
            var imp='';
            set_analytics_information(category["name"], false, ''); //function to store analytics data
            if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
              //imp=$("#"+dropdown_id).find("button:last>span>span>img").attr("src").split("/")[2].split("-")[0].split(".")[0].split("_")[0];
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
        	var saved_search_id;;
        	var saved_search_name = search_name;
        	if(ajax_type === "PUT"){
        		saved_search_id=search_id;
        		saved_search_name= search_name
        	}
        	var willing_travel = search_json.criteria.willing_to_travel;
        	var eligible_travel = search_json.criteria.eligible_to_work;
        	var job_id;
        	save_search_automated(ajax_type,saved_search_id,saved_search_name,job_id,willing_travel,eligible_travel);
        	return;
        }
        save_search_ajax(ajax_type,search_json,proceed_val,search_name);
      }
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": save_search :" + err);
  }

};
/**
 * save_search_mobile
 */
var save_search_mobile = function(ajax_type,search_name,proceed_val,search_id){
  try{
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
      }
      else if ($("#view-edit").css("display") === configuration_var.search_display_block ||
    		  $("#saved-search").css("display")===configuration_var.search_display_block) {
    	  field_id="#searchby-saved-fields-xs-"
    	  field_class = ".searchby-saved-fields-xs";
      }
      var valid = dispaly_errormessage_mobile(field_class);
      if(!valid){
        search_json={};
        search_json["criteria"]={};
        search_json.criteria["categories"]=[];
        if($("#current-search").css("display") === configuration_var.search_display_block){
          search_json.criteria["willing_to_travel"]=$("#demo3 .wtt-checkbox").is(":checked");
          search_json.criteria["eligible_to_work"]=$("#demo3 .etwus-checkbox").is(":checked");
        }
        else if($("#view-edit").css("display") === configuration_var.search_display_block || 
        		$("#saved-search").css("display")===configuration_var.search_display_block){
        	search_json.criteria["willing_to_travel"]=$("#saved .wtt-checkbox").is(":checked");
            search_json.criteria["eligible_to_work"]=$("#saved .etwus-checkbox").is(":checked");
        }
        else{
          search_json.criteria["willing_to_travel"]=false;
          search_json.criteria["eligible_to_work"]=false;
        }
        set_analytics_information('', true, search_json);//function to store analytics data
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
          //var priority = $("#"+row_id).find("td:nth-child(1)").find('img').attr('src').split('/')[2].split('_')[0];
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
          set_analytics_information(category["name"], false, ''); //function to store analytics data
          search_json.criteria.categories.push(category);
        });
        if (search_type === "A"){
        	var search_text = $('#myTab').find('li.active').find('span').text();
        	var total_num_search_rows;
        	var job_id;
        	var tab_name = "current";
			if (search_text === configuration_var.search_type_job || search_text === configuration_var.search_type_search) {
				total_num_search_rows = $(".searchby-fields-xs").length;
				tab_name = "current";
			}
			else{
				total_num_search_rows = $(".searchby-saved-fields-xs").length;
				tab_name = "saved";
			}
			if(total_num_search_rows !== undefined && total_num_search_rows === 0){
				search_json = {
						criteria: {
							categories: [],
							eligible_to_work: true,
							willing_to_travel: false
						}
				};
				var willing_to_travel = false;
				var eligible_to_work = false;
				if($("#current-search").css("display") === configuration_var.search_display_block){
					willing_to_travel=$("#demo3 .wtt-checkbox").is(":checked");
					eligible_to_work=$("#demo3 .etwus-checkbox").is(":checked");
				}
				else{
					willing_to_travel=$("#saved .wtt-checkbox").is(":checked");;
					eligible_to_work=$("#saved .etwus-checkbox").is(":checked");
				}
				get_automated_search_results(job_id,tab_name,willing_to_travel,eligible_to_work);
				return;
			}
        }
        unsaved_search(search_json);
      }
      else{
        $("#zip-error").text(configuration_var.search_general);
        $("zip-error_mobile").text(configuration_var.search_general);
      }
    }
    else{
      if(proceed_val){
        if ($("#current-search").css("display") === configuration_var.search_display_block) {
          field_class = ".searchby-fields-xs";
          field_id="#searchby-fields-xs-";
        }
        else if ($("#view-edit").css("display") === configuration_var.search_display_block) {
        }
        if(!search_name){
          show_save_error(configuration_var.search_provide_name);
          return 0;
        }
        if (search_name && search_name.trim() === ""){
        	show_save_error(configuration_var.search_provide_name);
        	return 0;
        }
        if(search_name.length>40){
          show_save_error(configuration_var.saved_search_max_limit);
        }
        else if(search_name.length<=40){
          for(var k=0;k<$("#saved-search>div>li").length;k++){
            var element=$("#saved-search>div>li")[k];
            if($(element).text()===search_name.toLowerCase()){
              proceed = false;
              show_save_error(configuration_var.search_duplicate_name);
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
            set_analytics_information(category["name"], false, ''); //function to store analytics data
            if($("#"+dropdown_id).find("button:last>span>span>img").attr("src")){
              //imp=$("#"+dropdown_id).find("button:last>span>span>img").attr("src").split("/")[2].split("-")[0].split(".")[0].split("_")[0];
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
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": save_search_mobile :" + err);
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
   //   }else{
 //       Search_Willingtowork = "No";
      }
      if (tmp_search_json.criteria["eligible_to_work"]){
        Search_Eligibletowork  = "Yes";
    //  }else{
   //     Search_Eligibletowork  = "No";
      }
    }else{
      var categories = ["Position", "Location", "Skills", "Education", "Include Keyword", "Exclude Keyword", configuration_var.range_field];
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
        Search_Education = "Yes";
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
var restore_modal = function(){
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
      +'<button type="button" class="btn btn-outlined" data-dismiss="modal" onclick="restore_modal();">Cancel</button>'
      +'<button id="save-search" type="button" class="btn btn-primary" onclick="save_search_name();">Save</button>'
      +'</div>'
      +'</div>'
      +'</div>';
    $("#myModal22").modal('hide');
    $("#myModal22").html(modal);
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": restore_modal :" + err);
  }
};
/**
 * populate_remove_id
 */
var populate_remove_id = function(event,search_id){
  try{
    if(search_id){
      $("#myModal23").find("label.search-name").attr("data-value",search_id);
      $(event.target).parent().parent().attr("data-remove",search_id);
      var mobile_id = "mob-"+search_id;
      $("#"+mobile_id).attr("data-remove-mobile",search_id);
    }
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": populate_remove_id :" + err);
  }
};
/**
 * remove_saved_search
 */
var remove_saved_search = function(event){
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
          //$('#myModal23').modal('hide');
          if($("#saved-search").find('tr').attr("data-remove")!=""){
            $("#saved-search").find("[data-remove]").remove();
          }
          if($("#saved-search").find('tr').attr("data-remove-mobile")!=""){
            $("#saved-search").find("[data-remove-mobile]").remove();
          }
          if(($("#saved-search .lg-savedsearch table tbody").find('tr').length < 1)){
            $("#saved-search .container").html('');
            $("#saved-search .container").append('<h3 class="long-text2">You haven\'t created any saved searches yet</h3>');
            $("#saved-search-view").html('');
            $("#saved-search-view").append('<h6 class="mob-long-text2 mob-long-vcenter">You haven\'t created any saved searches yet</h6>');
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
      //  apply_saved_search_height_remove();
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
    console.log(configuration_var.search_query_builder + ": remove_saved_search :" + err);
  }
};

/**
 * show_results
 */
var show_results = function(){
  try{
    $('#banner').removeClass('show');
    $('#banner').addClass('hide');

    var $filters = $('.searchby-fields');
    var split_id = 2;
    var search_text = $('#myTab').find('li.active').find('span').text();
    if(search_text === configuration_var.search_type_job ||  search_text === configuration_var.search_type_search){
    	$filters = $('.searchby-fields');
    	split_id = 2;
    }
    if(search_text === configuration_var.search_type_mob_ss){
    	$filters = $(".searchby-edit-fields");
    	split_id = 3;
    }
    if(search_type === "A" && $filters && $filters.length && $filters.length === 1){
    	var if_automated = check_if_automated_search_results($filters);
    	var job_id,tab_name;
    	var willing_travel = false;
    	var eligible_work = false;
    	if(if_automated){
    		if($("#current-search").css("display") === configuration_var.search_display_block){
    			willing_travel=$("#demo2 .wtt-checkbox").is(":checked");
    			eligible_work=$("#demo2 .etwus-checkbox").is(":checked");
    			tab_name = "current";
    		}
    		else if($("#view-edit").css("display") === configuration_var.search_display_block){
    			willing_travel=$("#view-edit .wtt-checkbox").is(":checked");
    			eligible_work=$("#view-edit .etwus-checkbox").is(":checked");
    			tab_name = "saved";
    		}
    		get_automated_search_results(job_id,tab_name,willing_travel,eligible_work);
    		set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
    	    analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.refine_results, gtm_event_label.refine_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
    		return;
    	}
    	
    }
    // if user has removed & cleared out all fields -- revert to self-select search settings
    /*if (($filters.length < 2) && ($('.td-38 input', $filters).val() === '')) {
      show_self_select_results();
      set_search_js_values(Search_Location, Search_Position, Search_Range, Search_Includekeyword, Search_Excludekeyword, Search_Skill, Search_Educationlevel, Search_Willingtowork, Search_Eligibletowork);
      analytics_event_savesearch(gtm_event_category.search_builder, gtm_event_action.refine_results, gtm_event_label.refine_search_search_builder, get_abbrevated_sessionstorage_usertype(), get_search_js_information(0), get_search_js_information(1), get_search_js_information(2), get_search_js_information(3), get_search_js_information(4), get_search_js_information(5), get_search_js_information(6), get_search_js_information(7), get_search_js_information(8));
      return;
    }*/

    var field_class = '.'+search_properties_js.search_parent_class_name;
    var valid_rows = dispaly_errormessage(field_class)
    if(!valid_rows){
      var check = check_city_sate();
      var check_error ="";
      if($("#current-search").css("display") === configuration_var.search_display_block){
        check_error = $("#zip-error").text();
      }else if($("#view-edit").css("display") === configuration_var.search_display_block){
        check_error = $("#zip-error_view").text();
      }
      if(check_error !== ""){
        return;
      }
      if(!zip_error && !check){
        $('#spinner-results').show();
        save_search('POST',"unsaved",false,null);
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
      line_shade_display_js(true);
    }
    search_transform();
    if(valid_rows){
    	line_shade_display_js(true);
    	$('#current-search').addClass('new_padding_search');
    	$('#current-search .container').addClass('new_padding_search');
    	$('.long-text2').addClass('new-margin-search');
    	$('#current-search .refine-results').addClass('new-margin-search');
    }
    //transform_arrow();
    adjust_compatibility_button();
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_results :" + err);
  }
};

/**
 * show_results_mobile
 */
var show_results_mobile = function(){
  try{
    fnCollapseJSSearchBuilder();
    $('#current-search-li').addClass('active');
    $('#save-search-li').removeClass('active');
    $("#current-search").removeClass('fade');
    $("#mob-refine").show();
    $("#mob-h3-text").show();
    var check = check_city_sate_mobile();
    var check_error ="";
    if($("#current-search").css("display") === configuration_var.search_display_block){
      check_error = $("#zip-error_mobile_filter").text();
    }
    if(check_error !== ""){
      return;
    }
    if(!zip_error && !check){
      $('#spinner').show();
      $('#spinner-results').show();
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
    console.log(configuration_var.search_query_builder + ": show_results_mobile :" + err);
  }
};

/**
 * return user's self-select search results
 */
var show_self_select_results = function() {
  try {
	  var v_token=get_cookie('csrf_token');
    var data = {
      criteria: {
        categories: [],
        eligible_to_work: true,
        willing_to_travel: false
      }
    };

    $.ajax({
      url: '/search/results/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: 
		{	
			'x-csrf-token' : v_token
		},
      success: function(data) {
    	  //correlation_id = get_correlation_id_from_response_header();
    	  if(data.correlation_id){
				correlation_id = data.correlation_id;
			}
    	  if(data.search_id){
				global_search_id=data.search_id;
			}
        $('#search-error').hide();

        if (data) {
          g_search_results = [];
          $('#searchresults').html('');
          populate_criteria(data);

          setTimeout(function(){
            $('#spinner-results').hide();
          }, 500);

          if (data.results === null || data.results === undefined || data.results.length === 0) {
            $('#getstarted').hide();
            $('#banner').removeClass('hide').addClass('show');
          } else {
            bind_search_results(data, false);
            $('#banner').removeClass('show').addClass('hide');
          }
        }
      },
      error: function(jqXHR, exception) {
        setTimeout(function() {
          $('#spinner-results').hide();
        }, 500);
        if (jqXHR) {
          show_error_message(jqXHR);
        }
      }
    });
  } catch (err) {
    console.log(configuration_var.search_query_builder + ": show_self_select_results :" + err.toString());
  }
};

/**
 * show_search_results
 */
var show_search_results = function(id){
  //$('#btn-load-more').hide();
	 var window_width = $(window).width();
	 var ls_display = $("#ls-curr-search").css("display");
	 if($("#ls-new-search").css("display") === "block" || $("#ls-saved-search").css("display") === "block"){
		 ls_display = "block";
	 }
	 if(ls_display === "block"){
		 window_width = 769;
	 }
	$('#btn-load-more').addClass('hide');
	$('#btn-load-more').removeClass('show');
	var v_token=get_cookie('csrf_token');
  try{
    $('#spinner-results').show();
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
    	 // correlation_id = get_correlation_id_from_response_header();
    	  if(data.correlation_id){
				correlation_id = data.correlation_id;
			}
    	  if(data.search_id){
				global_search_id=data.search_id;
			}
        $("#search-error").hide();
        if(data){
          g_search_results = [];
          $("#searchresults").html("");
          populate_criteria(data);
          setTimeout(function(){
            $('#spinner-results').hide();
            adjust_compatibility_button();
          }, 500);
          if(data.results === null|| data.results === undefined|| data.results.length === 0){
            $("#getstarted").hide();
            $('#banner').removeClass('hide');
            $('#banner').addClass('show');
          }
          else{
            bind_search_results(data,false);
            $('#banner').removeClass('show');
            $('#banner').addClass('hide');
          }
          if(data.results !== null && data.results !== undefined && data.results.length > 1 ){
        	  $('.sortby_hc').removeClass("hide");
        	  $('.sortby_hc').addClass("show")
        	  if(window_width < 768){ 
        		  $("#sort_dropdown-mob").parent().parent().addClass("show-filter");
        		  $("#sort_dropdown-mob").parent().parent().removeClass("hide-filter");
        	  }
          }else{
        	  $('.sortby_hc').addClass("hide");
        	  $('.sortby_hc').removeClass("show")
        	  if(window_width < 768){ 
        		  $("#sort_dropdown-mob").parent().parent().removeClass("show-filter");
        		  $("#sort_dropdown-mob").parent().parent().addClass("hide-filter");
        	  }
          }
        }

        adjust_compatibility_button();
      },
      async: true,
      error: function(jqXHR, exception) {
        setTimeout(function(){
          $('#spinner-results').hide();
          adjust_compatibility_button();
        }, 500);
        if(jqXHR){
          show_error_message(jqXHR);
        }
        adjust_compatibility_button();
      }
    });
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": show_search_results :" + err);
  }

  adjust_compatibility_button();
};

var display_ss_line_shade = function(){
	var is_collapsed = $("#demo").hasClass("collapse in");
	if(is_collapsed){
		$("#view-edit .sqb-line-shade").css("display","block");
	}else{
		$("#view-edit .sqb-line-shade").css("display","none");
	}
}
/**
 * save_search_ajax
 * @param ajax_type
 * @param search_json
 * @param proceed_val
 * @param search_name
 */
var save_search_ajax = function(ajax_type,search_json,proceed_val,search_name){
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
        if(!edit_save_search_flag){
          get_saved_search_name_from_service(search_id);
        }else{
        	display_ss_line_shade();
          $('#spinner-results').hide();
          edit_save_search_flag = false;
        }
      }
    },
    async: true,
    error: function(jqXHR, exception) {
      $('#spinner-results').hide();
      display_ss_line_shade();
      if(!edit_save_search_flag){
        var message = jQuery.parseJSON(jqXHR.responseText);
        if(message.type === "validation"){
          var error_message = message.message;
          if(error_message.indexOf("#")>0){
            var message_detail = error_message.split('#');
            error_message = message_detail[0];
          }
          $("#error").html(error_message);
          $("#SearchName").addClass("error-txt");
          $("#SearchName").css("cssText", "border: none !important");
        }
        else{
          $("#error").html("Error in saving search");
        }
      }else{
        if(jqXHR){
          show_error_message(jqXHR);
        }
      }
      handle_errors(jqXHR.status, exception, jqXHR.responseText);
    }
  });
};
/**
 * add_event_listner_input_mobile
 */
var add_event_listner_input_mobile = function(e){
  try{
	  $(e.target).parent().parent().find(".input-search-ss").autocomplete({ disabled: true });
    clear_mobile_fields();
    clear_error_fields();
    $("#clear-fields").show();
    $("#search-error").text("");
    var regex_digits = /[0-9]|\./;
    var regex_alphabets = /^[A-Za-z,\. ]+$/;
    var split_id=2;
    var row_class = ".searchby-fields-xs";
    $(e.target).removeClass("error-txt");
    var input_text = $(e.target).val();
    set_input_text(input_text);
    var first_drop_down_value = $("#first-drop-down").text();
    var place_holder = $(e.target).attr('placeholder');
    var element = $(e.target);
    var value = input_text;
    if(input_text == "") {
		$(e.target).parent().parent().find(".input-search-ss").addClass('clsDefaultTextColor');
	} 
	else {
		$(e.target).parent().parent().find(".input-search-ss").removeClass('clsDefaultTextColor');
	}
    if(first_drop_down_value === configuration_var.position){
      if(value === ""){
        var check = check_position_count(row_class);
        if(check){
          job_title_flag = true;
        }
        else{
          job_title_flag = false;
        }
      }
      else{
        job_title_flag = true;
      }
    }
    if(first_drop_down_value === configuration_var.location){
      if(value !== ''){
        location_title_flag = true;
      }
      else{
        location_title_flag = false;
      }
    }
    if($(e.target).parent().parent().find("button:first>span>span").text()===configuration_var.location){
      if (input_text !== undefined && input_text !== null){
        if (regex_digits.test(input_text)) {
          //check_valid_zip(input_text,element);
        }
        else if (regex_alphabets.test(input_text)) {
          var key = event.keyCode || event.charCode;
          var autosugest_position = 2;
          if(key === 8 || key === 46)
          {
            autosugest_position = 3;
          }
          if(input_text.length>=autosugest_position){
            var id_text = $(e.target).attr('id');
            $(e.target).parent().parent().find(".input-search-ss").autocomplete({ disabled: false });
            get_autosuggest_values(input_text,id_text);
          }
          if(input_text.split(",").length===2){
            check_valid_city_state($(e.target).val(),element);
          }
        }
      }
    }
    disable_show_results_button();
    disable_show_search_button();
  }
  catch(err){
    console.log(configuration_var.search_query_builder + ": add_event_listner_input_mobile :" + err);
  }
};
/**
 * saved_search_view
 */
var saved_search_view = function(e,search_id,search_name){
  //var saved_search_id = $(e.target).parent().parent().parent().attr("id");
	//var saved_name = $(e.target).parent().parent().attr("data-name");
	var search_name = $(e.target).parent().parent().attr("data-name");	
  $.ajax({
    url:  "/search/criteria/"+search_id,
    type: "GET",
    dataType: "json",
    success:function(data){
    	$('#search_selected_id').val(search_id);	 
    	//show_jobs_container();
    	var sort_available = $("#sort_dropdown-mob").parent().parent().hasClass("show-filter");
    	show_saved_jobs_container();
    	populate_criteria(data);
    	/*$('#current-search-li').addClass('active');
      $('#save-search-li').removeClass('active');*/
    	/*$("#current-search").removeClass('fade');
      $("#mob-refine").hide();
      $("#mob-h3-text").hide();
      $("#demo3").addClass("add_ss_margin-top");
      $('#demo3').css( "height", "auto"); 
      setTimeout(function(){
    	  $("#demo3").addClass("in");
      },500);
      $('.line-shade11-custom').addClass('hidden');*/
    	if(sort_available){
			$("#sort_dropdown-mob").parent().parent().addClass("show-filter");
			$("#sort_dropdown-mob").parent().parent().removeClass("hide-filter");
		}else{
			$("#sort_dropdown-mob").parent().parent().removeClass("show-filter");
			$("#sort_dropdown-mob").parent().parent().addClass("hide-filter");
		}
    	$("#A1-ss").css("display","none");
    	$(".line-shade11-custom-saved").removeClass("hidden");
    	$("#saved-search-name ").text(search_name);
    	$("#del-ss").attr("data-id",search_id);
    	$("#saved").show();
    	$("#ss-saved-container").addClass("ss-detail-margin-top");
    	$("#myTab").hide();
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

var show_saved_jobs_container = function(){
	$("#saved-search").show();
	$("#current-search").hide();
	$("#new-search").hide();
	$("#searchby-fields-ss-1").removeClass("show-filter");
	$("#searchby-fields-ss-1").addClass("hide-filter");
	$("#current-search").removeClass("show-filter");
	$("#current-search").addClass("hide-filter");
	$(".searchby-edit-fields tbody").html("");
	search_properties_js.set_search_tab_values('view-edit');
	$("#ss-saved-search").addClass("show-filter");
	$("#ss-saved-search").removeClass("hide-filter");			
	fnRefineResultImageBinding("#saved");
	$('#saved').css( "height", "auto"); 
	$('.line-shade11-custom-saved').removeClass('hidden');
	$("#ss-saved-search").addClass("show-filter");
	$("#ss-saved-search").removeClass("hide-filter");  
	$(".saved-search-container-mob").removeClass("show-filter");
	$(".saved-search-container-mob").addClass("hide-filter");  
	var window_width = $(window).width();
	if(window_width < 768){
		$('#ss-saved-container').removeClass("hide-filter");
		$('#ss-saved-container').addClass("show-filter");
		$("#saved-search tr.no-border-li").attr('style',"border-bottom: none !important;");
		$('#saved-search table tr>td').css("overflow","visible");
	}
};
/**
 * bind_saved_search_criteria
 */
var bind_saved_search_criteria = function(data){
};
/**
 * fnCollapseJSSearchBuilder
 */
var fnCollapseJSSearchBuilder = function() {
  $("#demo3").removeClass('collapse in');
  $("#demo3").addClass('collapse');
  $('.line-shade11-custom').addClass('hidden');
};
/**
 * fnRefineResultImageBindingForToggle
 * @param idSearchBuilder
 */
/*var fnRefineResultImageBindingForToggle = function(idSearchBuilder) {
  if($(idSearchBuilder).hasClass('collapse in')) {
	  $(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Down.svgz');
  } else {
	  $(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
	 // $(idSearchBuilder).parent().find('.refine-results img').css( "height", "8px"); 
  }
};*/
var fnRefineResultImageBindingForToggle =function(idSearchBuilder) {
	var searchTblDisplayVal = $(idSearchBuilder).css("display");
	if($(idSearchBuilder).hasClass('collapse in')) {
		$(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/Chevron-o.svgz');
		$(idSearchBuilder).parent().find('.refine-result img').attr('src',static_cdn_path+static_files_version+'/images/Chevron-o.svgz');
	} else {
		$(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
		$(idSearchBuilder).parent().find('.refine-result img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
	}

	if(searchTblDisplayVal === 'none') {
		$(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
		$(idSearchBuilder).parent().find('.refine-result img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
	} else {
		$(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Down.svgz');
		$(idSearchBuilder).parent().find('.refine-result img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Down.svgz');
	}
	if(isMobile.any() && isMobile.any()[0] === "iPhone"){
		var width_value = $(idSearchBuilder).parent().find('.refine-results img').css("width");
		var width = parseInt((width_value.replace("px","")),10);
		var to_apply = width;
		if(to_apply){
			$(idSearchBuilder).parent().find('.refine-results img').css("width",width-1+"px");
		}
		setTimeout(function(){
			$(idSearchBuilder).parent().find('.refine-results img').css("width",width_value);
		},100);

	}
	$(idSearchBuilder).parent().find('.refine-results img').addClass("refine-arrow");
};

/**
 * fnRefineResultImageBinding
 * @param idSearchBuilder
 */
var fnRefineResultImageBinding = function(idSearchBuilder) {
  if($(idSearchBuilder).hasClass('collapse in')) {
	  $(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Up.svgz');
  } else {
	  $(idSearchBuilder).parent().find('.refine-results img').attr('src',static_cdn_path+static_files_version+'/images/OrangeArrow_Down.svgz');
  }
  $(idSearchBuilder).parent().find('.refine-results img').addClass("refine-arrow");
};
/**
 * Function for resized window
 */
$(window).resize(function() {
	try{
		resize_search();		
	}
	catch(err){
		console.log(configuration_var.search_query_builder + ": resize :" + err);
	}
});	
var back_saved_search_js = function(val){
	$("#zip_saved_error_mobile").text("");
	$('#search_selected_id').val('');
	$('.saved-search-fadeout').css("display","block");
	$("#myTab").find('#save-search-li').addClass("active");
	$("#myTab").find('#current-search-li').removeClass("active");
	$("#myTab").show();
	$("#ss-saved-container").removeClass("ss-detail-margin-top");
	$("#ss-saved-container").addClass('hide-filter')
	$("#ss-saved-container").removeClass('show-filter')
	$(".saved-search-container-mob").removeClass('hide-filter');
	$(".saved-search-container-mob").addClass('show-filter');
};
var remove_saved_search_js = function (event,type){
	$("#zip_saved_error_mobile").text("");
	var to_be_removed_id = $(event).attr("data-id");
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
			$('#myTab').show()
			},100);
		},
		async: true,
		error: function(jqXHR,	 exception) {
			var error_data = jqXHR.responseText;
			var error_status = jqXHR.statusText;
			var status_code = jqXHR.status;
			if(status_code !== 502 && status_code !== 504){
				if(error_data !== null && error_data !== undefined && error_data !== ""){
					var data = jQuery.parseJSON(error_data);
				}
				if(data !== null && data !== undefined && data !== ""){	
					data.type = 'validation';
					if(data.type === 'validation'){
						var message = data.message;
						if(message){
							display_msg = message;
							$("#zip_saved_error_mobile").text(display_msg);
						}
					}else{
						window.location='/error';
					}
				}
				else if(error_status === "error"){
					window.location='/error';
				}
			}else{
				window.location='/error';
			}
			/*if(jqXHR){
				show_error_message(jqXHR);
			}*/
		}
	});
	
}