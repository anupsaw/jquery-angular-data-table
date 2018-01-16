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
var json_response="";
var search_id = "";
var load_more_click = 0;
var g_search_results = [];
var questionnaire_status ={};
var search_type ="";
var resume_status = "";
var search_param_type = "HC";
var drp_job_id = "";
var new_mob_obj = [];
var search_results_count = 0;
var show_banner = false;
var initial_custom_search = false;
/**
 * Document ready functionalities
 */
var applyUrl;
var photoUrl;

$(document).ready(function () {
	//workaround for keyboard dismiss in overlay 
	$(document).on('blur', 'input, textarea', function() {
	      if(isMobile.any() && $('body').hasClass('modal-open')){
	    	  setTimeout(function() {
		          window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
		      }, 0);  
	      }
		  
	  });
	   
	  
	  
	$(window).on('orientationchange',function(){
		setTimeout(function(){
			if(isMobile.any() && isMobile.any()[0] !== 'iPad' && isMobile.any()[0] !== 'iPhone'){
				var active_tab =  $('#myTab-HC').find('li.active').find('span').text();
				if(active_tab === configuration_var.search_type_candidate){
					var window_width = $(window).width();
					var ls_display = $("#ls-curr-search").css("display");
					if(ls_display === "block"){
						 window_width = 769;
					 }
					var parent_class = "#current-search";
					if(window_width > 768){
						$("#dropdownMenu1List").hide();
						var num_jobs = $("#dropdownMenu1-mobList").find("li").length;
						adjust_dd_height("#dropdownMenu1-mobList",num_jobs);
						fnRefineResultImageBindingForToggle_hc("#demo2");
					}else{
						parent_class = "#current-search>#ss-curr-search-container";
						var num_jobs = $("#dropdownMenu-mobList").find("li").length;
						adjust_dd_height("#dropdownMenu-mobList",num_jobs);
					}
					var img_src = $(parent_class).find('.refine-arrow').attr("src");
					if(img_src.indexOf("Down")>-1){
						$('#current-search .refine-results').addClass('new-margin-search');	
						$('#current-search').addClass('new_padding_search');
						$('#current-search .container').addClass('new_padding_search');
						line_shade_display(false);
					}else if (img_src.indexOf("Up")>-1){
						$('#current-search').removeClass('new_padding_search');  
						$('#current-search .container').removeClass('new_padding_search');
						line_shade_display(true);
					}
					enable_disable_dropdown();
				}
			}
			},100);
		var screen_height = $(window).height(); 
		setTimeout(function(){
			if(search_id && isMobile.any() && isMobile.any()[0] !== 'iPad'){
				orientation_change();
			}
		},100);
		
	});
	$("#user-entered-value").focus(function(){
		$("#current-search").hide();
		$("#new-search").hide();
	});
  /**
   * Window resize functionality
   */
  $( window ).resize(function() {
    if($(window).width() < 768){ 
      show_new_jobs_mobile(new_mob_obj);      
    }
  });
  if(isMobile.any()) {
		$('.modal').removeClass('fade');
		$('.btn-load-more').addClass('loadmore_hover');
	}
  $('#spinner-results').hide();
  $("#btn-load-more").hide();
  $('[data-toggle="tooltip"]').tooltip({'placement': 'auto top'});
  $('#getstarted').hide();
  $('#takequestionnaire').hide();
  $('#provideresume').hide();
  $("#search-error").hide();
  $('#banner').hide();
  /* Showing the up arrow if user scrolls anything*/
  var lastScrollTop = 0;
  /**
   * Window Scroll functionality
   */
  $(window).scroll(function () {
    try{
      var up_direction = false;
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        // downscroll code
        up_direction = false;
      } else {
        // upscroll code
        up_direction = true;
      }
      lastScrollTop = st;
      search_results_count = $('#searchresults').children().length;
      if(search_results_count === 0){
        $('#back-to-top').hide();
      }else{
        var windowScrollHeight = $(document.body).prop('scrollHeight');
        var bottomHeight = windowScrollHeight - 850;
        if(up_direction && $(this).scrollTop() > 50 && $(this).scrollTop() < bottomHeight) {
          $('#back-to-top').show();
          $('#back-to-top').fadeIn();
        } else {
          $('#back-to-top').fadeOut();
        }
      }
    }catch(err){
      console.log("Search Results - HC - $(window).scroll "+err);
    }
  });
  /**
   * scroll body to 0px on click on
   * click of back-to-top arrow
   */
  $(window).scroll(function () {
	  	try{
	    /*  if($( window ).width()>=768){
	  		if ($(this).scrollTop()+$(this).height()<($(document).height()-($(".footer-styling").height()+150))) {
	  			
	              $('.sr-CTA-bottom').css({
	              	
	          		position:'fixed',
	          		left:'0%'
	              });
	              $('.sr-CTA-bottom').css({"bottom":"0px"})
	          } else {
	          	
	          	$('.sr-CTA-bottom').css({
	          		
	      			position:'relative',
	      			left:'0%'
	              });
	          	$('.sr-CTA-bottom').css({"bottom":"0px"})
	          }
	  		setTimeout(function(){
	  			 if($("body").height() <= $(window).height()){
	  			    	 $('.sr-CTA-bottom').css({
	  			              	position: 'absolute',
	  			              	bottom: '260px',
	  			              	width: '100%'
	  			         });
	  			    }
	  		},500);
	  		}*/
          adjust_compatibility_button();
	  	}
	      catch(err){
	      	console.log(err);			
	      }
	  });
  
  $('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  if (document.getElementById("hcsearchresultsdata")){
    var search_result_data = document.getElementById("hcsearchresultsdata").value;
    if(search_result_data !== null && search_result_data !== "undefined" && search_result_data !== ""){
      var data = jQuery.parseJSON(search_result_data);
      setTimeout(function() {
        var search_initial_data = jQuery.parseJSON(search_result_data);
        if(search_initial_data.correlation_id){
        	correlation_id = search_initial_data.correlation_id;
        }else{
        	correlation_id = get_correlation_id_from_response_header();
        }
        //search_initial_data = {"search_id":"ES4PFBOGI2VK","search_type":"A","eligible_for_score":true,"sort_order":"OC","job_id":"ELL7K2APWTHI","eligible_sort_options":["SF","D","PD","OC","SC"],"criteria":{"willing_to_travel":false,"eligible_to_work":true,"categories":[]},"search_names":[{"search_name":"TestSave","search_id":"ESGQZ4RGV7N2","job_id":"ELJLGRXCUN2D"}],"is_search_tab":false,"results":[{"id":"YBYW5ZRPh","name":"lakshmi","title":"software Engineer","company":"wexford","posted_date":"2015-04-16T06:20:56.139+0000","city":"Schenectady","state":"New York","logo":"","compatibility":{"heading":"SKILLS COMPATIBILITY","messages":["Our matching is based only on the candidate's skills compatibility to this job"],"heading_percentage":74},"is_saved":"N","is_removed":"N","compatibility_removed":"N"},{"id":"YBYW5ZRPh","name":"lakshmi","title":"software Engineer","company":"wexford","posted_date":"2015-04-16T06:20:56.139+0000","city":"Schenectady","state":"New York","logo":"","compatibility":{"heading":"SKILLS COMPATIBILITY","messages":["Our matching is based only on the candidate's skills compatibility to this job"],"heading_percentage":74},"is_saved":"N","is_removed":"N","compatibility_removed":"N"}],"number_of_listings":1,"jobs":[{"job_id":"ELBAXGWULYSQ","job_title":"Engineer","city":"Schenectady","state":"NY"},{"job_id":"ELL7K2APWTHI","job_title":"Engineer","city":"Schenectady","state":"NY"},{"job_id":"ELQ4Z7F2ICPA","job_title":"Engineer","city":"Schenectady","state":"NY"},{"job_id":"ELZASVEV2TSW","job_title":"Engineer","city":"Los Angeles","state":"CA"},{"job_id":"ELFTIUFBIXW6","job_title":"Engineer","city":"Los Angeles","state":"CA"}]};
        search_type = search_initial_data.search_type;
        global_search_id=search_initial_data.search_id
        if((search_initial_data && search_initial_data.criteria && search_initial_data.criteria.categories &&
            search_initial_data.criteria.categories.length ===0) || (search_initial_data && search_initial_data.criteria && 
                !search_initial_data.criteria.categories) || (search_initial_data && !search_initial_data.criteria)){
          show_banner = false;
        }else{
          show_banner = true;
        }
        var jobs = search_initial_data.jobs;
        if(jobs && jobs.length!==0 && jobs[0].job_id){
        	global_candidate_serach_criteria.initial_job_id=jobs[0].job_id;
        }
        var screen_height = $(window).height(); 
        if(isMobile.any() && screen_height < 768){
        	if(jobs && jobs.length >0){
        		$("#current-search-li").removeClass("apply_tab_width");
        		$("#saved-search-li").removeClass("apply_tab_width");
        	}else{
        		$("#current-search-li").addClass("apply_tab_width");
        		$("#saved-search-li").addClass("apply_tab_width");
        	}
        }
        if( search_initial_data && search_initial_data.job_id !=null && search_initial_data.job_id != undefined &&
            search_initial_data.job_id !== ""){
          $('.joblistings').removeClass('hide'); 
          $('.joblistings').addClass('show');
          $('.mob-joblistings').removeClass('hide'); 
          $('.mob-joblistings').addClass('show');
          search_properties.set_search_tab_values('new-search'); 
          default_new_search();
          $('#current-search .refine-results').removeClass('refine-adjust');
          search_properties.set_search_tab_values('current-search'); 
          if(search_initial_data.search_type === 'A'){
            $(".show-results").removeClass("disabled");
            if(search_initial_data.results !== null && search_initial_data.results !== undefined && search_initial_data.results.length>0){
              show_banner = false;
            }else{
              show_banner = true;
            }
          }
          if(search_initial_data.job_id){
            drp_job_id = search_initial_data.job_id;
            global_candidate_serach_criteria.job_id=search_initial_data.job_id;
          }else{
            drp_job_id = "";
          }
          if(search_initial_data.criteria && search_initial_data.criteria.categories && search_initial_data.criteria.categories.length!==0){
        	  global_candidate_serach_criteria.search_json={};
        	  global_candidate_serach_criteria.search_json.criteria=search_initial_data.criteria;
          }
         
          
        }
        else{        	
          if(jobs && jobs.length >0 ){
            $('.joblistings').removeClass('hide'); 
            $('.joblistings').addClass('show');
            $('.mob-joblistings').removeClass('hide'); 
            $('.mob-joblistings').addClass('show');
            if(search_initial_data.search_type === 'C'){
              custom_search_hc();
              $("#current-search .long-text2:first").parent().removeClass("col-sm-3").addClass("col-sm-6");
            }
            else{
              populate_fields_hc(1);
              if($(window).width() < 768){ 
            	  search_model_hc.total = [];
              }
            }
            $("#myTab-HC>li:last").addClass("active");
            $("#myTab-HC>li:first").removeClass("active");          
            $("#current-search").removeClass("fade"); 
            show_new_search_container();
            search_properties.set_search_tab_values('new-search');    
          }else{
            $("#dropdownMenu1").hide();
            $("#dropdownMenu1List").hide();
            $("#dropdownMenu-mob1").hide();
            $("#dropdownMenu1-mobList").hide();
          }
          if(search_initial_data.criteria && search_type==='A'){
          	  global_new_serach_criteria.search_json={};
          	  global_new_serach_criteria.search_json.criteria=search_initial_data.criteria;
            }
          
        }
        
        search_id = search_initial_data.search_id;
        search_type = search_initial_data.search_type;
        resume_status = search_initial_data.resume_completion;
        
        populate_criteria_hc(search_initial_data,true);
        populate_saved_search_hc(search_initial_data);
        bind_search_results_hc(search_initial_data,true);
        search_save();
        var div_length = $('#searchresults').children().length;
        if(search_initial_data.number_of_listings && search_initial_data.number_of_listings > div_length ){
        	$('#btn-load-more').removeClass('hide');
            $('#btn-load-more').addClass('show');
        }
        else{
        	$('#btn-load-more').removeClass('show');
            $('#btn-load-more').addClass('hide');
        }
        var last_accessed_page = document.referrer;
		if(last_accessed_page && last_accessed_page.indexOf('/compatibility/')>-1 ){
			var search_size = get_cookie("searchcompsize");
			if(search_size){
				load_results_for_compatibility_data(search_size);
				del_cookie("searchcompsize");
			}
		}
        setTimeout(function(){
        $("#query-builder").removeClass('hide');
        $("#query-builder").addClass('show');
        },600);
        $("#comp-div").removeClass('hide');
        $("#comp-div").addClass('show');
        if(div_length === 1){
        	$("#comp-div").css("position","relative");
        }
        setTimeout(function(){
        	if($('#current-search-li').hasClass("active") && search_type==='A'){
            	if(global_candidate_serach_criteria && global_candidate_serach_criteria.search_json && global_candidate_serach_criteria.search_json.criteria){
            		if($('#demo2').css('display')==='none'){
            			$('#curr-refine_results').click();
                		var line_shade=$('.tab-pane.active .sqb-line-shade');
                		line_shade.css('display','block');
            		}
            		
            	}
            }
        	remove_plus_button();
        },600);
        
        
        setTimeout(function(){
          $("#modal-overlay-search").hide();
          $("#spinner").hide();
        },500);
      }, 100);
    }

  }
  $('#btn-load-more').click(function() { 
    load_more_results ();
    analytics_event(gtm_event_category.search_results, gtm_event_action.load_more, gtm_event_label.load_more_jobs_search_results, get_abbrevated_sessionstorage_usertype());
  });

  /**
   * search save
   */
  var search_save = function (){
    try{
      if (getParameterByName('mode')!==undefined && getParameterByName('mode')!==null && getParameterByName('mode')==="save_search") {
        $("#myModal22").find('#SearchName').html("");
        $("#myModal22").modal('hide');
        $("#myTab-HC>li:nth-child(2)").addClass("active");
        $("#myTab-HC>li:first").removeClass("active");
        $("#myTab-HC>li:nth-child(3)").removeClass("active");
        show_saved_search_container_hc();
        $("#saved-search").removeClass("fade");
      }
    }catch(err){
      console.log("Search Results - HC - search_save "+err);
    }
  }

  /**
   * close bootstrap modal on clicking outside overlay
   */
  $('#CTA').on('shown.bs.modal',function(){
    setTimeout(function(){
      $('.modal-backdrop').click(function(){
        $('#CTA').modal('hide');
      });
    },200);
  });

  $(document).on("keypress",function(event){
	  var element_id = $(event.target).attr("id");
	  if(element_id && element_id === "SearchName"){
		  $("#error").text("")
		  $("#SearchName").css("cssText", "border: none !important");
		  if($("#myModal22 #modal-error-display")){
			  $("#myModal22 #modal-error-display").remove();
		  } 
		  var key_pressed = event.charCode;
			if (event.charCode === 13 || event.keyCode === 13){
				save_search_name_hc();
				return;
			}
	  }
  });



  adjust_compatibility_button();
});
/**
 * Function for binding the search results
 */
var bind_search_results_hc = function(search_result_values,initial_load){
  try{
	var drop_down_job_id = "";
	if(search_result_values.job_id){
		drop_down_job_id = search_result_values.job_id;
	}
    initial_custom_search = false;
    var div_length = $('#searchresults').children().length;
    var search_count = 0;
    if(div_length === 0){
      search_count = 0;
    }
    else{
      search_count = div_length;
    }
    search_id = search_result_values.search_id;
    
    if($('#new-search-li').hasClass("active") && search_type==='A'){
    	 global_new_serach_criteria.search_values={}
		 global_new_serach_criteria.search_values.search_id=search_id;
    	 if(search_result_values.sort_order && global_new_serach_criteria.search_json){
    		global_new_serach_criteria.search_values.sort_order=search_result_values.sort_order;
    		global_new_serach_criteria.search_json.sort_order=search_result_values.sort_order;
    	 }
	}
	else if($('#current-search-li').hasClass("active") && search_type==='A'){
		global_candidate_serach_criteria.search_values={}
		global_candidate_serach_criteria.search_values.search_id=search_id;
		if(search_result_values.sort_order && global_candidate_serach_criteria.search_json){
			global_candidate_serach_criteria.search_values.sort_order=search_result_values.sort_order;
			global_candidate_serach_criteria.search_json.sort_order=search_result_values.sort_order;
		}
	}
    json_response = search_result_values;
    var search_results = [];
    var results_template="";
    search_results  = search_result_values.results;//static_searchresults;
    if (search_results && search_results.length>0){
      push_values_to_array(search_results);
    }
    if(initial_load && search_type === configuration_var.custom_search){
      if(search_result_values.criteria === null || search_result_values.criteria === undefined||
          search_result_values.criteria.categories === null || search_result_values.criteria.categories === undefined ||
          search_result_values.criteria.categories.length === 0){
        initial_custom_search = true;
      }else{
        initial_custom_search = false;
      }
    }
    if(initial_custom_search){
      $('#getstarted').removeClass('hide');
      $('#getstarted').addClass('show');
    }else{
    	$('#getstarted').removeClass('show');
        $('#getstarted').addClass('hide');
    }
    if(search_type === "A"  ){
      //Fix for DES 2724
      if(initial_load){
        $("#demo3").removeClass('collapse in');
        $("#demo3").addClass('collapse');
      }
      if(search_results === null|| search_results === undefined ||
          (search_results !== null && search_results !== undefined && search_results.length ===0)){
    	  $('#banner').removeClass('hide');
          $('#banner').addClass('show');
          $("#getstarted").hide();
      } else {
          $('#banner').removeClass('show');
          $('#banner').addClass('hide');
        }
    }
    if(search_results !== null && search_results !== undefined && search_results.length>0){
      search_results_count = search_results.length;
      for (var list_count = 0; list_count< search_results.length; list_count++) {    	  
        search_count = search_count+1;
        var is_saved;
        var job_list = search_results[list_count];
        var job_id = drp_job_id;
        var logo_url = job_list.logo;
        var job_title=job_list.title;
        var name = job_list.name;
        var save_text = configuration_var.search_save;
        var company = job_list.company;      
        if(job_list.company === null || job_list.company === undefined){
          company ="";
        }
        var city = "";
        var state = job_list.state;
        if(job_list.city){
          city = fnToTitleCase(job_list.city);
        }
        var state ="";
        if(job_list.state) {
          state = job_list.state.toUpperCase();
        }
        var span_class = "show-span sr-tagline-position";
        if(job_title === null || job_title === undefined){
          job_title ="";
          span_class = "hide";
        }
        var job_seeker_id = job_list.id;
        if (job_list.is_saved !== undefined && job_list.is_saved===configuration_var.search_yes){
          save_text = configuration_var.search_unsave;
        }
        else{
          save_text = configuration_var.search_save;

        }
        if(job_list.is_saved === undefined ){
          is_saved = configuration_var.search_yes;
        }
        else{
          is_saved = job_list.is_saved;
        }

        var new_job = false;
        var posted_date = get_posted_days(job_list.posted_date);
        var posted_time  = posted_date+configuration_var.search_days_ago;
        if (posted_date <= 3){
          new_job = true;
        }
        var compatibility_score = job_list.compatibility_score;
        if (job_list.compatibility_score === undefined){
          compatibility_score = 0;
        }
        var compatibility_level= job_list.level;
        compatibility_level=get_compatibility_report(compatibility_score);     
        if(search_type==='A' && job_id){
        	url_component ='job_id='+job_id+'|job_title='+ job_title+'|name='+name+'|city='+city+'|state='+ state+'|company_name='+company+'|job_seeker_id='+job_seeker_id+'|search_id='+global_search_id;
            	
        }
        else{
        	url_component ='search_type='+search_type+'|job_title='+ job_title+'|name='+name+'|city='+city+'|state='+ state+'|company_name='+company+'|job_seeker_id='+job_seeker_id+'|search_id='+global_search_id;
            
        }
        if(city && state){
          city = city + ", ";
        }
        if(!city && !state){
        	span_class = "hide";
        }
        photoUrl=logo_url;
        var compatibility_url = url_component;
        var estimated_culture = job_list.estimated_culture;
        var skills = job_list.skills;
        var personality = job_list.personality;
        var description = job_list.description;
        var new_id = "new"+search_count;
        var new_job_mob ="newmob"+search_count;
        var save_btn_id = "btnsave"+search_count;
        var btn_remv_id="btnhcremv"+search_count;
        var div_id = "div"+search_count;
        var compatibility_id = "comp_"+search_count;
        var button_toggle_id="btn_toggle"+search_count;
        var site_wrapper_id = "site_wrapper"+search_count;
        var score_id = "score_title"+search_count;
        var estimated_div = "est_culture"+search_count;
        var compatiblity_heading;
        if(job_list.compatibility && job_list.compatibility.heading){
          compatiblity_heading =job_list.compatibility.heading;
        }
        var compatiblity_heading_value = 0;
        if(job_list.compatibility && job_list.compatibility.heading_percentage){
          compatiblity_heading_value = job_list.compatibility.heading_percentage;
        }
        if(compatiblity_heading !== undefined){
          compatiblity_heading = compatiblity_heading.replace("\"", "");
        }
        if(compatiblity_heading_value === undefined){
          compatiblity_heading_value = 0;
        }
        compatibility_score = parseInt(compatiblity_heading_value,10);
        compatibility_level=get_compatibility_report(compatibility_score);
        var sImgSrc = '';
        if(compatibility_score < 55) {
          sImgSrc = static_cdn_path+static_files_version+"/images/compatibilityccore_DownArrow_verylow.svgz";
        } else {
          sImgSrc = static_cdn_path+static_files_version+"/images/Chevron-Circle-Blue.svgz";
        }
        results_template =  '<div id = '+div_id+' class="container card-style" data-drpjobid = "'+drop_down_job_id+'" data-jobid = "'+job_seeker_id+'">\
        <div class="col-sm-9 col-md-9 col-xs-8">\
        <span id ='+new_job_mob+' class="label sr-label visible-xs">NEW</span></h2>\
        <table class="table no-border tr-no-padding33 new_margin_search">\
        <tbody>\
        <tr class="m-t-10">\
        <td class="td-20 no-border no-padding-table no padding-side">\
        <center>\
        <img src='+logo_url+' width="94px" class="img-circle sr-HR-photo hc-photo-height"> \
        </center>\
        </td>\
        <td class="td-80 no-border no-padding-side">\
        <h2 class="sr-title"><span class="sr-tiltle-overflow">'+name+'</span><span id ='+new_id+' class="label sr-label sr-position-new hidden-xs">NEW</span></h2>\
        <div class="hidden-xs hidden-xs project-tagline"><div><span class="business-tagline sr-tagline-overflow">'+job_title+'</span> <span class="'+span_class+'">&nbsp;|&nbsp;</span><span class="sr-tagline-position">'+city+state+'</span></div></div>\
        <span class="visible-xs business-tagline">'+job_title+'<br>'+city+state+'</span>\
        <span class="card-buttons">\
        <button data-toggle="modal" class="btn btn-primary btn-sr-primary m-r-5 hidden-xs btn-small-v" role="button" onClick="launchCreateMsg(&quot;'+job_seeker_id+'&quot;,&quot;'+name+'&quot,&quot;'+logo_url+'&quot,&quot;'+job_title+'&quot,&quot;'+state+'&quot,&quot;'+city+'&quot,&quot;'+drop_down_job_id+'&quot);">Contact</button>\
        <button class="btn btn-sr-secondary btn-small-v m-r-5 hidden-xs" role="button" onClick="launch_compatibility_page(&quot;'+compatibility_url+'&quot;,&quot;'+job_seeker_id+'&quot,&quot;'+logo_url+'&quot,&quot;'+job_list.rank+'&quot);">Details</button>\
        <button id='+save_btn_id+' class="btn btn-sr-secondary btn-small-v m-r-5 hidden-xs" role="button" onClick="save_search_details(&quot;'+job_seeker_id+'&quot;,&quot;'+job_title+'&quot,&quot;'+save_btn_id+'&quot,&quot;'+drop_down_job_id+'&quot);">'+save_text+'</button>\
        <div class="dropdown btn btn-sr-secondary btn-small-v hidden-xs">\
        <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" class="sr-gear">\
        <img src="'+static_cdn_path+static_files_version+'/images/Gear.svgz" height="16px"> <img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="sr-gear-chevron hidden-xs">\
        </a>\
        <ul class="dropdown-menu dropdown-sr" role="menu" aria-labelledby="dLabel">\
        <li role="presentation" id='+btn_remv_id+' onclick = "remove_item(&quot;'+job_seeker_id+'&quot;,&quot;'+job_title+'&quot,&quot;'+btn_remv_id+'&quot,&quot;'+div_id+'&quot);"><a role="menuitem" tabindex="-1">Remove</a></li>\
        </ul>\
        </div>\
        </span>\
        </td>\
        </tr>\
        </tbody>\
        </table>\
        </div>\
        <div id="'+compatibility_id+'" class="col-sm-3 col-xs-4 col-md-3 column-tile2 collapse-group column-tile-height column-tile-results column-tile-results-hc" onmouseenter="slide_drawer(event);" onmouseleave="slide_drawer(event);">\
        <div id="'+site_wrapper_id+'" class="site-wrapper">\
        <div class="site-canvas">\
        <p class="score-text3 sqb-new-font-title-md">'+compatiblity_heading+'</p>\
        <p class="score-text2 hidden-xs">'+compatibility_level+'</p>\
        <p class="score-font">'+compatiblity_heading_value+'<span class="sr-percentage">%</span></p>\
        <div class="drawer-door">\
        <div class="sr-score-detail" id="'+score_id+'">\
        </div>\
        </div>\
        </div>\
        <center>\
        <button id="'+button_toggle_id+'" type="button" class="toggle-nav btn-drawer2 btn btn-lg close-chevron close-chevron-hc   flip-btn hidden-xs" id="big-sexy2">\
        <img src="'+ sImgSrc +'" height="20px">\
        </button></center>\
        <br>\
        <br>\
        </div>\
        </div>\
        </div>';
        var color = get_background_color(compatibility_score);
        //var url_compatibility = load_compatibility_undo_template(job_seeker_id);
        var url_compatibility = false;
        if(job_list.compatibility_removed && job_list.compatibility_removed==="Y"){
        	url_compatibility = true;
        }
        if(url_compatibility){
          var template = '<div id = '+div_id+' class="container card-style"></div>';
          $('#searchresults').append(template);
          //var job_id = '\'' + job_id +',' + job_title +',' + btn_remv_id +',' + div_id + '\'';
          remove_item(job_seeker_id,job_title,btn_remv_id,div_id);
        }
        else{
          $('#searchresults').append(results_template);
          if( isMobile.iOS() || navigator.platform.toUpperCase().indexOf('MAC')!==-1){
          	$('.sr-position-new').addClass('new-postion-top')  
            }
        }
       
        if(new_job){
          $("#"+new_id).show();
          $("#"+new_job_mob).show();
          add_newly_added_rows(new_job_mob,true);
        }else{
          $("#"+new_id).hide();
          $("#"+new_job_mob).hide();
          add_newly_added_rows(new_job_mob,false);
        }
        if(!url_compatibility){
          $("#"+div_id).click(function(){
            if($(window).width() < 768){  
              launch_compatibility_mob($(this));
            }
          });
        }
        if(job_list.compatibility){
          $("#"+compatibility_id ).attr('style', 'background-color: '+color+' !important');
          /*$( '#'+compatibility_id)
          .mouseover(function() {
            var compat_col_id = this.id;
            toggleNav(site_wrapper_id,compat_col_id);
          })
          .mouseout(function() {
            var compat_col_id = this.id;
            toggleNav(site_wrapper_id,compat_col_id);
          });*/
          $( '#'+button_toggle_id).on('click',function() {
              var compat_col_id = this.id;
              toggleNavTouch(site_wrapper_id,compat_col_id);
          });
          bind_compatibility_span(job_list.compatibility,score_id,estimated_div,compatibility_id);
        }
        else{
          $("#"+compatibility_id ).attr('style', 'background-color: #ebecec !important');
          bind_questionmark_image(compatibility_id);
        }
      }
    }else{
      search_results_count = 0;
      $('#banner').removeClass('hide');
      $('#banner').addClass('show');
      if(initial_load){
        if(show_banner){
          $('#banner').removeClass('hide');
          $('#banner').addClass('show');
        }else{          
          $('#banner').addClass('hide');
          $('#banner').removeClass('show');
        }
      }
    }
    var div_length = $('#searchresults').children().length;
    if(search_result_values.number_of_listings && search_result_values.number_of_listings > div_length ){
    	$('#btn-load-more').removeClass('hide');
        $('#btn-load-more').addClass('show');
    }
    else{
    	$('#btn-load-more').removeClass('show');
        $('#btn-load-more').addClass('hide');
    }
    if($(window).width() < 768){ 
        show_new_jobs_mobile(new_mob_obj);
    }
    if(div_length && div_length === 1){
    	var id = $(".card-style").attr("id");
    	var window_width = $(window).width();
    	if(!isMobile.any() || (isMobile.any() && window_width>767)){
    		$("#"+id).css("cssText", "margin-bottom: 40px !important;");
    	}
    	if(isMobile.any() && ($(window).width() >767 && $(window).width() <1024)){
    		adjust_compatibility_button();
    	}
    }
    /*var url = window.location.search;
    if(url.indexOf('?') > -1){
      load_delete();
    }*/
    adjust_compatibility_button();
   
  }catch(err){
    console.log("Search Results - HC - bind search results "+err);
  }
};
/**
 * Function for remove/flag click
 */
var remove_flag_item = function(event){
  analytics_event(gtm_event_category.search_results, gtm_event_action.remove, gtm_event_label.remove_search_results, get_abbrevated_sessionstorage_usertype());
};
/**
 * Function for showing the actual div
 * on click of undo button
 */
var undo_delete_hc_template =  function (div_id,job_id){
  try{
    $("#"+div_id).html("");
    var id = div_id.replace("div","");
    var drop_down_job_id = $("#"+div_id).attr("data-drpjobid");
    var job_id_position = get_row(job_id);
    var job_list = g_search_results[job_id_position];
    var job_id = drp_job_id;
    var logo_url = job_list.logo;
    var job_title=job_list.title;
    var name = job_list.name;
    var city = "";
    var state = job_list.state;
    if(job_list.city){
      city = fnToTitleCase(job_list.city);
    }
    var state ="";
    if(job_list.state) {
      state = job_list.state.toUpperCase();
    }
    var save_text = configuration_var.search_save;
    if (job_list.is_saved !== undefined && job_list.is_saved===configuration_var.search_yes){
      save_text = configuration_var.search_unsave;
    }
    else{
      save_text = configuration_var.search_save;
    }
    var new_job = false;
    var posted_date = get_posted_days(job_list.posted_date);
    var posted_time  = posted_date+configuration_var.search_days_ago;
    if (posted_date <= 3){
      new_job = true;
    }
    var compatibility_score = job_list.compatibility_score;
    if (job_list.compatibility_score === undefined){
      compatibility_score = 0;
    }
    var compatibility_level= job_list.level;
    compatibility_level=get_compatibility_report(compatibility_score);
    var compatibility_url = job_list.compatibility_url;
    var estimated_culture = job_list.estimated_culture;
    var skills = job_list.skills;
    var personality = job_list.personality;
    var description = job_list.description;
    var company = job_list.company; 
    if(job_list.company === null || job_list.company === undefined){
      company ="";
    }
    var job_seeker_id = job_list.id;
    var new_id = "new"+id;
    var save_btn_id = "btnsave"+id;
    var btn_remv_id="btnhcremv"+id;
    var div_id = "div"+id;
    var compatibility_id = "comp_"+id;
    var button_toggle_id="btn_toggle"+id;
    var site_wrapper_id = "site_wrapper"+id;
    var score_id = "score_title"+id;
    var estimated_div = "est_culture"+id;
    var new_job_mob ="newmob"+id;
    if(search_type==='A' && job_id){
      url_component ='job_id='+job_id+'|job_title='+ job_title+'|name='+name+'|city='+city+'|state='+ state+'|company_name='+company+'|job_seeker_id='+job_seeker_id+'|search_id='+global_search_id;
          
    }
    else{
      url_component ='job_title='+ job_title+'|name='+name+'|city='+city+'|state='+ state+'|company_name='+company+'|job_seeker_id='+job_seeker_id+'|search_id='+global_search_id;
        
    }
    compatibility_url = url_component;
    var compatiblity_heading;
    if(job_list.compatibility && job_list.compatibility.heading){
      compatiblity_heading = job_list.compatibility.heading;
    }
    var compatiblity_heading_value = 0;
    if(job_list.compatibility && job_list.compatibility.heading_percentage){
      compatiblity_heading_value = job_list.compatibility.heading_percentage;
    }
    if(compatiblity_heading !== undefined){
      compatiblity_heading = compatiblity_heading.replace("\"", "");
    }
    if(compatiblity_heading_value === undefined){
      compatiblity_heading_value = 0;
    }
    compatibility_score = parseInt(compatiblity_heading_value,10);
    compatibility_level=get_compatibility_report(compatibility_score);
    var sImgSrc = '';
    if(compatibility_score < 55) {
      sImgSrc = static_cdn_path+static_files_version+"/images/compatibilityccore_DownArrow_verylow.svgz";
    } else {
      sImgSrc = static_cdn_path+static_files_version+"/images/Chevron-Circle-Blue.svgz";
    }
    var span_class = "show-span sr-tagline-position";
    if(job_title === null || job_title === undefined){
      job_title ="";
      span_class = "hide";
    }
    if(city && state){
      city = city + ", ";
    }
    var results_template =  '\
      <div class="col-sm-9 col-md-9 col-xs-8">\
      <span id ='+new_job_mob+' class="label sr-label visible-xs">NEW</span></h2>\
      <table class="table no-border tr-no-padding33 new_margin_search">\
      <tbody>\
      <tr class="m-t-10">\
      <td class="td-20 no-border no-padding-table no padding-side">\
      <center>\
      <img src='+logo_url+' width="94px" class="img-circle sr-HR-photo hc-photo-height"> \
      </center>\
      </td>\
      <td class="td-80 no-border no-padding-side">\
      <h2 class="sr-title"><span class="sr-tiltle-overflow">'+name+'</span><span id ='+new_id+' class="label sr-label sr-position-new hidden-xs">NEW</span></h2>\
      <div class="hidden-xs hidden-xs project-tagline"><div><span class="business-tagline sr-tagline-overflow">'+job_title+'</span> <span class="'+span_class+'">&nbsp;|&nbsp;</span><span class="sr-tagline-position">'+city+state+'</span></div></div>\
      <span class="visible-xs business-tagline">'+job_title+'<br>'+city+state+'</span>\
      <span class="card-buttons">\
      <button data-toggle="modal"  class="btn btn-primary btn-sr-primary m-r-5 hidden-xs btn-small-v" role="button" onClick="launchCreateMsg(&quot;'+job_seeker_id+'&quot;,&quot;'+name+'&quot,&quot;'+logo_url+'&quot,&quot;'+job_title+'&quot,&quot;'+state+'&quot,&quot;'+city+'&quot,&quot;'+drop_down_job_id+'&quot);">Contact</button>\
      <button class="btn btn-sr-secondary btn-small-v m-r-5 hidden-xs" role="button" onClick="launch_compatibility_page(&quot;'+compatibility_url+'&quot;,&quot;'+job_seeker_id+'&quot,&quot;'+logo_url+'&quot,&quot;'+job_list.rank+'&quot);">Details</button>\
      <button id='+save_btn_id+' class="btn btn-sr-secondary btn-small-v m-r-5 hidden-xs" role="button" onClick="save_search_details(&quot;'+job_seeker_id+'&quot;,&quot;'+job_title+'&quot,&quot;'+save_btn_id+'&quot,&quot;'+drop_down_job_id+'&quot);">'+save_text+'</button>\
      <div class="dropdown btn btn-sr-secondary btn-small-v hidden-xs">\
      <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" class="sr-gear">\
      <img src="'+static_cdn_path+static_files_version+'/images/Gear.svgz" height="16px"> <img src="'+static_cdn_path+static_files_version+'/images/Chevron-o.svgz" height="8px" class="sr-gear-chevron hidden-xs">\
      </a>\
      <ul class="dropdown-menu dropdown-sr" role="menu" aria-labelledby="dLabel">\
      <li role="presentation" id='+btn_remv_id+' onclick = "remove_item(&quot;'+job_seeker_id+'&quot;,&quot;'+job_title+'&quot,&quot;'+btn_remv_id+'&quot,&quot;'+div_id+'&quot);"><a role="menuitem" tabindex="-1">Remove</a></li>\
      </ul>\
      </div>\
      </span>\
      </td>\
      </tr>\
      </tbody>\
      </table>\
      </div>\
      <div id="'+compatibility_id+'" class="col-sm-3 col-xs-4 col-md-3 column-tile2 collapse-group column-tile-height column-tile-results  column-tile-results-hc" onmouseenter="slide_drawer(event);" onmouseleave="slide_drawer(event);">\
      <div id="'+site_wrapper_id+'" class="site-wrapper">\
      <div class="site-canvas">\
      <p class="score-text3">'+compatiblity_heading+'</p>\
      <p class="score-text2 hidden-xs">'+compatibility_level+'</p>\
      <p class="score-font">'+compatiblity_heading_value+'<span class="sr-percentage">%</span></p>\
      <div class="drawer-door">\
      <div class="sr-score-detail" id="'+score_id+'">\
      </div>\
      </div>\
      </div>\
      <center>\
      <button id="'+button_toggle_id+'" type="button" class="toggle-nav btn-drawer2 btn btn-lg close-chevron close-chevron-hc flip-btn hidden-xs" id="big-sexy2">\
      <img src="'+ sImgSrc +'" height="20px">\
      </button></center>\
      <br>\
      <br>\
      </div>\
      </div>';
    var color = get_background_color(compatibility_score);
    $("#"+div_id).append(results_template);
    if(isMobile.iOS() || navigator.platform.toUpperCase().indexOf('MAC')!==-1){
    	$('.sr-position-new').addClass('new-postion-top')  
      }
    $("#"+div_id).attr('data-jobid',job_seeker_id);
    if(new_job){
      $("#"+new_id).show();
      $("#"+new_job_mob).show();
      add_newly_added_rows(new_job_mob,true);
    }else{
      $("#"+new_id).hide();
      $("#"+new_job_mob).hide();
      add_newly_added_rows(new_job_mob,false);
    }
    $("#"+div_id).click(function(){
      if($(window).width() < 768){  
        if (compatibility_url !== undefined){
          launch_compatibility_mob($(this));
        }
      }
    });
    if(job_list.compatibility){
      $("#"+compatibility_id ).attr('style', 'background-color: '+color+' !important');
      /*$( '#'+compatibility_id)
      .mouseover(function() {
        var compat_col_id = this.id;
        toggleNav(site_wrapper_id,compat_col_id);
      })
      .mouseout(function() {
        var compat_col_id = this.id;
        toggleNav(site_wrapper_id,compat_col_id);
      });*/
      $( '#'+button_toggle_id).on('click',function() {
          var compat_col_id = this.id;
          toggleNavTouch(site_wrapper_id,compat_col_id);
      });
      bind_compatibility_span(job_list.compatibility,score_id,estimated_div,compatibility_id);
    }
    else{
      $("#"+compatibility_id ).attr('style', 'background-color: #ebecec !important');
      bind_questionmark_image(compatibility_id);
    }
    if($(window).width() < 768){ 
        show_new_jobs_mobile(new_mob_obj);
    }
    
  }catch(err){
    console.log("Search Results - HC - undo_delete_hc_template "+err);
  }
};
/**
 * Function for contact button click
 */
var contact_candidate = function(job_id){
	analytics_event(gtm_event_category.search_results, gtm_event_action.contact, gtm_event_label.contact_search_results, get_abbrevated_sessionstorage_usertype());
  alert("Functionality under construction");
};


/**
 * Function for launching resume upload
 * page
 */
var launch_joblisting_upload = function(){
  try{
    window.location.href = '/dashboard/#/joblisting';
  }catch(err){
    console.log("Search Results - HC - launch_joblisting_upload "+err);
  }
};

//Send Analytics information
var what_is_compatibility_tab_search_results = function(){
	analytics_event(gtm_event_category.search_results, gtm_event_action.what_is_compatibility, gtm_event_label.compatibility_search_results, get_abbrevated_sessionstorage_usertype());
};
/**
 * Getting search results based on dropdown
 * value change 
 */
var search_results_jobid = function(job_id){
  try{
    var sort_val = $("#dLabel").text();
    var sort_order = get_sort_value(sort_val);
    var search_data = {};
    search_data.job_id = job_id;
    sort_call(search_data);
  }catch(err){
    console.log("Search Results - HC - search_results_jobid "+err);
  }
};


